import { ReactNode, createContext } from 'react';
import CoinGeckoAPI from '../../services/coingecko';
import TweetsAPI from '../../services/tweets';

interface Props {
  children: ReactNode;
}

const services = {
  coingeckoService: new CoinGeckoAPI(),
  tweetsService: new TweetsAPI(),
};
const ServicesContext = createContext({});
const { Provider } = ServicesContext;
const ServicesProvider: React.FC<Props> = ({ children }) => {
  return <Provider value={{ services }}>{children}</Provider>;
};
export { ServicesContext, ServicesProvider };
