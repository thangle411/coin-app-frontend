import { useQuery } from 'react-query';
import CoinGeckoAPI from '../services/coingecko';

type CoingeckoTrendingCoin = {
  item: {
    id: string;
    coin_id: number;
    name: string;
    symbol: string;
    market_cap_rank: number;
    thumb: string;
    small: string;
    large: string;
    slug: string;
    price_btc: number;
    score: number;
  };
};

type TrendingCoins = CoingeckoTrendingCoin[];

const getTrendingCoins = async (): Promise<TrendingCoins | []> => {
  try {
    const isServerAlive = await CoinGeckoAPI.isServerAlive();

    if (!isServerAlive) {
      throw new Error('Coingecko Server is not alive');
    }

    const response = await fetch(`${process.env.REACT_APP_COINGECKO_API_URL}/search/trending`);

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();
    if (!data.coins?.length) {
      throw new Error('Coins array might not exist');
    }

    return data.coins;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const useTrendingCoinsQuery = () => useQuery({ queryKey: ['trendingCoins'], queryFn: getTrendingCoins });
