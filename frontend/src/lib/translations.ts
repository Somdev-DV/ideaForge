export type Language = 'English' | 'Tamil' | 'Hindi' | 'Telugu' | 'Marathi';

export interface Translations {
  appName: string;
  tagline: string;
  selectLanguage: string;
  changeLanguage: string;
  farmerFormTitle: string;
  farmerFormSubtitle: string;
  stateLabel: string;
  districtLabel: string;
  cropLabel: string;
  acresLabel: string;
  symptomLabel: string;
  voiceInputTooltip: string;
  listening: string;
  quickSymptoms: string;
  soilHealthTitle: string;
  soilHealthDesc: string;
  sampleSoilCardBtn: string;
  nitrogenLabel: string;
  phosphorusLabel: string;
  potassiumLabel: string;
  soilPhLabel: string;
  getAdvisoryBtn: string;
  analyzingBtn: string;
  advisoryDashboard: string;
  listenAdvisory: string;
  pauseAdvisory: string;
  stopAdvisory: string;
  playingAudio: string;
  voiceReadoutTip: string;
  weatherSafetyTitle: string;
  mandiRateTitle: string;
  pesticideSavingsTitle: string;
  govtSubsidyTitle: string;
  roiTitle: string;
  genericCheaperBy: string;
  perAcre: string;
  savingsTotal: string;
  netCostAfterSubsidy: string;
  claimAt: string;
  howToClaim: string;
  modalPrice: string;
  yieldSaved: string;
  grossGain: string;
  netProfit: string;
  roiMultiplier: string;
  newConsultation: string;
  historyTitle: string;
  safeToSpray: string;
  delaySpraying: string;
}

