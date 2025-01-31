def calc(ai_detected, sentiment_score, contextual_score, general_score):
    """
    Calculate a weighted score based on sentiment, contextual, and general scores.

    :param ai_detected: Boolean indicating if AI-generated content was detected.
    :param sentiment_score: Float representing the sentiment analysis score.
    :param contextual_score: Float representing the contextual relevance score.
    :param general_score: Float representing the overall general assessment score.

    :return: Final weighted score, adjusted if AI-generated content is detected.
    """

    # Assign different weights
    sentiment_weight = (sentiment_score*100)*0.2
    contextual_weight = (contextual_score*100)*0.3
    general_weight = (general_score*100)*0.4
    ai_weight = (ai_detected*100)*0.1

    # Compute weighted sum
    weighted_sum = ( sentiment_weight +
                     contextual_weight +
                     general_weight +
                    ai_weight)


    # If AI-generated content is detected, apply a penalty
    print(f"{weighted_sum=}")
    print(f"{sentiment_score=}")
    print(f"{contextual_score=}")
    print(f"{general_score=}")
    print(f"{ai_detected=}")

    return 100-weighted_sum
