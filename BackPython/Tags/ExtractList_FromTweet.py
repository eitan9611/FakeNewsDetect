from transformers import pipeline
from transformers import AutoTokenizer, AutoModelForTokenClassification, pipeline
import re


def Extract(text):
    try:
        # Creating a pipeline for named entity recognition (NER)
        pipe = pipeline("token-classification", model="dayvidwang/twitter_ner", framework="pt")
        # Step 1: Identify Twitter users as custom entities
        custom_entities = []
        matches = re.findall(r"@\w+", text)  # Finding Twitter users
        for match in matches:
            username = match[1:]  # Remove the '@'
            custom_entities.append({
                'word': "User: "+username,
                'entity': "USER",
                'score': 1
            })

        # Step 2: Replace Twitter users in the modified text
        modified_text = text
        for match in matches:
            username = match[1:]
            modified_text = modified_text.replace(match, username)

        # Step 3: Run the modified text through the pipeline
        raw_result = pipe(modified_text)

        # Step 4: Process pipeline results to concatenate adjacent entities
        processed_result = []
        current_entity = None

        for entity in raw_result:
            word = entity['word']
            label = entity['entity']
            score = entity['score']

            # Handle word fragments (##)
            if word.startswith("##"):
                word = word[2:]
                if current_entity:
                    current_entity['word'] += word
                    current_entity['score'] = min(current_entity['score'], score)
                continue

            # Concatenating adjacent entities
            if label.startswith("B-"):
                if current_entity:
                    processed_result.append(current_entity)
                current_entity = {'word': word, 'entity': label[2:], 'score': score}
            elif label.startswith("I-") and current_entity and label[2:] == current_entity['entity']:
                current_entity['word'] += f" {word}"
                current_entity['score'] = min(current_entity['score'], score)
            else:
                if current_entity:
                    processed_result.append(current_entity)
                current_entity = None

        # Add the last entity
        if current_entity:
            processed_result.append(current_entity)

        # Step 5: Combine custom entities with pipeline results
        final_result = custom_entities + processed_result

        def filter_substring_tags(entities):
            # Sort entities by word length in descending order
            sorted_entities = sorted(entities, key=lambda x: len(x['word']), reverse=True)
            result = []

            for i, entity in enumerate(sorted_entities):
                should_add = True
                current_word = entity['word']

                # Compare with all remaining entities (which are shorter or equal length)
                for other_entity in sorted_entities[i + 1:]:
                    other_word = other_entity['word']
                    # Check if the shorter word is a substring of the longer word
                    if other_word.lower() in current_word.lower():
                        # Mark the shorter entity to be skipped
                        sorted_entities[sorted_entities.index(other_entity)]['word'] = ''

                if should_add and entity['word']:
                    result.append(entity)

            return result

        filtered_result = filter_substring_tags(final_result)

        # Display results
        result_list = []
        for entity in filtered_result:
            result_list.append(entity['word'])
        return result_list
    except Exception as e:
        print(f"Failed to load pipeline: {e}")
        raise
