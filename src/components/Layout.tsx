import { Container } from '@mui/material';
import { FC, memo } from 'react';

const Layout: FC = memo(({ children }) => {
  return (
    <Container maxWidth="sm" sx={{ py: 3 }}>
      {children}
    </Container>
  );
});

export default Layout;
