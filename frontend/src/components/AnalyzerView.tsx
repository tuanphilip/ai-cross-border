"use client";

import React, { useState, useEffect } from "react";
import { Search, Sparkles, CheckCircle2, XCircle, DollarSign, Factory, TrendingUp, Loader2 } from "lucide-react";
import { OpportunityAnalysisResult, api } from "@/lib/api";

interface AnalyzerViewProps {
  initialQuery?: string;
}

export const AnalyzerView: React.FC<AnalyzerViewProps> = ({ initialQuery = "" }) => {
  const [query, setQuery] = useState(initialQuery || "Personalized Grandpa Acrylic Ornament Gift");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<OpportunityAnalysisResult | null>(null);

  const handleAnalyze = async (searchQuery?: string) => {
    const targetQuery = searchQuery || query;
    if (!targetQuery.trim()) return;

    setLoading(true);
    try {
      const res = await api.post<OpportunityAnalysisResult>("/analyze", {
        query_or_url: targetQuery,
      });
      setResult(res.data);
    } catch (err) {
      console.error("Analysis failed", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (initialQuery) {
      setQuery(initialQuery);
      handleAnalyze(initialQuery);
    } else {
      handleAnalyze("Personalized Grandpa Acrylic Ornament Gift");
    }
  }, [initialQuery]);

  const quickSamples = [
    "Personalized Grandpa Acrylic Ornament Gift",
    "Custom Pet Dog Portrait Wooden Wall Sign",
    "Pickleball Stainless Steel Tumbler 40oz",
    "Nurse Life 11oz Ceramic Coffee Mug",
    "Cheap plastic spinner toy (Negative Test)",
  ];

  return (
    <div className="space-y-8">
      {/* Search Input Bar */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
        <div>
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-cyan-400" />
            Công Cụ Phân Tích & Chấm Điểm Cơ Hội Sản Phẩm (Product Opportunity Analyzer)
          </h2>
          <p className="text-xs text-slate-400">
            Nhập từ khóa SEO, tên sản phẩm hoặc link listing Etsy/Amazon để AI tự động Map SKU Printway và tính toán 9 chỉ số
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="VD: Personalized Grandpa Acrylic Ornament Gift hoặc link Etsy..."
              className="w-full bg-slate-950/80 border border-slate-700 hover:border-cyan-500 focus:border-cyan-500 rounded-xl py-3 pl-11 pr-4 text-sm text-white focus:outline-none transition-colors"
              onKeyDown={(e) => e.key === "Enter" && handleAnalyze()}
            />
          </div>

          <button
            onClick={() => handleAnalyze()}
            disabled={loading}
            className="flex items-center justify-center gap-2 px-8 py-3 bg-cyan-600 hover:bg-cyan-500 disabled:opacity-50 text-white font-semibold text-sm rounded-xl shadow-lg shadow-cyan-600/30 transition-all"
          >
            {loading && <Loader2 className="w-4 h-4 animate-spin" />}
            Phân Tích Ngay
          </button>
        </div>

        {/* Quick Click Samples */}
        <div className="flex items-center gap-2 flex-wrap text-xs text-slate-400 pt-1">
          <span className="text-slate-500 font-medium">Mẫu thử nghiệm:</span>
          {quickSamples.map((sample) => (
            <button
              key={sample}
              onClick={() => {
                setQuery(sample);
                handleAnalyze(sample);
              }}
              className="px-2.5 py-1 rounded-full bg-slate-800/80 hover:bg-slate-700 text-slate-300 border border-slate-700/60 hover:text-cyan-300 transition-colors"
            >
              {sample}
            </button>
          ))}
        </div>
      </div>

      {/* Analysis Results Display */}
      {loading ? (
        <div className="flex flex-col items-center justify-center p-16 bg-slate-900/40 rounded-2xl border border-slate-800 gap-4">
          <Loader2 className="w-10 h-10 text-cyan-400 animate-spin" />
          <p className="text-sm text-cyan-400 font-medium animate-pulse">
            Đang chạy AI Listing Mapping & Tính toán 9 Chỉ số Chấm điểm...
          </p>
        </div>
      ) : result ? (
        <div className="space-y-6">
          {/* Main Decision Banner */}
          <div
            className={`border rounded-2xl p-6 shadow-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6 ${
              result.decision === "RECOMMENDED"
                ? "bg-emerald-950/30 border-emerald-500/40 shadow-emerald-500/10"
                : "bg-rose-950/30 border-rose-500/40 shadow-rose-500/10"
            }`}
          >
            <div className="flex items-start gap-4">
              <div
                className={`p-3.5 rounded-2xl border ${
                  result.decision === "RECOMMENDED"
                    ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-400"
                    : "bg-rose-500/10 border-rose-500/30 text-rose-400"
                }`}
              >
                {result.decision === "RECOMMENDED" ? (
                  <CheckCircle2 className="w-10 h-10" />
                ) : (
                  <XCircle className="w-10 h-10" />
                )}
              </div>

              <div className="space-y-1.5">
                <div className="flex items-center gap-3 flex-wrap">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-bold tracking-wider ${
                      result.decision === "RECOMMENDED"
                        ? "bg-emerald-500 text-white shadow-md shadow-emerald-500/30"
                        : "bg-rose-500 text-white shadow-md shadow-rose-500/30"
                    }`}
                  >
                    {result.decision === "RECOMMENDED" ? "🟢 NÊN SẢN XUẤT / NÊN BÁN" : "🔴 KHÔNG NÊN SẢN XUẤT / BÁN"}
                  </span>
                  <span className="text-xs text-slate-400">Thời gian đánh giá: {result.timestamp}</span>
                </div>
                <p className="text-sm text-slate-200 leading-relaxed font-medium">
                  {result.ai_recommendation_summary}
                </p>
                <div className="flex items-center gap-4 text-xs text-slate-400 pt-1 flex-wrap">
                  <span>Ngách đề xuất: <strong className="text-cyan-400">{result.suggested_niche}</strong></span>
                  <span>• Thời điểm ra mắt tối ưu: <strong className="text-emerald-400">{result.optimal_launch_window}</strong></span>
                  <span>• Biên lợi nhuận dự kiến: <strong className="text-amber-400">{result.estimated_profit_margin}%</strong></span>
                </div>
              </div>
            </div>

            {/* Overall Score */}
            <div className="text-center md:text-right w-full md:w-auto p-4 bg-slate-900/90 rounded-2xl border border-slate-800 shrink-0">
              <div className="text-xs text-slate-400 font-medium">Tổng Điểm Cơ Hội</div>
              <div
                className={`text-4xl font-black ${
                  result.decision === "RECOMMENDED" ? "text-emerald-400" : "text-rose-400"
                }`}
              >
                {result.overall_score}
                <span className="text-sm text-slate-500 font-normal">/100</span>
              </div>
            </div>
          </div>

          {/* AI Listing Mapping Card (Pain Point #1 Solution) */}
          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 shadow-md space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <div className="p-1.5 bg-cyan-500/10 rounded-lg text-cyan-400">
                  <Sparkles className="w-4 h-4" />
                </div>
                <h3 className="text-sm font-bold text-white">
                  Kết Quả AI Ghép Nối Dữ Liệu (Listing Mapping Engine)
                </h3>
              </div>
              <span className="px-2.5 py-0.5 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 text-xs font-semibold">
                Độ chính xác AI: {(result.mapped_product.confidence_score * 100).toFixed(0)}%
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Input SEO Name */}
              <div className="p-4 bg-slate-950/70 rounded-xl border border-slate-800 space-y-1">
                <span className="text-[11px] font-semibold text-slate-400">TÊN GỐC TỪ SÀN TMĐT / SEO NAME</span>
                <p className="text-sm font-medium text-slate-200">{result.input_query}</p>
              </div>

              {/* Mapped Printway SKU */}
              <div className="p-4 bg-cyan-950/20 rounded-xl border border-cyan-800/40 space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-semibold text-cyan-400">MÃ SKU CATALOG GỐC TẠI PRINTWAY</span>
                  <span className="text-xs font-mono font-bold text-emerald-400">{result.mapped_product.sku}</span>
                </div>
                <p className="text-sm font-bold text-white">{result.mapped_product.product_name}</p>
                <div className="flex items-center gap-3 text-xs text-slate-400 pt-1 flex-wrap">
                  <span>Chất liệu: <strong className="text-slate-300">{result.mapped_product.material}</strong></span>
                  <span>• Giá vốn (COGS): <strong className="text-amber-400">${result.mapped_product.base_cost}</strong></span>
                  <span>• Thời gian sản xuất: <strong className="text-emerald-400">{result.mapped_product.production_days} ngày</strong></span>
                </div>
              </div>
            </div>
          </div>

          {/* 9-Metric Scorecard */}
          <div className="space-y-4">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-cyan-400" />
              Chi Tiết Bộ 9 Chỉ Số Chấm Điểm (Product Scoring Breakdown)
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Group 1: Production */}
              <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 shadow-md space-y-3">
                <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                  <div className="flex items-center gap-2">
                    <Factory className="w-4 h-4 text-cyan-400" />
                    <h4 className="text-xs font-bold text-white uppercase tracking-wider">1. Khả Năng Sản Xuất</h4>
                  </div>
                  <span className="text-xs font-bold text-cyan-400">{result.group_scores.production}/10</span>
                </div>

                <div className="space-y-3 pt-1">
                  {result.metrics
                    .filter((m) => m.group === "production")
                    .map((metric) => (
                      <div key={metric.name} className="space-y-1.5">
                        <div className="flex justify-between text-xs">
                          <span className="text-slate-300 font-medium">{metric.name}</span>
                          <span className="text-cyan-400 font-bold">{metric.score}/10 ({metric.raw_value})</span>
                        </div>
                        <div className="w-full bg-slate-800 rounded-full h-1.5 overflow-hidden">
                          <div
                            className="bg-cyan-500 h-full rounded-full transition-all"
                            style={{ width: `${metric.score * 10}%` }}
                          />
                        </div>
                        <p className="text-[11px] text-slate-500">{metric.description}</p>
                      </div>
                    ))}
                </div>
              </div>

              {/* Group 2: Financial */}
              <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 shadow-md space-y-3">
                <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                  <div className="flex items-center gap-2">
                    <DollarSign className="w-4 h-4 text-amber-400" />
                    <h4 className="text-xs font-bold text-white uppercase tracking-wider">2. Hiệu Quả Tài Chính</h4>
                  </div>
                  <span className="text-xs font-bold text-amber-400">{result.group_scores.financial}/10</span>
                </div>

                <div className="space-y-3 pt-1">
                  {result.metrics
                    .filter((m) => m.group === "financial")
                    .map((metric) => (
                      <div key={metric.name} className="space-y-1.5">
                        <div className="flex justify-between text-xs">
                          <span className="text-slate-300 font-medium">{metric.name}</span>
                          <span className="text-amber-400 font-bold">{metric.score}/10 ({metric.raw_value})</span>
                        </div>
                        <div className="w-full bg-slate-800 rounded-full h-1.5 overflow-hidden">
                          <div
                            className="bg-amber-500 h-full rounded-full transition-all"
                            style={{ width: `${metric.score * 10}%` }}
                          />
                        </div>
                        <p className="text-[11px] text-slate-500">{metric.description}</p>
                      </div>
                    ))}
                </div>
              </div>

              {/* Group 3: Market */}
              <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 shadow-md space-y-3">
                <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                  <div className="flex items-center gap-2">
                    <TrendingUp className="w-4 h-4 text-emerald-400" />
                    <h4 className="text-xs font-bold text-white uppercase tracking-wider">3. Tiềm Năng Thị Trường</h4>
                  </div>
                  <span className="text-xs font-bold text-emerald-400">{result.group_scores.market}/10</span>
                </div>

                <div className="space-y-3 pt-1">
                  {result.metrics
                    .filter((m) => m.group === "market")
                    .map((metric) => (
                      <div key={metric.name} className="space-y-1.5">
                        <div className="flex justify-between text-xs">
                          <span className="text-slate-300 font-medium">{metric.name}</span>
                          <span className="text-emerald-400 font-bold">{metric.score}/10 ({metric.raw_value})</span>
                        </div>
                        <div className="w-full bg-slate-800 rounded-full h-1.5 overflow-hidden">
                          <div
                            className="bg-emerald-500 h-full rounded-full transition-all"
                            style={{ width: `${metric.score * 10}%` }}
                          />
                        </div>
                        <p className="text-[11px] text-slate-500">{metric.description}</p>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};
