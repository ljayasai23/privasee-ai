"use client";

import { Search } from "lucide-react";

interface SearchBarProps {
  url: string;
  setUrl: (url: string) => void;
  loading: boolean;
  onScan: (e: React.FormEvent) => void;
}

export function SearchBar({ url, setUrl, loading, onScan }: SearchBarProps) {
  return (
    <div className="relative group flex items-center w-full">
      <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-3xl blur-md opacity-25 group-hover:opacity-40 transition duration-500" />
      <div className="relative flex w-full bg-[#131316] rounded-3xl border border-white/10 shadow-2xl overflow-hidden backdrop-blur-xl transition-all focus-within:border-indigo-500/50">
        <div className="pl-6 flex items-center pointer-events-none">
          <Search className="w-5 h-5 text-indigo-400" />
        </div>
        <input
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="https://example.com"
          className="w-full py-5 px-4 bg-transparent text-lg text-white placeholder-slate-500 focus:outline-none"
        />
        <button
          onClick={onScan}
          disabled={loading || !url}
          className="px-8 py-2 m-2 bg-indigo-600 hover:bg-indigo-500 disabled:bg-white/5 disabled:text-slate-500 text-white font-medium rounded-2xl transition-all"
        >
          Scan
        </button>
      </div>
    </div>
  );
}
