import httpx
import os
from typing import Dict, Any, Optional

BHASHINI_LANG_CODES = {
    "english": "en",
    "hindi": "hi",
    "tamil": "ta",
    "telugu": "te",
    "marathi": "mr"
}

async def translate_text(text: str, target_lang: str, source_lang: str = "en") -> Dict[str, Any]:
    bhashini_user = os.getenv("BHASHINI_USER_ID", "").strip()
    bhashini_key = os.getenv("BHASHINI_API_KEY", "").strip()
    
    tgt_code = BHASHINI_LANG_CODES.get(target_lang.lower(), "en")
    src_code = BHASHINI_LANG_CODES.get(source_lang.lower(), "en")
    
    if tgt_code == src_code:
        return {"translated_text": text, "source": "identity", "provider": "direct"}
        
    if bhashini_user and bhashini_key and bhashini_key != "your_bhashini_api_key_here":
        try:
            # ULCA / Bhashini NMT API pipeline call
            pipeline_url = "https://meity-auth.ulcacontrib.org/ulca/apis/v0/model/getModelsPipeline"
            headers = {
                "userID": bhashini_user,
                "ulcaApiKey": bhashini_key,
                "Content-Type": "application/json"
            }
            payload = {
                "pipelineTasks": [
                    {
                        "taskType": "translation",
                        "config": {
                            "language": {
                                "sourceLanguage": src_code,
                                "targetLanguage": tgt_code
                            }
                        }
                    }
                ],
                "pipelineRequestConfig": {
                    "pipelineId": "64392f96daac500b55c543d7"
                }
            }
            async with httpx.AsyncClient(timeout=6.0) as client:
                res = await client.post(pipeline_url, headers=headers, json=payload)
                if res.status_code == 200:
                    pipe_data = res.json()
                    # compute call
                    service_id = pipe_data["pipelineResponseConfig"][0]["config"][0]["serviceId"]
                    compute_url = pipe_data["pipelineInferenceAPIEndPoint"]["callbackUrl"]
                    inference_headers = {
                        pipe_data["pipelineInferenceAPIEndPoint"]["inferenceApiKey"]["name"]: 
                        pipe_data["pipelineInferenceAPIEndPoint"]["inferenceApiKey"]["value"]
                    }
                    infer_body = {
                        "pipelineTasks": [
                            {
                                "taskType": "translation",
                                "config": {
                                    "language": {"sourceLanguage": src_code, "targetLanguage": tgt_code},
                                    "serviceId": service_id
                                }
                            }
                        ],
                        "inputData": {
                            "input": [{"source": text}]
                        }
                    }
                    comp_res = await client.post(compute_url, headers=inference_headers, json=infer_body)
                    if comp_res.status_code == 200:
                        out = comp_res.json()
                        trans = out["pipelineResponse"][0]["output"][0]["target"]
                        return {"translated_text": trans, "provider": "Bhashini ULCA NMT"}
        except Exception as e:
            print(f"Bhashini API call fallback: {e}")

    # Fallback to local curated translation dictionary or original
    return {
        "translated_text": text,
        "provider": "browser-speech-native-fallback",
        "lang_code": tgt_code
    }
