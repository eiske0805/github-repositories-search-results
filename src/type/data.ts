export type Data = {
  search: {
    repositoryCount: number;
    pageInfo: {
      endCursor: string;
      hasNextPage: boolean;
      hasPreviousPage: boolean;
      startCursor: string;
    };
    edges: Edge[];
  };
};

export type Edge = {
  cursor: string;
  node: {
    id: string;
    name: string;
    url: string;
    stargazers: {
      totalCount: number;
    };
    viewerHasStarred: boolean;
  };
};
