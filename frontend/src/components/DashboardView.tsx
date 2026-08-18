"use client";

import React from "react";
import { useApp } from "@/context/AppContext";
import { 
  TrendingUp, 
  Sparkles, 
  Layers, 
  FolderKanban, 
  DollarSign, 
  Factory, 
  CheckCircle2, 
  ArrowUpRight, 
  ArrowRight,
  ShieldCheck,
  Flame,
  Plus
} from "lucide-react";

interface DashboardViewProps {
  onOpenNewProjectModal: () => void;
}

export function DashboardView({ onOpenNewProjectModal }: DashboardViewProps) {
  const { 
    projects, 
    baseProducts, 
    openProjectDetail, 
    setActiveMenu, 
    setSelectedProductForModal 
  } = useApp();

  // Compute aggregate stats
  const totalProducts = projects.reduce((acc, p) => acc + p.products.length, 0);
  const totalWinning = projects.reduce(
    (acc, p) => acc + p.products.filter((prod) => prod.decision === "RECOMMENDED").length, 
    0
  );
  const totalTargetRevenue = projects.reduce((acc, p) => acc + p.targetRevenueGoal, 0);

  // Collect all winning products across all projects
  const allWinningProducts = projects.flatMap((p) => p.products.filter((prod) => prod.decision === "RECOMMENDED"));

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Hero Welcome Banner */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-slate-900 via-[#0c1626] to-[#0f2438] border border-slate-800 text-white shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
              Printway Executive Intelligence
            </span>
            <span className="text-xs text-slate-300">Hệ Thống R&D Cross-Border POD</span>
          </div>
          <h1 className="text-xl font-black text-white">Tổng Quan Cơ Hội Sản Phẩm & Tiến Độ R&D</h1>
          <p className="text-xs text-slate-300 max-w-2xl leading-relaxed">
            Nền tảng tự động hóa phát hiện xu hướng, chuẩn hóa listing sàn về <strong>Sản phẩm Base Printway</strong> và ra quyết định sản xuất dựa trên bộ 9 chỉ số thông minh.
          </p>
        </div>

        <div className="flex items-center gap-2.5 shrink-0">
          <button
            onClick={onOpenNewProjectModal}
            className="flex items-center gap-1.5 px-4 py-2 bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-white text-xs font-semibold rounded-xl shadow-lg shadow-cyan-500/20 transition-all hover:scale-[1.02] active:scale-[0.98]"
          >
            <Plus size={15} />
            <span>Tạo Dự Án Mới</span>
          </button>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-white dark:bg-[#0f172a] border border-slate-200 dark:border-slate-800 shadow-sm space-y-2">
          <div className="flex items-center justify-between text-slate-400 text-xs">
            <span>Dự Án R&D Đang Chạy</span>
            <FolderKanban size={18} className="text-cyan-500" />
          </div>
          <p className="text-3xl font-black text-slate-900 dark:text-white font-mono">
            {projects.length} <span className="text-xs text-slate-400 font-normal">Dự án</span>
          </p>
          <p className="text-[11px] text-cyan-600 dark:text-cyan-400 font-medium">
            Bao gồm {projects.reduce((acc, p) => acc + p.niches.length, 0)} ngách thị trường
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-[#0f172a] border border-slate-200 dark:border-slate-800 shadow-sm space-y-2">
          <div className="flex items-center justify-between text-slate-400 text-xs">
            <span>Sản Phẩm Nghiên Cứu Đã Quét</span>
            <Layers size={18} className="text-indigo-500" />
          </div>
          <p className="text-3xl font-black text-slate-900 dark:text-white font-mono">
            {totalProducts} <span className="text-xs text-slate-400 font-normal">Listings</span>
          </p>
          <p className="text-[11px] text-indigo-600 dark:text-indigo-400 font-medium">
            Từ Etsy, Amazon & TikTok Shop
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-[#0f172a] border border-slate-200 dark:border-slate-800 shadow-sm space-y-2">
          <div className="flex items-center justify-between text-slate-400 text-xs">
            <span>Sản Phẩm Đạt Chuẩn (Winning)</span>
            <CheckCircle2 size={18} className="text-emerald-500" />
          </div>
          <p className="text-3xl font-black text-emerald-600 dark:text-emerald-400 font-mono">
            {totalWinning} <span className="text-xs text-slate-400 font-normal">🟢 Khuyên bán</span>
          </p>
          <p className="text-[11px] text-emerald-600 dark:text-emerald-400 font-medium">
            Tỷ lệ duyệt đạt {totalProducts > 0 ? ((totalWinning / totalProducts) * 100).toFixed(0) : 0}%
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-[#0f172a] border border-slate-200 dark:border-slate-800 shadow-sm space-y-2">
          <div className="flex items-center justify-between text-slate-400 text-xs">
            <span>Target Doanh Thu Dự Phóng</span>
            <DollarSign size={18} className="text-amber-500" />
          </div>
          <p className="text-3xl font-black text-slate-900 dark:text-white font-mono">
            ${(totalTargetRevenue / 1000).toFixed(0)}k
          </p>
          <p className="text-[11px] text-amber-600 dark:text-amber-400 font-medium">
            Kỳ vọng mùa vụ Q4 & Spring
          </p>
        </div>
      </div>

      {/* Active Projects Cards & Niches Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Active Projects Overview */}
        <div className="lg:col-span-7 p-6 rounded-2xl bg-white dark:bg-[#0f172a] border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider">
              Chiến Dịch R&D Đang Tiến Hành
            </h3>
            <button
              onClick={() => setActiveMenu("projects")}
              className="text-xs text-cyan-600 dark:text-cyan-400 font-semibold hover:underline flex items-center gap-1"
            >
              <span>Xem tất cả</span>
              <ArrowRight size={13} />
            </button>
          </div>

          <div className="space-y-3">
            {projects.map((proj) => (
              <div
                key={proj.id}
                onClick={() => openProjectDetail(proj.id)}
                className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 hover:border-cyan-500/40 transition-all cursor-pointer space-y-2.5 group"
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-sm text-slate-900 dark:text-white group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors">
                    {proj.name}
                  </span>
                  <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-cyan-500/10 text-cyan-600 dark:text-cyan-400">
                    {proj.season}
                  </span>
                </div>

                <div className="flex flex-wrap gap-1.5">
                  {proj.niches.map((niche) => (
                    <span key={niche.id} className="text-[11px] px-2 py-0.5 rounded bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-medium">
                      🏷️ {niche.name} ({niche.growthRate})
                    </span>
                  ))}
                </div>

                <div className="flex items-center justify-between text-xs text-slate-400 pt-1">
                  <span>{proj.products.length} Sản phẩm R&D ({proj.products.filter(p => p.decision === "RECOMMENDED").length} Khuyên bán)</span>
                  <span className="text-cyan-600 dark:text-cyan-400 font-semibold group-hover:translate-x-0.5 transition-transform flex items-center gap-1">
                    Vào dự án <ArrowUpRight size={13} />
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Base Catalog Printway Quick Access */}
        <div className="lg:col-span-5 p-6 rounded-2xl bg-white dark:bg-[#0f172a] border border-slate-200 dark:border-slate-800 shadow-sm space-y-4 flex flex-col justify-between">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider">
                Top Phôi Base Printway Được Ghép Nối
              </h3>
              <button
                onClick={() => setActiveMenu("base_catalog")}
                className="text-xs text-cyan-600 dark:text-cyan-400 font-semibold hover:underline"
              >
                Xem Catalog
              </button>
            </div>

            <div className="space-y-2.5">
              {baseProducts.slice(0, 4).map((base) => (
                <div
                  key={base.sku}
                  className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs"
                >
                  <div className="flex items-center gap-2.5">
                    <img src={base.image} alt="" className="w-10 h-10 rounded-lg object-cover" />
                    <div>
                      <p className="font-bold text-slate-900 dark:text-white font-mono text-[11px]">{base.sku}</p>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate max-w-[160px]">{base.name}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="font-bold text-slate-900 dark:text-white">${base.baseCost}</span>
                    <p className="text-[10px] text-slate-400">{base.leadTimeDays} ngày (Xưởng {base.factoryLocation})</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-xs text-cyan-700 dark:text-cyan-300">
            💡 Printway xưởng US hiện đang có sẵn phôi Acrylic 2D và áo nỉ G185 với lead time chỉ 2 ngày đón vụ Q4.
          </div>
        </div>
      </div>

      {/* Top Winning Opportunities Table */}
      <div className="p-6 rounded-2xl bg-white dark:bg-[#0f172a] border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles size={16} className="text-amber-500" />
            <h3 className="text-xs font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider">
              Top Cơ Hội Sản Phẩm Điểm Cao Nhất Hệ Thống (🟢 Winning Opportunities)
            </h3>
          </div>
          <span className="text-xs text-slate-400">{allWinningProducts.length} Sản phẩm</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 text-slate-400 font-semibold uppercase text-[10px]">
                <th className="py-2.5 px-3">Sản phẩm</th>
                <th className="py-2.5 px-3">Sàn & Ngách</th>
                <th className="py-2.5 px-3">Giá Bán</th>
                <th className="py-2.5 px-3">Lãi Ròng Ước Tính</th>
                <th className="py-2.5 px-3">Base SKU Printway</th>
                <th className="py-2.5 px-3 text-center">Tổng Điểm</th>
                <th className="py-2.5 px-3 text-right">Chi Tiết</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60">
              {allWinningProducts.map((prod) => (
                <tr
                  key={prod.id}
                  onClick={() => setSelectedProductForModal(prod)}
                  className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors cursor-pointer"
                >
                  <td className="py-3 px-3 max-w-xs">
                    <div className="flex items-center gap-2.5">
                      <img src={prod.imageUrl} alt="" className="w-10 h-10 rounded-lg object-cover shrink-0" />
                      <span className="font-semibold text-slate-900 dark:text-white line-clamp-2 leading-snug">
                        {prod.title}
                      </span>
                    </div>
                  </td>
                  <td className="py-3 px-3">
                    <span className="px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-[10px] font-semibold">
                      {prod.platform} • #{prod.nicheTag}
                    </span>
                  </td>
                  <td className="py-3 px-3 font-bold">${prod.retailPrice.toFixed(2)}</td>
                  <td className="py-3 px-3 font-bold text-emerald-600 dark:text-emerald-400">
                    +${prod.estNetProfit.toFixed(2)} ({prod.estProfitMargin}%)
                  </td>
                  <td className="py-3 px-3 font-mono text-cyan-600 dark:text-cyan-400 font-medium">
                    {prod.mappedBaseSku || "Chưa map"}
                  </td>
                  <td className="py-3 px-3 text-center font-black font-mono text-slate-900 dark:text-white">
                    {prod.overallScore.toFixed(1)}
                  </td>
                  <td className="py-3 px-3 text-right">
                    <button className="p-1.5 rounded-lg text-slate-400 hover:text-cyan-500 transition-colors">
                      <ArrowUpRight size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
