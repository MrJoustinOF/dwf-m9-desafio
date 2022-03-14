import type { NextApiRequest, NextApiResponse } from "next";
import { Product } from "models/Product";

const searchProducts = async (
  req: NextApiRequest,
  res: NextApiResponse,
  options
) => {
  const { query, offset, limit } = options;
  const filters = "stock > 0";

  const { hits, nbHits: total } = await Product.search(query, {
    offset,
    limit,
    filters,
  });

  const pagination = {
    offset,
    limit,
    total,
  };

  res.json({ hits, pagination });
};

const getProductData = async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query;

  const product = await Product.findById(id as string);

  res.send(product);
};

export { searchProducts, getProductData };
