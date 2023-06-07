import React, { useEffect, useState } from 'react';
import { InputBox, InputFieldSearchResults, LoadingSpinner } from '../../components';
import './Home.scss';
import { GasPrices, HistoricalMarketData, TrendingCoins, TweetsSentiment } from '../../features';
import CoinGeckoAPI from '../../services/coingecko';
import { CoinGeckoType } from '../../types/coingecko';

function Home() {
  const [isFetchingSearchResults, setIsFetchingSearchResults] = useState(false);
  const [searchString, setSearchString] = useState('');
  const [searchResults, setSearchResults] = useState<CoinGeckoType.CoinsEntity[] | null>(null);
  const [selectedResult, setSelectedResult] = useState<CoinGeckoType.CoinsEntity | null>();
  const [tryUsingContractAddress, setTryUsingContractAddress] = useState(false);

  useEffect(() => {
    setTryUsingContractAddress(false);
    (async () => {
      try {
        if (!searchString) return;
        setIsFetchingSearchResults(true);
        const response = await CoinGeckoAPI.searchForCoin(searchString);

        if (!response) {
          setIsFetchingSearchResults(false);
          setTryUsingContractAddress(true);
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

  const resetStates = (): void => {
    setSearchResults(null);
    setSelectedResult(null);
    setSearchString('');
  };

  const getContentForMainView = (): JSX.Element => {
    if (!selectedResult) {
      return (
        <div className='d-flex-col justify-content-center align-items-center h-100'>
          <div className='position-relative w-50'>
            {tryUsingContractAddress && (
              <div className='no-results-text'>No results - try searching with smart contract address instead</div>
            )}
            <InputBox
              placeholderText='Search for your coin'
              typeoutEffect={true}
              customeStyle={{ width: '100%', fontSize: '20px' }}
              setSearchString={setSearchString}
            />
            {isFetchingSearchResults && (
              <div className='loading-spinner'>
                <LoadingSpinner />
              </div>
            )}
          </div>

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
      <div className='w-100'>
        <div className='coin-info d-flex align-items-center justify-content-space-between'>
          <div className='d-flex info-bar'>
            <div>
              <img src={selectedResult.large} alt='' />
            </div>
            <span>
              {selectedResult.symbol} - {selectedResult.name}
            </span>
          </div>
          <span onClick={resetStates} className='cursor-pointer new-search-text'>
            Search for another coin
          </span>
        </div>
        <div className='w-100 d-flex'>
          <TweetsSentiment searchString={searchString} />
          <HistoricalMarketData id={selectedResult.id} interval={'hourly'} days={7} />
        </div>
      </div>
    );
  };

  return (
    <div className='home-container'>
      <div className='home-left-side'>{getContentForMainView()}</div>
      <div className='home-right-side'>
        <div className='home-gas-container'>
          <div className='title'>Gas Tracker</div>
          {/* <GasPrices /> */}
        </div>
        <div className='separator-horizontal'></div>
        <div className='home-trending-coins-container'>
          <div className='title'>Trending coins</div>
          <TrendingCoins />
        </div>
      </div>
    </div>
  );
}

export default Home;
