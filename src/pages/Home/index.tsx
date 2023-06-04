import React from 'react';
import { InputBox } from '../../components';
import './Home.scss';
import { GasPrices, TrendingCoins } from '../../features';

function Home() {
  return (
    <div className='home-container'>
      <div className='home-left-side'>
        <InputBox
          placeholderText='Search for your coin'
          typeoutEffect={true}
          customeStyle={{ width: '50%', fontSize: '20px' }}
        />
      </div>
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
