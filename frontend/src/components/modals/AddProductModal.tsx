"use client";

import React, { useState } from "react";
import { useApp } from "@/context/AppContext";
import { X, Plus, Sparkles, Link as LinkIcon, Image as ImageIcon, DollarSign, Tag, Check } from "lucide-react";
import { ResearchProduct, MetricScore, DecisionStatus } from "@/lib/types";

interface AddProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultNicheTag?: string;
}

export function AddProductModal({ isOpen, onClose, defaultNicheTag }: AddProductModalProps) {
  const { currentProject, baseProducts, addResearchProductToProject } = useApp();

  const [platform, setPlatform] = useState<"Etsy" | "Amazon" | "TikTok Shop" | "Pinterest">("Etsy");
  const [sourceUrl, setSourceUrl] = useState("");
  const [title, setTitle] = useState("");
  const [imageUrl, setImageUrl] = useState("https://images.unsplash.com/photo-1543257580-7269da773bf5?w=500&auto=format&fit=crop&q=80");
  const [retailPrice, setRetailPrice] = useState<number>(24.99);
  const [sellerName, setSellerName] = useState("TopSellerCo");
  const [nicheTag, setNicheTag] = useState(defaultNicheTag || currentProject?.niches[0]?.tag || "general");
  const [mappedBaseSku, setMappedBaseSku] = useState<string>(baseProducts[0]?.sku || "");
  const [isSimulatingScrape, setIsSimulatingScrape] = useState(false);

  if (!isOpen || !currentProject) return null;

  const handleSimulateUrlFetch = () => {
    if (!sourceUrl) return;
    setIsSimulatingScrape(true);
    setTimeout(() => {
      setIsSimulatingScrape(false);
      setTitle("Personalized Family Christmas Keepsake Acrylic Ornament 2026, Laser Cut Custom Name Holiday Gift");
      setRetailPrice(22.95);
      setSellerName("HandmadeKeepsakeStore");
      setImageUrl("https://images.unsplash.com/photo-1512389142860-9c449e58a543?w=500&auto=format&fit=crop&q=80");
      setMappedBaseSku("PW-ORN-ACRYLIC-2D");
    }, 800);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    const baseProd = baseProducts.find((b) => b.sku === mappedBaseSku) || baseProducts[0];
    const costTotal = (baseProd?.baseCost || 4.0) + (baseProd?.estShipping || 4.0) + (retailPrice * 0.12) + (retailPrice * 0.15);
    const netProfit = Math.max(0, retailPrice - costTotal);
    const margin = (netProfit / retailPrice) * 100;

    const metrics: MetricScore[] = [
      { name: "Production Fit", group: "production", score: 9.2, weight: 0.10, rawValue: "Khớp xưởng Printway UV Cut", description: "Xưởng US có sẵn phôi gia công" },
      { name: "Production Time", group: "production", score: 8.8, weight: 0.05, rawValue: `${baseProd?.leadTimeDays || 2} ngày sản xuất`, description: "Thời gian hoàn tất đơn hàng" },
      { name: "Seasonality Fit", group: "production", score: 9.0, weight: 0.10, rawValue: "Phù hợp mùa vụ cao điểm", description: "Lượng tìm kiếm tăng mạnh" },
      { name: "Personalization Level", group: "production", score: 8.5, weight: 0.05, rawValue: "Custom Name & Year", description: "Khách hàng nhập tên" },
      { name: "Potential Revenue", group: "financial", score: 8.2, weight: 0.15, rawValue: "$25,000/tháng", description: "Doanh thu ước tính" },
      { name: "Profit Margin", group: "financial", score: 8.8, weight: 0.20, rawValue: `${margin.toFixed(1)}% Net Margin`, description: `Lãi ròng $${netProfit.toFixed(2)}/đơn` },
      { name: "Market Demand", group: "market", score: 8.5, weight: 0.15, rawValue: "65,000 Search/mo", description: "Lực cầu thị trường" },
      { name: "Growth Rate", group: "market", score: 8.0, weight: 0.10, rawValue: "+32% MoM", description: "Tốc độ tăng trưởng" },
      { name: "Competition Level", group: "market", score: 7.5, weight: 0.10, rawValue: "Medium", description: "Cạnh tranh ở mức trung bình" }
    ];

    const overall = 83.5;
    const decision: DecisionStatus = "RECOMMENDED";

    addResearchProductToProject(currentProject.id, {
      projectId: currentProject.id,
      nicheTag,
      title: title.trim(),
      platform,
      sourceUrl: sourceUrl || `https://${platform.toLowerCase().replace(/ /g, "")}.com/listing/sample-item`,
      imageUrl: imageUrl || "https://images.unsplash.com/photo-1543257580-7269da773bf5?w=500&auto=format&fit=crop&q=80",
      sellerName: sellerName || "VerifiedStore",
      retailPrice,
      estMonthlySales: Math.floor(Math.random() * 800) + 400,
      estMonthlyRevenue: Math.floor(retailPrice * (Math.floor(Math.random() * 800) + 400)),
      reviewCount: Math.floor(Math.random() * 300) + 50,
      rating: 4.8,
      bsrOrRank: "#4 in Category",
      mappedBaseSku,
      matchConfidence: 0.94,
      overallScore: overall,
      decision,
      groupScores: {
        production: 8.9,
        financial: 8.5,
        market: 8.0
      },
      metrics,
      estNetProfit: parseFloat(netProfit.toFixed(2)),
      estProfitMargin: parseFloat(margin.toFixed(1)),
      aiSummary: `Sản phẩm tiềm năng cao, ghép nối tối ưu với phôi Base ${baseProd.name}. Biên lợi nhuận đạt ${margin.toFixed(1)}%.`,
      designAngle: "Tập trung artwork họa tiết vẽ tay nét vintage, bổ sung hộp quà quà tặng cao cấp.",
      optimalLaunchWindow: "Tháng 10/2026"
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white dark:bg-[#0f172a] border border-slate-200 dark:border-slate-800 w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden text-slate-800 dark:text-slate-100">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 dark:border-slate-800/80 bg-slate-50 dark:bg-slate-900/50">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-cyan-500/10 dark:bg-cyan-500/20 text-cyan-600 dark:text-cyan-400">
              <Plus size={20} />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-900 dark:text-white">Thêm Sản Phẩm Nghiên Cứu Vào Dự Án</h2>
              <p className="text-xs text-slate-500">Nhập link sàn TMĐT hoặc điền thủ công thông tin sản phẩm thị trường</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[80vh] overflow-y-auto">
          {/* Quick URL Scrape Bar */}
          <div className="p-3.5 rounded-xl bg-cyan-500/5 dark:bg-cyan-500/10 border border-cyan-500/20 space-y-2">
            <label className="flex items-center gap-1.5 text-xs font-semibold text-cyan-700 dark:text-cyan-300">
              <LinkIcon size={14} />
              <span>Cào Dữ Liệu Tự Động Từ Đường Link Listing (Etsy / Amazon / TikTok Shop)</span>
            </label>
            <div className="flex gap-2">
              <input
                type="url"
                placeholder="Dán link sản phẩm (VD: https://etsy.com/listing/...)"
                value={sourceUrl}
                onChange={(e) => setSourceUrl(e.target.value)}
                className="flex-1 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-1.5 text-xs text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500/40"
              />
              <button
                type="button"
                onClick={handleSimulateUrlFetch}
                disabled={isSimulatingScrape}
                className="px-3.5 py-1.5 bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-white text-xs font-semibold rounded-xl flex items-center gap-1.5 shadow transition-all shrink-0"
              >
                <Sparkles size={14} />
                <span>{isSimulatingScrape ? "Đang quét AI..." : "Quét Nhanh"}</span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1.5">
                Sàn TMĐT Nguồn
              </label>
              <select
                value={platform}
                onChange={(e) => setPlatform(e.target.value as any)}
                className="w-full bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 rounded-xl px-3.5 py-2 text-xs text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-cyan-500/40"
              >
                <option value="Etsy">🟠 Etsy</option>
                <option value="Amazon">🟡 Amazon</option>
                <option value="TikTok Shop">⚫ TikTok Shop</option>
                <option value="Pinterest">🔴 Pinterest</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1.5">
                Gán Vào Ngách (Niche Tag) *
              </label>
              <select
                value={nicheTag}
                onChange={(e) => setNicheTag(e.target.value)}
                className="w-full bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 rounded-xl px-3.5 py-2 text-xs text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-cyan-500/40"
              >
                {currentProject.niches.map((n) => (
                  <option key={n.id} value={n.tag}>
                    🏷️ {n.name} (#{n.tag})
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1.5">
              Tiêu Đề Listing Sản Phẩm Thị Trường *
            </label>
            <input
              type="text"
              required
              placeholder="VD: Custom Acrylic Ornament Dog Mom Keepsake 2026..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 rounded-xl px-3.5 py-2 text-xs text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500/40"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1.5">
                Giá Bán Lẻ Trên Sàn ($)
              </label>
              <input
                type="number"
                step="0.01"
                min="1"
                required
                value={retailPrice}
                onChange={(e) => setRetailPrice(Number(e.target.value))}
                className="w-full bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 rounded-xl px-3.5 py-2 text-xs text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-cyan-500/40"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1.5">
                Tên Shop / Seller
              </label>
              <input
                type="text"
                value={sellerName}
                onChange={(e) => setSellerName(e.target.value)}
                className="w-full bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 rounded-xl px-3.5 py-2 text-xs text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-cyan-500/40"
              />
            </div>
          </div>

          {/* Map Base Product */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-cyan-600 dark:text-cyan-400 mb-1.5">
              🔗 Ghép Nối Sản Phẩm Base Printway (Base Catalog Match) *
            </label>
            <select
              value={mappedBaseSku}
              onChange={(e) => setMappedBaseSku(e.target.value)}
              className="w-full bg-slate-50 dark:bg-slate-800/60 border border-cyan-500/40 rounded-xl px-3.5 py-2 text-xs text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-cyan-500/40 font-medium"
            >
              {baseProducts.map((base) => (
                <option key={base.sku} value={base.sku}>
                  [{base.sku}] {base.name} - Giá Base: ${base.baseCost} (Ship: ${base.estShipping})
                </option>
              ))}
            </select>
            <p className="text-[11px] text-slate-400 mt-1">
              Hệ thống sẽ tự động tính toán biên lợi nhuận và điểm số dựa trên phôi base đã chọn.
            </p>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1.5">
              URL Hình Ảnh Sản Phẩm
            </label>
            <input
              type="url"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              className="w-full bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 rounded-xl px-3.5 py-2 text-xs text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-cyan-500/40"
            />
          </div>

          {/* Actions */}
          <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-200 dark:border-slate-800/80">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors"
            >
              Hủy bỏ
            </button>
            <button
              type="submit"
              className="px-5 py-2 text-xs font-semibold bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-white rounded-xl shadow-lg shadow-cyan-500/20 transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              Lưu & Tự Động Chấm Điểm
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
