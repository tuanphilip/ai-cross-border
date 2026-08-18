from fastapi import FastAPI, HTTPException, Query
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field
from typing import List, Optional, Dict, Any
from datetime import datetime

app = FastAPI(
    title="Product Opportunity Hub API",
    description="Backend API for Printway Product Opportunity Hub & R&D Intelligence",
    version="1.0.0"
)

# Enable CORS for frontend integration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ----------------- DATA MODELS -----------------

class ScoringWeights(BaseModel):
    # Production Capability (Tổng 30%)
    production_fit: float = Field(default=0.10, description="Khả năng sản xuất tại xưởng")
    production_time: float = Field(default=0.05, description="Thời gian giao hàng Lead time")
    seasonality_fit: float = Field(default=0.10, description="Độ phù hợp mùa vụ")
    personalization_level: float = Field(default=0.05, description="Mức độ cá nhân hóa")
    
    # Financial Performance (Tổng 35%)
    potential_revenue: float = Field(default=0.15, description="Doanh thu tiềm năng")
    profit_margin: float = Field(default=0.20, description="Biên lợi nhuận ròng")
    
    # Market Opportunity (Tổng 35%)
    market_demand: float = Field(default=0.15, description="Lực cầu thị trường / Search volume")
    growth_rate: float = Field(default=0.10, description="Tốc độ tăng trưởng")
    competition_level: float = Field(default=0.10, description="Mức độ cạnh tranh")

class MetricScore(BaseModel):
    name: str
    group: str  # "production" | "financial" | "market"
    score: float  # 0.0 -> 10.0
    weight: float
    raw_value: str
    description: str

class AnalyzeRequest(BaseModel):
    query_or_url: str = Field(..., description="Từ khóa hoặc đường link sản phẩm Etsy/Amazon/TikTok")
    niche: Optional[str] = None
    target_market: Optional[str] = "US"

class MappedProductCatalog(BaseModel):
    sku: str
    product_name: str
    category: str
    material: str
    base_cost: float
    est_shipping: float
    production_days: int
    confidence_score: float

class OpportunityAnalysisResult(BaseModel):
    id: str
    input_query: str
    timestamp: str
    mapped_product: MappedProductCatalog
    decision: str  # "RECOMMENDED" | "NOT_RECOMMENDED"
    decision_badge_color: str  # "success" | "danger" | "warning"
    overall_score: float  # 0 -> 100
    group_scores: Dict[str, float]  # production, financial, market (0 -> 10)
    metrics: List[MetricScore]
    ai_recommendation_summary: str
    suggested_niche: str
    optimal_launch_window: str
    estimated_retail_price: float
    estimated_profit_margin: float

class TrendingNiche(BaseModel):
    id: str
    niche_name: str
    category: str
    growth_rate: str
    search_volume: str
    competition: str  # "Low" | "Medium" | "High"
    opportunity_score: float
    seasonality_peak: str
    top_recommended_product: str
    tags: List[str]

# ----------------- IN-MEMORY STATE & MOCK DATA -----------------

CURRENT_WEIGHTS = ScoringWeights()

PRINTWAY_CATALOG = [
    {
        "sku": "PW-ORN-ACRYLIC-2D",
        "product_name": "Custom Shape Acrylic Ornament",
        "category": "Home & Living / Holiday Decor",
        "material": "High Quality Transparent Acrylic 3mm",
        "base_cost": 2.20,
        "est_shipping": 3.80,
        "production_days": 2,
    },
    {
        "sku": "PW-SIGN-WOOD-2L",
        "product_name": "2-Layer Wooden Wall Sign",
        "category": "Home Decor",
        "material": "Plywood + Pine Wood Frame",
        "base_cost": 8.50,
        "est_shipping": 6.20,
        "production_days": 3,
    },
    {
        "sku": "PW-TUMBLER-SS-40OZ",
        "product_name": "Stainless Steel Tumbler 40oz with Handle",
        "category": "Kitchen & Dining",
        "material": "Double-wall 304 Stainless Steel",
        "base_cost": 9.80,
        "est_shipping": 5.50,
        "production_days": 2,
    },
    {
        "sku": "PW-CERAMIC-MUG-11OZ",
        "product_name": "Accent Ceramic Mug 11oz",
        "category": "Kitchen & Dining",
        "material": "Ceramic Glossy",
        "base_cost": 2.80,
        "est_shipping": 4.50,
        "production_days": 1,
    },
    {
        "sku": "PW-METAL-SIGN-VINTAGE",
        "product_name": "Custom Vintage Metal Tin Sign",
        "category": "Outdoor & Wall Decor",
        "material": "Aluminum / Tinplate",
        "base_cost": 4.50,
        "est_shipping": 4.00,
        "production_days": 2,
    }
]

