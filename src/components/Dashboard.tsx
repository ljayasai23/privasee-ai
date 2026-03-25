"use client";

import { ShieldAlert, Fingerprint, ShieldCheck } from "lucide-react";
import { motion } from "framer-motion";
import { ScanResponse } from "../models/PrivacyReport";

interface DashboardProps {
  data: ScanResponse;
}

const gradeColors: Record<string, string> = {
  A: "text-emerald-400 drop-shadow-[0_0_15px_rgba(52,211,153,0.5)]",
  B: "text-green-400 drop-shadow-[0_0_15px_rgba(74,222,128,0.5)]",
  C: "text-yellow-400 drop-shadow-[0_0_15px_rgba(250,204,21,0.5)]",
  D: "text-orange-400 drop-shadow-[0_0_15px_rgba(251,146,60,0.5)]",
  F: "text-red-500 drop-shadow-[0_0_15px_rgba(239,68,68,0.8)]",
};

export function Dashboard({ data }: DashboardProps) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      className="mt-20 w-full grid grid-cols-1 md:grid-cols-3 gap-6"
    >
      {/* Grade Card */}
      <div className="md:col-span-1 bg-[#131316] border border-white/5 rounded-3xl p-8 flex flex-col items-center justify-center relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 rounded-full blur-3xl group-hover:bg-indigo-500/20 transition-all" />
        <h3 className="text-slate-400 font-medium mb-6 uppercase tracking-widest text-sm">Privacy Grade</h3>
        <div className="relative flex items-center justify-center w-40 h-40 rounded-full border border-white/10 bg-[#0A0A0B] shadow-inner mb-6">
          <span className={`text-7xl font-black ${gradeColors[data.analysis.grade] || "text-slate-400"}`}>
            {data.analysis.grade}
          </span>
        </div>
      </div>

      {/* Story & Armor Cards */}
      <div className="md:col-span-2 flex flex-col gap-6">
        {/* Privacy Story */}
        <div className="bg-gradient-to-br from-[#1A1A24] to-[#131316] border border-white/10 rounded-3xl p-8 shadow-xl">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-indigo-500/20 rounded-lg">
              <Fingerprint className="w-5 h-5 text-indigo-400" />
            </div>
            <h3 className="text-xl font-semibold text-white">The Privacy Story</h3>
          </div>
          <p className="text-slate-300 leading-relaxed text-lg">
            {data.analysis.privacyStory}
          </p>
        </div>

        {/* Security Armor */}
        <div className="bg-[#131316] border border-white/5 rounded-3xl p-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-emerald-500/20 rounded-lg">
              <ShieldCheck className="w-5 h-5 text-emerald-400" />
            </div>
            <h3 className="text-lg font-medium text-white">Security Armor</h3>
          </div>
          <p className="text-slate-400">
            {data.analysis.securityArmor}
          </p>
        </div>
      </div>

      {/* Creepiness Report */}
      <div className="md:col-span-3 mt-6">
        <h3 className="text-2xl font-bold text-white mb-6 pl-2">Creepiness Report</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {data.analysis.creepinessReport?.map((report: string, i: number) => (
            <div key={i} className="bg-[#131316] border border-red-500/10 rounded-2xl p-6 flex gap-4 hover:border-red-500/30 transition-colors">
              <div className="mt-1">
                <ShieldAlert className="w-5 h-5 text-red-400" />
              </div>
              <p className="text-slate-300">{report}</p>
            </div>
          ))}
          {(!data.analysis.creepinessReport || data.analysis.creepinessReport.length === 0) && (
            <div className="col-span-2 bg-[#131316] border border-emerald-500/10 rounded-2xl p-6 text-center text-emerald-400">
              No creepy trackers found based on the analysis!
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
