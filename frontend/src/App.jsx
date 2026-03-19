import { useState } from "react";
import SearchBar from "@/components/SearchBar";
import ResultCard from "@/components/ResultCard";
import RecommendationList from "@/components/RecommendationList";
import EmptyState from "@/components/EmptyState";

export default function App() {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSearch = async ({ anime, type }) => {
    setLoading(true);
    setError("");
    setResult(null);

    try {
      const params = new URLSearchParams({ anime });
      if (type) params.append("type", type);

      const res = await fetch(
        `http://localhost:4000/api/recommendations?${params}`,
      );
      const data = await res.json();

      if (!res.ok) throw new Error(data.error || "Something went wrong");
      setResult(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-2xl mx-auto px-6 py-16">
        <header className="mb-12">
          <p className="text-xs tracking-widest text-zinc-400 uppercase mb-3">
            Anime Recommender
          </p>
          <h1 className="text-3xl font-semibold text-zinc-900 tracking-tight">
            Find your next watch.
          </h1>
          <p className="mt-2 text-sm text-zinc-500">
            Enter an anime title and get genre-based recommendations instantly.
          </p>
        </header>

        <SearchBar onSearch={handleSearch} loading={loading} />

        {error && (
          <div className="mt-6 px-4 py-3 rounded-lg border border-red-200 bg-red-50 text-sm text-red-600">
            {error}
          </div>
        )}

        {result && (
          <div className="mt-10 space-y-8">
            <ResultCard result={result} />
            <RecommendationList recommendations={result.recommendations} />
          </div>
        )}

        {!result && !loading && !error && <EmptyState />}
      </div>
    </div>
  );
}
