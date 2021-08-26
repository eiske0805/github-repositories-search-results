import { memo, VFC, Dispatch, SetStateAction } from 'react';
import { ButtonGroup, Button } from '@chakra-ui/react';

import { Data } from '../type/data';
import { Variables } from '../type/variables';

type Props = {
  PER_PAGE: 5;
  variables: Variables;
  setVariables: Dispatch<SetStateAction<Variables>>;
  data: Data;
};

export const Buttons: VFC<Props> = memo(
  ({ PER_PAGE, variables, setVariables, data }) => {
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
      <ButtonGroup
        variant="solid"
        colorScheme="purple"
        size="sm"
        mt={{ base: 4, md: 6 }}
      >
        <Button
          isDisabled={!data?.search.pageInfo.hasPreviousPage}
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
    );
  }
);
