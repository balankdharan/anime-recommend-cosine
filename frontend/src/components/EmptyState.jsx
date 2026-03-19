export default function EmptyState() {
  return (
    <div className="mt-20 text-center">
      <div className="inline-flex items-center justify-center w-12 h-12 rounded-full border border-zinc-100 bg-zinc-50 mb-4">
        <span className="text-xl">🎌</span>
      </div>
      <p className="text-sm text-zinc-400">Search an anime to get started.</p>
      <p className="text-xs text-zinc-300 mt-1">
        Try "Naruto", "Death Note", or "Sword Art Online"
      </p>
    </div>
  );
}
