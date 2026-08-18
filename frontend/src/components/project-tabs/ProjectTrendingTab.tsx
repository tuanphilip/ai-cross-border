"use client";

import React, { useState } from "react";
import { useApp } from "@/context/AppContext";
import { 
  TrendingUp, 
  Sparkles, 
  Flame, 
  Eye, 
  Search, 
  Lightbulb, 
  ArrowUpRight, 
  Share2, 
  Compass, 
  Calendar,
  Layers
} from "lucide-react";
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";

export function ProjectTrendingTab() {
  const { currentProject } = useApp();

  if (!currentProject) return null;

  const [selectedNicheTag, setSelectedNicheTag] = useState<string>(
    currentProject.niches[0]?.tag || ""
  );

  const activeNiche = currentProject.niches.find((n) => n.tag === selectedNicheTag) || currentProject.niches[0];

  // Mock Seasonal Trend Data for the selected niche
  const trendData = [
    { month: "T5", searchVolume: 24000, socialMentions: 1200 },
    { month: "T6", searchVolume: 28000, socialMentions: 1800 },
    { month: "T7", searchVolume: 35000, socialMentions: 3100 },
    { month: "T8", searchVolume: 52000, socialMentions: 5400 },
    { month: "T9", searchVolume: 89000, socialMentions: 9800 },
    { month: "T10 (Peak)", searchVolume: 145000, socialMentions: 18500 },
    { month: "T11 (BFCM)", searchVolume: 198000, socialMentions: 29000 },
    { month: "T12 (Xmas)", searchVolume: 165000, socialMentions: 22000 },
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Niche Selector Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        <span className="text-xs font-bold uppercase tracking-wider text-slate-400 shrink-0 mr-1">
          Chọn Ngách Phân Tích:
        </span>
        {currentProject.niches.map((niche) => {
          const isSelected = selectedNicheTag === niche.tag;
          return (
            <button
              key={niche.id}
              onClick={() => setSelectedNicheTag(niche.tag)}
              className={`px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-2
                ${isSelected
                  ? "bg-cyan-500 text-white shadow-md shadow-cyan-500/20"
                  : "bg-white dark:bg-[#0f172a] border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800/60"
                }`}
            >
              <span>🏷️ {niche.name}</span>
              <span className={`text-[10px] px-1.5 py-0.2 rounded-md ${isSelected ? "bg-white/20 text-white" : "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-mono font-bold"}`}>
                {niche.growthRate}
              </span>
            </button>
          );
        })}
      </div>

      {activeNiche && (
        <div className="space-y-6">
          {/* Key Metrics Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-4 rounded-2xl bg-white dark:bg-[#0f172a] border border-slate-200 dark:border-slate-800 shadow-sm space-y-1">
              <div className="flex items-center justify-between text-slate-400 text-xs">
                <span>Lượng Tìm Kiếm Hàng Tháng</span>
                <Search size={16} className="text-cyan-500" />
              </div>
              <p className="text-2xl font-black text-slate-900 dark:text-white">
                {activeNiche.searchVolumeMonthly.toLocaleString()}
              </p>
              <div className="flex items-center gap-1 text-[11px] text-emerald-600 dark:text-emerald-400 font-medium">
                <TrendingUp size={13} />
                <span>Tăng trưởng {activeNiche.growthRate} MoM</span>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-white dark:bg-[#0f172a] border border-slate-200 dark:border-slate-800 shadow-sm space-y-1">
              <div className="flex items-center justify-between text-slate-400 text-xs">
                <span>Cường Độ Cạnh Tranh</span>
                <Flame size={16} className="text-amber-500" />
              </div>
              <p className="text-2xl font-black text-slate-900 dark:text-white">
                {activeNiche.competition}
              </p>
              <p className="text-[11px] text-slate-400">
                Độ bão hòa listing ở mức an toàn
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-white dark:bg-[#0f172a] border border-slate-200 dark:border-slate-800 shadow-sm space-y-1">
              <div className="flex items-center justify-between text-slate-400 text-xs">
                <span>Điểm Cơ Hội Ngách (Opportunity)</span>
                <Sparkles size={16} className="text-indigo-500" />
              </div>
              <p className="text-2xl font-black text-cyan-600 dark:text-cyan-400 font-mono">
                {activeNiche.avgOpportunityScore.toFixed(1)} <span className="text-xs text-slate-400">/ 100</span>
              </p>
              <p className="text-[11px] text-emerald-600 dark:text-emerald-400 font-medium">
                ⭐ Ngách tiềm năng Winning cao
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-white dark:bg-[#0f172a] border border-slate-200 dark:border-slate-800 shadow-sm space-y-1">
              <div className="flex items-center justify-between text-slate-400 text-xs">
                <span>Điểm Rơi Mùa Vụ (Peak Season)</span>
                <Calendar size={16} className="text-rose-500" />
              </div>
              <p className="text-lg font-bold text-slate-900 dark:text-white truncate">
                {activeNiche.seasonalityPeak}
              </p>
              <p className="text-[11px] text-slate-400">
                Nên mở bán trước 4 - 6 tuần
              </p>
            </div>
          </div>

          {/* Time-Series Seasonality Chart */}
          <div className="p-6 rounded-2xl bg-white dark:bg-[#0f172a] border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                  Biểu Đồ Xu Hướng & Dự Báo Điểm Rơi Mùa Vụ ({activeNiche.name})
                </h3>
                <p className="text-xs text-slate-400">
                  Dự phóng lưu lượng tìm kiếm và thảo luận xã hội từ Q3 đến đỉnh điểm Q4
                </p>
              </div>
              <div className="flex items-center gap-4 text-xs">
                <div className="flex items-center gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-cyan-500" />
                  <span className="text-slate-600 dark:text-slate-300">Lượng tìm kiếm (Search Volume)</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-indigo-500" />
                  <span className="text-slate-600 dark:text-slate-300">Thảo luận Social (TikTok/Pinterest)</span>
                </div>
              </div>
            </div>

            <div className="h-72 w-full pt-4">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={trendData}>
                  <defs>
                    <linearGradient id="colorSearch" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.4}/>
                      <stop offset="95%" stopColor="#06b6d4" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="colorSocial" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.3} />
                  <XAxis dataKey="month" stroke="#94a3b8" fontSize={11} />
                  <YAxis stroke="#94a3b8" fontSize={11} />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: "#0f172a", 
                      borderColor: "#1e293b", 
                      borderRadius: "12px",
                      color: "#f8fafc",
                      fontSize: "12px"
                    }} 
                  />
                  <Area type="monotone" dataKey="searchVolume" stroke="#06b6d4" strokeWidth={2.5} fillOpacity={1} fill="url(#colorSearch)" name="Lượng Tìm Kiếm" />
                  <Area type="monotone" dataKey="socialMentions" stroke="#6366f1" strokeWidth={2} fillOpacity={1} fill="url(#colorSocial)" name="Thảo Luận Social" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Breakout Keywords & AI Angles */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Breakout Keywords */}
            <div className="p-5 rounded-2xl bg-white dark:bg-[#0f172a] border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
              <div className="flex items-center gap-2 text-xs font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider">
                <Flame size={16} className="text-rose-500" />
                <span>Từ Khóa Đang Tăng Tốc Đột Biến (Breakout Keywords)</span>
              </div>
              <p className="text-xs text-slate-400">
                Các từ khóa có tốc độ tìm kiếm tăng {">"} 30% trong 14 ngày qua trên sàn TMĐT
              </p>

              <div className="flex flex-wrap gap-2 pt-2">
                {activeNiche.breakoutKeywords.map((kw, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-2 px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/80 text-xs font-medium text-slate-800 dark:text-slate-200"
                  >
                    <span>🔍 {kw}</span>
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-mono font-bold">
                      +{Math.floor(Math.random() * 60) + 30}%
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* AI Design Angles */}
            <div className="p-5 rounded-2xl bg-gradient-to-br from-indigo-500/5 to-cyan-500/5 dark:from-indigo-500/10 dark:to-cyan-500/10 border border-indigo-500/20 dark:border-indigo-500/30 space-y-3">
              <div className="flex items-center gap-2 text-xs font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider">
                <Lightbulb size={16} />
                <span>AI Recommended Angles & Ý Tưởng Thiết Kế</span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300">
                Gợi ý góc tiếp cận sản phẩm mới lạ dựa trên phân tích các mẫu listing bán chạy nhất:
              </p>

              <div className="space-y-2.5 pt-1">
                {activeNiche.topAngles.map((angle, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-xl bg-white/70 dark:bg-slate-900/60 border border-indigo-500/20 text-xs text-slate-800 dark:text-slate-200 flex items-start gap-2.5 shadow-sm"
                  >
                    <div className="p-1 rounded-lg bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 mt-0.5">
                      <Sparkles size={13} />
                    </div>
                    <span className="leading-relaxed">{angle}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
