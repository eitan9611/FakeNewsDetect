#https://huggingface.co/tweetpie/toxic-content-detector
import FourModels.suppress_tf
from transformers import pipeline
pipe = pipeline("text-classification", model="tweetpie/toxic-content-detector", padding=True, truncation=True)

#LABEL2 = TOXIC, LABEL0 = NON TOXIC
def isToxic(text):
    result = pipe(text)
    if result[0]['label'] == "LABEL_0":
        return float(result[0]['score']) - 0.5
    return result[0]['score']

