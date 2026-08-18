"use client";

import React, { useState } from "react";
import { useApp } from "@/context/AppContext";
import { X, Plus, Trash2, FolderPlus, Sparkles, Tag } from "lucide-react";
import { TargetMarket } from "@/lib/types";

interface NewProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function NewProjectModal({ isOpen, onClose }: NewProjectModalProps) {
  const { addProject } = useApp();

  const [name, setName] = useState("");
  const [season, setSeason] = useState("Q4 Holiday 2026");
  const [description, setDescription] = useState("");
  const [targetMarket, setTargetMarket] = useState<TargetMarket>("US");
  const [targetRevenueGoal, setTargetRevenueGoal] = useState<number>(100000);
  
  // Dynamic Niches list
  const [nicheInputs, setNicheInputs] = useState<Array<{ name: string; tag: string }>>([
    { name: "Personalized Dog Mom & Pet", tag: "dog-mom" },
    { name: "Family & Grandma Keepsakes", tag: "grandma-family" }
  ]);

  const [newNicheName, setNewNicheName] = useState("");

  if (!isOpen) return null;

  const handleAddNiche = () => {
    if (!newNicheName.trim()) return;
    const tag = newNicheName.toLowerCase().replace(/[^a-z0-9]/g, "-").replace(/-+/g, "-");
    setNicheInputs([...nicheInputs, { name: newNicheName.trim(), tag }]);
    setNewNicheName("");
  };

  const handleRemoveNiche = (index: number) => {
    setNicheInputs(nicheInputs.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    const niches = nicheInputs.map((n, idx) => ({
      id: `niche_${Date.now()}_${idx}`,
      name: n.name,
      tag: n.tag,
      searchVolumeMonthly: Math.floor(Math.random() * 50000) + 30000,
      growthRate: `+${Math.floor(Math.random() * 40) + 15}%`,
      competition: (["Low", "Medium", "High"] as const)[Math.floor(Math.random() * 3)],
      seasonalityPeak: season.includes("Q4") ? "Oct - Dec" : "March - May",
      productCount: 0,
      avgOpportunityScore: 80.0,
      breakoutKeywords: [`${n.name} gift 2026`, `Custom ${n.name} keepsakes`],
      topAngles: [`Thiết kế cá nhân hóa cho ngách ${n.name}`]
    }));

    addProject({
      name: name.trim(),
      season,
      description: description.trim() || `Dự án R&D theo mùa vụ ${season}`,
      targetMarket,
      status: "RESEARCHING",
      targetRevenueGoal,
      niches
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white dark:bg-[#0f172a] border border-slate-200 dark:border-slate-800 w-full max-w-xl rounded-2xl shadow-2xl overflow-hidden text-slate-800 dark:text-slate-100">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 dark:border-slate-800/80 bg-slate-50 dark:bg-slate-900/50">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-cyan-500/10 dark:bg-cyan-500/20 text-cyan-600 dark:text-cyan-400">
              <FolderPlus size={20} />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-900 dark:text-white">Tạo Dự Án R&D Mới</h2>
              <p className="text-xs text-slate-500">Khởi tạo không gian nghiên cứu sản phẩm theo mùa vụ và ngách</p>
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
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1.5">
              Tên Dự Án R&D *
            </label>
            <input
              type="text"
              required
              placeholder="VD: Q4 Christmas 2026 - Ornament & Apparel Blitz"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 rounded-xl px-3.5 py-2 text-sm text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500/40"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1.5">
                Mùa Vụ / Chiến Dịch
              </label>
              <select
                value={season}
                onChange={(e) => setSeason(e.target.value)}
                className="w-full bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 rounded-xl px-3.5 py-2 text-sm text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-cyan-500/40"
              >
                <option value="Q4 Holiday 2026">Q4 Holiday 2026 (Christmas & NY)</option>
                <option value="Spring & Mother's Day 2027">Spring & Mother's Day 2027</option>
                <option value="Father's Day 2027">Father's Day 2027</option>
                <option value="Halloween 2026">Halloween & Fall 2026</option>
                <option value="Evergreen Core 2026">Evergreen Core (Quanh năm)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1.5">
                Thị Trường Mục Tiêu
              </label>
              <select
                value={targetMarket}
                onChange={(e) => setTargetMarket(e.target.value as TargetMarket)}
                className="w-full bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 rounded-xl px-3.5 py-2 text-sm text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-cyan-500/40"
              >
                <option value="US">🇺🇸 United States (US)</option>
                <option value="UK">🇬🇧 United Kingdom (UK)</option>
                <option value="EU">🇪🇺 European Union (EU)</option>
                <option value="WW">🌍 Toàn cầu (Worldwide)</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1.5">
              Mục Tiêu Doanh Thu Kỳ Vọng ($)
            </label>
            <input
              type="number"
              min={1000}
              step={5000}
              value={targetRevenueGoal}
              onChange={(e) => setTargetRevenueGoal(Number(e.target.value))}
              className="w-full bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 rounded-xl px-3.5 py-2 text-sm text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-cyan-500/40"
            />
          </div>

          {/* Niches / Sub-categories */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1.5">
              Các Ngách Mục Tiêu (Niches / Tags Phân Loại)
            </label>
            
            <div className="flex gap-2 mb-3">
              <input
                type="text"
                placeholder="Nhập tên ngách (VD: Teacher Appreciation, Pet Memorial...)"
                value={newNicheName}
                onChange={(e) => setNewNicheName(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    handleAddNiche();
                  }
                }}
                className="flex-1 bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 rounded-xl px-3.5 py-2 text-xs text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500/40"
              />
              <button
                type="button"
                onClick={handleAddNiche}
                className="px-3.5 py-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 text-xs font-semibold rounded-xl flex items-center gap-1 transition-colors"
              >
                <Plus size={14} />
                <span>Thêm</span>
              </button>
            </div>

            <div className="space-y-1.5 max-h-36 overflow-y-auto pr-1">
              {nicheInputs.map((niche, idx) => (
                <div 
                  key={idx} 
                  className="flex items-center justify-between px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 text-xs"
                >
                  <div className="flex items-center gap-2">
                    <Tag size={13} className="text-cyan-500" />
                    <span className="font-medium text-slate-800 dark:text-slate-200">{niche.name}</span>
                    <span className="text-[10px] font-mono text-slate-400">#{niche.tag}</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleRemoveNiche(idx)}
                    className="text-slate-400 hover:text-red-500 transition-colors p-1"
                  >
                    <Trash2 size={13} />
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1.5">
              Mô Tả Mục Tiêu Dự Án
            </label>
            <textarea
              rows={2}
              placeholder="Ghi chú thêm về định hướng thiết kế, budget, nhân sự phụ trách..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 rounded-xl px-3.5 py-2 text-xs text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500/40 resize-none"
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
              Khởi Tạo Dự Án
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
