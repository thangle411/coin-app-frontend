import React from 'react';
import { useTrendingCoinsQuery } from '../../api';
import LoadingSpinner from '../LoadingSpinner';
import './TrendingCoins.scss';

export default function TrendingCoins() {
  const trendingCoins = useTrendingCoinsQuery();

  if (trendingCoins.isLoading) {
    return (
      <div className='d-flex-col align-items-center justify-content-center'>
        <span>Fetching trending coins...</span>
        <LoadingSpinner />
      </div>
    );
  }

  if (trendingCoins.isError) {
    return <div>Failed to get trending coins...</div>;
  }

  return (
    <div className='treding-coins-container'>
      <div className='trending-coins-heading'>Trending Coins</div>
      <div className='trending-coins-rows-container'>
        {trendingCoins.data?.map(coin => (
          <a
            href={`https://www.coingecko.com/en/coins/${coin.item?.slug}`}
            target='_blank'
            className='trending-coins-row'
            key={coin.item?.coin_id}
            rel='noreferrer'
          >
            <img className='logo' src={coin.item?.small} alt={`${coin.item?.name} logo`} />
            {coin.item?.symbol} - {coin.item?.name}
          </a>
        ))}
      </div>
    </div>
  );
}
