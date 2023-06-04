import { useQuery } from 'react-query';

type EtherScanGasPriceAPIResponse = {
  status: string;
  message: string;
  result: GasPriceResult;
};
type GasPriceResult = {
  LastBlock: string;
  SafeGasPrice: string;
  ProposeGasPrice: string;
  FastGasPrice: string;
  suggestBaseFee: string;
  gasUsedRatio: string;
};

const getGasPrices = async (): Promise<GasPriceResult> => {
  try {
    const response = await fetch(
      'https://api.etherscan.io/api?module=gastracker&action=gasoracle&apikey=YourApiKeyToken',
    );
    const data: EtherScanGasPriceAPIResponse = await response.json();
    if (!data?.result?.suggestBaseFee) {
      throw new Error('No gas prices were fetche');
    }

    return data.result;
  } catch (error) {
    console.error('Cant fetch gas prices');
    throw error;
  }
};

export const useGasPricesQuery = () => useQuery({ queryKey: ['gasPrices'], queryFn: getGasPrices });
