from SPARQLWrapper import SPARQLWrapper, JSON
import FixAndFill
import requests

def get_wikipedia_links_wikidata(tags):
    sparql = SPARQLWrapper("https://query.wikidata.org/sparql")
    wikipedia_links = {}

    for tag in tags:
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
            new_tag = FixAndFill.Fix(tag)
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

    return wikipedia_links




