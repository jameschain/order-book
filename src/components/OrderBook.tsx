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
import { FC, memo, useCallback, useMemo, useRef } from 'react';
import useWebSocket, { ReadyState } from 'react-use-websocket';
import styled from 'styled-components';

const MuiTableCell = styled(TableCell)`
  border: none;
`;

const OrderBook: FC = memo(() => {
  const socketUrl = 'wss://stream.binance.com:9443/stream';

  const { lastJsonMessage, readyState, sendJsonMessage } =
    useWebSocket(socketUrl);

  const messageHistory = useRef<MessageEvent[]>([]);

  messageHistory.current = useMemo(() => {
    if (lastJsonMessage && lastJsonMessage.data) {
      messageHistory.current = messageHistory.current
        .concat(lastJsonMessage ?? [])
        .slice(-5);
    }

    return messageHistory.current;
  }, [lastJsonMessage]);

  const handleClickSendMessage = useCallback(() => {
    sendJsonMessage({
      id: 1,
      method: 'SUBSCRIBE',
      params: ['btcusdt@bookTicker'],
    });
  }, [sendJsonMessage]);

  const handleClickUnSendMessage = useCallback(() => {
    sendJsonMessage({
      id: 1,
      method: 'UNSUBSCRIBE',
      params: ['btcusdt@bookTicker'],
    });
  }, [sendJsonMessage]);

  return (
    <>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', py: 3 }}>
        <Button
          disabled={readyState !== ReadyState.OPEN}
          variant="contained"
          onClick={handleClickSendMessage}
        >
          Subscribe
        </Button>
        <Button
          disabled={readyState !== ReadyState.OPEN}
          variant="outlined"
          onClick={handleClickUnSendMessage}
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
            {messageHistory.current.map((message, index) => {
              return (
                <TableRow key={index}>
                  <MuiTableCell align="left" sx={{ color: red[900] }}>
                    {message.data.a}
                  </MuiTableCell>
                  <MuiTableCell align="right">{message.data.A}</MuiTableCell>
                  <MuiTableCell align="right">
                    {new BN(message.data.a).times(message.data.A).toString()}
                  </MuiTableCell>
                </TableRow>
              );
            })}
            {messageHistory.current.map((message, index) => {
              return (
                <TableRow key={index}>
                  <MuiTableCell align="left">{message.data.b}</MuiTableCell>
                  <MuiTableCell align="right">{message.data.B}</MuiTableCell>
                  <MuiTableCell align="right">
                    {new BN(message.data.b).times(message.data.B).toString()}
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
