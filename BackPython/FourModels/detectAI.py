
from transformers import pipeline
pipe = pipeline("text-classification", model="PirateXX/AI-Content-Detector", padding=True, truncation=True)

#print(pipe("Israeli-American Keith Siegel and two others freed in scenes that were more organized than the chaotic previous round"))

def isAi(text):
    result = pipe(text)
    if result[0]['label'] == "LABEL_1":
        print(result[0]['score'])
        return 1 - float(result[0]['score'])
    return result[0]['score']
