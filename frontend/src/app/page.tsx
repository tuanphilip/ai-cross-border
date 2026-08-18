"use client";

import React, { useState } from "react";
import { useApp } from "@/context/AppContext";
import { Sidebar } from "@/components/Sidebar";
import { TopHeader } from "@/components/TopHeader";
import { DashboardView } from "@/components/DashboardView";
import { ProjectsListView } from "@/components/ProjectsListView";
import { ProjectDetailView } from "@/components/ProjectDetailView";
import { BaseCatalogView } from "@/components/BaseCatalogView";
import { DataIngestionView } from "@/components/DataIngestionView";
import { AnalyzerView } from "@/components/AnalyzerView";
import { ConfigView } from "@/components/ConfigView";
import { NewProjectModal } from "@/components/modals/NewProjectModal";
import { ProductDetailModal } from "@/components/modals/ProductDetailModal";

export default function Home() {
  const { activeMenu } = useApp();
  const [isNewProjectModalOpen, setIsNewProjectModalOpen] = useState(false);

  return (
    <div className="min-h-screen flex bg-[#f8fafc] dark:bg-[#090d16] text-slate-900 dark:text-slate-100 transition-colors duration-200">
      {/* Left Sidebar Navigation */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 min-h-screen overflow-x-hidden">
        {/* Top Header */}
        <TopHeader onOpenNewProjectModal={() => setIsNewProjectModalOpen(true)} />

        {/* Dynamic Page Views */}
        <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {activeMenu === "dashboard" && (
            <DashboardView onOpenNewProjectModal={() => setIsNewProjectModalOpen(true)} />
          )}

          {activeMenu === "projects" && (
            <ProjectsListView onOpenNewProjectModal={() => setIsNewProjectModalOpen(true)} />
          )}

          {activeMenu === "project_detail" && (
            <ProjectDetailView />
          )}

          {activeMenu === "base_catalog" && (
            <BaseCatalogView />
          )}

          {activeMenu === "data_ingestion" && (
            <DataIngestionView />
          )}

          {activeMenu === "quick_analyzer" && (
            <AnalyzerView />
          )}

          {activeMenu === "scoring_config" && (
            <ConfigView />
          )}
        </main>

        {/* Global Modals */}
        <NewProjectModal
          isOpen={isNewProjectModalOpen}
          onClose={() => setIsNewProjectModalOpen(false)}
        />

        <ProductDetailModal />

        {/* Footer */}
        <footer className="border-t border-slate-200 dark:border-slate-800/80 bg-white/50 dark:bg-slate-950/40 py-6 text-center text-xs text-slate-500">
          <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
            <span>Printway Product Opportunity Hub • R&D AI Intelligence Solution</span>
            <span>Thiết kế tối ưu cho Cross-Border E-Commerce & Print-On-Demand</span>
          </div>
        </footer>
      </div>
    </div>
  );
}
