"use client";

import React, { useState } from "react";
import { useApp } from "@/context/AppContext";
import { 
  Layers, 
  Plus, 
  Search, 
  Factory, 
  DollarSign, 
  Clock, 
  ShieldCheck, 
  RefreshCw, 
  FileSpreadsheet, 
  CheckCircle2,
  ExternalLink,
  Tag
} from "lucide-react";

export function BaseCatalogView() {
  const { baseProducts, baseCatalogSubTab, setBaseCatalogSubTab } = useApp();

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("ALL");
  const [isSyncing, setIsSyncing] = useState(false);

  const categories = ["ALL", "Holiday Decor", "Apparel", "Drinkware", "Home & Living", "Wall Art"];

  const filteredBase = baseProducts.filter((b) => {
    if (selectedCategory !== "ALL" && !b.category.toLowerCase().includes(selectedCategory.toLowerCase())) return false;
    if (searchQuery && !b.name.toLowerCase().includes(searchQuery.toLowerCase()) && !b.sku.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    return true;
  });

  const handleSyncPrintway = () => {
    setIsSyncing(true);
    setTimeout(() => {
      setIsSyncing(false);
      alert("Đã đồng bộ thành công toàn bộ danh mục sản phẩm Base từ hệ thống xưởng Printway API!");
    }, 1200);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Header Info */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-slate-900 via-[#0c1626] to-[#0f2438] border border-slate-800 text-white shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
              Printway Manufacturing Hub
            </span>
            <span className="text-xs text-slate-300">Năng Lực Sản Xuất Gốc</span>
          </div>
          <h2 className="text-xl font-black text-white">Danh Mục Sản Phẩm Base Printway (Catalog Gốc)</h2>
          <p className="text-xs text-slate-300 max-w-2xl leading-relaxed">
            Đây là danh mục phôi và quy cách in ấn thực tế của xưởng Printway. Hệ thống sẽ tự động ghép nối (map) các sản phẩm nghiên cứu trên sàn TMĐT về danh mục Base này để tính toán lợi nhuận và kiểm tra tính khả thi sản xuất.
          </p>
        </div>

        <div className="flex items-center gap-2.5 shrink-0">
          <button
            onClick={handleSyncPrintway}
            disabled={isSyncing}
            className="flex items-center gap-1.5 px-4 py-2 bg-white/10 hover:bg-white/20 text-white text-xs font-semibold rounded-xl border border-white/20 transition-all"
          >
            <RefreshCw size={14} className={isSyncing ? "animate-spin" : ""} />
            <span>{isSyncing ? "Đang đồng bộ..." : "Đồng Bộ Printway API"}</span>
          </button>
        </div>
      </div>

      {/* HORIZONTAL SUB-TABS (Nằm ngang trong view chính) */}
      <div className="border-b border-slate-200 dark:border-slate-800/80 bg-white dark:bg-[#0c121e] rounded-2xl p-1.5 shadow-sm">
        <nav className="flex space-x-2" aria-label="Base Catalog Tabs">
          <button
            onClick={() => setBaseCatalogSubTab("catalog_list")}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all
              ${baseCatalogSubTab === "catalog_list"
                ? "bg-cyan-500 text-white shadow-md shadow-cyan-500/20"
                : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/60"
              }`}
          >
            <Layers size={16} />
            <span>Danh Mục Phôi Base ({baseProducts.length} SKUs)</span>
          </button>

          <button
            onClick={() => setBaseCatalogSubTab("sync_import")}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all
              ${baseCatalogSubTab === "sync_import"
                ? "bg-cyan-500 text-white shadow-md shadow-cyan-500/20"
                : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/60"
              }`}
          >
            <FileSpreadsheet size={16} />
            <span>Đồng Bộ API & Import File Base Catalog</span>
          </button>
        </nav>
      </div>

      {/* SUB-TAB 1: CATALOG LIST */}
      {baseCatalogSubTab === "catalog_list" && (
        <div className="space-y-6">
          {/* Filter Bar */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="flex items-center gap-3 w-full sm:w-auto">
              <div className="relative flex-1 sm:w-72">
                <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  placeholder="Tìm theo SKU, tên phôi, chất liệu..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-white dark:bg-[#0f172a] border border-slate-200 dark:border-slate-800 rounded-xl pl-9 pr-3 py-2 text-xs text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500/40"
                />
              </div>

              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="bg-white dark:bg-[#0f172a] border border-slate-200 dark:border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-700 dark:text-slate-300 focus:outline-none focus:ring-2 focus:ring-cyan-500/40 font-medium"
              >
                {categories.map((c) => (
                  <option key={c} value={c}>{c === "ALL" ? "Tất Cả Danh Mục" : c}</option>
                ))}
              </select>
            </div>

            <span className="text-xs text-slate-400 font-medium">
              Hiển thị <strong>{filteredBase.length}</strong> sản phẩm Base
            </span>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredBase.map((base) => (
              <div
                key={base.sku}
                className="p-5 rounded-2xl bg-white dark:bg-[#0f172a] border border-slate-200 dark:border-slate-800 shadow-sm hover:border-cyan-500/40 transition-all space-y-4 flex flex-col justify-between"
              >
                <div className="space-y-3">
                  {/* Image & Location Badge */}
                  <div className="relative w-full h-44 rounded-xl overflow-hidden bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700/80">
                    <img
                      src={base.image}
                      alt={base.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-black/70 backdrop-blur-sm text-white text-[11px] font-bold">
                      <Factory size={12} className="text-cyan-400" />
                      <span>Xưởng {base.factoryLocation}</span>
                    </div>

                    <div className="absolute top-2.5 right-2.5 px-2 py-0.5 rounded-md bg-emerald-500 text-white text-[10px] font-bold">
                      Có Sẵn Phôi
                    </div>
                  </div>

                  {/* SKU & Name */}
                  <div>
                    <span className="text-[11px] font-mono font-bold text-cyan-600 dark:text-cyan-400">
                      {base.sku}
                    </span>
                    <h3 className="text-sm font-bold text-slate-900 dark:text-white leading-snug mt-0.5">
                      {base.name}
                    </h3>
                    <p className="text-[11px] text-slate-400 mt-1">Danh mục: {base.category}</p>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">Chất liệu: {base.material}</p>
                  </div>

                  {/* Printing Specs */}
                  <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-100 dark:border-slate-800/80 space-y-1 text-xs">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">Kỹ Thuật In:</span>
                    <div className="flex flex-wrap gap-1">
                      {base.printTechniques.map((tech, i) => (
                        <span key={i} className="text-[10px] px-1.5 py-0.5 rounded bg-cyan-500/10 text-cyan-700 dark:text-cyan-300 font-medium">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Price & Lead time footer */}
                <div className="pt-3 border-t border-slate-100 dark:border-slate-800/80 space-y-2">
                  <div className="grid grid-cols-3 gap-2 text-center text-xs">
                    <div className="p-2 rounded-xl bg-slate-50 dark:bg-slate-900/60">
                      <span className="text-[10px] text-slate-400 block">Base Cost</span>
                      <strong className="text-slate-900 dark:text-white font-mono">${base.baseCost.toFixed(2)}</strong>
                    </div>
                    <div className="p-2 rounded-xl bg-slate-50 dark:bg-slate-900/60">
                      <span className="text-[10px] text-slate-400 block">Ship US</span>
                      <strong className="text-slate-900 dark:text-white font-mono">${base.estShipping.toFixed(2)}</strong>
                    </div>
                    <div className="p-2 rounded-xl bg-slate-50 dark:bg-slate-900/60">
                      <span className="text-[10px] text-slate-400 block">Lead Time</span>
                      <strong className="text-cyan-600 dark:text-cyan-400 font-mono">{base.leadTimeDays} ngày</strong>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1">
                    <span>Đã ghép nối với <strong>{base.activeMappedCount} listings</strong></span>
                    <span className="text-cyan-600 dark:text-cyan-400 font-semibold hover:underline cursor-pointer">Xem mẫu mockup</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SUB-TAB 2: SYNC & IMPORT EXCEL */}
      {baseCatalogSubTab === "sync_import" && (
        <div className="p-8 rounded-2xl bg-white dark:bg-[#0f172a] border border-slate-200 dark:border-slate-800 shadow-sm space-y-6 max-w-3xl mx-auto">
          <div className="text-center space-y-2">
            <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 flex items-center justify-center mx-auto">
              <FileSpreadsheet size={24} />
            </div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              Cập Nhật Bảng Giá Phôi & Năng Lực Xưởng Printway
            </h3>
            <p className="text-xs text-slate-400">
              Nhập file Excel chứa danh mục SKU, giá vốn (COGS), phí vận chuyển và thời gian sản xuất mới nhất từ Printway.
            </p>
          </div>

          <div className="border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-2xl p-8 text-center space-y-3 bg-slate-50 dark:bg-slate-900/40 hover:border-cyan-500 transition-colors cursor-pointer">
            <FileSpreadsheet size={36} className="text-slate-400 mx-auto" />
            <div>
              <p className="text-xs font-bold text-slate-800 dark:text-slate-200">
                Kéo thả file .xlsx / .csv hoặc nhấp để chọn file từ máy tính
              </p>
              <p className="text-[11px] text-slate-400 mt-0.5">
                Hỗ trợ định dạng Catalog chuẩn Printway (Cột: SKU, Name, BaseCost, Shipping, LeadTime, Material)
              </p>
            </div>
            <button className="px-4 py-2 bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 text-xs font-semibold rounded-xl transition-colors">
              Chọn File Từ Máy Tính
            </button>
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-slate-200 dark:border-slate-800 text-xs">
            <span className="text-slate-400">Tải file mẫu Catalog Printway:</span>
            <button className="text-cyan-600 dark:text-cyan-400 font-semibold hover:underline">
              Download Template (.xlsx)
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
