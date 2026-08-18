"use client";

import React, { useState } from "react";
import { useApp } from "@/context/AppContext";
import { 
  ProjectProductsTab 
} from "@/components/project-tabs/ProjectProductsTab";
import { 
  ProjectTrendingTab 
} from "@/components/project-tabs/ProjectTrendingTab";
import { 
  ProjectMappingTab 
} from "@/components/project-tabs/ProjectMappingTab";
import { 
  ProjectRoadmapTab 
} from "@/components/project-tabs/ProjectRoadmapTab";
import { AddProductModal } from "@/components/modals/AddProductModal";
import { 
  FolderKanban, 
  Layers, 
  TrendingUp, 
  ArrowRightLeft, 
  Compass, 
  ChevronLeft,
  Plus,
  Target,
  Sparkles
} from "lucide-react";

export function ProjectDetailView() {
  const { 
    currentProject, 
    setActiveMenu, 
    projectSubTab, 
    setProjectSubTab 
  } = useApp();

  const [isAddProductModalOpen, setIsAddProductModalOpen] = useState(false);

  if (!currentProject) {
    return (
      <div className="p-12 text-center">
        <p className="text-slate-400">Không tìm thấy dự án đã chọn.</p>
        <button 
          onClick={() => setActiveMenu("projects")}
          className="mt-4 px-4 py-2 bg-cyan-500 text-white rounded-xl text-xs font-semibold"
        >
          Quay lại danh sách dự án
        </button>
      </div>
    );
  }

  interface SubTabItem {
    id: "products_niches" | "trending" | "mapping_profit" | "decision_roadmap";
    label: string;
    icon: any;
    count?: number;
  }

  const subTabs: SubTabItem[] = [
    {
      id: "products_niches",
      label: "Quản Lý Sản Phẩm & Ngách",
      icon: Layers,
      count: currentProject.products.length
    },
    {
      id: "trending",
      label: "Phân Tích Trending & Tín Hiệu Ngách",
      icon: TrendingUp
    },
    {
      id: "mapping_profit",
      label: "Ghép Nối Base SKU & Tính Lợi Nhuận",
      icon: ArrowRightLeft
    },
    {
      id: "decision_roadmap",
      label: "Ma Trận Quyết Định & Lộ Trình Ra Mắt",
      icon: Compass
    }
  ];

  return (
    <div className="space-y-6">
      {/* Project Banner & Header */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-slate-900 via-[#0c1626] to-[#0f2438] border border-slate-800 text-white shadow-xl relative overflow-hidden">
        {/* Background glow */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setActiveMenu("projects")}
                className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-slate-200 transition-colors flex items-center gap-1 text-xs"
              >
                <ChevronLeft size={16} />
                <span>Tất cả Dự án</span>
              </button>

              <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                {currentProject.season}
              </span>

              <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-slate-800 text-slate-300">
                Thị trường: {currentProject.targetMarket}
              </span>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => setIsAddProductModalOpen(true)}
                className="flex items-center gap-1.5 px-3.5 py-1.5 bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-white text-xs font-semibold rounded-xl shadow-lg shadow-cyan-500/20 transition-all hover:scale-[1.02] active:scale-[0.98]"
              >
                <Plus size={15} />
                <span>Thêm Sản Phẩm Nghiên Cứu</span>
              </button>
            </div>
          </div>

          <div>
            <h1 className="text-xl sm:text-2xl font-black tracking-tight text-white">
              {currentProject.name}
            </h1>
            <p className="text-xs text-slate-300 max-w-3xl mt-1 leading-relaxed">
              {currentProject.description}
            </p>
          </div>

          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
            <div className="p-3 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm">
              <span className="text-[10px] uppercase font-semibold text-slate-400 block">Tổng Số Ngách</span>
              <span className="text-lg font-black text-white font-mono">{currentProject.niches.length} Ngách</span>
            </div>

            <div className="p-3 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm">
              <span className="text-[10px] uppercase font-semibold text-slate-400 block">Sản Phẩm Đang Nghiên Cứu</span>
              <span className="text-lg font-black text-cyan-400 font-mono">{currentProject.products.length} SP</span>
            </div>

            <div className="p-3 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm">
              <span className="text-[10px] uppercase font-semibold text-slate-400 block">Sản Phẩm Khuyên Bán</span>
              <span className="text-lg font-black text-emerald-400 font-mono">
                {currentProject.products.filter(p => p.decision === "RECOMMENDED").length} SP
              </span>
            </div>

            <div className="p-3 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm">
              <span className="text-[10px] uppercase font-semibold text-slate-400 block">Target Doanh Thu</span>
              <span className="text-lg font-black text-amber-400 font-mono">
                ${currentProject.targetRevenueGoal.toLocaleString()}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* HORIZONTAL SUB-TABS (Nằm ngang trong view chính theo yêu cầu người dùng) */}
      <div className="border-b border-slate-200 dark:border-slate-800/80 bg-white dark:bg-[#0c121e] rounded-2xl p-1.5 shadow-sm">
        <nav className="flex space-x-2 overflow-x-auto" aria-label="Tabs">
          {subTabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = projectSubTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setProjectSubTab(tab.id as any)}
                className={`flex items-center gap-2.5 px-4 py-2.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all
                  ${isActive
                    ? "bg-cyan-500 text-white shadow-md shadow-cyan-500/20"
                    : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800/60"
                  }`}
              >
                <Icon size={16} />
                <span>{tab.label}</span>
                {tab.count !== undefined && (
                  <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${isActive ? "bg-white/20 text-white" : "bg-slate-200 dark:bg-slate-800 text-slate-500"}`}>
                    {tab.count}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Sub-Tab Contents */}
      <div>
        {projectSubTab === "products_niches" && (
          <ProjectProductsTab onOpenAddProductModal={() => setIsAddProductModalOpen(true)} />
        )}

        {projectSubTab === "trending" && (
          <ProjectTrendingTab />
        )}

        {projectSubTab === "mapping_profit" && (
          <ProjectMappingTab />
        )}

        {projectSubTab === "decision_roadmap" && (
          <ProjectRoadmapTab />
        )}
      </div>

      {/* Add Product Modal */}
      <AddProductModal
        isOpen={isAddProductModalOpen}
        onClose={() => setIsAddProductModalOpen(false)}
      />
    </div>
  );
}
