import { ChangeEvent, useState } from 'react';
import { useQuery } from '@apollo/client';

import { SEARCH_REPOSITORIES } from '../queries/search-repositories';

const DEFAULT_VARIABLES = {
  first: 5,
  after: null,
  last: null,
  before: null,
  query: 'graphql',
};

export const Main = () => {
  const [variables, setVariables] = useState(DEFAULT_VARIABLES);
  const { loading, error, data } = useQuery(SEARCH_REPOSITORIES, {
    variables: variables,
  });
  const handleSubmit = (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('submitイベント発生');
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setVariables({ ...variables, query: e.target.value });
  };

  console.log(data);
  return (
    <>
      <form onSubmit={handleSubmit}>
        <input value={variables.query} onChange={handleChange} />
      </form>
      {loading && <p>Loading...</p>}
      {error && <p>Error</p>}
    </>
  );
};
