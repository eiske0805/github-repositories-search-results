import { ApolloProvider } from '@apollo/client';
import { ChakraProvider } from '@chakra-ui/react';

import { client } from '../client/client';
import theme from '../theme/theme';
import { Main } from './Main';

const App = () => {
  return (
    <ApolloProvider client={client}>
      <ChakraProvider theme={theme}>
        <Main />
      </ChakraProvider>
    </ApolloProvider>
  );
};

export default App;
