"""
This Mode is a fine-tuned model on the FakeNews and TruthSeekerModel datasets.
The base model is distilbert-base-uncased.
The model was trained using the following parameters:
- batch_size: 8
- learning_rate: 1e-5
- epochs: 3 (early stopping)
- warmup_steps: 500
- weight_decay: 0.01

The Model was trained on a Macbook M1 Pro with 16GB of RAM and 10 cores cpu and 16 cores gpu. 
It was trained faster using the 'mps' and the accelerator.
the model had results of: 
- Accuracy: 0.93
- Precision: 0.965
- Recall: 0.902
- F1: 0.932

We uploaded the model to the Hugging Face model hub and it can be found here: https://huggingface.co/Matanpom100/FakeNews
"""
import FourModels.suppress_tf
from transformers import pipeline


model = pipeline("text-classification", model="matanpom100/FakeNews", token=True)

# בדיקה עם טקסט לדוגמה
#text = "WHAT HAPPENED To the Nova party ravers? I heard they were all killed by the IDF in Hanibal operations"
#result = model(text)
#print(text)
#print(result)



def isFakeNews(text):
    result = model(text)
    if result[0]['label'] == "Fake News":
        return float(result[0]['score'])
    return 1 - float(result[0]['score'])