TRENDING_NICHES: List[TrendingNiche] = [
    TrendingNiche(
        id="niche-1",
        niche_name="Grandparent & Family Memorial Gifts",
        category="Home & Holiday Decor",
        growth_rate="+142% MoM",
        search_volume="250,000/mo",
        competition="Medium",
        opportunity_score=92.5,
        seasonality_peak="Q4 (Oct - Dec)",
        top_recommended_product="Custom Shape Acrylic Ornament",
        tags=["Personalized", "Grandma", "Family Tree", "Memorial"]
    ),
    TrendingNiche(
        id="niche-2",
        niche_name="Pet Dog / Cat Breed Custom Portraits",
        category="Home Decor & Wall Art",
        growth_rate="+88% MoM",
        search_volume="410,000/mo",
        competition="High",
        opportunity_score=86.0,
        seasonality_peak="All Year Round / Mother's Day",
        top_recommended_product="2-Layer Wooden Wall Sign",
        tags=["Dog Lovers", "Cat Breed", "Laser Engraved"]
    ),
    TrendingNiche(
        id="niche-3",
        niche_name="Pickleball & Sports Enthusiasts",
        category="Sports & Drinkware",
        growth_rate="+215% YoY",
        search_volume="180,000/mo",
        competition="Low",
        opportunity_score=89.0,
        seasonality_peak="Summer & Spring",
        top_recommended_product="Stainless Steel Tumbler 40oz",
        tags=["Pickleball Mom", "Coach Gift", "Outdoor"]
    ),
    TrendingNiche(
        id="niche-4",
        niche_name="Nurse & Medical Practitioner Appreciation",
        category="Appreciation Gifts",
        growth_rate="+65% MoM",
        search_volume="120,000/mo",
        competition="Medium",
        opportunity_score=78.5,
        seasonality_peak="May (Nurse Week) & Christmas",
        top_recommended_product="Accent Ceramic Mug 11oz",
        tags=["Nurse Life", "Stethoscope Art", "Doctor"]
    ),
    TrendingNiche(
        id="niche-5",
        niche_name="Mechanic & Garage Man Cave",
        category="Outdoor & Wall Decor",
        growth_rate="+45% MoM",
        search_volume="95,000/mo",
        competition="Low",
        opportunity_score=81.5,
        seasonality_peak="Father's Day & Q4",
        top_recommended_product="Custom Vintage Metal Tin Sign",
        tags=["Garage Rules", "Vintage Car", "Dad Workshop"]
    )
]

# ----------------- API ENDPOINTS -----------------

@app.get("/api/v1/health")
def health_check():
    return {"status": "ok", "service": "Product Opportunity Hub Backend", "timestamp": datetime.utcnow().isoformat()}

@app.get("/api/v1/niches/trending", response_model=List[TrendingNiche])
def get_trending_niches():
    return TRENDING_NICHES

@app.get("/api/v1/catalog")
def get_printway_catalog():
    return {"total": len(PRINTWAY_CATALOG), "catalog": PRINTWAY_CATALOG}

@app.get("/api/v1/config/weights", response_model=ScoringWeights)
def get_scoring_weights():
    return CURRENT_WEIGHTS

@app.put("/api/v1/config/weights", response_model=ScoringWeights)
def update_scoring_weights(weights: ScoringWeights):
    global CURRENT_WEIGHTS
    CURRENT_WEIGHTS = weights
    return CURRENT_WEIGHTS

