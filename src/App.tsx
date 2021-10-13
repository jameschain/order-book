import { FC, memo } from 'react';

import Layout from './components/Layout';
import OrderBook from './components/OrderBook';

const App: FC = memo(() => {
  return (
    <Layout>
      <OrderBook />
    </Layout>
  );
});

export default App;
