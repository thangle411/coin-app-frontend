import { QueryFunctionContext, useQuery } from 'react-query';
import CoinGeckoAPI from '../services/coingecko';

export interface HistoricalMarketData {
  prices?: (number[] | null)[] | null;
  market_caps?: (number[] | null)[] | null;
  total_volumes?: (number[] | null)[] | null;
}

type QueryKey = [string, string, number, string, string];

const getHistoricalMarketData = async ({
  queryKey,
}: QueryFunctionContext<QueryKey>): Promise<HistoricalMarketData | null> => {
  try {
    const [_key, id, days, interval, currency] = queryKey;

    const isServerAlive = await CoinGeckoAPI.isServerAlive();

    if (!isServerAlive) {
      throw new Error('getHistoricalMarketData() Coingecko Server is not alive');
    }

    const response = await fetch(
      `${process.env.REACT_APP_COINGECKO_API_URL}/coins/${id}/market_chart?vs_currency=${currency}&days=${days}&interval=${interval}`,
    );

    if (!response.ok) {
      throw new Error('getHistoricalMarketData() Network response was not ok');
    }

    const data = await response.json();

    if (!data.prices.length) {
      throw new Error('getHistoricalMarketData() No prices array');
    }
    return data;
  } catch (error) {
    console.error('Cant get tweets');
    throw error;
  }
};

export const useHistoricalMarketDataQuery = (
  id: string,
  days: number,
  interval: string = 'hourly',
  currency: string = 'usd',
) => useQuery({ queryKey: ['tweets', id, days, interval, currency], queryFn: getHistoricalMarketData });
