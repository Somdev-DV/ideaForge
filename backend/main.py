from fastapi import FastAPI, Depends, HTTPException, Query
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field
from typing import Optional, List, Dict, Any
from sqlmodel import Session, select
import os

from database import init_db, get_session
from models import AdvisoryHistory
from services.mandi_service import get_mandi_data
from services.weather_service import get_weather_spray_guardrail
from services.pesticide_service import find_cheapest_molecule, get_pesticide_catalog
from services.scheme_service import match_scheme, get_govt_schemes
from services.ai_advisor import generate_advisory_explanation
from services.bhashini_service import translate_text

app = FastAPI(
    title="Multilingual Agritech & Resource Advisory Assistant API",
    version="1.0.0",
    description="Intelligent farm decision system combining Mandi rates, generic molecule pricing, govt subsidies, weather guardrails, and multilingual advisory."
)

# Enable CORS for Next.js frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.on_event("startup")
def on_startup():
    init_db()

class AdviseRequest(BaseModel):
    farmer_language: str = Field(default="English", description="Preferred regional language: English, Hindi, Tamil, Telugu, Marathi")
    state: str = Field(default="Tamil Nadu")
    district: str = Field(default="Villupuram")
    crop: str = Field(default="Paddy")
    acres: float = Field(default=2.5, gt=0)
    symptom: str = Field(default="Leaf Curl / Whitefly")
    soil_n: Optional[float] = Field(default=None, description="Nitrogen (kg/ha)")
    soil_p: Optional[float] = Field(default=None, description="Phosphorus (kg/ha)")
    soil_k: Optional[float] = Field(default=None, description="Potassium (kg/ha)")
    soil_ph: Optional[float] = Field(default=None, description="Soil pH level")

class TranslationRequest(BaseModel):
    text: str
    target_language: str
    source_language: str = "en"

@app.get("/")
def read_root():
    return {
        "status": "online",
        "service": "Multilingual Agritech Advisory Engine",
        "supported_languages": ["English", "Tamil", "Hindi", "Telugu", "Marathi"],
        "modules": ["Mandi Live Agmarknet", "Generic Pesticide Finder", "Govt Subsidies", "Weather Rain-Wash Guardrail", "AI Reasoning (Gemini)"]
    }

@app.get("/api/catalog/pesticides")
def list_pesticides():
    return get_pesticide_catalog()

@app.get("/api/catalog/schemes")
def list_schemes():
    return get_govt_schemes()

@app.get("/api/catalog/presets")
def get_presets():
    return {
        "states": ["Tamil Nadu", "Andhra Pradesh", "Maharashtra", "Punjab", "Uttar Pradesh"],
        "districts_by_state": {
            "Tamil Nadu": ["Villupuram", "Coimbatore", "Dharmapuri", "Thanjavur", "Madurai"],
            "Andhra Pradesh": ["Guntur", "East Godavari", "Chittoor", "Kurnool", "Krishna"],
            "Maharashtra": ["Nagpur", "Nashik", "Kolhapur", "Pune", "Amravati"],
            "Punjab": ["Ludhiana", "Bathinda", "Amritsar", "Jalandhar", "Patiala"],
            "Uttar Pradesh": ["Kanpur", "Varanasi", "Agra", "Meerut", "Prayagraj"]
        },
        "crops": ["Paddy", "Cotton", "Tomato", "Wheat", "Sugarcane", "Soybean"],
        "symptoms": [
            "Leaf Curl / Whitefly",
            "Stem Borer",
            "Fungal Blight",
            "Bollworm",
            "Aphids / Thrips",
            "Nutrient Deficiency (Yellowing / Chlorosis)"
        ]
    }

