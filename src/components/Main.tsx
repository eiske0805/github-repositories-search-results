import { ChangeEvent, useState, useRef } from 'react';
import { useQuery } from '@apollo/client';
import { Box, Input, IconButton, HStack } from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons';

import { Title } from './Title';
import { Results } from './Results';
import { PreviousNextButtons } from './PreviousNextButtons';
import { SEARCH_REPOSITORIES } from '../queries/search-repositories';
import { Variables } from '../type/variables';
import { SearchRepositoriesVariablesContext } from '../contexts/SearchRepositoriesVariablesContext';

const PER_PAGE = 5;
const DEFAULT_VARIABLES = {
  first: PER_PAGE,
  last: null,
  before: null,
  after: null,
  query: '',
};

export const Main = () => {
  const [variables, setVariables] = useState<Variables>(DEFAULT_VARIABLES);
  const inputRef = useRef<HTMLInputElement>(null!);

  const { loading, error, data } = useQuery(SEARCH_REPOSITORIES, {
    variables: variables,
  });

  const handleSubmit = (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    setVariables({ ...variables, query: inputRef.current?.value });
  };

  return (
    <SearchRepositoriesVariablesContext.Provider value={variables}>
      <Box p={{ base: 4, md: 6 }}>
        <Title loading={loading} error={error} data={data} />
        <Box mt={{ base: 4, md: 6 }}>
          <form onSubmit={handleSubmit}>
            <HStack>
              <Input
                placeholder="enter repository name"
                variant="filled"
                borderColor="pink"
                focusBorderColor="purple.500"
                ref={inputRef}
              />
              <IconButton
                type="submit"
                colorScheme="purple"
                aria-label="Search repositories in GitHub"
                icon={<SearchIcon />}
              />
            </HStack>
          </form>
        </Box>
        <Results loading={loading} error={error} data={data} />
        {loading ? (
          ''
        ) : error ? (
          ''
        ) : (
          <PreviousNextButtons
            PER_PAGE={PER_PAGE}
            variables={variables}
            setVariables={setVariables}
            data={data}
          />
        )}
      </Box>
    </SearchRepositoriesVariablesContext.Provider>
  );
};
