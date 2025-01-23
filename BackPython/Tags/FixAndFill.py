from SPARQLWrapper import SPARQLWrapper, JSON

def get_wikipedia_links_wikidata(tags):
    sparql = SPARQLWrapper("https://query.wikidata.org/sparql")
    wikipedia_links = {}

    for tag in tags:
        if tag.startswith("User: "):
            user = tag.split(": ")[1]
            print(user)
            wikipedia_links[tag] = "https://x.com/"+user
            continue
        query = f"""
        SELECT ?item ?article WHERE {{
            ?item ?label "{tag}"@en.
            ?article schema:about ?item .
            ?article schema:inLanguage "en" .
            ?article schema:isPartOf <https://en.wikipedia.org/>.
        }}
        LIMIT 1
        """
        sparql.setQuery(query)
        sparql.setReturnFormat(JSON)
        results = sparql.query().convert()

        bindings = results.get("results", {}).get("bindings", [])
        if bindings:
            article = bindings[0]["article"]["value"]
            wikipedia_links[tag] = article
        else:
            # Retry with fallback function if no link is found
            new_tag = Fix(tag)
            query = f"""
            SELECT ?item ?article WHERE {{
                ?item ?label "{new_tag}"@en.
                ?article schema:about ?item .
                ?article schema:inLanguage "en" .
                ?article schema:isPartOf <https://en.wikipedia.org/>.
            }}
            LIMIT 1
            """
            sparql.setQuery(query)
            sparql.setReturnFormat(JSON)
            results = sparql.query().convert()

            bindings = results.get("results", {}).get("bindings", [])
            if bindings:
                article = bindings[0]["article"]["value"]
                wikipedia_links[tag] = article
            else:
                wikipedia_links[tag] = "No link found even after retry"

    links_list = list(wikipedia_links.values())
    return links_list

import requests

def Fix(singleTag):
    # Call Wikidata API
    url = f"https://www.wikidata.org/w/api.php?action=wbsearchentities&search={singleTag}&language=en&limit=1&format=json"
    response = requests.get(url)
    data = response.json()

    # Extract the first result
    if data['search']:
        entity = data['search'][0]
        return entity['label']
    else:
        print("No matching entity found.")