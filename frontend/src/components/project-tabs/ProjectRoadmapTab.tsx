"use client";

import React from "react";
import { useApp } from "@/context/AppContext";
import { 
  Compass, 
  Calendar, 
  Download, 
  CheckCircle2, 
  Sparkles, 
  TrendingUp, 
  FileText,
  Clock,
  Layers,
  ArrowRight
} from "lucide-react";

export function ProjectRoadmapTab() {
  const { currentProject, setSelectedProductForModal } = useApp();

  if (!currentProject) return null;

  const winningProducts = currentProject.products.filter((p) => p.decision === "RECOMMENDED");

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* 2x2 Opportunity Matrix */}
      <div className="p-6 rounded-2xl bg-white dark:bg-[#0f172a] border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">
              Ma Trận Cơ Hội & Khả Thi (Opportunity Matrix 2x2)
            </h3>
            <p className="text-xs text-slate-400">
              Phân loại sản phẩm dựa trên Nhu Cầu Thị Trường vs Khả Năng Sản Xuất Tại Printway
            </p>
          </div>

          <button
            onClick={() => alert("Đã xuất báo cáo R&D chiến dịch dưới dạng PDF/Excel thành công!")}
            className="flex items-center gap-1.5 px-3.5 py-1.5 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 text-xs font-semibold rounded-xl transition-colors shrink-0"
          >
            <Download size={14} />
            <span>Xuất Báo Cáo R&D (PDF)</span>
          </button>
        </div>

        {/* 2x2 Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
          {/* Quadrant 1: Winning Zone */}
          <div className="p-4 rounded-2xl bg-emerald-500/5 dark:bg-emerald-500/10 border border-emerald-500/30 space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
                <CheckCircle2 size={15} />
                <span>Zone 1: Winning Products (Ưu Tiên Scale)</span>
              </span>
              <span className="text-xs font-mono font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-500/20 px-2 py-0.5 rounded-full">
                {winningProducts.length} SP
              </span>
            </div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400">
              Nhu cầu thị trường lớn + Printway gia công nhanh, giá base rẻ, biên lợi nhuận &gt; 35%.
            </p>

            <div className="space-y-1.5 pt-1">
              {winningProducts.map((p) => (
                <div
                  key={p.id}
                  onClick={() => setSelectedProductForModal(p)}
                  className="p-2 rounded-xl bg-white dark:bg-slate-900/80 border border-emerald-500/20 text-xs text-slate-900 dark:text-slate-100 flex items-center justify-between hover:scale-[1.01] transition-transform cursor-pointer"
                >
                  <span className="truncate max-w-[70%] font-medium">{p.title}</span>
                  <span className="font-mono text-emerald-600 dark:text-emerald-400 font-bold">{p.overallScore.toFixed(1)} đ</span>
                </div>
              ))}
            </div>
          </div>

          {/* Quadrant 2: High Margin Niche */}
          <div className="p-4 rounded-2xl bg-cyan-500/5 dark:bg-cyan-500/10 border border-cyan-500/30 space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-cyan-600 dark:text-cyan-400 uppercase tracking-wider flex items-center gap-1.5">
                <Sparkles size={15} />
                <span>Zone 2: Niche High-Margin (Khám Phá Sâu)</span>
              </span>
              <span className="text-xs font-mono font-bold text-cyan-600 dark:text-cyan-400 bg-cyan-500/20 px-2 py-0.5 rounded-full">
                2 SP
              </span>
            </div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400">
              Sản phẩm ngách ít đối thủ, giá bán AOV cao, Printway có thể đáp ứng độc quyền.
            </p>
            <div className="space-y-1.5 pt-1">
              <div className="p-2 rounded-xl bg-white dark:bg-slate-900/80 border border-cyan-500/20 text-xs text-slate-900 dark:text-slate-100 flex items-center justify-between">
                <span className="truncate max-w-[70%] font-medium">Grandma Birth Flower Night Light</span>
                <span className="font-mono text-cyan-600 dark:text-cyan-400 font-bold">81.5 đ</span>
              </div>
            </div>
          </div>

          {/* Quadrant 3: High Volume Low Margin */}
          <div className="p-4 rounded-2xl bg-amber-500/5 dark:bg-amber-500/10 border border-amber-500/30 space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-amber-600 dark:text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
                <Clock size={15} />
                <span>Zone 3: High Demand but Fierce (Cần Tối Ưu Base)</span>
              </span>
              <span className="text-xs font-mono font-bold text-amber-600 dark:text-amber-400 bg-amber-500/20 px-2 py-0.5 rounded-full">
                1 SP
              </span>
            </div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400">
              Thị trường tìm kiếm nhiều nhưng giá cạnh tranh gay gắt, cần đàm phán giảm Base Cost.
            </p>
          </div>

          {/* Quadrant 4: High Risk */}
          <div className="p-4 rounded-2xl bg-rose-500/5 dark:bg-rose-500/10 border border-rose-500/30 space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-rose-600 dark:text-rose-400 uppercase tracking-wider flex items-center gap-1.5">
                <Layers size={15} />
                <span>Zone 4: Bottleneck / High Risk (Không Nên Bán)</span>
              </span>
              <span className="text-xs font-mono font-bold text-rose-600 dark:text-rose-400 bg-rose-500/20 px-2 py-0.5 rounded-full">
                0 SP
              </span>
            </div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400">
              Khó gia công, dễ vỡ khi ship hoặc thời gian lead time quá lâu.
            </p>
          </div>
        </div>
      </div>

      {/* Prioritized Launch Roadmap */}
      <div className="p-6 rounded-2xl bg-white dark:bg-[#0f172a] border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
        <div className="flex items-center gap-2">
          <Calendar size={16} className="text-cyan-500" />
          <h3 className="text-sm font-bold text-slate-900 dark:text-white">
            Lộ Trình Triển Khai Chiến Dịch R&D ({currentProject.season})
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 pt-2">
          {/* Phase 1 */}
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 space-y-2 relative">
            <div className="w-6 h-6 rounded-full bg-cyan-500 text-white font-bold text-xs flex items-center justify-center">1</div>
            <h4 className="text-xs font-bold text-slate-900 dark:text-white">Giai đoạn 1: Chuẩn Bị Artwork</h4>
            <span className="text-[10px] text-cyan-600 font-mono block">Tuần 1 - 2 (Tháng 9)</span>
            <p className="text-[11px] text-slate-500 dark:text-slate-400">
              Lên 30 mẫu artwork cá nhân hóa cho ngách Dog Mom và Grandma Gift.
            </p>
          </div>

          {/* Phase 2 */}
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 space-y-2">
            <div className="w-6 h-6 rounded-full bg-indigo-500 text-white font-bold text-xs flex items-center justify-center">2</div>
            <h4 className="text-xs font-bold text-slate-900 dark:text-white">Giai đoạn 2: Test Mẫu Phôi Base</h4>
            <span className="text-[10px] text-indigo-500 font-mono block">Tuần 3 - 4 (Tháng 9)</span>
            <p className="text-[11px] text-slate-500 dark:text-slate-400">
              Đặt in mẫu test phôi Acrylic 2D và áo nỉ G185 tại xưởng US để kiểm tra độ sắc nét.
            </p>
          </div>

          {/* Phase 3 */}
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 space-y-2">
            <div className="w-6 h-6 rounded-full bg-amber-500 text-white font-bold text-xs flex items-center justify-center">3</div>
            <h4 className="text-xs font-bold text-slate-900 dark:text-white">Giai đoạn 3: Launch Early Bird</h4>
            <span className="text-[10px] text-amber-500 font-mono block">Tháng 10 (Early Q4)</span>
            <p className="text-[11px] text-slate-500 dark:text-slate-400">
              Đăng listing lên Etsy/Amazon, chạy test ads $50/ngày để lấy review và ranking sớm.
            </p>
          </div>

          {/* Phase 4 */}
          <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 space-y-2">
            <div className="w-6 h-6 rounded-full bg-emerald-500 text-white font-bold text-xs flex items-center justify-center">4</div>
            <h4 className="text-xs font-bold text-emerald-600 dark:text-emerald-400">Giai đoạn 4: Scale Đón Peak BFCM</h4>
            <span className="text-[10px] text-emerald-500 font-mono block">Tháng 11 - 12 (BFCM)</span>
            <p className="text-[11px] text-slate-700 dark:text-slate-300">
              Tối đa ngân sách ads, đồng bộ đơn hàng tự động về Printway API đảm bảo fulfillment 24h.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
