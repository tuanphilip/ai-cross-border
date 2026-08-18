"use client";

import React, { useState } from "react";
import { useApp } from "@/context/AppContext";
import { 
  Search, 
  Plus, 
  FolderPlus, 
  Bell, 
  Sparkles, 
  Sun, 
  Moon,
  ChevronRight,
  ExternalLink
} from "lucide-react";

interface TopHeaderProps {
  onOpenNewProjectModal: () => void;
}

export function TopHeader({ onOpenNewProjectModal }: TopHeaderProps) {
  const { 
    activeMenu, 
    currentProject, 
    theme, 
    toggleTheme, 
    setActiveMenu 
  } = useApp();

  const [searchQuery, setSearchQuery] = useState("");

  const getMenuTitle = () => {
    switch (activeMenu) {
      case "dashboard":
        return "Dashboard Tổng Quan & Báo Cáo R&D";
      case "projects":
        return "Danh Sách Dự Án R&D";
      case "project_detail":
        return currentProject ? currentProject.name : "Chi Tiết Dự Án R&D";
      case "base_catalog":
        return "Danh Mục Sản Phẩm Base Printway";
      case "data_ingestion":
        return "Trung Tâm Thu Thập & Import Dữ Liệu";
      case "quick_analyzer":
        return "Phân Tích Nhanh Cơ Hội Sản Phẩm (AI)";
      case "scoring_config":
        return "Cấu Hình Bộ 9 Chỉ Số & Trọng Số Chấm Điểm";
      default:
        return "Product Opportunity Hub";
    }
  };

  return (
    <header className="h-16 border-b border-slate-200 dark:border-slate-800/80 bg-white/80 dark:bg-[#0c121e]/80 backdrop-blur-md px-6 flex items-center justify-between sticky top-0 z-20 transition-colors">
      {/* Left: Breadcrumb & Title */}
      <div className="flex items-center gap-2">
        <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400">
          <span>POH Hub</span>
          <ChevronRight size={14} />
          {activeMenu === "project_detail" && (
            <>
              <button 
                onClick={() => setActiveMenu("projects")}
                className="hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors"
              >
                Dự án
              </button>
              <ChevronRight size={14} />
            </>
          )}
        </div>
        <h1 className="text-base font-bold text-slate-900 dark:text-white tracking-tight ml-1">
          {getMenuTitle()}
        </h1>

        {activeMenu === "project_detail" && currentProject && (
          <span className="ml-2 text-xs font-semibold px-2 py-0.5 rounded-full bg-cyan-500/10 dark:bg-cyan-500/20 text-cyan-600 dark:text-cyan-400 border border-cyan-500/30">
            {currentProject.season}
          </span>
        )}
      </div>

      {/* Right Actions */}
      <div className="flex items-center gap-3">
        {/* Search Bar */}
        <div className="relative hidden md:block w-64">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Tìm kiếm ngách, SKU, listing..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-100 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 rounded-xl pl-9 pr-4 py-1.5 text-xs text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500/40"
          />
        </div>

        {/* Quick New Project Button */}
        <button
          onClick={onOpenNewProjectModal}
          className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-semibold bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-white shadow-md shadow-cyan-500/20 transition-all hover:scale-[1.02] active:scale-[0.98]"
        >
          <Plus size={15} />
          <span>Tạo Dự Án Mới</span>
        </button>

        {/* Theme Toggle Button in Header */}
        <button
          onClick={toggleTheme}
          className="p-2 rounded-xl text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800/80 transition-colors"
          title={`Chuyển sang chế độ ${theme === "dark" ? "Sáng" : "Tối"}`}
        >
          {theme === "dark" ? <Sun size={17} className="text-amber-400" /> : <Moon size={17} className="text-indigo-600" />}
        </button>
      </div>
    </header>
  );
}
