import axios from "axios";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

export const api = axios.create({
  baseURL: `${API_BASE_URL}/api/v1`,
  timeout: 10000,
});

export interface ScoringWeights {
  production_fit: number;
  production_time: number;
  seasonality_fit: number;
  personalization_level: number;
  potential_revenue: number;
  profit_margin: number;
  market_demand: number;
  growth_rate: number;
  competition_level: number;
}

export interface MetricScore {
  name: string;
  group: "production" | "financial" | "market";
  score: number;
  weight: number;
  raw_value: string;
  description: string;
}

export interface MappedProductCatalog {
  sku: string;
  product_name: string;
  category: string;
  material: string;
  base_cost: number;
  est_shipping: number;
  production_days: number;
  confidence_score: number;
}

export interface OpportunityAnalysisResult {
  id: string;
  input_query: string;
  timestamp: string;
  mapped_product: MappedProductCatalog;
  decision: "RECOMMENDED" | "NOT_RECOMMENDED";
  decision_badge_color: "success" | "danger" | "warning";
  overall_score: number;
  group_scores: {
    production: number;
    financial: number;
    market: number;
  };
  metrics: MetricScore[];
  ai_recommendation_summary: string;
  suggested_niche: string;
  optimal_launch_window: string;
  estimated_retail_price: number;
  estimated_profit_margin: number;
}

export interface TrendingNiche {
  id: string;
  niche_name: string;
  category: string;
  growth_rate: string;
  search_volume: string;
  competition: "Low" | "Medium" | "High";
  opportunity_score: number;
  seasonality_peak: string;
  top_recommended_product: string;
  tags: string[];
}
