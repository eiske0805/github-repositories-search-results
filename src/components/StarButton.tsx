import { memo, VFC, useContext } from 'react';
import { useMutation } from '@apollo/client';
import { Button } from '@chakra-ui/react';
import { StarIcon, MinusIcon } from '@chakra-ui/icons';

import { Edge } from '../type/data';
import { SEARCH_REPOSITORIES } from '../queries/search-repositories';
import { ADD_STAR } from '../queries/add-star';
import { REMOVE_STAR } from '../queries/remove-star';
import { SearchRepositoriesVariablesContext } from '../contexts/SearchRepositoriesVariablesContext';

type Props = Pick<Edge, 'node'>;

export const StarButton: VFC<Props> = memo(({ node }) => {
  const totalCount = node.stargazers.totalCount;
  const starCount =
    totalCount === 1 ? `${totalCount} star` : `${totalCount} stars`;
  const hasStarred = node.viewerHasStarred;
  const addOrRemoveStarQUery = hasStarred ? REMOVE_STAR : ADD_STAR;
  const addOrRemoveStarVariables = { input: { starrableId: node.id } };
  const variables = useContext(SearchRepositoriesVariablesContext);
  const [addOrRemoveStar] = useMutation(addOrRemoveStarQUery, {
    refetchQueries: [
      {
        query: SEARCH_REPOSITORIES,
        variables: variables,
      },
    ],
  });

  return (
    <Button
      size="xs"
      onClick={() => {
        addOrRemoveStar({ variables: addOrRemoveStarVariables });
      }}
    >
      {`${starCount}`}
      {hasStarred ? <StarIcon ml="2" /> : <MinusIcon ml="2" />}
    </Button>
  );
});
