import { useEffect, useMemo, useRef } from 'react';

import { Pair } from '../types';

type BinancePair = {
  symbol: string;
  status: string;
  baseAsset: string;
  quoteAsset: string;
};

export const usePairs = (keyword: string) => {
  const pairs = useRef<BinancePair[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        'https://api.binance.com/api/v3/exchangeInfo'
      );
      const data = await response.json();

      pairs.current = data.symbols;
    };

    fetchData();
  }, []);

  const filteredPairs: Pair[] = useMemo(
    () =>
      pairs.current
        .filter((pair: BinancePair) =>
          pair.symbol
            .toLowerCase()
            .includes(keyword.replace('/', '').toLowerCase())
        )
        .map((pair: BinancePair) => {
          return {
            baseAsset: pair.baseAsset,
            label: `${pair.baseAsset}/${pair.quoteAsset}`,
            quoteAsset: pair.quoteAsset,
            symbol: pair.symbol.toLowerCase(),
          } as Pair;
        }),
    [keyword]
  );

  return { pairs: filteredPairs };
};
