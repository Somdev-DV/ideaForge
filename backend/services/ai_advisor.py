import os
from typing import Dict, Any

LANGUAGE_TEMPLATES = {
    "English": {
        "summary": "Advisory for {crop} ({acres} Acres) in {district}, {state}.",
        "pest_diag": "Observed symptom '{symptom}' corresponds to {target_pest}.",
        "solution": "Active ingredient recommended: {active_molecule} ({generic_name}). Cost is ₹{generic_price_per_acre}/acre compared to ₹{branded_price_per_acre}/acre for branded {branded_name}, saving ₹{savings_total}.",
        "scheme": "Eligible for {scheme_name} ({subsidy_pct}% subsidy), reducing net pesticide cost to ₹{net_cost} for {acres} acres.",
        "roi": "Current mandi rate is ₹{mandi_rate}/Qtl ({trend}). Treating this pest saves an estimated {saved_yield} Qtl of yield, resulting in a Net Financial Gain of ₹{net_gain}.",
        "weather": "Weather: {weather_status}. {weather_rec}"
    },
    "Tamil": {
        "summary": "{state}, {district} பகுதியில் {crop} ({acres} ஏக்கர்) பயிருக்கான வேளாண் ஆலோசனை.",
        "pest_diag": "கண்டறியப்பட்ட அறிகுறி '{symptom}' என்பது {target_pest} பாதிப்பைக் குறிக்கிறது.",
        "solution": "பரிந்துரைக்கப்பட்ட வீரிய மூலப்பொருள்: {active_molecule} ({generic_name}). பொது மருந்து விலை ஏக்கருக்கு ₹{generic_price_per_acre}, பிராண்டட் {branded_name} விலை ₹{branded_price_per_acre}. உங்கள் நேரடி சேமிப்பு ₹{savings_total}.",
        "scheme": "{scheme_name} மூலம் {subsidy_pct}% அரசு மானியம் கிடைக்கிறது. இதன் மூலம் {acres} ஏக்கருக்கான நிகர மருந்து செலவு வெறும் ₹{net_cost} ஆக குறைகிறது.",
        "roi": "தற்போதைய மண்டி விலை குவிண்டாலுக்கு ₹{mandi_rate} ({trend}). இப்பூச்சி தாக்குதலைக் கட்டுப்படுத்துவதன் மூலம் சுமார் {saved_yield} குவிண்டால் மகசூல் காப்பாற்றப்பட்டு, நிகர நிதி லாபமாக ₹{net_gain} கிடைக்கும்.",
        "weather": "வானிலை எச்சரிக்கை: {weather_status}. {weather_rec}"
    },
    "Hindi": {
        "summary": "{state}, {district} में {crop} ({acres} एकड़) के लिए किसान कृषि सलाह।",
        "pest_diag": "पहचाने गए लक्षण '{symptom}' {target_pest} कीट/रोग के संकेत हैं।",
        "solution": "अनुशंसित सक्रिय रसायन (Active Molecule): {active_molecule} ({generic_name})। जेनेरिक दवा की लागत ₹{generic_price_per_acre}/एकड़ है, जबकि ब्रांडेड {branded_name} ₹{branded_price_per_acre} की है। कुल बचत ₹{savings_total} है।",
        "scheme": "आप {scheme_name} ({subsidy_pct}% सरकारी सब्सिडी) के पात्र हैं। इससे {acres} एकड़ के लिए शुद्ध कीटनाशक लागत केवल ₹{net_cost} रह जाती है।",
        "roi": "वर्तमान मंडी भाव ₹{mandi_rate}/क्विंटल ({trend}) है। समय पर छिड़काव से लगभग {saved_yield} क्विंटल फसल बचेगी, जिससे आपको ₹{net_gain} का शुद्ध वित्तीय लाभ (ROI) होगा।",
        "weather": "मौसम चेतावनी: {weather_status}। {weather_rec}"
    },
    "Telugu": {
        "summary": "{state}, {district} లో {crop} ({acres} ఎకరాలు) పంట కోసం వ్యవసాయ సలహా.",
        "pest_diag": "గుర్తించిన లక్షణం '{symptom}' {target_pest} తెగులును సూచిస్తుంది.",
        "solution": "సిఫార్సు చేయబడిన మాలిక్యూల్: {active_molecule} ({generic_name}). జెనరిక్ ధర ఎకరానికి ₹{generic_price_per_acre}, బ్రాండెడ్ {branded_name} ధర ₹{branded_price_per_acre}. మొత్తం ఆదా ₹{savings_total}.",
        "scheme": "{scheme_name} ద్వారా {subsidy_pct}% ప్రభుత్వ రాయితీ వర్తిస్తుంది. దీంతో {acres} ఎకరాలకు నికర పురుగుమందు ఖర్చు కేవలం ₹{net_cost} మాత్రమే.",
        "roi": "ప్రస్తుత మార్కెట్ యార్డ్ ధర క్వింటాలుకు ₹{mandi_rate} ({trend}). పురుగును నివారించడం ద్వారా {saved_yield} క్వింటాళ్ల దిగుబడి సంరక్షించబడుతుంది, నికర లాభం ₹{net_gain}.",
        "weather": "వాతావరణ హెచ్చరిక: {weather_status}. {weather_rec}"
    },
    "Marathi": {
        "summary": "{state}, {district} मधील {crop} ({acres} एकर) पिकासाठी शेती सल्ला.",
        "pest_diag": "आढळून आलेले लक्षण '{symptom}' हे {target_pest} रोगाचे आहे.",
        "solution": "शिफारस केलेले रासायनिक घटक: {active_molecule} ({generic_name}). जेनेरिक औषधाचा खर्च ₹{generic_price_per_acre}/एकर आहे, तर ब्रँडेड {branded_name} ₹{branded_price_per_acre} आहे. तुमची बचत ₹{savings_total} होईल.",
        "scheme": "{scheme_name} अंतर्गत {subsidy_pct}% शासकीय अनुदान उपलब्ध आहे. यामुळे {acres} एकरासाठी औषधाचा निव्वळ खर्च फक्त ₹{net_cost} राहील.",
        "roi": "सध्याचा बाजार भाव ₹{mandi_rate}/क्विंटल ({trend}) आहे. किडीचा प्रादुर्भाव रोखून {saved_yield} क्विंटल उत्पादन वाचेल आणि ₹{net_gain} चा निव्वळ नफा होईल.",
        "weather": "हवामान अंदाज: {weather_status}. {weather_rec}"
    }
}

