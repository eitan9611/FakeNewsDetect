#https://huggingface.co/akshayvkt/detect-ai-text
import FourModels.suppress_tf
from transformers import pipeline
pipe = pipeline("text-classification", model="akshayvkt/detect-ai-text", padding=True, truncation=True)

def isAi(text):
    result = pipe(text)
    if result[0]['label'] == "HUMAN":
        return float(result[0]['score'])-0.5
    return result[0]['score']
