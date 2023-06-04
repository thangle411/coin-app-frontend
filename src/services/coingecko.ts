import { CoinGeckoType } from '../types/coingecko';

class CoinGeckoAPI {
  static async isServerAlive() {
    try {
      const response = await fetch(`${process.env.REACT_APP_COINGECKO_API_URL}/ping`);
      if (response.ok) {
        return true;
      }
      return false;
    } catch (err) {
      console.error('Something wrong with Coingecko API');
      return false;
    }
  }

  static async searchForCoin(coin: string): Promise<CoinGeckoType.CoinsEntity[] | null> {
    try {
      const isAlive = await CoinGeckoAPI.isServerAlive();

      if (!isAlive) return null;

      const response = await fetch(`${process.env.REACT_APP_COINGECKO_API_URL}/search?query=${coin}`);

      if (!response.ok) return null;

      const data = await response.json();
      if (!data?.coins?.length) return null;

      return data.coins;
    } catch (err) {
      console.error('Cant not search for coin');
      return null;
    }
  }

  static async getCoinHistoricalMarketData() {
    try {
    } catch (error) {
      console.error('Cant not get data for coin');
      return null;
    }
  }
}

export default CoinGeckoAPI;
