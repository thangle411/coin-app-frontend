import { Tweet } from '../api/getTweets';

type SentimentAnalysis = {
  neutral: number;
  positive: number;
  negative: number;
};

class TweetsAPI {
  static groupTweetsBySentiment(tweets: Tweet[]): SentimentAnalysis {
    const categories: SentimentAnalysis = {
      neutral: 0,
      positive: 0,
      negative: 0,
    };

    tweets.forEach((tweet: Tweet) => {
      if (!tweet.sentiment) return;
      switch (tweet.sentiment) {
        case 'Neutral':
          categories.neutral++;
          break;

        case 'Positive':
          categories.positive++;
          break;

        case 'Negative':
          categories.negative++;
          break;
      }
    });

    return categories;
  }
}

export default TweetsAPI;
