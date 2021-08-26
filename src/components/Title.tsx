import { memo, VFC } from 'react';
import { ApolloError } from '@apollo/client';
import { Box, Heading } from '@chakra-ui/react';

import { Data } from '../type/data';

type Props = {
  loading: boolean;
  error: ApolloError;
  data: Data;
};
type PartialType = Partial<Props>;

export const Title: VFC<PartialType> = memo(({ loading, error, data }) => {
  const repositoryCount = data?.search.repositoryCount;
  const repositoryUnit = repositoryCount === 1 ? 'Repository' : 'Repositories';
  const title = 'GitHub Repositories Seach Results';

  return (
    <Box p={{ base: 4, md: 6 }}>
      <Heading as="h1" fontSize={{ base: 'lg', sm: 'xl', md: '2xl' }}>
        {title}
        {loading
          ? ' - Loading...'
          : error
          ? ` - Error! ${error.message}`
          : ` - ${repositoryCount}${repositoryUnit}`}
      </Heading>
    </Box>
  );
});
