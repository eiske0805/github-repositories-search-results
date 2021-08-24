import { ApolloProvider } from '@apollo/client';

import { client } from '../client/client';
import { Main } from './Main';

const App = () => {
  return (
    <ApolloProvider client={client}>
      <Main />
    </ApolloProvider>
  );
};

export default App;
