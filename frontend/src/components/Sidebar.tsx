"use client";

import React, { useState } from "react";
import { useApp, NavigationMenu } from "@/context/AppContext";
import { 
  LayoutDashboard, 
  FolderKanban, 
  Layers, 
  DownloadCloud, 
  Sliders, 
  Sparkles,
  Sun, 
  Moon, 
  ChevronRight, 
  PlusCircle, 
  Sparkle,
  Compass,
  CheckCircle2,
  Box,
  PanelLeftClose,
  PanelLeft
} from "lucide-react";

export function Sidebar() {
  const { 
    activeMenu, 
    setActiveMenu, 
    theme, 
    toggleTheme, 
    projects, 
    selectedProjectId, 
    openProjectDetail 
  } = useApp();

  const [collapsed, setCollapsed] = useState(false);
  const [showProjectsDropdown, setShowProjectsDropdown] = useState(true);

  const menuItems: { id: NavigationMenu; label: string; icon: any; badge?: string }[] = [
    { id: "dashboard", label: "Dashboard Tổng quan", icon: LayoutDashboard },
    { id: "projects", label: "Quản lý Dự án R&D", icon: FolderKanban, badge: `${projects.length}` },
    { id: "base_catalog", label: "Sản phẩm Base Printway", icon: Layers },
    { id: "data_ingestion", label: "Thu thập & Import", icon: DownloadCloud },
    { id: "quick_analyzer", label: "Phân tích Nhanh (AI)", icon: Sparkles },
    { id: "scoring_config", label: "Cấu hình Chấm điểm", icon: Sliders },
  ];

  return (
    <aside 
      className={`relative flex flex-col border-r transition-all duration-300 select-none z-30
        ${collapsed ? "w-20" : "w-68"}
        bg-white dark:bg-[#0c121e] border-slate-200 dark:border-slate-800/80 text-slate-700 dark:text-slate-200`}
    >
      {/* Brand Header */}
      <div className="h-16 flex items-center justify-between px-4 border-b border-slate-200 dark:border-slate-800/80">
        {!collapsed && (
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-xl bg-gradient-to-tr from-cyan-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-cyan-500/20 text-white font-black text-lg">
              P
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-bold text-sm tracking-tight text-slate-900 dark:text-white">Printway R&D</span>
                <span className="text-[10px] font-semibold uppercase px-1.5 py-0.5 rounded bg-cyan-500/10 dark:bg-cyan-500/20 text-cyan-600 dark:text-cyan-400 border border-cyan-500/30">Hub</span>
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">Opportunity Intelligence</p>
            </div>
          </div>
        )}

        {collapsed && (
          <div className="mx-auto h-9 w-9 rounded-xl bg-gradient-to-tr from-cyan-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-cyan-500/20 text-white font-black text-lg">
            P
          </div>
        )}

        <button 
          onClick={() => setCollapsed(!collapsed)}
          className={`p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors ${collapsed ? "hidden" : "block"}`}
          title={collapsed ? "Mở rộng sidebar" : "Thu gọn sidebar"}
        >
          <PanelLeftClose size={18} />
        </button>
      </div>

      {/* Main Navigation Menu */}
      <div className="flex-1 overflow-y-auto py-4 px-3 space-y-1.5">
        <div className="px-2 mb-2">
          {!collapsed && (
            <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-400">
              Menu Chính
            </span>
          )}
        </div>

        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeMenu === item.id || (item.id === "projects" && activeMenu === "project_detail");
          return (
            <button
              key={item.id}
              onClick={() => setActiveMenu(item.id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all group relative
                ${isActive 
                  ? "bg-gradient-to-r from-cyan-500/10 to-indigo-500/10 dark:from-cyan-500/20 dark:to-indigo-500/20 text-cyan-600 dark:text-cyan-400 font-semibold border border-cyan-500/30 dark:border-cyan-500/40 shadow-sm" 
                  : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/60 hover:text-slate-900 dark:hover:text-slate-200"
                } ${collapsed ? "justify-center px-0" : ""}`}
              title={collapsed ? item.label : undefined}
            >
              <Icon size={19} className={`shrink-0 ${isActive ? "text-cyan-600 dark:text-cyan-400" : "text-slate-400 group-hover:text-slate-600 dark:group-hover:text-slate-300"}`} />
              
              {!collapsed && (
                <span className="flex-1 text-left truncate">{item.label}</span>
              )}

              {!collapsed && item.badge && (
                <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${isActive ? "bg-cyan-500/20 text-cyan-600 dark:text-cyan-400" : "bg-slate-100 dark:bg-slate-800 text-slate-500"}`}>
                  {item.badge}
                </span>
              )}

              {isActive && (
                <div className="absolute -left-3 top-1/2 -translate-y-1/2 w-1.5 h-6 bg-cyan-500 rounded-r-full" />
              )}
            </button>
          );
        })}

        {/* Active Projects Quick Access */}
        {!collapsed && (
          <div className="pt-6">
            <div className="flex items-center justify-between px-2 mb-2">
              <button 
                onClick={() => setShowProjectsDropdown(!showProjectsDropdown)}
                className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
              >
                <span>Dự Án Đang R&D</span>
                <ChevronRight size={13} className={`transition-transform duration-200 ${showProjectsDropdown ? "rotate-90" : ""}`} />
              </button>
              
              <button 
                onClick={() => setActiveMenu("projects")}
                className="text-[11px] text-cyan-600 dark:text-cyan-400 hover:underline flex items-center gap-1"
              >
                <PlusCircle size={12} />
                <span>Mới</span>
              </button>
            </div>

            {showProjectsDropdown && (
              <div className="space-y-1">
                {projects.map((proj) => {
                  const isSelected = activeMenu === "project_detail" && selectedProjectId === proj.id;
                  return (
                    <button
                      key={proj.id}
                      onClick={() => openProjectDetail(proj.id)}
                      className={`w-full text-left px-2.5 py-2 rounded-lg text-xs transition-all flex items-center gap-2 group
                        ${isSelected 
                          ? "bg-slate-100 dark:bg-slate-800/90 text-cyan-600 dark:text-cyan-300 font-medium border-l-2 border-cyan-500" 
                          : "text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/40 hover:text-slate-800 dark:hover:text-slate-200"
                        }`}
                    >
                      <div className={`w-2 h-2 rounded-full shrink-0 ${proj.status === "APPROVED" ? "bg-emerald-500" : proj.status === "SCORING" ? "bg-amber-500" : "bg-cyan-500"}`} />
                      <span className="truncate flex-1">{proj.name}</span>
                      <span className="text-[10px] text-slate-400 shrink-0 font-mono">({proj.products.length} SP)</span>
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Footer Area: Light/Dark Mode Switcher & User */}
      <div className="p-3 border-t border-slate-200 dark:border-slate-800/80 space-y-2">
        {/* Toggle Dark/Light Mode */}
        <button
          onClick={toggleTheme}
          className="w-full flex items-center justify-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium bg-slate-100 dark:bg-slate-800/70 hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 transition-colors"
          title={`Chuyển sang chế độ ${theme === "dark" ? "Sáng" : "Tối"}`}
        >
          {theme === "dark" ? (
            <>
              <Sun size={16} className="text-amber-400 shrink-0" />
              {!collapsed && <span>Chế độ Sáng (Light)</span>}
            </>
          ) : (
            <>
              <Moon size={16} className="text-indigo-600 shrink-0" />
              {!collapsed && <span>Chế độ Tối (Dark)</span>}
            </>
          )}
        </button>

        {/* User Card */}
        {!collapsed && (
          <div className="flex items-center gap-2.5 px-2 py-1.5">
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-cyan-500 to-indigo-600 text-white font-bold text-xs flex items-center justify-center shadow">
              RD
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-semibold text-slate-800 dark:text-slate-200 truncate">Printway R&D Team</p>
              <p className="text-[10px] text-slate-400 dark:text-slate-400 truncate">Senior POD Specialist</p>
            </div>
          </div>
        )}
      </div>
    </aside>
  );
}
