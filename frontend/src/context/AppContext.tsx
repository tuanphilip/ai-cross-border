"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { 
  RDProject, 
  PrintwayBaseProduct, 
  ResearchProduct, 
  DataCrawlJob, 
  ScoringWeightsConfig,
  DecisionStatus
} from "@/lib/types";
import { 
  INITIAL_BASE_PRODUCTS, 
  INITIAL_PROJECTS, 
  INITIAL_CRAWL_JOBS, 
  DEFAULT_SCORING_WEIGHTS 
} from "@/lib/mockData";

export type NavigationMenu = 
  | "dashboard"
  | "projects"
  | "project_detail"
  | "base_catalog"
  | "data_ingestion"
  | "quick_analyzer"
  | "scoring_config";

interface AppContextType {
  // Theme state
  theme: "dark" | "light";
  toggleTheme: () => void;

  // Navigation
  activeMenu: NavigationMenu;
  setActiveMenu: (menu: NavigationMenu) => void;
  selectedProjectId: string;
  setSelectedProjectId: (id: string) => void;
  
  // Sub-tabs
  projectSubTab: "products_niches" | "trending" | "mapping_profit" | "decision_roadmap";
  setProjectSubTab: (tab: "products_niches" | "trending" | "mapping_profit" | "decision_roadmap") => void;

  ingestionSubTab: "auto_crawler" | "manual_url" | "excel_import";
  setIngestionSubTab: (tab: "auto_crawler" | "manual_url" | "excel_import") => void;

  baseCatalogSubTab: "catalog_list" | "sync_import";
  setBaseCatalogSubTab: (tab: "catalog_list" | "sync_import") => void;

  // Data
  projects: RDProject[];
  currentProject: RDProject | undefined;
  baseProducts: PrintwayBaseProduct[];
  crawlJobs: DataCrawlJob[];
  scoringWeights: ScoringWeightsConfig;

  // Selected Product for Deep-dive Modal
  selectedProductForModal: ResearchProduct | null;
  setSelectedProductForModal: (product: ResearchProduct | null) => void;

  // Actions
  addProject: (project: Omit<RDProject, "id" | "createdAt" | "updatedAt" | "products">) => void;
  addResearchProductToProject: (projectId: string, product: Omit<ResearchProduct, "id" | "addedAt">) => void;
  deleteResearchProduct: (projectId: string, productId: string) => void;
  mapProductWithBaseSku: (projectId: string, productId: string, baseSku: string) => void;
  addCrawlJob: (job: Omit<DataCrawlJob, "id" | "createdAt" | "status" | "scrapedCount" | "speed">) => void;
  updateScoringWeights: (weights: ScoringWeightsConfig) => void;
  openProjectDetail: (projectId: string, initialTab?: "products_niches" | "trending" | "mapping_profit" | "decision_roadmap") => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
  // Theme state (default to dark)
  const [theme, setTheme] = useState<"dark" | "light">("dark");

