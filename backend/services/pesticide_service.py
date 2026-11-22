import json
from pathlib import Path
from typing import Dict, Any, List

PESTICIDES_FILE = Path(__file__).parent.parent / "data" / "pesticides.json"

def get_pesticide_catalog() -> List[Dict[str, Any]]:
    with open(PESTICIDES_FILE, "r", encoding="utf-8") as f:
        return json.load(f)

def find_cheapest_molecule(symptom: str, acres: float = 1.0) -> Dict[str, Any]:
    catalog = get_pesticide_catalog()
    symptom_lower = symptom.lower()
    
    # Matching strategy
    matched = None
    for p in catalog:
        if p["symptom"].lower() in symptom_lower or symptom_lower in p["symptom"].lower():
            matched = p
            break
        if any(term in symptom_lower for term in p["target_pest"].lower().split()):
            matched = p
            break
            
    if not matched:
        # Default to first entry or leaf curl
        matched = catalog[0]
        
    generic_cost = matched["generic_price"] * acres
    branded_cost = matched["branded_price"] * acres
    savings = branded_cost - generic_cost
    
    return {
        "matched_symptom": matched["symptom"],
        "target_pest": matched["target_pest"],
        "active_molecule": matched["active_molecule"],
        "category": matched["category"],
        "recommended_dosage_per_acre": matched["recommended_dosage_per_acre"],
        "application_instructions": matched["application_instructions"],
        "organic_alternative": matched["organic_alternative"],
        "generic_name": matched["generic_name"],
        "generic_price_per_acre": matched["generic_price"],
        "total_generic_cost": round(generic_cost, 2),
        "branded_name": matched["branded_name"],
        "branded_price_per_acre": matched["branded_price"],
        "total_branded_cost": round(branded_cost, 2),
        "savings_total": round(savings, 2),
        "savings_percentage": matched["savings_percentage"],
        "vendor": matched["vendor"]
    }
