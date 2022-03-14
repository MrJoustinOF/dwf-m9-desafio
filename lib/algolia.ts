import algoliasearch from "algoliasearch";

const { ALGOLIA_APP_ID, ALGOLIA_ADMIN_API_KEY } = process.env;

const client = algoliasearch(ALGOLIA_APP_ID, ALGOLIA_ADMIN_API_KEY);

const initAlgoliaIndex = (name: string) => {
  const index = client.initIndex(name);

  return index;
};

export { initAlgoliaIndex };
