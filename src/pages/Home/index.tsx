import React from 'react';
import { InputBox, TrendingCoins } from '../../components';
import './Home.scss';

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
        <TrendingCoins />
      </div>
    </div>
  );
}

export default Home;
