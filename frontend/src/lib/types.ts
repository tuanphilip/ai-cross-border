export type TargetMarket = "US" | "UK" | "EU" | "WW";

export type DecisionStatus = "RECOMMENDED" | "REVIEW_REQUIRED" | "NOT_RECOMMENDED";

export interface PrintwayBaseProduct {
  sku: string;
  name: string;
  category: string;
  material: string;
  baseCost: number;
  estShipping: number;
  leadTimeDays: number;
  printTechniques: string[];
  printAreas: string[];
  image: string;
  factoryLocation: "US" | "VN" | "EU";
  inStock: boolean;
  activeMappedCount: number;
}

export interface MetricScore {
  name: string;
  group: "production" | "financial" | "market";
  score: number; // 0.0 -> 10.0
  weight: number;
  rawValue: string;
  description: string;
}

export interface ResearchProduct {
  id: string;
  projectId: string;
  nicheTag: string;
  title: string;
  platform: "Etsy" | "Amazon" | "TikTok Shop" | "Shopify" | "Pinterest";
  sourceUrl: string;
  imageUrl: string;
  sellerName: string;
  retailPrice: number;
  estMonthlySales: number;
  estMonthlyRevenue: number;
  reviewCount: number;
  rating: number;
  bsrOrRank?: string;
  
  // Mapping with Printway Base Product
  mappedBaseSku?: string;
  matchConfidence?: number; // e.g. 0.94 (94%)
  
  // Scoring
  overallScore: number; // 0 -> 100
  decision: DecisionStatus;
  groupScores: {
    production: number;
    financial: number;
    market: number;
  };
  metrics: MetricScore[];
  
  // Profit calculations
  estNetProfit: number;
  estProfitMargin: number; // e.g. 42.5%
  
  // AI Insights
  aiSummary: string;
  designAngle: string;
  optimalLaunchWindow: string;
  addedAt: string;
}

export interface ProjectNiche {
  id: string;
  name: string;
  tag: string;
  searchVolumeMonthly: number;
  growthRate: string; // e.g. "+38%"
  competition: "Low" | "Medium" | "High";
  seasonalityPeak: string;
  productCount: number;
  avgOpportunityScore: number;
  breakoutKeywords: string[];
  topAngles: string[];
}

export interface RDProject {
  id: string;
  name: string;
  description: string;
  season: string; // e.g. "Q4 Christmas 2026", "Mother's Day 2026"
  targetMarket: TargetMarket;
  status: "DRAFT" | "RESEARCHING" | "SCORING" | "APPROVED" | "ARCHIVED";
  createdAt: string;
  updatedAt: string;
  niches: ProjectNiche[];
  products: ResearchProduct[];
  targetRevenueGoal: number;
}

export interface DataCrawlJob {
  id: string;
  projectId: string;
  projectName: string;
  nicheTag: string;
  platform: "Etsy" | "Amazon" | "TikTok Shop" | "Pinterest";
  keyword: string;
  targetCount: number;
  scrapedCount: number;
  status: "RUNNING" | "COMPLETED" | "FAILED" | "SCHEDULED";
  createdAt: string;
  speed: string;
}

export interface ScoringWeightsConfig {
  // Production (30%)
  production_fit: number;
  production_time: number;
  seasonality_fit: number;
  personalization_level: number;
  
  // Financial (35%)
  potential_revenue: number;
  profit_margin: number;
  
  // Market (35%)
  market_demand: number;
  growth_rate: number;
  competition_level: number;
  
  // Thresholds
  recommendedThreshold: number; // default 70
  reviewThreshold: number; // default 50
}
