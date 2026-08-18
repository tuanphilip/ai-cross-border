"use client";

import React, { useState } from "react";
import { useApp } from "@/context/AppContext";
import { 
  DownloadCloud, 
  Bot, 
  Link as LinkIcon, 
  FileSpreadsheet, 
  Play, 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  Sparkles, 
  Plus, 
  Trash2,
  RefreshCw,
  FolderKanban
} from "lucide-react";

export function DataIngestionView() {
  const { 
    projects, 
    crawlJobs, 
    addCrawlJob, 
    ingestionSubTab, 
    setIngestionSubTab,
    addResearchProductToProject,
    openProjectDetail
  } = useApp();

  // Auto Crawl Form State
  const [selectedProjectId, setSelectedProjectId] = useState<string>(projects[0]?.id || "");
  const [platform, setPlatform] = useState<"Etsy" | "Amazon" | "TikTok Shop" | "Pinterest">("Etsy");
  const [keyword, setKeyword] = useState("");
  const [targetCount, setTargetCount] = useState(100);
  const [selectedNicheTag, setSelectedNicheTag] = useState<string>("");

  // Manual URL Form State
  const [manualUrl, setManualUrl] = useState("");
  const [manualProjectTarget, setManualProjectTarget] = useState<string>(projects[0]?.id || "");
  const [isParsingManual, setIsParsingManual] = useState(false);
  const [manualPreview, setManualPreview] = useState<any>(null);

  // Excel Upload State
  const [isUploadingExcel, setIsUploadingExcel] = useState(false);
  const [excelUploadedCount, setExcelUploadedCount] = useState<number | null>(null);

  const targetProject = projects.find((p) => p.id === selectedProjectId) || projects[0];

  const handleStartAutoCrawl = (e: React.FormEvent) => {
    e.preventDefault();
    if (!keyword.trim() || !targetProject) return;

    const nicheTag = selectedNicheTag || targetProject.niches[0]?.tag || "general";

    addCrawlJob({
      projectId: targetProject.id,
      projectName: targetProject.name,
      nicheTag,
      platform,
      keyword: keyword.trim(),
      targetCount
    });

    setKeyword("");
    alert(`Đã khởi tạo Job Crawl tự động trên ${platform} cho từ khóa "${keyword}". Dữ liệu sẽ tự động đổ về dự án "${targetProject.name}".`);
  };

  const handleSimulateManualScrape = () => {
    if (!manualUrl) return;
    setIsParsingManual(true);
    setTimeout(() => {
      setIsParsingManual(false);
      setManualPreview({
        title: "Personalized Grandkids Heart Shaped Acrylic Plaque Keepsake Gift 2026",
        platform: manualUrl.includes("amazon") ? "Amazon" : manualUrl.includes("tiktok") ? "TikTok Shop" : "Etsy",
        price: 24.99,
        seller: "CraftyHeartUSA",
        salesEst: 720,
        imageUrl: "https://images.unsplash.com/photo-1543257580-7269da773bf5?w=500&auto=format&fit=crop&q=80",
        nicheTag: "grandma-family"
      });
    }, 900);
  };

  const handleSaveManualToProject = () => {
    if (!manualPreview || !manualProjectTarget) return;

    addResearchProductToProject(manualProjectTarget, {
      projectId: manualProjectTarget,
      nicheTag: manualPreview.nicheTag,
      title: manualPreview.title,
      platform: manualPreview.platform,
      sourceUrl: manualUrl || "https://etsy.com/listing/sample-item",
      imageUrl: manualPreview.imageUrl,
      sellerName: manualPreview.seller,
      retailPrice: manualPreview.price,
      estMonthlySales: manualPreview.salesEst,
      estMonthlyRevenue: manualPreview.price * manualPreview.salesEst,
      reviewCount: 140,
      rating: 4.9,
      mappedBaseSku: "PW-ORN-ACRYLIC-2D",
      matchConfidence: 0.95,
      overallScore: 84.5,
      decision: "RECOMMENDED",
      groupScores: { production: 9.0, financial: 8.5, market: 8.2 },
      metrics: [],
      estNetProfit: 10.20,
      estProfitMargin: 40.8,
      aiSummary: "Cào thủ công thành công, tự động map sang phôi Acrylic 2D của Printway.",
      designAngle: "Custom tên các thành viên trong gia đình",
      optimalLaunchWindow: "Tháng 10/2026"
    });

    setManualUrl("");
    setManualPreview(null);
    openProjectDetail(manualProjectTarget);
  };

  const handleSimulateExcelImport = () => {
    setIsUploadingExcel(true);
    setTimeout(() => {
      setIsUploadingExcel(false);
      setExcelUploadedCount(28);
      alert("Đã import thành công 28 sản phẩm nghiên cứu vào dự án đã chọn!");
    }, 1200);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Header Banner */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-slate-900 via-[#0c1626] to-[#0f2438] border border-slate-800 text-white shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
              Multi-Source Ingestion Engine
            </span>
            <span className="text-xs text-slate-300">Thu Thập Dữ Liệu Tự Động & Đa Nguồn</span>
          </div>
          <h2 className="text-xl font-black text-white">Trung Tâm Thu Thập & Nhập Liệu Sản Phẩm Nghiên Cứu</h2>
          <p className="text-xs text-slate-300 max-w-2xl leading-relaxed">
            Hỗ trợ 3 phương thức nạp dữ liệu: <strong>Crawl tự động</strong> theo ngách định kỳ, <strong>Cào link thủ công</strong> theo từng listing URL, hoặc <strong>Import hàng loạt từ Excel / CSV</strong> từ các công cụ Spy tools.
          </p>
        </div>
      </div>

      {/* HORIZONTAL SUB-TABS (Nằm ngang trong view chính) */}
      <div className="border-b border-slate-200 dark:border-slate-800/80 bg-white dark:bg-[#0c121e] rounded-2xl p-1.5 shadow-sm">
        <nav className="flex space-x-2" aria-label="Ingestion Tabs">
          <button
            onClick={() => setIngestionSubTab("auto_crawler")}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all
              ${ingestionSubTab === "auto_crawler"
                ? "bg-cyan-500 text-white shadow-md shadow-cyan-500/20"
                : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/60"
              }`}
          >
            <Bot size={16} />
            <span>1. Crawl Tự Động Theo Ngách (Auto Crawler)</span>
          </button>

          <button
            onClick={() => setIngestionSubTab("manual_url")}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all
              ${ingestionSubTab === "manual_url"
                ? "bg-cyan-500 text-white shadow-md shadow-cyan-500/20"
                : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/60"
              }`}
          >
            <LinkIcon size={16} />
            <span>2. Cào Link Thủ Công (Single URL Scraper)</span>
          </button>

          <button
            onClick={() => setIngestionSubTab("excel_import")}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all
              ${ingestionSubTab === "excel_import"
                ? "bg-cyan-500 text-white shadow-md shadow-cyan-500/20"
                : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/60"
              }`}
          >
            <FileSpreadsheet size={16} />
            <span>3. Import Excel / CSV (Bulk Spy Tools)</span>
          </button>
        </nav>
      </div>

      {/* TAB 1: AUTO CRAWLER */}
      {ingestionSubTab === "auto_crawler" && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left: Job Launcher Form */}
          <div className="lg:col-span-5 p-6 rounded-2xl bg-white dark:bg-[#0f172a] border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
            <div className="flex items-center gap-2 text-xs font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider">
              <Play size={16} className="text-cyan-500" />
              <span>Khởi Chạy Job Crawl Tự Động Mới</span>
            </div>

            <form onSubmit={handleStartAutoCrawl} className="space-y-4 text-xs">
              <div>
                <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">
                  Chọn Dự Án Đích *
                </label>
                <select
                  value={selectedProjectId}
                  onChange={(e) => setSelectedProjectId(e.target.value)}
                  className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-cyan-500/40"
                >
                  {projects.map((p) => (
                    <option key={p.id} value={p.id}>{p.name} ({p.season})</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">
                  Gán Vào Ngách Trực Thuộc *
                </label>
                <select
                  value={selectedNicheTag}
                  onChange={(e) => setSelectedNicheTag(e.target.value)}
                  className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-cyan-500/40"
                >
                  {targetProject?.niches.map((n) => (
                    <option key={n.id} value={n.tag}>🏷️ {n.name} (#{n.tag})</option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">
                    Sàn TMĐT
                  </label>
                  <select
                    value={platform}
                    onChange={(e) => setPlatform(e.target.value as any)}
                    className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-cyan-500/40"
                  >
                    <option value="Etsy">🟠 Etsy</option>
                    <option value="Amazon">🟡 Amazon</option>
                    <option value="TikTok Shop">⚫ TikTok Shop</option>
                    <option value="Pinterest">🔴 Pinterest</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">
                    Số Lượng Cào
                  </label>
                  <select
                    value={targetCount}
                    onChange={(e) => setTargetCount(Number(e.target.value))}
                    className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-cyan-500/40"
                  >
                    <option value={50}>Top 50 Listings</option>
                    <option value={100}>Top 100 Listings</option>
                    <option value={200}>Top 200 Listings</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">
                  Từ Khóa Tìm Kiếm (Niche Keyword) *
                </label>
                <input
                  type="text"
                  required
                  placeholder="VD: acrylic dog christmas ornament 2026"
                  value={keyword}
                  onChange={(e) => setKeyword(e.target.value)}
                  className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-cyan-500/40"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-white font-semibold rounded-xl shadow-md transition-all flex items-center justify-center gap-2"
              >
                <Bot size={16} />
                <span>Bắt Đầu Crawl Tự Động</span>
              </button>
            </form>
          </div>

          {/* Right: Crawl Jobs History */}
          <div className="lg:col-span-7 p-6 rounded-2xl bg-white dark:bg-[#0f172a] border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider">
                Lịch Sử Các Job Crawl Đang Chạy & Đã Hoàn Thành
              </h3>
              <span className="text-xs text-slate-400">{crawlJobs.length} Jobs</span>
            </div>

            <div className="space-y-3">
              {crawlJobs.map((job) => (
                <div
                  key={job.id}
                  className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 space-y-2 text-xs"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-slate-900 dark:text-white">
                        [{job.platform}] {job.keyword}
                      </span>
                      <span className="text-[10px] font-mono text-cyan-600">#{job.nicheTag}</span>
                    </div>

                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${job.status === "COMPLETED" ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400" : "bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 animate-pulse"}`}>
                      {job.status === "COMPLETED" ? "✓ Hoàn Thành" : "⚡ Đang Quét..."}
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 text-[11px]">
                    <span>Dự án đích: <strong>{job.projectName}</strong></span>
                    <span>Tiến độ: <strong>{job.scrapedCount} / {job.targetCount}</strong> ({job.speed})</span>
                  </div>

                  {/* Progress Bar */}
                  <div className="w-full bg-slate-200 dark:bg-slate-800 h-1.5 rounded-full overflow-hidden">
                    <div
                      className="bg-cyan-500 h-full rounded-full transition-all duration-500"
                      style={{ width: `${(job.scrapedCount / job.targetCount) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: MANUAL URL SCRAPER */}
      {ingestionSubTab === "manual_url" && (
        <div className="p-8 rounded-2xl bg-white dark:bg-[#0f172a] border border-slate-200 dark:border-slate-800 shadow-sm space-y-6 max-w-2xl mx-auto">
          <div className="text-center space-y-1">
            <h3 className="text-base font-bold text-slate-900 dark:text-white">Cào Chi Tiết 1 Link Listing Bất Kỳ</h3>
            <p className="text-xs text-slate-400">Dán URL từ Etsy, Amazon, TikTok Shop hoặc Pinterest để bóc tách thông tin ngay tức thì.</p>
          </div>

          <div className="space-y-4 text-xs">
            <div>
              <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">
                Chọn Dự Án Sẽ Lưu Vào
              </label>
              <select
                value={manualProjectTarget}
                onChange={(e) => setManualProjectTarget(e.target.value)}
                className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2 text-slate-900 dark:text-slate-100"
              >
                {projects.map((p) => (
                  <option key={p.id} value={p.id}>{p.name}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">
                Dán URL Sản Phẩm
              </label>
              <div className="flex gap-2">
                <input
                  type="url"
                  placeholder="https://etsy.com/listing/..."
                  value={manualUrl}
                  onChange={(e) => setManualUrl(e.target.value)}
                  className="flex-1 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2 text-slate-900 dark:text-slate-100"
                />
                <button
                  type="button"
                  onClick={handleSimulateManualScrape}
                  disabled={isParsingManual}
                  className="px-4 py-2 bg-cyan-500 hover:bg-cyan-400 text-white font-semibold rounded-xl shrink-0 transition-colors"
                >
                  {isParsingManual ? "Đang Quét..." : "Phân Tích Ngay"}
                </button>
              </div>
            </div>

            {manualPreview && (
              <div className="p-4 rounded-xl bg-cyan-500/10 border border-cyan-500/30 space-y-3 animate-in fade-in">
                <div className="flex items-center gap-3">
                  <img src={manualPreview.imageUrl} alt="" className="w-14 h-14 rounded-xl object-cover" />
                  <div>
                    <h4 className="font-bold text-slate-900 dark:text-white leading-snug">{manualPreview.title}</h4>
                    <p className="text-slate-500 text-[11px]">Sàn: {manualPreview.platform} • Giá: ${manualPreview.price} • Shop: {manualPreview.seller}</p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleSaveManualToProject}
                  className="w-full py-2 bg-emerald-500 hover:bg-emerald-400 text-white font-bold rounded-xl shadow text-xs"
                >
                  ✓ Lưu Vào Dự Án & Chấm Điểm
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* TAB 3: EXCEL IMPORT */}
      {ingestionSubTab === "excel_import" && (
        <div className="p-8 rounded-2xl bg-white dark:bg-[#0f172a] border border-slate-200 dark:border-slate-800 shadow-sm space-y-6 max-w-2xl mx-auto">
          <div className="text-center space-y-2">
            <FileSpreadsheet size={36} className="text-cyan-500 mx-auto" />
            <h3 className="text-base font-bold text-slate-900 dark:text-white">Import Hàng Loạt Từ File Excel / CSV (Spy Tools)</h3>
            <p className="text-xs text-slate-400">
              Nhập trực tiếp file xuất từ <strong>Helium 10, Shophunter, Aura, PiPiADS, EverBee</strong>. Hệ thống sẽ tự động làm sạch và tiền xử lý.
            </p>
          </div>

          <div 
            onClick={handleSimulateExcelImport}
            className="border-2 border-dashed border-slate-300 dark:border-slate-700 hover:border-cyan-500 rounded-2xl p-8 text-center space-y-3 bg-slate-50 dark:bg-slate-900/40 cursor-pointer transition-colors"
          >
            <p className="text-xs font-bold text-slate-800 dark:text-slate-200">
              {isUploadingExcel ? "Đang xử lý & phân loại AI..." : "Nhấp để chọn file Excel / CSV cần tải lên"}
            </p>
            <span className="text-[11px] text-slate-400 block">Dung lượng tối đa 25MB (.xlsx, .csv)</span>
          </div>

          {excelUploadedCount && (
            <div className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 text-xs text-center font-semibold">
              ✓ Đã nhập thành công {excelUploadedCount} sản phẩm và tự động gán vào các Ngách tương ứng!
            </div>
          )}
        </div>
      )}
    </div>
  );
}
