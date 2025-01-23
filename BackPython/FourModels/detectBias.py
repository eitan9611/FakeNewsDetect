#https://huggingface.co/d4data/bias-detection-model
import FourModels.suppress_tf
import tensorflow as tf
from transformers import TFAutoModelForSequenceClassification, AutoTokenizer

model = TFAutoModelForSequenceClassification.from_pretrained("d4data/bias-detection-model")
tokenizer = AutoTokenizer.from_pretrained("d4data/bias-detection-model")

def isBias(text):
    inputs = tokenizer(text, return_tensors="tf", padding=True, truncation=True)
    outputs = model(**inputs)
    probabilities = tf.nn.softmax(outputs.logits, axis=-1)
    return float(probabilities[0][1].numpy())

#text = "The irony, of course, is that the exhibit that invites people to throw trash at vacuuming Ivanka Trump lookalike reflects every stereotype feminists claim to stand against, oversexualizing Ivanka’s body and ignoring her hard work."
