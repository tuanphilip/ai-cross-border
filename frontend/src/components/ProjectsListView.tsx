"use client";

import React, { useState } from "react";
import { useApp } from "@/context/AppContext";
import { 
  FolderKanban, 
  Plus, 
  Search, 
  Calendar, 
  Tag, 
  Layers, 
  Sparkles, 
  ArrowRight, 
  CheckCircle2, 
  Clock, 
  Target,
  ChevronRight
} from "lucide-react";

interface ProjectsListViewProps {
  onOpenNewProjectModal: () => void;
}

export function ProjectsListView({ onOpenNewProjectModal }: ProjectsListViewProps) {
  const { projects, openProjectDetail } = useApp();
  const [filterSeason, setFilterSeason] = useState<string>("ALL");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const filteredProjects = projects.filter((p) => {
    if (filterSeason !== "ALL" && !p.season.includes(filterSeason)) return false;
    if (searchQuery && !p.name.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    return true;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "APPROVED":
        return { text: "Đã Duyệt Ra Mắt", bg: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30" };
      case "SCORING":
        return { text: "Đang Chấm Điểm", bg: "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/30" };
      case "RESEARCHING":
        return { text: "Đang R&D & Thu Thập", bg: "bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border-cyan-500/30" };
      default:
        return { text: "Bản Nháp (Draft)", bg: "bg-slate-500/10 text-slate-600 dark:text-slate-400 border-slate-500/30" };
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Header Controls */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <div className="relative flex-1 sm:w-72">
            <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Tìm kiếm dự án R&D..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white dark:bg-[#0f172a] border border-slate-200 dark:border-slate-800 rounded-xl pl-9 pr-3 py-2 text-xs text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500/40"
            />
          </div>

          <select
            value={filterSeason}
            onChange={(e) => setFilterSeason(e.target.value)}
            className="bg-white dark:bg-[#0f172a] border border-slate-200 dark:border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-700 dark:text-slate-300 focus:outline-none focus:ring-2 focus:ring-cyan-500/40 font-medium"
          >
            <option value="ALL">Tất cả Mùa Vụ</option>
            <option value="Q4">Q4 Holiday 2026</option>
            <option value="Spring">Spring & Mother's Day 2027</option>
          </select>
        </div>

        <button
          onClick={onOpenNewProjectModal}
          className="w-full sm:w-auto flex items-center justify-center gap-2 px-4 py-2 bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-white text-xs font-semibold rounded-xl shadow-md shadow-cyan-500/20 transition-all hover:scale-[1.02] active:scale-[0.98]"
        >
          <Plus size={15} />
          <span>Tạo Dự Án R&D Mới</span>
        </button>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredProjects.map((project) => {
          const statusBadge = getStatusBadge(project.status);
          const winningCount = project.products.filter(p => p.decision === "RECOMMENDED").length;

          return (
            <div
              key={project.id}
              onClick={() => openProjectDetail(project.id)}
              className="p-6 rounded-2xl bg-white dark:bg-[#0f172a] border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md hover:border-cyan-500/50 transition-all duration-200 cursor-pointer space-y-4 group flex flex-col justify-between"
            >
              <div className="space-y-3">
                {/* Status & Season */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border border-cyan-500/30">
                      {project.season}
                    </span>
                    <span className="text-[11px] font-medium text-slate-400">
                      Thị trường: {project.targetMarket}
                    </span>
                  </div>

                  <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full border ${statusBadge.bg}`}>
                    {statusBadge.text}
                  </span>
                </div>

                {/* Title & Desc */}
                <div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors">
                    {project.name}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 mt-1 leading-relaxed">
                    {project.description}
                  </p>
                </div>

                {/* Niches Tag Cloud */}
                <div className="space-y-1.5 pt-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    Ngách Trực Thuộc ({project.niches.length}):
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {project.niches.map((niche) => (
                      <span
                        key={niche.id}
                        className="px-2 py-0.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-[11px] font-medium"
                      >
                        🏷️ {niche.name}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Bottom Metrics Bar */}
              <div className="pt-4 border-t border-slate-100 dark:border-slate-800/80 grid grid-cols-3 gap-2 text-center text-xs">
                <div className="p-2 rounded-xl bg-slate-50 dark:bg-slate-900/60">
                  <span className="text-[10px] text-slate-400 block">Sản Phẩm R&D</span>
                  <strong className="text-slate-900 dark:text-white font-mono">{project.products.length}</strong>
                </div>

                <div className="p-2 rounded-xl bg-slate-50 dark:bg-slate-900/60">
                  <span className="text-[10px] text-slate-400 block">🟢 Khuyên Bán</span>
                  <strong className="text-emerald-600 dark:text-emerald-400 font-mono">{winningCount}</strong>
                </div>

                <div className="p-2 rounded-xl bg-slate-50 dark:bg-slate-900/60">
                  <span className="text-[10px] text-slate-400 block">Target Doanh Thu</span>
                  <strong className="text-amber-500 font-mono">${(project.targetRevenueGoal / 1000).toFixed(0)}k</strong>
                </div>
              </div>

              {/* Action Link */}
              <div className="flex items-center justify-between text-xs font-semibold text-cyan-600 dark:text-cyan-400 pt-1">
                <span>Vào không gian làm việc dự án</span>
                <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
