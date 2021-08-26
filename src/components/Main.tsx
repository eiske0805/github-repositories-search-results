import { ChangeEvent, useState } from 'react';
import { useQuery } from '@apollo/client';
import { Box, ButtonGroup, Input, Button } from '@chakra-ui/react';

import { SEARCH_REPOSITORIES } from '../queries/search-repositories';
import { Results } from './Results';
import { Title } from './Title';

const PER_PAGE = 5;
const DEFAULT_VARIABLES = {
  first: PER_PAGE,
  last: null,
  before: null,
  after: null,
  query: 'graphql',
};

export type Variables = {
  first: number | null;
  last: number | null;
  before: string | null;
  after: string | null;
  query: string;
};

export const Main = () => {
  const [variables, setVariables] = useState<Variables>(DEFAULT_VARIABLES);

  const { loading, error, data } = useQuery(SEARCH_REPOSITORIES, {
    variables: variables,
  });
  console.log(data);

  const handleSubmit = (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('submitイベント発生');
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setVariables({ ...variables, query: e.target.value });
  };

  const goPrevious = (startCursor: string) => {
    setVariables({
      ...variables,
      first: null,
      last: PER_PAGE,
      before: startCursor,
      after: null,
    });
  };
  const goNext = (endCursor: string) => {
    setVariables({
      ...variables,
      first: null,
      last: PER_PAGE,
      before: null,
      after: endCursor,
    });
  };

  return (
    <Box p={{ base: 4, md: 6 }}>
      <Title loading={loading} error={error} data={data} />
      <Box mt={{ base: 4, md: 6 }}>
        <form onSubmit={handleSubmit}>
          <Input value={variables.query} onChange={handleChange} />
        </form>
      </Box>
      <Results loading={loading} error={error} data={data} />
      {loading ? (
        ''
      ) : error ? (
        ''
      ) : (
        <ButtonGroup
          variant="outline"
          size="sm"
          colorScheme="pink"
          mt={{ base: 4, md: 6 }}
        >
          <Button
            isDisabled={!data?.search.pageInfo.hasPreviousPage}
            variant="outline"
            onClick={() => {
              goPrevious(data.search.pageInfo.startCursor);
            }}
          >
            previous
          </Button>
          <Button
            isDisabled={!data?.search.pageInfo.hasNextPage}
            onClick={() => {
              goNext(data.search.pageInfo.endCursor);
            }}
          >
            next
          </Button>
        </ButtonGroup>
      )}
    </Box>
  );
};
