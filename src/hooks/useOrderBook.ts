import { useMemo, useRef } from 'react';

import { useBinance } from './';

export const useOrderBook = (symbol: string) => {
  const { payload, ready, subscribe, unSubscribe } = useBinance(
    symbol,
    'bookTicker'
  );

  const history = useRef<MessageEvent[]>([]);

  history.current = useMemo(() => {
    if (payload && payload.data) {
      history.current = history.current.concat(payload ?? []).slice(-5);
    }

    return history.current;
  }, [payload]);

  return { history, ready, subscribe, unSubscribe };
};
