import express from "express";
import fs from "fs";
import path from "path";
import csv from "csv-parser";
import cosineSimilarity from "cosine-similarity";
import Fuse from "fuse.js";
import { fileURLToPath } from "url";
import cors from "cors";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(cors({ origin: "http://localhost:5173" }));

app.use(express.json());

let animeData = [];

//  Load Kaggle dataset
const csvPath = path.join(__dirname, "anime.csv");

fs.createReadStream(csvPath)
  .pipe(csv())
  .on("data", (row) => {
    animeData.push({
      name: row.name.trim(),
      genre: row.genre
        ? row.genre
            .toLowerCase()
            .replace(/,/g, " ")
            .split(" ")
            .filter((g) => g)
        : [],
      type: row.type ? row.type.trim() : "Unknown",
    });
  })
  .on("end", () => {
    console.log(` Loaded ${animeData.length} anime from dataset`);
  });

function toVector(words, allWords) {
  return allWords.map((w) => (words.includes(w) ? 1 : 0));
}

function safeNumber(value) {
  const n = Number(value);
  return Number.isFinite(n) ? n : 0;
}

function normalize(str) {
  return str.toLowerCase().trim().replace(/\s+/g, " ");
}

let fuse;
setTimeout(() => {
  fuse = new Fuse(animeData, {
    keys: ["name"],
    threshold: 0.3,
  });
  console.log("🔍 Fuzzy search initialized");
}, 2000);

app.get("/api/recommendations", (req, res) => {
  const rawQuery = req.query.anime;
  const typeFilter = req.query.type;

  if (!rawQuery)
    return res.status(400).json({ error: "Please provide ?anime=" });

  const title = rawQuery.trim();
  if (!title) return res.status(400).json({ error: "Anime name is empty" });

  if (!fuse) return res.status(503).json({ error: "Dataset still loading..." });

  const results = fuse.search(title);
  if (results.length === 0)
    return res.status(404).json({ error: "Anime not found" });

  const matchedAnime = results[0].item;
  const normalizedSearchName = normalize(matchedAnime.name);

  const baseTitle = matchedAnime.name
    .replace(
      /\s*(movie|film|ova|ona|special|episode|recap|season|tv|picture drama)\s*\d*\s*[:\-]?.*/gi,
      "",
    )
    .trim()
    .toLowerCase();

  //  cosine similarity based on genres
  const allWords = [...new Set(animeData.flatMap((a) => a.genre))];
  const targetVec = toVector(matchedAnime.genre, allWords);

  const similarities = animeData
    .map((a) => {
      try {
        const score = cosineSimilarity(targetVec, toVector(a.genre, allWords));

        const candidateBase = a.name
          .replace(
            /\s*(movie|film|ova|ona|special|episode|recap|season|tv|picture drama)\s*\d*\s*[:\-]?.*/gi,
            "",
          )
          .trim()
          .toLowerCase();

        return {
          name: a.name,
          type: a.type,
          score: safeNumber(score),
          normalizedName: normalize(a.name),
          baseTitle: candidateBase,
        };
      } catch {
        return {
          name: a.name,
          type: a.type,
          score: 0,
          normalizedName: normalize(a.name),
          baseTitle: a.name.toLowerCase(),
        };
      }
    })
    .filter((a) => a.normalizedName !== normalizedSearchName)
    .filter((a) => {
      const candidateLower = a.name.toLowerCase();
      return (
        !candidateLower.startsWith(baseTitle + " ") &&
        !candidateLower.startsWith(baseTitle + ":") &&
        a.baseTitle !== baseTitle
      );
    })
    .filter((a) => {
      if (!typeFilter) return true;
      return a.type.toLowerCase() === typeFilter.toLowerCase();
    })
    .filter((a) => a.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 10);

  res.json({
    searchedAnime: matchedAnime.name,
    searchedType: matchedAnime.type,
    genres: matchedAnime.genre,
    filterApplied: typeFilter || "None",
    recommendations: similarities.map((s) => ({
      name: s.name,
      type: s.type,
      similarity: s.score.toFixed(2),
    })),
  });
});

const PORT = 4000;
app.listen(PORT, () =>
  console.log(`🚀 Server running at http://localhost:${PORT}`),
);
