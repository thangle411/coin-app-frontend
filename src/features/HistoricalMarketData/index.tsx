import React, { FC } from 'react';
import { useHistoricalMarketDataQuery } from '../../api';
import { LineChart, LoadingSpinner } from '../../components';
import Colors from '../../utils/constants/colors';

interface HistoricalMarketDataProps {
  id: string;
  days: number;
  interval: string;
  currency?: string;
}
const HistoricalMarketData: FC<HistoricalMarketDataProps> = ({ id, days, interval, currency = 'usd' }) => {
  const marketData = useHistoricalMarketDataQuery(id, days, interval, currency);

  if (marketData.isLoading) {
    return (
      <div className='d-flex-col align-items-center justify-content-center'>
        <span>Fetching historical data</span>
        <LoadingSpinner />
      </div>
    );
  }

  if (marketData.isError || !marketData.data?.prices?.length) {
    return <div>Failed to get historical data</div>;
  }

  const unixTimestamps: number[] = [];
  const prices: number[] = [];
  marketData.data.prices.forEach(price => {
    if (!price?.[0] || !price?.[1]) return;
    unixTimestamps.push(price[0]);
    prices.push(price[1]);
  });

  return (
    <div className='h-100 d-flex-col justify-content-center'>
      <div style={{ fontSize: '10px', color: Colors.GREY, textAlign: 'end' }}>
        Current price: {prices.at(-1)?.toFixed(2)}
      </div>
      <LineChart dates={unixTimestamps} prices={prices} />
    </div>
  );
};

export default HistoricalMarketData;
