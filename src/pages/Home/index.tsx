import React from 'react';
import { InputBox } from '../../components';
import './Home.scss';

function Home() {
  return (
    <div className='home-container'>
      <InputBox
        placeholderText='Search for your coin'
        typeoutEffect={true}
        customeStyle={{ width: '50%', fontSize: '20px' }}
      />
    </div>
  );
}

export default Home;
