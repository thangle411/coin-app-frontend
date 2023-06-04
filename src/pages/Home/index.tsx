import React, { useEffect, useState } from 'react';
import { InputBox, InputFieldSearchResults, LoadingSpinner } from '../../components';
import './Home.scss';
import { GasPrices, TrendingCoins, TweetsSentiment } from '../../features';
import CoinGeckoAPI from '../../services/coingecko';
import { CoinGeckoType } from '../../types/coingecko';

function Home() {
  const [isFetchingSearchResults, setIsFetchingSearchResults] = useState(false);
  const [searchString, setSearchString] = useState('');
  const [searchResults, setSearchResults] = useState<CoinGeckoType.CoinsEntity[] | null>(null);
  const [selectedResult, setSelectedResult] = useState<CoinGeckoType.CoinsEntity | null>();

  useEffect(() => {
    (async () => {
      try {
        if (!searchString) return;
        setIsFetchingSearchResults(true);
        const response = await CoinGeckoAPI.searchForCoin(searchString);

        if (!response) {
          return setSearchResults(null);
        }

        setSearchResults(response);
        setIsFetchingSearchResults(false);
      } catch (err) {
        console.error(err);
        setSearchResults(null);
      }
    })();
  }, [searchString]);

  useEffect(() => {}, [selectedResult?.name]);

  const resetStates = (): void => {
    setSearchResults(null);
    setSelectedResult(null);
    setSearchString('');
  };

  const getContentForMainView = (): JSX.Element => {
    if (!selectedResult) {
      return (
        <div className='d-flex-col justify-content-center align-items-center h-100'>
          <InputBox
            placeholderText='Search for your coin'
            typeoutEffect={true}
            customeStyle={{ width: '50%', fontSize: '20px' }}
            setSearchString={setSearchString}
          />
          {isFetchingSearchResults && <LoadingSpinner />}
          {searchResults && (
            <InputFieldSearchResults style={{ width: '50%' }}>
              <div className='result-list-text'>Click a coin below to choose</div>
              {searchResults.map((coin: CoinGeckoType.CoinsEntity) => (
                <div key={coin.id} className='input-field-result' onClick={() => setSelectedResult(coin)}>
                  {coin.symbol} - {coin.name}
                </div>
              ))}
            </InputFieldSearchResults>
          )}
        </div>
      );
    }
    return (
      <div className='home-tweets-container'>
        <div onClick={resetStates} className='cursor-pointer new-search-text'>
          Search for another coin
        </div>
        <TweetsSentiment searchString={searchString} />
      </div>
    );
  };

  return (
    <div className='home-container'>
      <div className='home-left-side'>{getContentForMainView()}</div>
      <div className='home-right-side'>
        <div className='home-gas-container'>
          <div className='title'>Gas Tracker</div>
          <GasPrices />
        </div>
        <div className='separator'></div>
        <div className='home-trending-coins-container'>
          <div className='title'>Trending coins</div>
          <TrendingCoins />
        </div>
      </div>
    </div>
  );
}

export default Home;
