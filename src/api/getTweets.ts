import { useQuery } from 'react-query';

export interface Tweet {
  id: string;
  createdAt: string;
  tweetBy: string;
  entities: TweetEntities;
  fullText: string;
  replyTo?: string | null;
  lang: string;
  quoteCount: number;
  replyCount: number;
  retweetCount: number;
  likeCount: number;
  sentiment?: string | null;
}
export interface TweetEntities {
  hashtags?: string[] | null;
  urls?: null[] | null;
  mentionedUsers?: (string | null)[] | null;
  media?: null[] | null;
}

const getTweets = async (): Promise<Tweet[] | null> => {
  try {
    const mockData = await fetch('tweetsData.json');
    const data = await mockData.json();
    return data;
  } catch (error) {
    console.error('Cant get tweets');
    throw error;
  }
};

export const useTweetsQuery = () => useQuery({ queryKey: ['tweets'], queryFn: getTweets });
