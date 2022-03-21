const getLimitAndOffset = (reqQuery) => {
  const { q: query, offset: queryOffset, limit: queryLimit } = reqQuery;

  const offset = parseInt(queryOffset as string);
  const parsedLimit = parseInt(queryLimit as string);

  const limit = parsedLimit <= 100 ? parsedLimit : 100;

  return { query, offset, limit };
};

export { getLimitAndOffset };
