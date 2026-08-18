"use client";

import React, { useState } from "react";
import { useApp } from "@/context/AppContext";
import { ScoringWeightsConfig } from "@/lib/types";
import { 
  Sliders, 
  RotateCcw, 
  Save, 
  CheckCircle2, 
  Factory, 
  DollarSign, 
  TrendingUp, 
  ShieldCheck, 
  Sparkles, 
  Layers
} from "lucide-react";

export function ConfigView() {
  const { scoringWeights, updateScoringWeights } = useApp();
  const [weights, setWeights] = useState<ScoringWeightsConfig>({ ...scoringWeights });
  const [savedSuccess, setSavedSuccess] = useState(false);

  // Group Sum Calculations
  const productionSum = weights.production_fit + weights.production_time + weights.seasonality_fit + weights.personalization_level;
  const financialSum = weights.potential_revenue + weights.profit_margin;
  const marketSum = weights.market_demand + weights.growth_rate + weights.competition_level;
  const totalSum = productionSum + financialSum + marketSum;

  const handleSliderChange = (key: keyof ScoringWeightsConfig, val: number) => {
    setWeights((prev) => ({
      ...prev,
      [key]: val,
    }));
  };

  const applyPreset = (type: "default" | "high_margin" | "fast_production" | "peak_season") => {
    switch (type) {
      case "high_margin":
        setWeights({
          production_fit: 0.05,
          production_time: 0.05,
          seasonality_fit: 0.05,
          personalization_level: 0.05,
          potential_revenue: 0.20,
          profit_margin: 0.30,
          market_demand: 0.15,
          growth_rate: 0.10,
          competition_level: 0.05,
          recommendedThreshold: 75,
          reviewThreshold: 55,
        });
        break;
      case "fast_production":
        setWeights({
          production_fit: 0.20,
          production_time: 0.15,
          seasonality_fit: 0.10,
          personalization_level: 0.05,
          potential_revenue: 0.10,
          profit_margin: 0.15,
          market_demand: 0.10,
          growth_rate: 0.05,
          competition_level: 0.10,
          recommendedThreshold: 70,
          reviewThreshold: 50,
        });
        break;
      case "peak_season":
        setWeights({
          production_fit: 0.10,
          production_time: 0.05,
          seasonality_fit: 0.20,
          personalization_level: 0.05,
          potential_revenue: 0.15,
          profit_margin: 0.15,
          market_demand: 0.15,
          growth_rate: 0.10,
          competition_level: 0.05,
          recommendedThreshold: 70,
          reviewThreshold: 50,
        });
        break;
      default:
        setWeights({
          production_fit: 0.10,
          production_time: 0.05,
          seasonality_fit: 0.10,
          personalization_level: 0.05,
          potential_revenue: 0.15,
          profit_margin: 0.20,
          market_demand: 0.15,
          growth_rate: 0.10,
          competition_level: 0.10,
          recommendedThreshold: 70,
          reviewThreshold: 50,
        });
        break;
    }
  };

  const handleSave = () => {
    updateScoringWeights(weights);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Header Banner */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-slate-900 via-[#0c1626] to-[#0f2438] border border-slate-800 text-white shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
              9-Metric Decision Engine
            </span>
            <span className="text-xs text-slate-300">Cấu Hình Trọng Số & Ra Quyết Định</span>
          </div>
          <h2 className="text-xl font-black text-white">Cấu Hình Trọng Số Chấm Điểm Cơ Hội Sản Phẩm</h2>
          <p className="text-xs text-slate-300 max-w-2xl leading-relaxed">
            Hệ thống áp dụng thuật toán chấm điểm theo 3 nhóm cốt lõi: <strong>Khả năng Sản xuất (Production)</strong>, <strong>Hiệu quả Tài chính (Financial)</strong> và <strong>Tiềm năng Thị trường (Market)</strong>.
          </p>
        </div>

        {/* Save button */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={() => applyPreset("default")}
            className="flex items-center gap-1.5 px-3.5 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold rounded-xl transition-all"
          >
            <RotateCcw size={14} />
            <span>Mặc Định</span>
          </button>
          <button
            onClick={handleSave}
            className="flex items-center gap-1.5 px-4 py-2 bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-white text-xs font-semibold rounded-xl shadow-lg shadow-cyan-500/20 transition-all hover:scale-[1.02] active:scale-[0.98]"
          >
            <Save size={15} />
            <span>Lưu & Tái Chấm Điểm</span>
          </button>
        </div>
      </div>

      {savedSuccess && (
        <div className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 text-xs font-semibold flex items-center gap-2 animate-in fade-in">
          <CheckCircle2 size={16} />
          <span>Đã cập nhật trọng số và tự động chấm điểm lại toàn bộ sản phẩm trong hệ thống!</span>
        </div>
      )}

      {/* Preset Strategy Selector */}
      <div className="p-4 rounded-2xl bg-white dark:bg-[#0f172a] border border-slate-200 dark:border-slate-800 shadow-sm space-y-2">
        <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
          Chọn Chiến Lược R&D Mẫu (Presets):
        </span>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => applyPreset("default")}
            className="px-3.5 py-1.5 rounded-xl text-xs font-semibold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
          >
            ⚖️ Cân Bằng Chuẩn Printway (30% - 35% - 35%)
          </button>
          <button
            onClick={() => applyPreset("high_margin")}
            className="px-3.5 py-1.5 rounded-xl text-xs font-semibold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
          >
            💰 Ưu Tiên Biên Lợi Nhuận Cao (High Margin)
          </button>
          <button
            onClick={() => applyPreset("fast_production")}
            className="px-3.5 py-1.5 rounded-xl text-xs font-semibold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
          >
            ⚡ Ưu Tiên Lead Time Xưởng Nhanh (Fast Production)
          </button>
          <button
            onClick={() => applyPreset("peak_season")}
            className="px-3.5 py-1.5 rounded-xl text-xs font-semibold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
          >
            🎄 Tập Trung Điểm Rơi Mùa Vụ Q4 (Peak Season)
          </button>
        </div>
      </div>

      {/* 3 Weight Groups Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Group 1: Production Capability */}
        <div className="p-6 rounded-2xl bg-white dark:bg-[#0f172a] border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
            <div className="flex items-center gap-2">
              <Factory size={18} className="text-cyan-500" />
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white">
                1. Khả Năng Sản Xuất
              </h3>
            </div>
            <span className="text-xs font-mono font-bold text-cyan-600 dark:text-cyan-400 bg-cyan-500/10 px-2 py-0.5 rounded-full">
              {(productionSum * 100).toFixed(0)}%
            </span>
          </div>

          <div className="space-y-4 text-xs">
            <div>
              <div className="flex justify-between font-medium mb-1">
                <span className="text-slate-700 dark:text-slate-300">Production Fit (Khớp phôi Printway)</span>
                <span className="font-mono font-bold text-cyan-600">{(weights.production_fit * 100).toFixed(0)}%</span>
              </div>
              <input
                type="range"
                min={0}
                max={0.3}
                step={0.01}
                value={weights.production_fit}
                onChange={(e) => handleSliderChange("production_fit", Number(e.target.value))}
                className="w-full accent-cyan-500"
              />
            </div>

            <div>
              <div className="flex justify-between font-medium mb-1">
                <span className="text-slate-700 dark:text-slate-300">Production Time (Lead time giao hàng)</span>
                <span className="font-mono font-bold text-cyan-600">{(weights.production_time * 100).toFixed(0)}%</span>
              </div>
              <input
                type="range"
                min={0}
                max={0.2}
                step={0.01}
                value={weights.production_time}
                onChange={(e) => handleSliderChange("production_time", Number(e.target.value))}
                className="w-full accent-cyan-500"
              />
            </div>

            <div>
              <div className="flex justify-between font-medium mb-1">
                <span className="text-slate-700 dark:text-slate-300">Seasonality Fit (Phù hợp mùa vụ)</span>
                <span className="font-mono font-bold text-cyan-600">{(weights.seasonality_fit * 100).toFixed(0)}%</span>
              </div>
              <input
                type="range"
                min={0}
                max={0.3}
                step={0.01}
                value={weights.seasonality_fit}
                onChange={(e) => handleSliderChange("seasonality_fit", Number(e.target.value))}
                className="w-full accent-cyan-500"
              />
            </div>

            <div>
              <div className="flex justify-between font-medium mb-1">
                <span className="text-slate-700 dark:text-slate-300">Personalization Level (Mức cá nhân hóa)</span>
                <span className="font-mono font-bold text-cyan-600">{(weights.personalization_level * 100).toFixed(0)}%</span>
              </div>
              <input
                type="range"
                min={0}
                max={0.2}
                step={0.01}
                value={weights.personalization_level}
                onChange={(e) => handleSliderChange("personalization_level", Number(e.target.value))}
                className="w-full accent-cyan-500"
              />
            </div>
          </div>
        </div>

        {/* Group 2: Financial Performance */}
        <div className="p-6 rounded-2xl bg-white dark:bg-[#0f172a] border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
            <div className="flex items-center gap-2">
              <DollarSign size={18} className="text-emerald-500" />
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white">
                2. Hiệu Quả Tài Chính
              </h3>
            </div>
            <span className="text-xs font-mono font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full">
              {(financialSum * 100).toFixed(0)}%
            </span>
          </div>

          <div className="space-y-4 text-xs">
            <div>
              <div className="flex justify-between font-medium mb-1">
                <span className="text-slate-700 dark:text-slate-300">Potential Revenue (Doanh thu tiềm năng)</span>
                <span className="font-mono font-bold text-emerald-600">{(weights.potential_revenue * 100).toFixed(0)}%</span>
              </div>
              <input
                type="range"
                min={0}
                max={0.35}
                step={0.01}
                value={weights.potential_revenue}
                onChange={(e) => handleSliderChange("potential_revenue", Number(e.target.value))}
                className="w-full accent-emerald-500"
              />
            </div>

            <div>
              <div className="flex justify-between font-medium mb-1">
                <span className="text-slate-700 dark:text-slate-300">Profit Margin (Biên lợi nhuận ròng)</span>
                <span className="font-mono font-bold text-emerald-600">{(weights.profit_margin * 100).toFixed(0)}%</span>
              </div>
              <input
                type="range"
                min={0}
                max={0.4}
                step={0.01}
                value={weights.profit_margin}
                onChange={(e) => handleSliderChange("profit_margin", Number(e.target.value))}
                className="w-full accent-emerald-500"
              />
            </div>
          </div>
        </div>

        {/* Group 3: Market Opportunity */}
        <div className="p-6 rounded-2xl bg-white dark:bg-[#0f172a] border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
            <div className="flex items-center gap-2">
              <TrendingUp size={18} className="text-indigo-500" />
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white">
                3. Tiềm Năng Thị Trường
              </h3>
            </div>
            <span className="text-xs font-mono font-bold text-indigo-600 dark:text-indigo-400 bg-indigo-500/10 px-2 py-0.5 rounded-full">
              {(marketSum * 100).toFixed(0)}%
            </span>
          </div>

          <div className="space-y-4 text-xs">
            <div>
              <div className="flex justify-between font-medium mb-1">
                <span className="text-slate-700 dark:text-slate-300">Market Demand (Lực cầu / Search Vol)</span>
                <span className="font-mono font-bold text-indigo-600">{(weights.market_demand * 100).toFixed(0)}%</span>
              </div>
              <input
                type="range"
                min={0}
                max={0.3}
                step={0.01}
                value={weights.market_demand}
                onChange={(e) => handleSliderChange("market_demand", Number(e.target.value))}
                className="w-full accent-indigo-500"
              />
            </div>

            <div>
              <div className="flex justify-between font-medium mb-1">
                <span className="text-slate-700 dark:text-slate-300">Growth Rate (Tốc độ tăng trưởng)</span>
                <span className="font-mono font-bold text-indigo-600">{(weights.growth_rate * 100).toFixed(0)}%</span>
              </div>
              <input
                type="range"
                min={0}
                max={0.25}
                step={0.01}
                value={weights.growth_rate}
                onChange={(e) => handleSliderChange("growth_rate", Number(e.target.value))}
                className="w-full accent-indigo-500"
              />
            </div>

            <div>
              <div className="flex justify-between font-medium mb-1">
                <span className="text-slate-700 dark:text-slate-300">Competition Level (Mức độ cạnh tranh)</span>
                <span className="font-mono font-bold text-indigo-600">{(weights.competition_level * 100).toFixed(0)}%</span>
              </div>
              <input
                type="range"
                min={0}
                max={0.25}
                step={0.01}
                value={weights.competition_level}
                onChange={(e) => handleSliderChange("competition_level", Number(e.target.value))}
                className="w-full accent-indigo-500"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Decision Threshold Settings */}
      <div className="p-6 rounded-2xl bg-white dark:bg-[#0f172a] border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white">
          Cấu Hình Ngưỡng Điểm Quyết Định (Decision Thresholds)
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
          <div className="p-4 rounded-xl bg-emerald-500/5 dark:bg-emerald-500/10 border border-emerald-500/20 space-y-2">
            <div className="flex justify-between font-bold text-emerald-600 dark:text-emerald-400">
              <span>🟢 Ngưỡng Đạt Chuẩn (Recommended)</span>
              <span className="font-mono">&gt;= {weights.recommendedThreshold} Điểm</span>
            </div>
            <input
              type="range"
              min={60}
              max={85}
              step={1}
              value={weights.recommendedThreshold}
              onChange={(e) => handleSliderChange("recommendedThreshold", Number(e.target.value))}
              className="w-full accent-emerald-500"
            />
            <p className="text-[11px] text-slate-500">Sản phẩm có tổng điểm &gt;= mức này sẽ tự động gắn nhãn "NÊN BÁN / NÊN SẢN XUẤT".</p>
          </div>

          <div className="p-4 rounded-xl bg-amber-500/5 dark:bg-amber-500/10 border border-amber-500/20 space-y-2">
            <div className="flex justify-between font-bold text-amber-600 dark:text-amber-400">
              <span>🟡 Ngưỡng Cần Xem Xét (Review Required)</span>
              <span className="font-mono">{weights.reviewThreshold} - {weights.recommendedThreshold - 1} Điểm</span>
            </div>
            <input
              type="range"
              min={40}
              max={65}
              step={1}
              value={weights.reviewThreshold}
              onChange={(e) => handleSliderChange("reviewThreshold", Number(e.target.value))}
              className="w-full accent-amber-500"
            />
            <p className="text-[11px] text-slate-500">Dưới mức này sẽ được phân loại thành "KHÔNG NÊN SẢN XUẤT".</p>
          </div>
        </div>
      </div>
    </div>
  );
}
