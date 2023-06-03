class CoinGeckoAPI {
  static async isServerAlive() {
    try {
      const response = await fetch(`${process.env.REACT_APP_COINGECKO_API_URL}/ping`);
      if (response.ok) {
        return true;
      }
      return false;
    } catch (err) {
      console.log('Something wrong with Coingecko API');
      return false;
    }
  }
}

export default CoinGeckoAPI;