export const translationsMap: Record<Language, Translations> = {
  English: {
    appName: "KrishiSetu AI",
    tagline: "Multilingual Agritech & Resource Advisory Assistant",
    selectLanguage: "Choose Your Language",
    changeLanguage: "Change Language",
    farmerFormTitle: "Farmer Field & Crop Details",
    farmerFormSubtitle: "Provide your crop conditions to get live market rates, generic molecule savings, government subsidies, and rain safety guardrails.",
    stateLabel: "State",
    districtLabel: "District / Mandi",
    cropLabel: "Crop Name",
    acresLabel: "Land Area (Acres)",
    symptomLabel: "Observed Pest / Disease Symptom",
    voiceInputTooltip: "Click to Speak in your regional language",
    listening: "Listening... Speak now",
    quickSymptoms: "Quick Presets",
    soilHealthTitle: "Soil Parameters (Optional / Soil Health Card)",
    soilHealthDesc: "Enter values manually or load a Soil Health Card sample",
    sampleSoilCardBtn: "Load Sample Soil Card",
    nitrogenLabel: "Available Nitrogen (N kg/ha)",
    phosphorusLabel: "Available Phosphorus (P kg/ha)",
    potassiumLabel: "Available Potassium (K kg/ha)",
    soilPhLabel: "Soil pH (Acidity/Alkalinity)",
    getAdvisoryBtn: "Generate Intelligent Farm Advisory",
    analyzingBtn: "Analyzing Mandi, Weather & Generic Molecules...",
    advisoryDashboard: "Customized Farm Advisory Dashboard",
    listenAdvisory: "Listen in Regional Language",
    pauseAdvisory: "Pause Audio",
    stopAdvisory: "Stop Audio",
    playingAudio: "Speaking in your language...",
    voiceReadoutTip: "Audio synthesized in regional accent for effortless understanding",
    weatherSafetyTitle: "Weather & Rain-Wash Guardrail",
    mandiRateTitle: "Live Agmarknet Mandi Rate & Trend",
    pesticideSavingsTitle: "Active Molecule & Generic vs Branded Savings",
    govtSubsidyTitle: "State Govt Scheme & Input Subsidy",
    roiTitle: "Net Profit & Return on Investment (ROI)",
    genericCheaperBy: "Generic savings",
    perAcre: "per acre",
    savingsTotal: "Total savings across your land",
    netCostAfterSubsidy: "Net Effective Chemical Cost",
    claimAt: "Claim Office / KVK",
    howToClaim: "Claim Procedure",
    modalPrice: "Modal Mandi Price",
    yieldSaved: "Estimated Yield Protected",
    grossGain: "Gross Crop Value Protected",
    netProfit: "Net Financial Benefit",
    roiMultiplier: "Benefit-to-Cost Multiplier",
    newConsultation: "Consult Another Crop / Field",
    historyTitle: "Recent Farmer Consultations",
    safeToSpray: "Weather Safe: Favorable to Spray",
    delaySpraying: "Weather Alert: Postpone Spraying (Rain Risk)"
  },
  Tamil: {
    appName: "கிருஷி சேது AI",
    tagline: "பன்மொழி விவசாய மற்றும் மானிய ஆலோசனை உதவியாளர்",
    selectLanguage: "உங்கள் தாய்மொழியைத் தேர்ந்தெடுக்கவும்",
    changeLanguage: "மொழியை மாற்றவும்",
    farmerFormTitle: "விவசாயி மற்றும் பயிர் விவரங்கள்",
    farmerFormSubtitle: "மண்டி விலை, மலிவு விலை ஜெனரிக் மருந்துகள், அரசு மானியம் மற்றும் மழை பாதுகாப்பு வழிகாட்டுதல்களைப் பெற விவரங்களை உள்ளிடவும்.",
    stateLabel: "மாநிலம்",
    districtLabel: "மாவட்டம் / மண்டி",
    cropLabel: "பயிர் பெயர்",
    acresLabel: "நிலப்பரப்பு (ஏக்கர்)",
    symptomLabel: "கண்டறியப்பட்ட பூச்சி / நோய் அறிகுறி",
    voiceInputTooltip: "தமிழில் குரல் மூலம் பேச மைக்-ஐ அழுத்தவும்",
    listening: "கேட்கிறது... இப்போது பேசவும்",
    quickSymptoms: "துரித தேர்வுகள்",
    soilHealthTitle: "மண் பரிசோதனை அளவுருக்கள் (விரும்பினால்)",
    soilHealthDesc: "மண் அட்டை மதிப்புகளை உள்ளிடவும் அல்லது மாதிரி தரவை ஏற்றவும்",
    sampleSoilCardBtn: "மாதிரி மண் அட்டை ஏற்றவும்",
    nitrogenLabel: "நைட்ரஜன் (N கிகி/ஹெக்)",
    phosphorusLabel: "பாஸ்பரஸ் (P கிகி/ஹெக்)",
    potassiumLabel: "பொட்டாசியம் (K கிகி/ஹெக்)",
    soilPhLabel: "மண் கார அமில நிலை (pH)",
    getAdvisoryBtn: "வேளாண் ஆலோசனையைப் பெறுங்கள்",
    analyzingBtn: "மண்டி விலை மற்றும் மருந்துகள் ஆராயப்படுகின்றன...",
    advisoryDashboard: "தனிப்பயனாக்கப்பட்ட பயிர் ஆலோசனை அறிக்கை",
    listenAdvisory: "தமிழில் குரல் வழியே கேட்கவும்",
    pauseAdvisory: "ஆடியோவை இடைநிறுத்தவும்",
    stopAdvisory: "நிறுத்தவும்",
    playingAudio: "தமிழில் வாசிக்கப்படுகிறது...",
    voiceReadoutTip: "எழுத்து படிக்க சிரமப்படும் விவசாயிகளுக்கான குரல் வழிகாட்டுதல்",
    weatherSafetyTitle: "வானிலை & மழை எச்சரிக்கை பாதுகாப்பு",
    mandiRateTitle: "நேரலை அக்மார்க்நெட் மண்டி விலை",
    pesticideSavingsTitle: "வீரிய மூலப்பொருள் & பொது மருந்து சேமிப்பு",
    govtSubsidyTitle: "அரசு திட்டம் மற்றும் நேரடி மானியம்",
    roiTitle: "நிகர லாபம் மற்றும் முதலீட்டு வருமானம் (ROI)",
    genericCheaperBy: "விலை சேமிப்பு",
    perAcre: "ஏக்கருக்கு",
    savingsTotal: "உங்கள் நிலப்பரப்பிற்கான மொத்த சேமிப்பு",
    netCostAfterSubsidy: "மானியம் கழித்த நிகர மருந்து செலவு",
    claimAt: "அணுக வேண்டிய மையம் / KVK",
    howToClaim: "மானியம் பெறும் வழிமுறை",
    modalPrice: "சராசரி மண்டி விலை",
    yieldSaved: "காப்பாற்றப்பட்ட மகசூல் அளவு",
    grossGain: "காப்பாற்றப்பட்ட விளைச்சலின் மதிப்பு",
    netProfit: "நிகர நிதி லாபம்",
    roiMultiplier: "லாப விகிதம்",
    newConsultation: "மற்றுமொரு ஆலோசனை பெற",
    historyTitle: "முந்தைய விவசாய ஆலோசனைகள்",
    safeToSpray: "வானிலை சாதகமானது: தெளிக்கலாம்",
    delaySpraying: "வானிலை எச்சரிக்கை: மருந்து தெளிப்பதை ஒத்திவைக்கவும்"
  },
  Hindi: {
    appName: "कृषि सेतु AI",
    tagline: "बहुभाषी कृषि एवं संसाधन सलाहकार सहायक",
    selectLanguage: "अपनी भाषा चुनें",
    changeLanguage: "भाषा बदलें",
    farmerFormTitle: "किसान और फसल विवरण",
    farmerFormSubtitle: "लाइव मंडी भाव, जेनेरिक कीटनाशक बचत, सरकारी सब्सिडी और मौसम सुरक्षा पाने के लिए विवरण दर्ज करें।",
    stateLabel: "राज्य",
    districtLabel: "ज़िला / मंडी",
    cropLabel: "फसल का नाम",
    acresLabel: "भूमि क्षेत्र (एकड़)",
    symptomLabel: "देखे गए कीट / रोग के लक्षण",
    voiceInputTooltip: "अपनी भाषा में बोलने के लिए माइक दबाएं",
    listening: "सुन रहे हैं... कृपया बोलें",
    quickSymptoms: "त्वरित चयन",
    soilHealthTitle: "मृदा परीक्षण पैरामीटर (वैकल्पिक / स्वाइल हेल्थ कार्ड)",
    soilHealthDesc: "मृदा पोषक तत्व मान भरें या नमूना डेटा लोड करें",
    sampleSoilCardBtn: "नमूना मृदा कार्ड लोड करें",
    nitrogenLabel: "उपलब्ध नाइट्रोजन (N kg/ha)",
    phosphorusLabel: "उपलब्ध फास्फोरस (P kg/ha)",
    potassiumLabel: "उपलब्ध पोटाश (K kg/ha)",
    soilPhLabel: "मिट्टी का पीएच (pH)",
    getAdvisoryBtn: "कृषि सलाह प्राप्त करें",
    analyzingBtn: "मंडी भाव, सब्सिडी और दवाओं का विश्लेषण...",
    advisoryDashboard: "किसान फसल परामर्श डैशबोर्ड",
    listenAdvisory: "अपनी भाषा में ऑडियो सुनें",
    pauseAdvisory: "रोकें",
    stopAdvisory: "बंद करें",
    playingAudio: "सलाह बोली जा रही है...",
    voiceReadoutTip: "सरल भाषा में ऑडियो परामर्श",
    weatherSafetyTitle: "मौसम एवं वर्षा सुरक्षा अलर्ट",
    mandiRateTitle: "लाइव एगमार्कनेट मंडी भाव एवं रुझान",
    pesticideSavingsTitle: "सक्रिय रसायन एवं जेनेरिक बचत",
    govtSubsidyTitle: "राज्य सरकारी योजना एवं इनपुट सब्सिडी",
    roiTitle: "शुद्ध लाभ एवं वित्तीय वापसी (ROI)",
    genericCheaperBy: "जेनेरिक बचत",
    perAcre: "प्रति एकड़",
    savingsTotal: "पूरी जमीन पर कुल बचत",
    netCostAfterSubsidy: "सब्सिडी के बाद शुद्ध दवा लागत",
    claimAt: "आवेदन केंद्र / KVK",
    howToClaim: "सब्सिडी दावा प्रक्रिया",
    modalPrice: "औसत मंडी भाव",
    yieldSaved: "बचाई गई अनुमानित उपज",
    grossGain: "सुरक्षित उपज का कुल मूल्य",
    netProfit: "शुद्ध आर्थिक लाभ",
    roiMultiplier: "लाभ अनुपात",
    newConsultation: "नई फसल के लिए सलाह लें",
    historyTitle: "हालिया किसान परामर्श",
    safeToSpray: "मौसम अनुकूल है: छिड़काव सुरक्षित",
    delaySpraying: "मौसम चेतावनी: छिड़काव टालें (बारिश का खतरा)"
  },
  Telugu: {
    appName: "కృషి సేతు AI",
    tagline: "బహుభాషా వ్యవసాయ మరియు వనరుల సలహాదారు",
    selectLanguage: "మీ భాషను ఎంచుకోండి",
    changeLanguage: "భాష మార్చండి",
    farmerFormTitle: "రైతు & పంట వివరాలు",
    farmerFormSubtitle: "లైవ్ మార్కెట్ ధరలు, జెనరిక్ పురుగుమందుల ఆదా, ప్రభుత్వ సబ్సిడీ మరియు వర్ష రక్షణ సలహాలను పొందండి.",
    stateLabel: "రాష్ట్రం",
    districtLabel: "జిల్లా / మార్కెట్ యార్డ్",
    cropLabel: "పంట పేరు",
    acresLabel: "సాగు విస్తీర్ణం (ఎకరాలు)",
    symptomLabel: "గుర్తించిన పురుగు / వ్యాధి లక్షణాలు",
    voiceInputTooltip: "మాట్లాడటానికి మైక్ క్లిక్ చేయండి",
    listening: "వింటున్నాము... మాట్లాడండి",
    quickSymptoms: "సులభ ఎంపికలు",
    soilHealthTitle: "నేల పరీక్ష వివరాలు (ఐచ్ఛికం)",
    soilHealthDesc: "నేల ఆరోగ్య కార్డు వివరాలు లేదా నమూనా సమాచారం",
    sampleSoilCardBtn: "నమూనా సాయిల్ కార్డు లోడ్ చేయండి",
    nitrogenLabel: "నైట్రోజన్ (N kg/ha)",
    phosphorusLabel: "భాస్వరం (P kg/ha)",
    potassiumLabel: "పొటాషియం (K kg/ha)",
    soilPhLabel: "నేల స్వభావం (pH)",
    getAdvisoryBtn: "వ్యవసాయ సలహా పొందండి",
    analyzingBtn: "సమాచారం విశ్లేషించబడుతోంది...",
    advisoryDashboard: "వ్యవసాయ సలహా నివేదిక",
    listenAdvisory: "తెలుగులో వినండి",
    pauseAdvisory: "పాజ్ చేయండి",
    stopAdvisory: "ఆపండి",
    playingAudio: "ఆడియో ప్లే అవుతోంది...",
    voiceReadoutTip: "రైతుల సౌకర్యార్థం ఆడియో సదుపాయం",
    weatherSafetyTitle: "వాతావరణం & వర్ష రక్షణ హెచ్చరిక",
    mandiRateTitle: "లైవ్ అగ్‌మార్క్‌నెట్ మార్కెట్ ధర",
    pesticideSavingsTitle: "యాక్టివ్ మాలిక్యూల్ & జెనరిక్ ఆదా",
    govtSubsidyTitle: "ప్రభుత్వ పథకం & రాయితీ",
    roiTitle: "నికర లాభం & ఆదాయం (ROI)",
    genericCheaperBy: "జెనరిక్ ఆదా",
    perAcre: "ఎకరానికి",
    savingsTotal: "మొత్తం పొలంపై ఆదా",
    netCostAfterSubsidy: "రాయితీ తర్వాత మందు ఖర్చు",
    claimAt: "సమీప కేంద్రం / KVK",
    howToClaim: "రాయితీ పొందే విధానం",
    modalPrice: "సగటు మార్కెట్ ధర",
    yieldSaved: "కాపాడబడే దిగుబడి",
    grossGain: "కాపాడిన పంట విలువ",
    netProfit: "నికర ఆర్థిక ప్రయోజనం",
    roiMultiplier: "లాభ నిష్పత్తి",
    newConsultation: "మరో పంట కోసం సలహా పొందండి",
    historyTitle: "మునుపటి సలహాల చరిత్ర",
    safeToSpray: "వాతావరణం అనుకూలం: పిచికారీ చేయవచ్చు",
    delaySpraying: "హెచ్చరిక: పిచికారీ వాయిదా వేయండి (వర్ష సూచన)"
  },
  Marathi: {
    appName: "कृषी सेतू AI",
    tagline: "बहुभाषिक कृषी व संसाधन सल्लागार",
    selectLanguage: "आपली भाषा निवडा",
    changeLanguage: "भाषा बदला",
    farmerFormTitle: "शेतकरी आणि पीक माहिती",
    farmerFormSubtitle: "थेट बाजार भाव, जेनेरिक कीटकनाशक बचत, शासकीय अनुदान आणि हवामान अंदाज मिळवा.",
    stateLabel: "राज्य",
    districtLabel: "जिल्हा / कृषी उत्पन्न बाजार समिती",
    cropLabel: "पिकाचे नाव",
    acresLabel: "जमीन क्षेत्र (एकर)",
    symptomLabel: "दिसलेली कीड किंवा रोगाची लक्षणे",
    voiceInputTooltip: "आपल्या भाषेत बोलण्यासाठी माइक दाबा",
    listening: "ऐकत आहे... कृपया बोला",
    quickSymptoms: "जलद पर्याय",
    soilHealthTitle: "मृदा परीक्षण तपशील (पर्यायी)",
    soilHealthDesc: "माती आरोग्य पत्रिका मूल्ये किंवा नमुना डेटा भरा",
    sampleSoilCardBtn: "नमुना सॉईल हेल्थ कार्ड लोड करा",
    nitrogenLabel: "उपलब्ध नत्र (N kg/ha)",
    phosphorusLabel: "उपलब्ध स्फुरद (P kg/ha)",
    potassiumLabel: "उपलब्ध पालाश (K kg/ha)",
    soilPhLabel: "जमिनीचा सामू (pH)",
    getAdvisoryBtn: "सल्ला मिळवा",
    analyzingBtn: "बाजार भाव आणि औषधांचे विश्लेषण...",
    advisoryDashboard: "पीक सल्ला अहवाल",
    listenAdvisory: "मराठीत ऑडिओ ऐका",
    pauseAdvisory: "थांबवा",
    stopAdvisory: "बंद करा",
    playingAudio: "सल्ला वाचला जात आहे...",
    voiceReadoutTip: "शेतकऱ्यांसाठी सुलभ ऑडिओ मार्गदर्शन",
    weatherSafetyTitle: "हवामान आणि पाऊस सुरक्षा इशारा",
    mandiRateTitle: "थेट अ‍ॅगमार्कनेट बाजार भाव आणि कल",
    pesticideSavingsTitle: "सक्रिय घटक व जेनेरिक औषध बचत",
    govtSubsidyTitle: "शासकीय योजना व थेट अनुदान",
    roiTitle: "निव्वळ नफा आणि परतावा (ROI)",
    genericCheaperBy: "जेनेरिक बचत",
    perAcre: "प्रति एकर",
    savingsTotal: "संपूर्ण जमिनीवर एकूण बचत",
    netCostAfterSubsidy: "अनुदानानंतर औषधाचा निव्वळ खर्च",
    claimAt: "अर्ज केंद्र / KVK",
    howToClaim: "अनुदान मिळवण्याची प्रक्रिया",
    modalPrice: "सरासरी बाजार भाव",
    yieldSaved: "वाचलेले अंदाजित उत्पादन",
    grossGain: "सुरक्षित उत्पन्नाचे मूल्य",
    netProfit: "निव्वळ आर्थिक फायदा",
    roiMultiplier: "नफा गुणक",
    newConsultation: "दुसऱ्या पिकासाठी सल्ला घ्या",
    historyTitle: "मागील शेतकरी सल्ला",
    safeToSpray: "हवामान अनुकूल: फवारणी सुरक्षित",
    delaySpraying: "हवामान इशारा: फवारणी पुढे ढकला (पावसाची शक्यता)"
  }
};
