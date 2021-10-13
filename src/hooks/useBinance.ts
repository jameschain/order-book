import { useCallback } from 'react';
import useWebSocket, { ReadyState } from 'react-use-websocket';

import { SOCKET_URL } from '../constants';

export const useBinance = (symbol: string, stream: string) => {
  const {
    lastJsonMessage: payload,
    readyState,
    sendJsonMessage,
  } = useWebSocket(SOCKET_URL);

  const subscribe = useCallback(
    () =>
      sendJsonMessage({
        id: 1,
        method: 'SUBSCRIBE',
        params: [`${symbol}@${stream}`],
      }),
    [sendJsonMessage, stream, symbol]
  );

  const unSubscribe = useCallback(
    () =>
      sendJsonMessage({
        id: 1,
        method: 'UNSUBSCRIBE',
        params: [`${symbol}@${stream}`],
      }),
    [sendJsonMessage, stream, symbol]
  );
  const ready = readyState === ReadyState.OPEN;

  return { payload, ready, subscribe, unSubscribe };
};