async def generate_advisory_explanation(
    language: str,
    state: str,
    district: str,
    crop: str,
    acres: float,
    symptom: str,
    pesticide_data: Dict[str, Any],
    scheme_data: Dict[str, Any],
    mandi_data: Dict[str, Any],
    weather_data: Dict[str, Any],
    roi_data: Dict[str, Any]
) -> str:
    gemini_key = os.getenv("GEMINI_API_KEY", "").strip()
    
    # Try Google Gemini free-tier via google-genai SDK if key present
    if gemini_key and gemini_key != "your_gemini_api_key_here":
        try:
            from google import genai
            client = genai.Client(api_key=gemini_key)
            prompt = f"""
You are an expert Indian Agronomist and Rural Agricultural Extension Officer.
Write a clear, empathetic, and actionable advisory for an Indian farmer speaking {language}.

Farmer Profile:
- State: {state}, District: {district}
- Crop: {crop}, Land: {acres} Acres
- Observed Pest/Symptom: {symptom}

Engine Findings:
1. Recommended Active Molecule: {pesticide_data['active_molecule']} ({pesticide_data['generic_name']}) at ₹{pesticide_data['generic_price_per_acre']}/acre. (Branded {pesticide_data['branded_name']} costs ₹{pesticide_data['branded_price_per_acre']}/acre; saving ₹{pesticide_data['savings_total']}).
2. State Government Subsidy: {scheme_data['scheme_name']} ({scheme_data['subsidy_percentage']}% subsidy), Net pesticide cost after subsidy is ₹{scheme_data['net_effective_cost']}. KVK contact: {scheme_data['kvk_contact']}.
3. Mandi Market Rate: ₹{mandi_data['modal_price']}/Quintal ({mandi_data['price_trend']}). Yield saved: {roi_data['saved_yield_qtl']} Quintals. Net Financial ROI: ₹{roi_data['net_gain_inr']}.
4. Weather Guardrail: {weather_data['guardrail_status']} (Rain probability: {weather_data['rain_probability_pct']}%). Advice: {weather_data['recommendation']}.

Write a 3-4 paragraph structured guide in {language} covering:
1. Diagnosis & Active Molecule recommendation (emphasize generic vs branded cost savings).
2. Subsidy claim step at the local KVK / PACS.
3. Financial gain (Yield saved x Mandi rate - chemical cost).
4. Weather spray alert (advise whether to spray today or delay).
Keep the tone encouraging, clear, and rural-friendly.
"""
            response = client.models.generate_content(
                model="gemini-2.5-flash",
                contents=prompt
            )
            if response and response.text:
                return response.text
        except Exception as e:
            print(f"Warning: Gemini API call error: {e}. Falling back to multilingual template engine.")

    # High quality regional template generation
    lang_key = "English"
    for k in LANGUAGE_TEMPLATES.keys():
        if k.lower() in language.lower():
            lang_key = k
            break
            
    t = LANGUAGE_TEMPLATES[lang_key]
    
    parts = [
        t["summary"].format(state=state, district=district, crop=crop, acres=acres),
        t["pest_diag"].format(symptom=symptom, target_pest=pesticide_data['target_pest']),
        t["solution"].format(
            active_molecule=pesticide_data['active_molecule'],
            generic_name=pesticide_data['generic_name'],
            generic_price_per_acre=pesticide_data['generic_price_per_acre'],
            branded_name=pesticide_data['branded_name'],
            branded_price_per_acre=pesticide_data['branded_price_per_acre'],
            savings_total=pesticide_data['savings_total']
        ),
        t["scheme"].format(
            scheme_name=scheme_data['scheme_name'],
            subsidy_pct=scheme_data['subsidy_percentage'],
            net_cost=scheme_data['net_effective_cost'],
            acres=acres
        ) + f" (KVK: {scheme_data['kvk_contact']})",
        t["roi"].format(
            mandi_rate=mandi_data['modal_price'],
            trend=mandi_data['price_trend'],
            saved_yield=roi_data['saved_yield_qtl'],
            net_gain=roi_data['net_gain_inr']
        ),
        t["weather"].format(
            weather_status="Safe to spray" if weather_data['spray_safe'] else "Delay Spraying Warning",
            weather_rec=weather_data['recommendation']
        )
    ]
    
    return "\n\n".join(parts)
