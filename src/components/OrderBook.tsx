import {
  Box,
  Button,
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
import { FC, memo } from 'react';
import styled from 'styled-components';

import { useCurrentPrice, useOrderBook } from '../hooks';

const MuiTableCell = styled(TableCell)`
  border: none;
`;

const OrderBook: FC = memo(() => {
  const { history, ready, subscribe, unSubscribe } = useOrderBook('btcusdt');
  const {
    price,
    subscribe: subscribePrice,
    unSubscribe: unSubscribePrice,
  } = useCurrentPrice('btcusdt');

  return (
    <>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', py: 3 }}>
        <Button
          disabled={!ready}
          variant="contained"
          onClick={() => {
            subscribePrice();
            subscribe();
          }}
        >
          Subscribe
        </Button>
        <Button
          disabled={!ready}
          variant="outlined"
          onClick={() => {
            unSubscribe();
            unSubscribePrice();
          }}
        >
          Unsubscribe
        </Button>
      </Box>

      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <MuiTableCell align="left">Price (BTC/USDT)</MuiTableCell>
              <MuiTableCell align="right">Amount</MuiTableCell>
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
                {price} USDT
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
