# 🎌 Anime Recommendation

![Node.js](https://img.shields.io/badge/Node.js-20.x-green?logo=node.js)
![Express](https://img.shields.io/badge/Express.js-Backend-lightgrey?logo=express)
![JavaScript](https://img.shields.io/badge/JavaScript-ESM-yellow?logo=javascript)
![Kaggle Dataset](https://img.shields.io/badge/Data-Kaggle-blue?logo=kaggle)
![Docker](https://img.shields.io/badge/Docker-Soon-blue?logo=docker)
![License](https://img.shields.io/badge/License-MIT-purple)

This project is a **Node.js + Express** backend that recommends anime titles using **fuzzy search** and **cosine similarity** based on genres.  
It currently reads a Kaggle dataset (`anime.csv`), performs text-based similarity checks, and returns top matching anime recommendations via a REST API.

---

## 🧱 Project Structure

```bash

your-project/
├── backend/
│ ├── anime.csv
│ ├── server.js
│ ├── package.json
│ └── ...other backend files
│
├── frontend/ ← (to be added later)
│
├── .gitignore
└── README.md

```

---

## 🚀 Current Features

- Loads an anime dataset from a CSV file
- Cleans and normalizes genre and title data
- Uses **Fuse.js** for fuzzy text search
- Uses **cosine similarity** for genre-based recommendations
- Simple REST API endpoint: `/api/recommendations?anime=onepiece`

## ⚙️ Installation & Setup

### 1️⃣ Clone the repository

```bash
git clone https://github.com/yourusername/anime-recommendation-api.git
cd anime-recommendation-api
```

### 2️⃣ Move into backend

```bash
cd backend
```

### 3️⃣ Install dependencies

```bash
npm install
```

### 4️⃣ Run the server

```bash
node server.js
```

The server will start on:

- http://localhost:4000

## 📦 Dataset

The backend loads anime details from a Kaggle dataset (anime.csv).
Make sure the file is located inside the backend/ folder.

### Expected Columns:

```bash
title, synopsis, genres, episodes, score, characters
```

### 🧭 Roadmap

```bash
✅ Current

Basic fuzzy search + cosine similarity

CSV dataset loading

Express API route /api/recommendations

🛠️ Planned

Add modular route structure

Implement caching (Redis or in-memory)

Add Docker support for easier deployment

Integrate AI-based embedding similarity

Build frontend with React (MERN integration)

Add proper documentation and testing

```

### 🤝 Contributing

Contributions are welcome once the base structure is ready.
To propose changes:

Fork the repo

Create a feature branch

Commit changes

Submit a pull request
