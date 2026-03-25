"use client";

import { useState } from "react";
import { ShieldAlert, Cpu, Lock } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { SearchBar } from "../components/SearchBar";
import { Dashboard } from "../components/Dashboard";
import { ScanResponse } from "../models/PrivacyReport";

export default function Home() {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<ScanResponse | null>(null);

  const handleScan = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!url) return;
    
    // Basic validation
    let target = url;
    if (!url.startsWith("http://") && !url.startsWith("https://")) {
      target = "https://" + url;
    }

    setLoading(true);
    setError(null);
    setData(null);

    try {
      const res = await fetch("/api/scan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: target }),
      });

      if (!res.ok) {
        throw new Error("Failed to scan the website.");
      }

      const result = await res.json();
      setData(result as ScanResponse);
    } catch (err: any) {
      setError(err.message || "An Error Occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0A0A0B] text-slate-200 font-sans selection:bg-indigo-500/30">
      {/* Background ambient gradients */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-indigo-600/10 blur-[120px]" />
        <div className="absolute right-[-10%] bottom-[-20%] w-[50%] h-[50%] rounded-full bg-rose-600/10 blur-[120px]" />
      </div>

      <main className="relative max-w-5xl mx-auto px-6 py-20 flex flex-col items-center">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }} 
          animate={{ opacity: 1, y: 0 }} 
          className="text-center mb-16"
        >
          <div className="inline-flex items-center justify-center p-3 mb-6 rounded-2xl bg-white/5 border border-white/10 shadow-2xl backdrop-blur-md">
            <Lock className="w-8 h-8 text-indigo-400" />
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 bg-gradient-to-br from-white via-indigo-100 to-indigo-400 bg-clip-text text-transparent">
            PrivaSee AI
          </h1>
          <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto font-light leading-relaxed">
            Unmask the trackers lurking in the shadows. Enter a URL and let our AI translate complex security headers and cookies into plain English.
          </p>
        </motion.div>

        {/* Search Bar Component */}
        <motion.form 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          onSubmit={handleScan} 
          className="w-full max-w-2xl relative z-10"
        >
          <SearchBar url={url} setUrl={setUrl} loading={loading} onScan={handleScan} />
        </motion.form>

        {/* Error State */}
        <AnimatePresence>
          {error && (
            <motion.div 
              initial={{ opacity: 0, y: 10 }} 
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="mt-8 px-6 py-4 bg-red-500/10 border border-red-500/20 text-red-400 rounded-2xl flex items-center gap-3"
            >
              <ShieldAlert className="w-5 h-5" />
              <p>{error}</p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Loading State */}
        <AnimatePresence>
          {loading && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="mt-20 flex flex-col items-center"
            >
              <div className="relative w-24 h-24 mb-8">
                <div className="absolute inset-0 border-4 border-indigo-500/20 rounded-full" />
                <motion.div 
                  animate={{ rotate: 360 }} 
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-0 border-4 border-t-indigo-500 rounded-full"
                />
                <Cpu className="absolute inset-0 m-auto w-8 h-8 text-indigo-400 animate-pulse" />
              </div>
              <motion.p 
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="text-xl font-medium text-indigo-300"
              >
                AI is sniffing the trackers...
              </motion.p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Results Dashboard Component */}
        <AnimatePresence>
          {data && !loading && (
            <Dashboard data={data} />
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}
