import pandas as pd


def calculate_fake_percentage(tags_list):
    """
    Calculate the percentage of fake tweets for each tag, preserving the input order of tags_list.
    Matches are based on individual words within the tag.

    For each word in the tag, the function counts rows where at least one word matches, ensuring each row is counted only once.

    :param tags_list: List of tags to check.
    :return: List of fake percentages corresponding to the input tags_list order.
    """
    try:
        # Read the dataset
        csv_file = 'Tags/TwitterAnalysisUPDATED.csv'  # File path
        print(f"Loading dataset from {csv_file}...")
        df = pd.read_csv(csv_file)
        print("Dataset loaded successfully.")

        # Ensure the 'tags' column is properly formatted as lists
        if 'tags' not in df.columns:
            raise ValueError("The dataset does not contain a 'tags' column.")
        print("Formatting the 'tags' column as lists...")
        df['tags'] = df['tags'].apply(
            lambda x: eval(x) if isinstance(x, str) and x.startswith('[') and x.endswith(']') else []
        )
        print("Tags column formatted successfully.")

    except Exception as e:
        print(f"Error while loading or preprocessing dataset: {e}")
        return []

    # Convert the tags list to lowercase for case-insensitive matching
    try:
        tags_list_lower = [tag.lower() for tag in tags_list]
        print(f"Tags list converted to lowercase: {tags_list_lower}")
    except Exception as e:
        print(f"Error processing tags_list: {e}")
        return []

    fake_percentages = []

    for tag in tags_list_lower:
        print(f"\nProcessing tag: {tag}")
        try:
            # Split the tag into individual words
            tag_words = set(tag.split())
            print(f"Split tag into words: {tag_words}")

            # Initialize counters
            total_count = 0
            fake_count = 0

            # Iterate over rows in the dataset
            for idx, row in df.iterrows():
                row_tags = row['tags']
                majority_target = row['majority_target']

                # Check if any word in the tag is in the row's tags
                word_found = any(any(word in t.lower() or t.lower() in word for word in tag_words) for t in row_tags if
                                 isinstance(t, str))

                if word_found:
                    total_count += 1  # Increment total count
                    if not majority_target:  # Increment fake count if "majority_target" is False
                        fake_count += 1

            # Calculate the percentage
            if total_count == 0:
                percentage = 0.0
            else:
                percentage = (fake_count / total_count) * 100

            print(
                f"Tag: {tag} | Total count: {total_count} | Fake count: {fake_count} | Fake percentage: {percentage:.2f}%")
            fake_percentages.append(percentage)

        except Exception as e:
            print(f"Error processing tag {tag}: {e}")
            fake_percentages.append(0.0)

    return fake_percentages
