import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
  styles: {
    global: {
      body: {
        bg: '#CDDC9F',
        color: '#C96F8A',
      },
    },
  },
  colors: {
    pink: '#C96F8A',
  },
});

export default theme;