  useEffect(() => {
    const savedTheme = localStorage.getItem("poh_theme") as "dark" | "light" | null;
    if (savedTheme) {
      setTheme(savedTheme);
      document.documentElement.classList.toggle("dark", savedTheme === "dark");
    } else {
      document.documentElement.classList.add("dark");
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    localStorage.setItem("poh_theme", newTheme);
    if (newTheme === "dark") {
      document.documentElement.classList.add("dark");
      document.documentElement.classList.remove("light");
    } else {
      document.documentElement.classList.remove("dark");
      document.documentElement.classList.add("light");
    }
  };

  // Navigation State
  const [activeMenu, setActiveMenu] = useState<NavigationMenu>("dashboard");
  const [selectedProjectId, setSelectedProjectId] = useState<string>("proj_q4_2026");
  
  // Sub Tabs
  const [projectSubTab, setProjectSubTab] = useState<"products_niches" | "trending" | "mapping_profit" | "decision_roadmap">("products_niches");
  const [ingestionSubTab, setIngestionSubTab] = useState<"auto_crawler" | "manual_url" | "excel_import">("auto_crawler");
  const [baseCatalogSubTab, setBaseCatalogSubTab] = useState<"catalog_list" | "sync_import">("catalog_list");

  // App Data
  const [projects, setProjects] = useState<RDProject[]>(INITIAL_PROJECTS);
  const [baseProducts, setBaseProducts] = useState<PrintwayBaseProduct[]>(INITIAL_BASE_PRODUCTS);
  const [crawlJobs, setCrawlJobs] = useState<DataCrawlJob[]>(INITIAL_CRAWL_JOBS);
  const [scoringWeights, setScoringWeights] = useState<ScoringWeightsConfig>(DEFAULT_SCORING_WEIGHTS);
  const [selectedProductForModal, setSelectedProductForModal] = useState<ResearchProduct | null>(null);

  const currentProject = projects.find((p) => p.id === selectedProjectId) || projects[0];

  const openProjectDetail = (
    projectId: string, 
    initialTab: "products_niches" | "trending" | "mapping_profit" | "decision_roadmap" = "products_niches"
  ) => {
    setSelectedProjectId(projectId);
    setProjectSubTab(initialTab);
    setActiveMenu("project_detail");
  };

  const addProject = (projectData: Omit<RDProject, "id" | "createdAt" | "updatedAt" | "products">) => {
    const newProj: RDProject = {
      ...projectData,
      id: `proj_${Date.now()}`,
      createdAt: new Date().toISOString().split("T")[0],
      updatedAt: new Date().toISOString().split("T")[0],
      products: []
    };
    setProjects([newProj, ...projects]);
    openProjectDetail(newProj.id);
  };

  const addResearchProductToProject = (projectId: string, prodData: Omit<ResearchProduct, "id" | "addedAt">) => {
    const newProduct: ResearchProduct = {
      ...prodData,
      id: `prod_${Date.now()}`,
      addedAt: new Date().toISOString().split("T")[0]
    };

    setProjects((prev) =>
      prev.map((proj) => {
        if (proj.id === projectId) {
          // Update niche count
          const updatedNiches = proj.niches.map((niche) => {
            if (niche.tag === newProduct.nicheTag) {
              return { ...niche, productCount: niche.productCount + 1 };
            }
            return niche;
          });
          return {
            ...proj,
            updatedAt: new Date().toISOString().split("T")[0],
            niches: updatedNiches,
            products: [newProduct, ...proj.products]
          };
        }
        return proj;
      })
    );
  };

  const deleteResearchProduct = (projectId: string, productId: string) => {
    setProjects((prev) =>
      prev.map((proj) => {
        if (proj.id === projectId) {
          return {
            ...proj,
            products: proj.products.filter((p) => p.id !== productId)
          };
        }
        return proj;
      })
    );
  };

  const mapProductWithBaseSku = (projectId: string, productId: string, baseSku: string) => {
    const baseProd = baseProducts.find((b) => b.sku === baseSku);
    if (!baseProd) return;

    setProjects((prev) =>
      prev.map((proj) => {
        if (proj.id === projectId) {
          const updatedProducts = proj.products.map((p) => {
            if (p.id === productId) {
              // Recalculate profit
              const costTotal = baseProd.baseCost + baseProd.estShipping + (p.retailPrice * 0.12) + (p.retailPrice * 0.15); // fee + ads
              const netProfit = Math.max(0, p.retailPrice - costTotal);
              const margin = (netProfit / p.retailPrice) * 100;
              return {
                ...p,
                mappedBaseSku: baseSku,
                matchConfidence: 0.95,
                estNetProfit: parseFloat(netProfit.toFixed(2)),
                estProfitMargin: parseFloat(margin.toFixed(1))
              };
            }
            return p;
          });
          return { ...proj, products: updatedProducts };
        }
        return proj;
      })
    );
  };

  const addCrawlJob = (jobData: Omit<DataCrawlJob, "id" | "createdAt" | "status" | "scrapedCount" | "speed">) => {
    const newJob: DataCrawlJob = {
      ...jobData,
      id: `job_${Date.now()}`,
      createdAt: new Date().toLocaleString("sv-SE").replace("T", " "),
      status: "RUNNING",
      scrapedCount: 0,
      speed: "15 items/s"
    };
    setCrawlJobs([newJob, ...crawlJobs]);
  };

  const updateScoringWeights = (weights: ScoringWeightsConfig) => {
    setScoringWeights(weights);
    // Recalculate scores for all products in all projects
    setProjects((prevProjects) =>
      prevProjects.map((proj) => ({
        ...proj,
        products: proj.products.map((p) => {
          // Calculate overall score from weights
          let scoreTotal = 0;
          p.metrics.forEach((m) => {
            const wKey = m.name.toLowerCase().replace(/ /g, "_") as keyof ScoringWeightsConfig;
            const w = weights[wKey] ?? m.weight;
            scoreTotal += m.score * w * 10;
          });
          const overall = Math.min(100, Math.max(0, parseFloat(scoreTotal.toFixed(1))));
          let decision: DecisionStatus = "NOT_RECOMMENDED";
          if (overall >= weights.recommendedThreshold) {
            decision = "RECOMMENDED";
          } else if (overall >= weights.reviewThreshold) {
            decision = "REVIEW_REQUIRED";
          }
          return {
            ...p,
            overallScore: overall,
            decision
          };
        })
      }))
    );
  };

  return (
    <AppContext.Provider
      value={{
        theme,
        toggleTheme,
        activeMenu,
        setActiveMenu,
        selectedProjectId,
        setSelectedProjectId,
        projectSubTab,
        setProjectSubTab,
        ingestionSubTab,
        setIngestionSubTab,
        baseCatalogSubTab,
        setBaseCatalogSubTab,
        projects,
        currentProject,
        baseProducts,
        crawlJobs,
        scoringWeights,
        selectedProductForModal,
        setSelectedProductForModal,
        addProject,
        addResearchProductToProject,
        deleteResearchProduct,
        mapProductWithBaseSku,
        addCrawlJob,
        updateScoringWeights,
        openProjectDetail
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useApp must be used within an AppProvider");
  }
  return context;
}
