import { createContext } from 'react';

import { Variables } from '../type/variables';

export const SearchRepositoriesVariablesContext = createContext<Variables>(
  {} as Variables
);
