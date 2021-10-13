import { useMemo, useRef } from 'react';

import { useBinance } from './';

export const useCurrentPrice = (symbol: string) => {
  const { payload, subscribe, unSubscribe } = useBinance(symbol, 'miniTicker');

  const priceRef = useRef<string>('-');

  priceRef.current = useMemo(() => {
    if (payload && payload.data) {
      priceRef.current = payload.data.c;
    }

    return priceRef.current;
  }, [payload]);

  return { price: priceRef.current, subscribe, unSubscribe };
};
