import { initAlgoliaIndex } from "lib/algolia";

const productsIndex = initAlgoliaIndex("products");

class Product {
  static async search(query: string, options) {
    const { limit: length, offset, filters } = options;

    const res = await productsIndex.search(query, { offset, length, filters });

    return res;
  }

  static async findById(id: string) {
    try {
      const data = await productsIndex.getObject(id);

      return data;
    } catch (error) {
      return null;
    }
  }
}

export { Product };
