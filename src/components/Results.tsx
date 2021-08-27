import { memo, VFC } from 'react';
import { ApolloError } from '@apollo/client';
import {
  Box,
  Text,
  UnorderedList,
  ListItem,
  Link,
  Stack,
  HStack,
} from '@chakra-ui/react';

import { StarButton } from './StarButton';
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
            <Stack spacing={{ base: 4, md: 6 }} justify="flex-start">
              {data?.search.edges.map((edge) => (
                <ListItem
                  key={edge.node.id}
                  fontSize={{ base: 'md', sm: 'lg', md: 'xl' }}
                >
                  <HStack>
                    <Link href={edge.node.url} isExternal>
                      {edge.node.name}
                    </Link>
                    <StarButton node={edge.node} />
                  </HStack>
                </ListItem>
              ))}
            </Stack>
          </UnorderedList>
        </>
      )}
    </Box>
  );
});
