"use client";

import React, { useState } from "react";
import { useApp } from "@/context/AppContext";
import { 
  Plus, 
  Search, 
  Filter, 
  Tag, 
  ExternalLink, 
  Layers, 
  CheckCircle2, 
  AlertCircle, 
  XCircle, 
  Trash2, 
  Sparkles, 
  ArrowUpRight,
  TrendingUp,
  DollarSign
} from "lucide-react";
import { DecisionStatus } from "@/lib/types";

interface ProjectProductsTabProps {
  onOpenAddProductModal: () => void;
}

export function ProjectProductsTab({ onOpenAddProductModal }: ProjectProductsTabProps) {
  const { 
    currentProject, 
    baseProducts, 
    deleteResearchProduct, 
    setSelectedProductForModal, 
    mapProductWithBaseSku 
  } = useApp();

  const [selectedNicheFilter, setSelectedNicheFilter] = useState<string>("ALL");
  const [selectedDecisionFilter, setSelectedDecisionFilter] = useState<string>("ALL");
  const [searchQuery, setSearchQuery] = useState<string>("");

  if (!currentProject) return null;

  const filteredProducts = currentProject.products.filter((prod) => {
    if (selectedNicheFilter !== "ALL" && prod.nicheTag !== selectedNicheFilter) return false;
    if (selectedDecisionFilter !== "ALL" && prod.decision !== selectedDecisionFilter) return false;
    if (searchQuery && !prod.title.toLowerCase().includes(searchQuery.toLowerCase()) && !prod.sellerName.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    return true;
  });

  const getDecisionBadge = (decision: DecisionStatus) => {
    switch (decision) {
      case "RECOMMENDED":
        return {
          icon: CheckCircle2,
          text: "Nên Bán",
          bg: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30",
        };
      case "REVIEW_REQUIRED":
        return {
          icon: AlertCircle,
          text: "Cần Xem Xét",
          bg: "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/30",
        };
      default:
        return {
          icon: XCircle,
          text: "Không Nên",
          bg: "bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/30",
        };
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Dynamic Niche Tags Filter Bar */}
      <div className="p-4 rounded-2xl bg-white dark:bg-[#0f172a] border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Tag size={16} className="text-cyan-500" />
            <span className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
              Phân Nhóm Theo Ngách (Niche Clusters)
            </span>
          </div>
          <span className="text-xs text-slate-400">
            Tổng cộng: <strong className="text-slate-700 dark:text-slate-200">{currentProject.niches.length} Ngách</strong> trong dự án
          </span>
        </div>

        {/* Niche Pills */}
        <div className="flex flex-wrap items-center gap-2 pt-1">
          <button
            onClick={() => setSelectedNicheFilter("ALL")}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all
              ${selectedNicheFilter === "ALL"
                ? "bg-cyan-500 text-white shadow-md shadow-cyan-500/20"
                : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700"
              }`}
          >
            Tất Cả ({currentProject.products.length})
          </button>

          {currentProject.niches.map((niche) => {
            const count = currentProject.products.filter((p) => p.nicheTag === niche.tag).length;
            const isSelected = selectedNicheFilter === niche.tag;
            return (
              <button
                key={niche.id}
                onClick={() => setSelectedNicheFilter(niche.tag)}
                className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all flex items-center gap-1.5
                  ${isSelected
                    ? "bg-cyan-500 text-white font-semibold shadow-md shadow-cyan-500/20"
                    : "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700"
                  }`}
              >
                <span>🏷️ {niche.name}</span>
                <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${isSelected ? "bg-white/20 text-white" : "bg-slate-200 dark:bg-slate-700 text-slate-500"}`}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Action Controls & Search */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="flex items-center gap-3 w-full sm:w-auto">
          {/* Search Box */}
          <div className="relative flex-1 sm:w-72">
            <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Tìm sản phẩm theo tiêu đề, seller..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white dark:bg-[#0f172a] border border-slate-200 dark:border-slate-800 rounded-xl pl-9 pr-3 py-2 text-xs text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500/40"
            />
          </div>

          {/* Decision Filter */}
          <select
            value={selectedDecisionFilter}
            onChange={(e) => setSelectedDecisionFilter(e.target.value)}
            className="bg-white dark:bg-[#0f172a] border border-slate-200 dark:border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-700 dark:text-slate-300 focus:outline-none focus:ring-2 focus:ring-cyan-500/40 font-medium"
          >
            <option value="ALL">Tất cả Quyết Định</option>
            <option value="RECOMMENDED">🟢 Nên Bán</option>
            <option value="REVIEW_REQUIRED">🟡 Cần Xem Xét</option>
            <option value="NOT_RECOMMENDED">🔴 Không Nên</option>
          </select>
        </div>

        {/* Add Product Button */}
        <button
          onClick={onOpenAddProductModal}
          className="w-full sm:w-auto flex items-center justify-center gap-2 px-4 py-2 bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-white text-xs font-semibold rounded-xl shadow-md shadow-cyan-500/20 transition-all hover:scale-[1.02] active:scale-[0.98]"
        >
          <Plus size={15} />
          <span>Thêm Sản Phẩm Nghiên Cứu</span>
        </button>
      </div>

      {/* Products Table */}
      {filteredProducts.length === 0 ? (
        <div className="p-12 text-center rounded-2xl border border-dashed border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0f172a] space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 flex items-center justify-center mx-auto">
            <Layers size={24} />
          </div>
          <h3 className="text-sm font-bold text-slate-900 dark:text-white">Chưa có sản phẩm nghiên cứu nào</h3>
          <p className="text-xs text-slate-500 max-w-md mx-auto">
            Thêm sản phẩm thủ công hoặc vào tab <strong>Thu Thập & Import</strong> để tự động crawl hàng loạt từ Etsy/Amazon.
          </p>
          <button
            onClick={onOpenAddProductModal}
            className="px-4 py-2 bg-cyan-500 hover:bg-cyan-400 text-white text-xs font-semibold rounded-xl shadow transition-all"
          >
            Thêm Sản Phẩm Đầu Tiên
          </button>
        </div>
      ) : (
        <div className="bg-white dark:bg-[#0f172a] border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-slate-200 dark:border-slate-800/80 bg-slate-50 dark:bg-slate-900/50 text-slate-400 font-semibold uppercase tracking-wider text-[11px]">
                  <th className="py-3 px-4">Sản Phẩm Nghiên Cứu</th>
                  <th className="py-3 px-3">Sàn & Ngách</th>
                  <th className="py-3 px-3">Giá & Doanh Thu</th>
                  <th className="py-3 px-3">Khớp Base Printway</th>
                  <th className="py-3 px-3 text-center">Tổng Điểm</th>
                  <th className="py-3 px-3">Quyết Định</th>
                  <th className="py-3 px-4 text-right">Thao Tác</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60">
                {filteredProducts.map((prod) => {
                  const badge = getDecisionBadge(prod.decision);
                  const BadgeIcon = badge.icon;
                  const mappedBase = baseProducts.find((b) => b.sku === prod.mappedBaseSku);

                  return (
                    <tr 
                      key={prod.id} 
                      className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors group cursor-pointer"
                      onClick={() => setSelectedProductForModal(prod)}
                    >
                      {/* Product Column */}
                      <td className="py-3.5 px-4 max-w-xs">
                        <div className="flex items-center gap-3">
                          <img
                            src={prod.imageUrl}
                            alt={prod.title}
                            className="w-12 h-12 rounded-xl object-cover border border-slate-200 dark:border-slate-700 shrink-0 shadow-sm"
                          />
                          <div className="min-w-0">
                            <p className="font-semibold text-slate-900 dark:text-white line-clamp-2 leading-snug group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors">
                              {prod.title}
                            </p>
                            <span className="text-[10px] text-slate-400">Shop: {prod.sellerName}</span>
                          </div>
                        </div>
                      </td>

                      {/* Platform & Niche */}
                      <td className="py-3.5 px-3">
                        <div className="space-y-1">
                          <span className="inline-block px-2 py-0.5 rounded text-[10px] font-semibold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                            {prod.platform}
                          </span>
                          <p className="text-[11px] font-mono text-cyan-600 dark:text-cyan-400">#{prod.nicheTag}</p>
                        </div>
                      </td>

                      {/* Financials */}
                      <td className="py-3.5 px-3">
                        <div className="space-y-0.5">
                          <div className="font-bold text-slate-900 dark:text-white">
                            ${prod.retailPrice.toFixed(2)}
                          </div>
                          <div className="text-[11px] text-emerald-600 dark:text-emerald-400 font-medium">
                            Lãi: +${prod.estNetProfit.toFixed(2)} ({prod.estProfitMargin}%)
                          </div>
                          <div className="text-[10px] text-slate-400">
                            ~{prod.estMonthlySales} sales/th
                          </div>
                        </div>
                      </td>

                      {/* Mapped Base Printway */}
                      <td className="py-3.5 px-3 max-w-[200px]" onClick={(e) => e.stopPropagation()}>
                        {mappedBase ? (
                          <div className="space-y-1">
                            <div className="flex items-center gap-1.5">
                              <span className="font-mono font-bold text-[11px] text-cyan-600 dark:text-cyan-400">
                                {mappedBase.sku}
                              </span>
                              <span className="text-[10px] px-1 py-0.2 rounded bg-cyan-500/10 text-cyan-500">
                                {(prod.matchConfidence ? prod.matchConfidence * 100 : 92).toFixed(0)}%
                              </span>
                            </div>
                            <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate">{mappedBase.name}</p>
                            <p className="text-[10px] text-slate-400">Base Cost: ${mappedBase.baseCost} (Ship: ${mappedBase.estShipping})</p>
                          </div>
                        ) : (
                          <select
                            onChange={(e) => mapProductWithBaseSku(currentProject.id, prod.id, e.target.value)}
                            className="bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg px-2 py-1 text-[11px] text-cyan-600 font-medium"
                          >
                            <option value="">+ Chọn Base SKU để Map</option>
                            {baseProducts.map((b) => (
                              <option key={b.sku} value={b.sku}>{b.sku} - {b.name}</option>
                            ))}
                          </select>
                        )}
                      </td>

                      {/* Overall Score */}
                      <td className="py-3.5 px-3 text-center">
                        <div className="inline-flex flex-col items-center">
                          <span className="text-sm font-black font-mono text-slate-900 dark:text-white">
                            {prod.overallScore.toFixed(1)}
                          </span>
                          <span className="text-[9px] text-slate-400">/ 100</span>
                        </div>
                      </td>

                      {/* Decision Badge */}
                      <td className="py-3.5 px-3">
                        <div className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-xl border text-[11px] font-bold ${badge.bg}`}>
                          <BadgeIcon size={13} />
                          <span>{badge.text}</span>
                        </div>
                      </td>

                      {/* Actions */}
                      <td className="py-3.5 px-4 text-right" onClick={(e) => e.stopPropagation()}>
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            onClick={() => setSelectedProductForModal(prod)}
                            className="p-1.5 rounded-lg text-slate-400 hover:text-cyan-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                            title="Xem chi tiết 9 chỉ số"
                          >
                            <ArrowUpRight size={16} />
                          </button>
                          <button
                            onClick={() => deleteResearchProduct(currentProject.id, prod.id)}
                            className="p-1.5 rounded-lg text-slate-400 hover:text-rose-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                            title="Xóa sản phẩm"
                          >
                            <Trash2 size={15} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
