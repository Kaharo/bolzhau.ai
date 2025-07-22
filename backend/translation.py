from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from transformers import AutoTokenizer, AutoModelForSeq2SeqLM
from pathlib import Path
import torch

router = APIRouter()

model_dir = Path(__file__).parent / "models" / "kazTrans_model"

# Загружаем токенизатор и модель
tokenizer = AutoTokenizer.from_pretrained(str(model_dir), local_files_only=True)
model = AutoModelForSeq2SeqLM.from_pretrained(str(model_dir), local_files_only=True)

device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
model = model.to(device).eval()

class TranslateRequest(BaseModel):
    text: str
    source_lang: str  # Пример: "rus_Cyrl"
    target_lang: str  # Пример: "kaz_Cyrl"

@router.post("/audaru/")
async def translate_text(req: TranslateRequest):
    if not req.text.strip():
        raise HTTPException(status_code=400, detail="Text is empty.")

    # Языковые токены в стиле NLLB
    src_tok = f"<1{req.source_lang}>"
    tgt_tok = f"<2{req.target_lang}>"
    forced_bos_token_id = tokenizer.convert_tokens_to_ids(tgt_tok)

    if forced_bos_token_id is None:
        raise HTTPException(status_code=400, detail="Invalid target language token.")

    # Формируем текст с языковым токеном
    full_text = f"{src_tok} {req.text}"
    encoded = tokenizer(full_text, return_tensors="pt", truncation=True, max_length=1024).to(device)

    with torch.no_grad():
        generated_tokens = model.generate(
            **encoded,
            forced_bos_token_id=forced_bos_token_id,
            max_new_tokens=256,
            num_beams=5,
            early_stopping=True
        )

    result = tokenizer.decode(generated_tokens[0], skip_special_tokens=True)
    return {"translation": result.strip()}

