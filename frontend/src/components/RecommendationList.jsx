function SimilarityBar({ value }) {
  const pct = Math.round(parseFloat(value) * 100);
  return (
    <div className="flex items-center gap-2 mt-1">
      <div className="flex-1 h-1 bg-zinc-100 rounded-full overflow-hidden">
        <div
          className="h-full bg-zinc-800 rounded-full transition-all"
          style={{ width: `${pct}%` }}
        />
      </div>
      <span className="text-xs text-zinc-400 tabular-nums w-8 text-right">
        {pct}%
      </span>
    </div>
  );
}

export default function RecommendationList({ recommendations }) {
  if (!recommendations?.length) {
    return (
      <p className="text-sm text-zinc-400 text-center py-6">
        No recommendations found for the given filters.
      </p>
    );
  }

  return (
    <div>
      <p className="text-xs text-zinc-400 uppercase tracking-widest mb-4">
        Recommendations ({recommendations.length})
      </p>
      <ul className="divide-y divide-zinc-100">
        {recommendations.map((rec, i) => (
          <li key={rec.name} className="py-3.5 flex items-start gap-4">
            <span className="text-xs text-zinc-300 tabular-nums pt-0.5 w-4 shrink-0">
              {String(i + 1).padStart(2, "0")}
            </span>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between gap-2">
                <p className="text-sm font-medium text-zinc-800 truncate">
                  {rec.name}
                </p>
                <span className="shrink-0 text-xs text-zinc-400 border border-zinc-100 rounded-full px-2 py-0.5">
                  {rec.type}
                </span>
              </div>
              <SimilarityBar value={rec.similarity} />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
