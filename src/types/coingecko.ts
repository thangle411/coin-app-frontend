export namespace CoinGeckoType {
  export interface CoinSearchResult {
    coins?: CoinsEntity[] | null;
    exchanges?: ExchangesEntity[] | null;
    icos?: null[] | null;
    categories?: CategoriesEntity[] | null;
    nfts?: NftsEntity[] | null;
  }
  export interface CoinsEntity {
    id: string;
    name: string;
    api_symbol: string;
    symbol: string;
    market_cap_rank?: number | null;
    thumb: string;
    large: string;
  }
  export interface ExchangesEntity {
    id: string;
    name: string;
    market_type: string;
    thumb: string;
    large: string;
  }
  export interface CategoriesEntity {
    id: number;
    name: string;
  }
  export interface NftsEntity {
    id: string;
    name: string;
    symbol: string;
    thumb: string;
  }
}
