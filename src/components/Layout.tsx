import { Container } from '@mui/material';
import { FC, memo } from 'react';

const Layout: FC = memo(({ children }) => {
  return <Container>{children}</Container>;
});

export default Layout;
