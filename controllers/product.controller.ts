import { Product } from "models/Product";

const searchProducts = async (options) => {
  const { query, offset, limit } = options;

  const { hits, nbHits: total } = await Product.search(query, {
    offset,
    limit,
  });

  const pagination = {
    offset,
    limit,
    total,
  };

  return { hits, pagination };
};

const getProductData = async (id: string) => {
  const product = await Product.findById(id);

  return product;
};

export { searchProducts, getProductData };
