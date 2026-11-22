import json
from pathlib import Path
from typing import Dict, Any, List

SCHEMES_FILE = Path(__file__).parent.parent / "data" / "govt_schemes.json"

def get_govt_schemes() -> List[Dict[str, Any]]:
    with open(SCHEMES_FILE, "r", encoding="utf-8") as f:
        return json.load(f)

def match_scheme(state: str, crop: str, generic_cost_per_acre: float, acres: float = 1.0) -> Dict[str, Any]:
    schemes = get_govt_schemes()
    state_lower = state.lower().strip()
    crop_lower = crop.lower().strip()
    
    matched = None
    # 1. First search for state-specific and crop-specific scheme
    for s in schemes:
        if s["state"].lower() == state_lower:
            crops = [c.lower() for c in s.get("applicable_crops", [])]
            if crop_lower in crops or not crops:
                matched = s
                break
                
    # 2. If no state match, check central / all-India schemes
    if not matched:
        for s in schemes:
            if s["state"].lower() in ["all india", "central"]:
                matched = s
                break
                
    if not matched:
        matched = schemes[0]
        
    subsidy_pct = matched.get("subsidy_percentage", 40)
    max_sub_per_acre = matched.get("max_subsidy_amount_per_acre", 500)
    
    # Calculate subsidy
    calc_subsidy_per_acre = generic_cost_per_acre * (subsidy_pct / 100.0)
    effective_subsidy_per_acre = min(calc_subsidy_per_acre, max_sub_per_acre)
    
    total_subsidy = effective_subsidy_per_acre * acres
    total_generic_cost = generic_cost_per_acre * acres
    net_effective_cost = max(0.0, total_generic_cost - total_subsidy)
    
    return {
        "scheme_name": matched["scheme_name"],
        "state": matched["state"],
        "description": matched["description"],
        "subsidy_percentage": subsidy_pct,
        "max_subsidy_per_acre": max_sub_per_acre,
        "subsidy_amount_per_acre": round(effective_subsidy_per_acre, 2),
        "total_subsidy_amount": round(total_subsidy, 2),
        "net_effective_cost": round(net_effective_cost, 2),
        "kvk_contact": matched.get("kvk_contact", "Local Krishi Vigyan Kendra (KVK)"),
        "claim_procedure": matched.get("claim_procedure", "Visit nearest Primary Agricultural Co-operative.")
    }
