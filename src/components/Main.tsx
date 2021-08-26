import { ChangeEvent, useState } from 'react';
import { useQuery } from '@apollo/client';
import { Box, Input } from '@chakra-ui/react';

import { SEARCH_REPOSITORIES } from '../queries/search-repositories';
import { Results } from './Results';
import { Title } from './Title';
import { Buttons } from './Buttons';
import { Variables } from '../type/variables';

const PER_PAGE = 5;
const DEFAULT_VARIABLES = {
  first: PER_PAGE,
  last: null,
  before: null,
  after: null,
  query: 'graphql',
};

export const Main = () => {
  const [variables, setVariables] = useState<Variables>(DEFAULT_VARIABLES);

  const { loading, error, data } = useQuery(SEARCH_REPOSITORIES, {
    variables: variables,
  });
  console.log(variables);

  const handleSubmit = (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('submitイベント発生');
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setVariables({ ...variables, query: e.target.value });
  };

  return (
    <Box p={{ base: 4, md: 6 }}>
      <Title loading={loading} error={error} data={data} />
      <Box mt={{ base: 4, md: 6 }}>
        <form onSubmit={handleSubmit}>
          <Input
            variant="filled"
            borderColor="pink"
            focusBorderColor="purple.500"
            value={variables.query}
            onChange={handleChange}
          />
        </form>
      </Box>
      <Results loading={loading} error={error} data={data} />
      {loading ? (
        ''
      ) : error ? (
        ''
      ) : (
        <Buttons
          PER_PAGE={PER_PAGE}
          variables={variables}
          setVariables={setVariables}
          data={data}
        />
      )}
    </Box>
  );
};
