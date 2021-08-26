import { memo, VFC } from 'react';
import { ApolloError } from '@apollo/client';
import { Box, Text, UnorderedList, ListItem, Link } from '@chakra-ui/react';

import { Data } from '../type/data';

type Props = {
  loading: boolean;
  error: ApolloError;
  data: Data;
};
type PartialType = Partial<Props>;

export const Results: VFC<PartialType> = memo(({ loading, error, data }) => {
  return (
    <Box mt={{ base: 4, md: 6 }}>
      {loading ? (
        <Text>Loading...</Text>
      ) : error ? (
        <Text>`Error! ${error.message}`</Text>
      ) : (
        <>
          <UnorderedList mt={{ base: 4, md: 6 }}>
            {data?.search.edges.map((edge) => (
              <ListItem
                key={edge.node.id}
                fontSize={{ base: 'md', sm: 'lg', md: 'xl' }}
              >
                <Link href={edge.node.url} isExternal>
                  {edge.node.name}
                </Link>
              </ListItem>
            ))}
          </UnorderedList>
        </>
      )}
    </Box>
  );
});