@app.post("/api/advise")
async def generate_advisory(req: AdviseRequest, session: Session = Depends(get_session)):
    # Step A: Live or Fallback Mandi Rate
    mandi_info = await get_mandi_data(req.state, req.crop, req.district)
    
    # Step B: Active Molecule & Cheapest Generic Pesticide
    pesticide_info = find_cheapest_molecule(req.symptom, req.acres)
    
    # Step C: State Government Scheme & Subsidy Matching
    scheme_info = match_scheme(req.state, req.crop, pesticide_info["generic_price_per_acre"], req.acres)
    
    # Step D: Weather Spray Guardrail
    weather_info = await get_weather_spray_guardrail(req.state, req.district)
    
    # Step E: Net-Profit / ROI Calculation
    # Yield saved in Quintals = total acres * estimated yield/acre * saved yield ratio
    yield_per_acre = mandi_info.get("estimated_yield_per_acre_qtl", 20.0)
    saved_ratio = mandi_info.get("saved_yield_ratio", 0.15)
    saved_yield_qtl = round(req.acres * yield_per_acre * saved_ratio, 2)
    
    mandi_rate = mandi_info.get("modal_price", 2400)
    gross_yield_gain = round(saved_yield_qtl * mandi_rate, 2)
    
    # Net effective pesticide cost after subsidy
    net_pesticide_cost = scheme_info.get("net_effective_cost", pesticide_info["total_generic_cost"])
    net_financial_gain = round(gross_yield_gain - net_pesticide_cost, 2)
    
    roi_info = {
        "acres": req.acres,
        "base_yield_per_acre_qtl": yield_per_acre,
        "saved_yield_ratio_pct": round(saved_ratio * 100, 1),
        "saved_yield_qtl": saved_yield_qtl,
        "mandi_modal_price": mandi_rate,
        "gross_yield_gain_inr": gross_yield_gain,
        "net_pesticide_cost_inr": net_pesticide_cost,
        "net_gain_inr": net_financial_gain,
        "roi_multiple": round(gross_yield_gain / max(net_pesticide_cost, 1.0), 1),
        "verdict": "Highly Profitable Spray" if net_financial_gain > 0 else "Marginal Gain"
    }
    
    # Step F: Multilingual Advisory Explanation (Gemini LLM or Regional Template)
    advisory_text = await generate_advisory_explanation(
        language=req.farmer_language,
        state=req.state,
        district=req.district,
        crop=req.crop,
        acres=req.acres,
        symptom=req.symptom,
        pesticide_data=pesticide_info,
        scheme_data=scheme_info,
        mandi_data=mandi_info,
        weather_data=weather_info,
        roi_data=roi_info
    )
    
    # Record to SQLite database
    try:
        db_record = AdvisoryHistory(
            farmer_language=req.farmer_language,
            state=req.state,
            district=req.district,
            crop=req.crop,
            acres=req.acres,
            symptom=req.symptom,
            soil_n=req.soil_n,
            soil_p=req.soil_p,
            soil_k=req.soil_k,
            soil_ph=req.soil_ph,
            active_molecule=pesticide_info["active_molecule"],
            generic_name=pesticide_info["generic_name"],
            generic_cost_per_acre=pesticide_info["generic_price_per_acre"],
            branded_name=pesticide_info["branded_name"],
            branded_cost_per_acre=pesticide_info["branded_price_per_acre"],
            savings_vs_branded=pesticide_info["savings_total"],
            scheme_name=scheme_info["scheme_name"],
            subsidy_amount=scheme_info["total_subsidy_amount"],
            net_pesticide_cost=net_pesticide_cost,
            mandi_price_qtl=mandi_rate,
            price_trend=mandi_info["price_trend"],
            estimated_yield_saved_qtl=saved_yield_qtl,
            gross_yield_gain=gross_yield_gain,
            net_financial_gain=net_financial_gain,
            rain_probability_pct=weather_info["rain_probability_pct"],
            weather_alert_level=weather_info["guardrail_status"],
            weather_summary=weather_info["recommendation"],
            advisory_text=advisory_text
        )
        session.add(db_record)
        session.commit()
        session.refresh(db_record)
        record_id = db_record.id
    except Exception as e:
        print(f"Error persisting advisory history: {e}")
        record_id = None

    return {
        "advisory_id": record_id,
        "farmer_profile": {
            "language": req.farmer_language,
            "state": req.state,
            "district": req.district,
            "crop": req.crop,
            "acres": req.acres,
            "symptom": req.symptom
        },
        "mandi": mandi_info,
        "pesticide": pesticide_info,
        "scheme": scheme_info,
        "weather": weather_info,
        "roi": roi_info,
        "advisory_text": advisory_text
    }

@app.get("/api/history")
def get_history(limit: int = 10, session: Session = Depends(get_session)):
    statement = select(AdvisoryHistory).order_by(AdvisoryHistory.created_at.desc()).limit(limit)
    results = session.exec(statement).all()
    return results

@app.post("/api/translate")
async def translate_endpoint(req: TranslationRequest):
    return await translate_text(req.text, req.target_language, req.source_language)
