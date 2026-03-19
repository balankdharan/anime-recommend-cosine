export default function ResultCard({ result }) {
  return (
    <div className="border border-zinc-100 rounded-xl p-5 bg-zinc-50">
      <p className="text-xs text-zinc-400 uppercase tracking-widest mb-2">
        Matched
      </p>
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="text-lg font-semibold text-zinc-900 leading-snug">
            {result.searchedAnime}
          </h2>
          <span className="inline-block mt-1 text-xs text-zinc-500 border border-zinc-200 rounded-full px-2.5 py-0.5 bg-white">
            {result.searchedType}
          </span>
        </div>
        {result.filterApplied !== "None" && (
          <div className="shrink-0 text-right">
            <p className="text-xs text-zinc-400">Filter</p>
            <p className="text-sm font-medium text-zinc-700">
              {result.filterApplied}
            </p>
          </div>
        )}
      </div>

      {result.genres?.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-1.5">
          {result.genres.map((g) => (
            <span
              key={g}
              className="text-xs bg-white border border-zinc-200 text-zinc-600 rounded-full px-2.5 py-0.5 capitalize"
            >
              {g}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
