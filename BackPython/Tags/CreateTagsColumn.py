import pandas as pd
import Tags.ExtractList_FromTweet
import re


def format_tags(tag):
    # Replace underscores with spaces
    tag = tag.replace('_', ' ')

    # First, detect sequences of 2 or more capital letters that might be acronyms
    acronym_pattern = r'[A-Z]{2,}'
    acronyms = re.finditer(acronym_pattern, tag)

    # Replace found acronyms with temporary placeholders
    preserved = {}
    for i, match in enumerate(acronyms):
        acronym = match.group()
        placeholder = f"____ACRO{i}____"
        preserved[placeholder] = acronym
        tag = tag.replace(acronym, placeholder)

    # Add space before capital letters that come after lowercase letters
    tag = re.sub(r'(?<=[a-z])(?=[A-Z])', ' ', tag)

    # Restore preserved acronyms
    for placeholder, acronym in preserved.items():
        tag = tag.replace(placeholder, acronym)

    # Clean up any double spaces
    tag = re.sub(r'\s+', ' ', tag)

    return tag.strip()


def Column():
    # Step 1: Load the CSV file into a DataFrame
    csv_file = 'filtered_file.csv'
    df = pd.read_csv(csv_file)

    # Step 2: Apply the Extract function from ExtractLinks_FromTweet to the "tweet" column
    df['tags'] = df['tweet'].apply(Tags.ExtractList_FromTweet.Extract)

    # Step 3: Format each tag in the list to be more readable
    df['tags'] = df['tags'].apply(lambda tag_list: [format_tags(tag) for tag in tag_list])

    # Step 4: Save the updated DataFrame back to a CSV file
    output_file = 'TwitterAnalysisUPDATED.csv'
    df.to_csv(output_file, index=False)

    print("Tags column added successfully and saved to", output_file)
    return