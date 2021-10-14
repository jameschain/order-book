import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import { red } from '@mui/material/colors';
import BN from 'bignumber.js';
import { FC, memo, useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';

import { useCurrentPrice, useOrderBook } from '../hooks';
import { Pair } from '../types';
import DropdownPairInput from './DropdownPairInput';

const MuiTableCell = styled(TableCell)`
  border: none;
`;

const defaultPair: Pair = {
  baseAsset: 'BTC',
  label: 'BTC/USDT',
  quoteAsset: 'USDT',
  symbol: 'btcusdt',
};

const OrderBook: FC = memo(() => {
  const [pair, setPair] = useState<Pair>(defaultPair);
  const { history, ready, subscribe, unSubscribe } = useOrderBook(pair.symbol);
  const {
    price,
    ready: priceReady,
    subscribe: subscribePrice,
    unSubscribe: unSubscribePrice,
  } = useCurrentPrice(pair.symbol);

  const subscribeAll = useCallback(
    (isSubscribe: boolean) => {
      if (isSubscribe) {
        subscribePrice();
        subscribe();
      } else {
        unSubscribe();
        unSubscribePrice();
      }
    },
    [subscribe, subscribePrice, unSubscribe, unSubscribePrice]
  );

  useEffect(() => {
    if (ready && priceReady) {
      subscribeAll(true);
    }
    return () => subscribeAll(false);
  }, [priceReady, ready, subscribeAll]);

  return (
    <>
      <Box sx={{ my: 2 }}>
        <DropdownPairInput defaultPair={defaultPair} onSelect={setPair} />
      </Box>
      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <MuiTableCell align="left">
                Price ({pair.quoteAsset})
              </MuiTableCell>
              <MuiTableCell align="right">
                Amount ({pair.baseAsset})
              </MuiTableCell>
              <MuiTableCell align="right">Total</MuiTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {history.current.map((tick, index) => {
              return (
                <TableRow key={index}>
                  <MuiTableCell align="left" sx={{ color: red[900] }}>
                    {tick.data.a}
                  </MuiTableCell>
                  <MuiTableCell align="right">{tick.data.A}</MuiTableCell>
                  <MuiTableCell align="right">
                    {new BN(tick.data.a).times(tick.data.A).toString()}
                  </MuiTableCell>
                </TableRow>
              );
            })}
            <TableRow>
              <MuiTableCell align="left" sx={{ fontWeight: 'bold', py: 2 }}>
                {price} {pair.quoteAsset}
              </MuiTableCell>
            </TableRow>
            {history.current.map((tick, index) => {
              return (
                <TableRow key={`bid-${index}`}>
                  <MuiTableCell align="left">{tick.data.b}</MuiTableCell>
                  <MuiTableCell align="right">{tick.data.B}</MuiTableCell>
                  <MuiTableCell align="right">
                    {new BN(tick.data.b).times(tick.data.B).toString()}
                  </MuiTableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
});

export default OrderBook;
