"use client";

import React from "react";
import { useApp } from "@/context/AppContext";
import { 
  X, 
  ExternalLink, 
  CheckCircle2, 
  AlertCircle, 
  XCircle, 
  Sparkles, 
  DollarSign, 
  Clock, 
  Layers, 
  TrendingUp, 
  Factory, 
  Lightbulb,
  ShieldCheck,
  Target
} from "lucide-react";
import { ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from "recharts";

export function ProductDetailModal() {
  const { selectedProductForModal, setSelectedProductForModal, baseProducts } = useApp();

  if (!selectedProductForModal) return null;

  const product = selectedProductForModal;
  const mappedBase = baseProducts.find((b) => b.sku === product.mappedBaseSku);

  // Radar data format
  const radarData = product.metrics.map((m) => ({
    metric: m.name,
    score: m.score,
    fullMark: 10,
  }));

  const getDecisionBadge = () => {
    switch (product.decision) {
      case "RECOMMENDED":
        return {
          icon: CheckCircle2,
          text: "NÊN SẢN XUẤT / NÊN BÁN",
          bg: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30",
        };
      case "REVIEW_REQUIRED":
        return {
          icon: AlertCircle,
          text: "CẦN XEM XÉT THÊM",
          bg: "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/30",
        };
      default:
        return {
          icon: XCircle,
          text: "KHÔNG NÊN SẢN XUẤT",
          bg: "bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/30",
        };
    }
  };

  const badge = getDecisionBadge();
  const BadgeIcon = badge.icon;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-white dark:bg-[#0c121e] border border-slate-200 dark:border-slate-800 w-full max-w-4xl max-h-[90vh] rounded-2xl shadow-2xl overflow-hidden flex flex-col text-slate-800 dark:text-slate-100">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 dark:border-slate-800/80 bg-slate-50 dark:bg-slate-900/50">
          <div className="flex items-center gap-3">
            <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
              {product.platform}
            </span>
            <span className="text-xs font-mono text-cyan-600 dark:text-cyan-400 font-medium">
              #{product.nicheTag}
            </span>
          </div>
          <button
            onClick={() => setSelectedProductForModal(null)}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Main Info Hero */}
          <div className="flex flex-col md:flex-row gap-6 items-start">
            {/* Image */}
            <div className="w-full md:w-56 h-56 rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-700/80 bg-slate-100 dark:bg-slate-800 shrink-0 shadow-inner relative group">
              <img
                src={product.imageUrl}
                alt={product.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <a
                href={product.sourceUrl}
                target="_blank"
                rel="noreferrer"
                className="absolute bottom-2.5 right-2.5 p-2 rounded-xl bg-black/60 hover:bg-black/80 text-white backdrop-blur-sm transition-all"
                title="Mở link listing gốc"
              >
                <ExternalLink size={14} />
              </a>
            </div>

            {/* Title & Decision */}
            <div className="flex-1 space-y-3">
              <div className="flex flex-wrap items-center gap-3">
                <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-bold ${badge.bg}`}>
                  <BadgeIcon size={16} />
                  <span>{badge.text}</span>
                </div>

                <div className="flex items-baseline gap-1 text-2xl font-black text-slate-900 dark:text-white">
                  <span>{product.overallScore.toFixed(1)}</span>
                  <span className="text-xs text-slate-400 font-normal">/ 100 Điểm</span>
                </div>
              </div>

              <h2 className="text-base font-bold text-slate-900 dark:text-white leading-snug">
                {product.title}
              </h2>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1">
                <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800">
                  <span className="text-[10px] uppercase font-semibold text-slate-400 block">Giá Sàn Bán</span>
                  <span className="text-sm font-bold text-slate-900 dark:text-white">${product.retailPrice.toFixed(2)}</span>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800">
                  <span className="text-[10px] uppercase font-semibold text-slate-400 block">Lãi Ròng Ước Tính</span>
                  <span className="text-sm font-bold text-emerald-600 dark:text-emerald-400">${product.estNetProfit.toFixed(2)}</span>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800">
                  <span className="text-[10px] uppercase font-semibold text-slate-400 block">Biên Lợi Nhuận</span>
                  <span className="text-sm font-bold text-cyan-600 dark:text-cyan-400">{product.estProfitMargin}%</span>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800">
                  <span className="text-[10px] uppercase font-semibold text-slate-400 block">Lượt Bán / Tháng</span>
                  <span className="text-sm font-bold text-slate-900 dark:text-white">{product.estMonthlySales.toLocaleString()}</span>
                </div>
              </div>

              {/* Mapped Printway Base Info */}
              {mappedBase && (
                <div className="p-3 rounded-xl bg-cyan-500/5 dark:bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <Factory size={18} className="text-cyan-600 dark:text-cyan-400" />
                    <div>
                      <p className="text-xs font-bold text-slate-900 dark:text-white">
                        Khớp với Base SKU: <span className="font-mono text-cyan-600 dark:text-cyan-400">{mappedBase.sku}</span> ({mappedBase.name})
                      </p>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400">
                        Base Cost: ${mappedBase.baseCost} • Ship: ${mappedBase.estShipping} • Lead time: {mappedBase.leadTimeDays} ngày (Xưởng {mappedBase.factoryLocation})
                      </p>
                    </div>
                  </div>
                  <span className="text-xs font-semibold px-2.5 py-1 rounded-lg bg-cyan-500/20 text-cyan-600 dark:text-cyan-300">
                    Match {(product.matchConfidence ? product.matchConfidence * 100 : 94).toFixed(0)}%
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* AI Insights & Design Angle */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-2xl bg-gradient-to-br from-indigo-500/5 to-cyan-500/5 dark:from-indigo-500/10 dark:to-cyan-500/10 border border-indigo-500/20 dark:border-indigo-500/30 space-y-2">
              <div className="flex items-center gap-2 text-xs font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider">
                <Sparkles size={16} />
                <span>AI R&D Intelligence Summary</span>
              </div>
              <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                {product.aiSummary}
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-gradient-to-br from-amber-500/5 to-orange-500/5 dark:from-amber-500/10 dark:to-orange-500/10 border border-amber-500/20 dark:border-amber-500/30 space-y-2">
              <div className="flex items-center gap-2 text-xs font-bold text-amber-600 dark:text-amber-400 uppercase tracking-wider">
                <Lightbulb size={16} />
                <span>Gợi Ý Góc Thiết Kế & Angle Mở Bán</span>
              </div>
              <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                {product.designAngle}
              </p>
              <div className="pt-1 flex items-center gap-1.5 text-[11px] font-medium text-amber-700 dark:text-amber-300">
                <Target size={13} />
                <span>Thời điểm Launch tối ưu: {product.optimalLaunchWindow}</span>
              </div>
            </div>
          </div>

          {/* 9-Metric Scoring Radar & Table Breakdown */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Chi Tiết Đánh Giá Bộ 9 Chỉ Số Cốt Lõi
            </h3>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
              {/* Radar Chart */}
              <div className="lg:col-span-5 h-64 p-3 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 flex items-center justify-center">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart cx="50%" cy="50%" outerRadius="75%" data={radarData}>
                    <PolarGrid stroke="#334155" strokeDasharray="3 3" />
                    <PolarAngleAxis dataKey="metric" tick={{ fill: "#94a3b8", fontSize: 10 }} />
                    <PolarRadiusAxis angle={30} domain={[0, 10]} stroke="#475569" />
                    <Radar name="Product Score" dataKey="score" stroke="#06b6d4" fill="#06b6d4" fillOpacity={0.35} />
                  </RadarChart>
                </ResponsiveContainer>
              </div>

              {/* Table of 9 Metrics */}
              <div className="lg:col-span-7 space-y-2 max-h-64 overflow-y-auto pr-1">
                {product.metrics.map((metric, idx) => (
                  <div
                    key={idx}
                    className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs"
                  >
                    <div className="space-y-0.5 max-w-[60%]">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-slate-900 dark:text-white">{metric.name}</span>
                        <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-200 dark:bg-slate-800 text-slate-500 font-mono">
                          Trọng số {(metric.weight * 100).toFixed(0)}%
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate">{metric.description}</p>
                    </div>

                    <div className="text-right">
                      <span className="text-xs font-bold font-mono text-cyan-600 dark:text-cyan-400">
                        {metric.score.toFixed(1)} / 10
                      </span>
                      <p className="text-[10px] text-slate-400 truncate max-w-[120px]">{metric.rawValue}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-3.5 border-t border-slate-200 dark:border-slate-800/80 bg-slate-50 dark:bg-slate-900/50 flex items-center justify-between">
          <span className="text-xs text-slate-400 font-mono">
            ID: {product.id} • Thêm ngày: {product.addedAt}
          </span>
          <button
            onClick={() => setSelectedProductForModal(null)}
            className="px-4 py-2 text-xs font-semibold bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 rounded-xl transition-colors"
          >
            Đóng
          </button>
        </div>
      </div>
    </div>
  );
}
