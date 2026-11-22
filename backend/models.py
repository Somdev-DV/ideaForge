from sqlmodel import SQLModel, Field
from typing import Optional
from datetime import datetime, timezone

def get_utc_now():
    return datetime.now(timezone.utc)

class AdvisoryHistory(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    created_at: datetime = Field(default_factory=get_utc_now)
    farmer_language: str
    state: str
    district: str
    crop: str
    acres: float
    symptom: str
    soil_n: Optional[float] = None
    soil_p: Optional[float] = None
    soil_k: Optional[float] = None
    soil_ph: Optional[float] = None
    
    # Computed results
    active_molecule: str
    generic_name: str
    generic_cost_per_acre: float
    branded_name: str
    branded_cost_per_acre: float
    savings_vs_branded: float
    
    scheme_name: Optional[str] = None
    subsidy_amount: float = 0.0
    net_pesticide_cost: float
    
    mandi_price_qtl: float
    price_trend: str
    estimated_yield_saved_qtl: float
    gross_yield_gain: float
    net_financial_gain: float
    
    rain_probability_pct: float
    weather_alert_level: str
    weather_summary: str
    advisory_text: str
