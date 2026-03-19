import { useState, useRef, useEffect } from "react";
import { Search, ChevronDown } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const TYPE_OPTIONS = ["TV", "Movie", "OVA", "ONA", "Special", "Music"];

export default function SearchBar({ onSearch, loading }) {
  const [anime, setAnime] = useState("");
  const [type, setType] = useState("");
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!anime.trim()) return;
    onSearch({ anime: anime.trim(), type });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      {/* Search input row */}
      <div className="flex gap-2">
        <div className="relative flex-1">
          <Search
            size={15}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400 pointer-events-none"
          />
          <Input
            value={anime}
            onChange={(e) => setAnime(e.target.value)}
            placeholder="e.g. Fullmetal Alchemist"
            className="pl-9 border-zinc-200 focus-visible:ring-zinc-300"
            disabled={loading}
          />
        </div>
        <Button
          type="submit"
          disabled={loading || !anime.trim()}
          className="px-5 bg-zinc-900 hover:bg-zinc-700 text-white"
        >
          {loading ? "Searching…" : "Search"}
        </Button>
      </div>

      {/* Type filter row */}
      <div className="flex items-center gap-2">
        <span className="text-xs text-zinc-400">Filter by type:</span>

        <div className="relative" ref={dropdownRef}>
          {/* Trigger button */}
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            className="flex items-center gap-1.5 h-8 px-3 text-xs border border-zinc-200 rounded-md bg-white text-zinc-600 hover:bg-zinc-50 transition-colors"
          >
            {type || "All types"}
            <ChevronDown
              size={12}
              className={cn("transition-transform", open && "rotate-180")}
            />
          </button>

          {/* Dropdown */}
          {open && (
            <div className="absolute top-full left-0 mt-1 z-50 w-36 bg-white border border-zinc-200 rounded-md shadow-sm overflow-hidden">
              <div
                className={cn(
                  "px-3 py-1.5 text-xs cursor-pointer hover:bg-zinc-50",
                  type === "" && "bg-zinc-50 font-medium",
                )}
                onClick={() => {
                  setType("");
                  setOpen(false);
                }}
              >
                All types
              </div>
              {TYPE_OPTIONS.map((t) => (
                <div
                  key={t}
                  className={cn(
                    "px-3 py-1.5 text-xs cursor-pointer hover:bg-zinc-50",
                    type === t && "bg-zinc-50 font-medium",
                  )}
                  onClick={() => {
                    setType(t);
                    setOpen(false);
                  }}
                >
                  {t}
                </div>
              ))}
            </div>
          )}
        </div>

        {type && (
          <button
            type="button"
            onClick={() => setType("")}
            className="text-xs text-zinc-400 hover:text-zinc-700 underline underline-offset-2"
          >
            Clear
          </button>
        )}
      </div>
    </form>
  );
}
