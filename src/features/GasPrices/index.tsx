import React from 'react';
import { useGasPricesQuery } from '../../api/getGasPrices';
import { LoadingSpinner } from '../../components';
import './GasPrices.scss';

export default function GasPrices() {
  const gasPrices = useGasPricesQuery();

  if (gasPrices.isLoading) {
    return (
      <div className='d-flex justify-content-center align-items-center'>
        <LoadingSpinner />
      </div>
    );
  }

  if (gasPrices.isError || !gasPrices) {
    return <div>Can't get gas prices</div>;
  }

  return (
    <ul className='gas-prices-container'>
      <li>{gasPrices.data?.SafeGasPrice}</li>
      <li>{gasPrices.data?.ProposeGasPrice}</li>
      <li>{gasPrices.data?.FastGasPrice}</li>
    </ul>
  );
}
