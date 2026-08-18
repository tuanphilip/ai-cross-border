"use client";

import React, { useState } from "react";
import { useApp } from "@/context/AppContext";
import { 
  Layers, 
  ArrowRightLeft, 
  DollarSign, 
  Sparkles, 
  Factory, 
  ShieldCheck, 
  Percent, 
  Clock, 
  Box,
  CheckCircle2
} from "lucide-react";

export function ProjectMappingTab() {
  const { currentProject, baseProducts, mapProductWithBaseSku } = useApp();

  if (!currentProject) return null;

  const [selectedProductId, setSelectedProductId] = useState<string>(
    currentProject.products[0]?.id || ""
  );

  const selectedProduct = currentProject.products.find((p) => p.id === selectedProductId) || currentProject.products[0];
  const mappedBase = baseProducts.find((b) => b.sku === selectedProduct?.mappedBaseSku) || baseProducts[0];

  // Simulator inputs
  const [customRetailPrice, setCustomRetailPrice] = useState<number>(selectedProduct?.retailPrice || 24.99);
  const [customPlatformFeePct, setCustomPlatformFeePct] = useState<number>(12); // Etsy ~12%
  const [customAdsCost, setCustomAdsCost] = useState<number>(4.50); // Est CAC per sale

  const baseCost = mappedBase?.baseCost || 0;
  const shippingCost = mappedBase?.estShipping || 0;
  const platformFee = customRetailPrice * (customPlatformFeePct / 100);
  const totalCost = baseCost + shippingCost + platformFee + customAdsCost;
  const simulatedNetProfit = Math.max(0, customRetailPrice - totalCost);
  const simulatedMargin = customRetailPrice > 0 ? (simulatedNetProfit / customRetailPrice) * 100 : 0;
  const estimatedMonthlyProfit = simulatedNetProfit * (selectedProduct?.estMonthlySales || 500);

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Product Switcher Bar */}
      <div className="p-4 rounded-2xl bg-white dark:bg-[#0f172a] border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col md:flex-row items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <Layers size={16} className="text-cyan-500" />
          <span className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
            Chọn Sản Phẩm Cần Ghép Nối & Tính P&L:
          </span>
        </div>

        <select
          value={selectedProductId}
          onChange={(e) => {
            setSelectedProductId(e.target.value);
            const found = currentProject.products.find((p) => p.id === e.target.value);
            if (found) setCustomRetailPrice(found.retailPrice);
          }}
          className="w-full md:w-auto max-w-md bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-900 dark:text-slate-100 font-medium focus:outline-none focus:ring-2 focus:ring-cyan-500/40"
        >
          {currentProject.products.map((p) => (
            <option key={p.id} value={p.id}>
              {p.title.slice(0, 60)}... (${p.retailPrice})
            </option>
          ))}
        </select>
      </div>

      {selectedProduct && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left: Side-by-Side Comparison (Market Listing vs Printway Base) */}
          <div className="lg:col-span-7 space-y-6">
            <div className="p-6 rounded-2xl bg-white dark:bg-[#0f172a] border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider">
                  <ArrowRightLeft size={16} className="text-cyan-500" />
                  <span>Đối Chiếu Thực Thể: Sàn TMĐT vs Xưởng Printway</span>
                </div>
                <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30">
                  AI Match {(selectedProduct.matchConfidence ? selectedProduct.matchConfidence * 100 : 94).toFixed(0)}%
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Market Listing Column */}
                <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 space-y-3">
                  <div className="flex items-center justify-between text-xs font-semibold text-slate-500">
                    <span>Sản Phẩm Thị Trường ({selectedProduct.platform})</span>
                    <span className="text-[10px] font-mono text-cyan-600">#{selectedProduct.nicheTag}</span>
                  </div>

                  <div className="w-full h-40 rounded-xl overflow-hidden bg-slate-200 dark:bg-slate-800">
                    <img
                      src={selectedProduct.imageUrl}
                      alt={selectedProduct.title}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="space-y-1">
                    <p className="text-xs font-bold text-slate-900 dark:text-white line-clamp-2 leading-snug">
                      {selectedProduct.title}
                    </p>
                    <p className="text-[11px] text-slate-500">Shop: {selectedProduct.sellerName}</p>
                  </div>

                  <div className="pt-2 border-t border-slate-200 dark:border-slate-800 space-y-1 text-xs">
                    <div className="flex justify-between">
                      <span className="text-slate-400">Giá bán trên sàn:</span>
                      <strong className="text-slate-900 dark:text-white">${selectedProduct.retailPrice.toFixed(2)}</strong>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Ước tính bán/tháng:</span>
                      <span className="text-slate-700 dark:text-slate-300 font-mono">{selectedProduct.estMonthlySales} items</span>
                    </div>
                  </div>
                </div>

                {/* Printway Base SKU Column */}
                <div className="p-4 rounded-xl bg-cyan-500/5 dark:bg-cyan-500/10 border border-cyan-500/30 space-y-3">
                  <div className="flex items-center justify-between text-xs font-semibold text-cyan-700 dark:text-cyan-300">
                    <span className="flex items-center gap-1">
                      <Factory size={13} />
                      <span>Phôi Gia Công Printway</span>
                    </span>
                    <span className="font-mono text-xs font-bold text-cyan-600 dark:text-cyan-400">
                      {mappedBase.sku}
                    </span>
                  </div>

                  <div className="w-full h-40 rounded-xl overflow-hidden bg-slate-200 dark:bg-slate-800">
                    <img
                      src={mappedBase.image}
                      alt={mappedBase.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="space-y-1">
                    <p className="text-xs font-bold text-slate-900 dark:text-white line-clamp-2 leading-snug">
                      {mappedBase.name}
                    </p>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400">Chất liệu: {mappedBase.material}</p>
                  </div>

                  {/* Switch Base SKU Dropdown */}
                  <div className="pt-2 border-t border-cyan-500/20 space-y-2">
                    <label className="block text-[10px] font-semibold uppercase text-cyan-700 dark:text-cyan-400">
                      Đổi sang SKU Base khác:
                    </label>
                    <select
                      value={mappedBase.sku}
                      onChange={(e) => mapProductWithBaseSku(currentProject.id, selectedProduct.id, e.target.value)}
                      className="w-full bg-white dark:bg-slate-800 border border-cyan-500/30 rounded-lg px-2.5 py-1.5 text-xs text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-cyan-500/40"
                    >
                      {baseProducts.map((b) => (
                        <option key={b.sku} value={b.sku}>
                          {b.sku} - {b.name} (${b.baseCost})
                        </option>
                      ))}
                    </select>

                    <div className="space-y-1 text-xs pt-1">
                      <div className="flex justify-between">
                        <span className="text-slate-500">Giá phôi (Base Cost):</span>
                        <strong className="text-slate-900 dark:text-white font-mono">${mappedBase.baseCost.toFixed(2)}</strong>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-500">Cước vận chuyển (Ship):</span>
                        <strong className="text-slate-900 dark:text-white font-mono">${mappedBase.estShipping.toFixed(2)}</strong>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-500">Thời gian in & giao:</span>
                        <span className="text-slate-700 dark:text-slate-300 font-mono">{mappedBase.leadTimeDays} ngày (Xưởng {mappedBase.factoryLocation})</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Real-time P&L Profit & ROI Simulator */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-6 rounded-2xl bg-white dark:bg-[#0f172a] border border-slate-200 dark:border-slate-800 shadow-sm space-y-5">
              <div className="flex items-center gap-2 text-xs font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider">
                <DollarSign size={16} className="text-emerald-500" />
                <span>Bảng Tính P&L & Lợi Nhuận Ròng (Profit Simulator)</span>
              </div>

              {/* Input Sliders */}
              <div className="space-y-3 text-xs">
                <div>
                  <div className="flex justify-between font-semibold mb-1">
                    <span className="text-slate-600 dark:text-slate-400">Giá Bán Lẻ Mong Muốn ($)</span>
                    <span className="text-slate-900 dark:text-white font-mono font-bold">${customRetailPrice.toFixed(2)}</span>
                  </div>
                  <input
                    type="range"
                    min={10}
                    max={80}
                    step={0.5}
                    value={customRetailPrice}
                    onChange={(e) => setCustomRetailPrice(Number(e.target.value))}
                    className="w-full accent-cyan-500"
                  />
                </div>

                <div>
                  <div className="flex justify-between font-semibold mb-1">
                    <span className="text-slate-600 dark:text-slate-400">Phí Sàn TMĐT (%)</span>
                    <span className="text-slate-900 dark:text-white font-mono">{customPlatformFeePct}% (${platformFee.toFixed(2)})</span>
                  </div>
                  <input
                    type="range"
                    min={5}
                    max={25}
                    step={1}
                    value={customPlatformFeePct}
                    onChange={(e) => setCustomPlatformFeePct(Number(e.target.value))}
                    className="w-full accent-cyan-500"
                  />
                </div>

                <div>
                  <div className="flex justify-between font-semibold mb-1">
                    <span className="text-slate-600 dark:text-slate-400">Chi Phí Quảng Cáo / Đơn (Est. CAC)</span>
                    <span className="text-slate-900 dark:text-white font-mono">${customAdsCost.toFixed(2)}</span>
                  </div>
                  <input
                    type="range"
                    min={1}
                    max={15}
                    step={0.5}
                    value={customAdsCost}
                    onChange={(e) => setCustomAdsCost(Number(e.target.value))}
                    className="w-full accent-cyan-500"
                  />
                </div>
              </div>

              {/* Profit Breakdown Summary Cards */}
              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 space-y-2.5 text-xs">
                <div className="flex justify-between text-slate-500">
                  <span>Doanh thu / Đơn:</span>
                  <span className="font-mono text-slate-900 dark:text-white">${customRetailPrice.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-slate-500">
                  <span>- Base Cost xưởng:</span>
                  <span className="font-mono text-rose-500">-${baseCost.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-slate-500">
                  <span>- Cước vận chuyển US:</span>
                  <span className="font-mono text-rose-500">-${shippingCost.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-slate-500">
                  <span>- Phí sàn + Ads:</span>
                  <span className="font-mono text-rose-500">-${(platformFee + customAdsCost).toFixed(2)}</span>
                </div>
                <div className="pt-2 border-t border-slate-200 dark:border-slate-800 flex justify-between items-baseline font-bold text-sm">
                  <span className="text-slate-800 dark:text-slate-200">LÃI RÒNG / ĐƠN:</span>
                  <span className="text-emerald-600 dark:text-emerald-400 font-mono text-base">
                    +${simulatedNetProfit.toFixed(2)}
                  </span>
                </div>
              </div>

              {/* Highlights */}
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-center">
                  <span className="text-[10px] uppercase font-bold text-emerald-600 dark:text-emerald-400 block">Biên Lợi Nhuận Net</span>
                  <span className="text-xl font-black text-emerald-600 dark:text-emerald-400 font-mono">
                    {simulatedMargin.toFixed(1)}%
                  </span>
                </div>

                <div className="p-3 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-center">
                  <span className="text-[10px] uppercase font-bold text-cyan-600 dark:text-cyan-400 block">Lợi Nhuận / Tháng</span>
                  <span className="text-xl font-black text-cyan-600 dark:text-cyan-400 font-mono">
                    ${Math.round(estimatedMonthlyProfit).toLocaleString()}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
