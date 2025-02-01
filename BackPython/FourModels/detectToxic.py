# #https://huggingface.co/tweetpie/toxic-content-detector
# import FourModels.suppress_tf
from transformers import pipeline, AutoConfig
pipe = pipeline("text-classification", model="unitary/toxic-bert", padding=True, truncation=True)

#{0: 'toxic', 1: 'severe_toxic', 2: 'obscene', 3: 'threat', 4: 'insult', 5: 'identity_hate'}
#print(pipe("the 'nazi' zionist regime is killing innocent people")) #[{'label': 'toxic', 'score': 0.8823136687278748}]



def isToxic(text):
    result = pipe(text)
    return float(result[0]['score'])