@app.post("/api/v1/analyze", response_model=OpportunityAnalysisResult)
def analyze_product_opportunity(payload: AnalyzeRequest):
    query = payload.query_or_url.strip().lower()
    
    # 1. Simulate NLP Listing Mapping to Catalog SKU
    if "ornament" in query or "acrylic" in query or "christmas" in query or "grandpa" in query:
        matched = PRINTWAY_CATALOG[0]
        confidence = 0.94
        retail_price = 18.99
        is_winner = True
    elif "wood" in query or "sign" in query or "pet" in query or "dog" in query:
        matched = PRINTWAY_CATALOG[1]
        confidence = 0.91
        retail_price = 34.99
        is_winner = True
    elif "tumbler" in query or "cup" in query or "pickleball" in query:
        matched = PRINTWAY_CATALOG[2]
        confidence = 0.88
        retail_price = 28.50
        is_winner = True
    elif "mug" in query or "ceramic" in query or "nurse" in query:
        matched = PRINTWAY_CATALOG[3]
        confidence = 0.92
        retail_price = 14.99
        is_winner = True
    elif "fidget" in query or "spinner" in query or "plastic cheap" in query:
        # Negative test case (Declined / Low profit / Not fit for POD)
        matched = PRINTWAY_CATALOG[0]
        confidence = 0.45
        retail_price = 4.99
        is_winner = False
    else:
        matched = PRINTWAY_CATALOG[0]
        confidence = 0.82
        retail_price = 19.99
        is_winner = True

    mapped_obj = MappedProductCatalog(
        sku=matched["sku"],
        product_name=matched["product_name"],
        category=matched["category"],
        material=matched["material"],
        base_cost=matched["base_cost"],
        est_shipping=matched["est_shipping"],
        production_days=matched["production_days"],
        confidence_score=confidence
    )

    # 2. Compute 9 Metrics
    if is_winner:
        s_prod_fit = 9.5
        s_prod_time = 9.0  # 2 days lead time is excellent
        s_season = 9.5     # Q4 high season
        s_personal = 9.0   # Easy photo + text UV print
        
        cogs_total = matched["base_cost"] + matched["est_shipping"]
        margin_val = ((retail_price - cogs_total - (retail_price * 0.15)) / retail_price) * 100
        s_margin = min(10.0, max(1.0, margin_val / 5.0))  # Normalize
        s_rev = 9.0
        
        s_demand = 9.2
        s_growth = 8.8
        s_comp = 7.5
        
        overall = 88.5
        decision = "RECOMMENDED"
        badge_color = "success"
        ai_summary = f"Sản phẩm cực kỳ tiềm năng! Khả năng sản xuất tại xưởng Printway hoàn hảo (Lead time {matched['production_days']} ngày). Biên lợi nhuận dự kiến đạt {margin_val:.1f}%. Nhu cầu thị trường đang trong chu kỳ tăng trưởng mạnh mẽ đón đầu mùa cao điểm."
        niche_sug = "Personalized Holiday & Family Gifts"
        launch_window = "Ngay bây giờ (Trước tháng 10 để đón trọn sóng Q4)"
    else:
        s_prod_fit = 4.0
        s_prod_time = 5.0
        s_season = 3.0
        s_personal = 2.0
        
        margin_val = 12.0
        s_margin = 2.5
        s_rev = 3.0
        
        s_demand = 4.0
        s_growth = 2.0
        s_comp = 2.0
        
        overall = 32.0
        decision = "NOT_RECOMMENDED"
        badge_color = "danger"
        ai_summary = "Cảnh báo: Sản phẩm có biên lợi nhuận quá mỏng (<15%), thị trường đã bão hòa và có dấu hiệu suy thoái. Mức độ cá nhân hóa thấp, không tối ưu cho năng lực sản xuất của Printway."
        niche_sug = "Không khuyến nghị đầu tư ngách này"
        launch_window = "N/A"

    metrics = [
        # Nhóm Sản xuất
        MetricScore(name="Production Fit", group="production", score=s_prod_fit, weight=CURRENT_WEIGHTS.production_fit, raw_value="95% Feasible", description="Vật liệu & công nghệ in có sẵn tại xưởng Printway"),
        MetricScore(name="Production Time", group="production", score=s_prod_time, weight=CURRENT_WEIGHTS.production_time, raw_value=f"{matched['production_days']} Days", description="Thời gian gia công nhanh chóng"),
        MetricScore(name="Seasonality Fit", group="production", score=s_season, weight=CURRENT_WEIGHTS.seasonality_fit, raw_value="High Peak", description="Phù hợp thời điểm chuẩn bị mùa lễ hội"),
        MetricScore(name="Personalization Level", group="production", score=s_personal, weight=CURRENT_WEIGHTS.personalization_level, raw_value="Photo + Custom Text", description="Tùy biến cao, thu hút khách hàng"),
        
        # Nhóm Tài chính
        MetricScore(name="Potential Revenue", group="financial", score=s_rev, weight=CURRENT_WEIGHTS.potential_revenue, raw_value="High ($50k+/mo)", description="Dự báo dung lượng doanh thu tiềm năng cao"),
        MetricScore(name="Profit Margin", group="financial", score=s_margin, weight=CURRENT_WEIGHTS.profit_margin, raw_value=f"{margin_val:.1f}%", description="Biên lợi nhuận sau khi trừ COGS & Phí sàn"),
        
        # Nhóm Thị trường
        MetricScore(name="Market Demand", group="market", score=s_demand, weight=CURRENT_WEIGHTS.market_demand, raw_value="250k+ searches/mo", description="Lượng tìm kiếm trên Etsy/Amazon và Social"),
        MetricScore(name="Growth Rate", group="market", score=s_growth, weight=CURRENT_WEIGHTS.growth_rate, raw_value="+142% MoM", description="Tốc độ tăng trưởng từ khóa xu hướng"),
        MetricScore(name="Competition Level", group="market", score=s_comp, weight=CURRENT_WEIGHTS.competition_level, raw_value="Moderate", description="Thị trường chưa quá bão hòa, còn dư địa cho seller mới"),
    ]

    prod_avg = (s_prod_fit + s_prod_time + s_season + s_personal) / 4
    fin_avg = (s_rev + s_margin) / 2
    mkt_avg = (s_demand + s_growth + s_comp) / 3

    return OpportunityAnalysisResult(
        id=f"eval-{int(datetime.utcnow().timestamp())}",
        input_query=payload.query_or_url,
        timestamp=datetime.utcnow().strftime("%Y-%m-%d %H:%M:%S"),
        mapped_product=mapped_obj,
        decision=decision,
        decision_badge_color=badge_color,
        overall_score=overall,
        group_scores={
            "production": round(prod_avg, 1),
            "financial": round(fin_avg, 1),
            "market": round(mkt_avg, 1),
        },
        metrics=metrics,
        ai_recommendation_summary=ai_summary,
        suggested_niche=niche_sug,
        optimal_launch_window=launch_window,
        estimated_retail_price=retail_price,
        estimated_profit_margin=round(margin_val, 1)
    )
