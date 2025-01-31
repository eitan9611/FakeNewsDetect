from transformers import logging as transformers_logging
transformers_logging.set_verbosity_error()
from FourModels import detectAI, detectBias, detectToxic, VotingClassifier
import random
from Tags import ExtractList_FromTweet, CreateTagsColumn, FixAndFill, CalcTagsPrecentage

from flask_cors import CORS
from flask import Flask, request, jsonify

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes


@app.route('/submit-text', methods=['POST'])
def submit_text():
    data = request.get_json()
    text = data.get('inputText')

    if not text:
        return jsonify({"error": "No text provided"}), 400

    try:
        # Call your custom analysis functions
        ai_detected = detectAI.isAi(text)
        sentiment_score = detectToxic.isToxic(text)
        contextual_score = detectBias.isBias(text)
        general_score= 0.57

        overall_score = VotingClassifier.calc(ai_detected,sentiment_score,contextual_score,general_score)

        print("getting into Extract")
        entities_list_not_cleaned = ExtractList_FromTweet.Extract(text)
        print(entities_list_not_cleaned)
        entities_list = []
        for tag in entities_list_not_cleaned:
            entities_list.append(CreateTagsColumn.format_tags(tag))
        print(entities_list)

        links_list = FixAndFill.get_wikipedia_links_wikidata(entities_list_not_cleaned)
        print(links_list)

        # Remove items where the second list contains "No link found even after retry"
        filtered_entities = []
        filtered_links = []
        for i, link in enumerate(links_list):
            if link != "No link found even after retry":
                filtered_entities.append(entities_list[i])
                filtered_links.append(link)

        print("hey1")
        percents_list = CalcTagsPrecentage.calculate_fake_percentage(entities_list)
        print("hey")
        print(percents_list)

        # Return results
        response = {
            "results": {
                "model1": ai_detected * 100,  # AI Detection Score
                "model2": sentiment_score * 100,  # Toxicity Score
                "model3": contextual_score * 100,  # Bias Score
                "model4": random.random() * 100,  # Random Score
                "overall": overall_score  # Overall Random Score
            },
            "entities": filtered_entities,  # Filtered entities
            "links": filtered_links,  # Filtered links
            "percents": percents_list  # Filtered links
        }
        return jsonify(response)
    except Exception as e:
        return jsonify({"error": str(e)}), 500


if __name__ == '__main__':
    app.run(debug=True)  # on port 5000 by default
