import { firestore } from "lib/fb";

const collection = firestore.collection("orders");

class Order {
  static async createEmpty() {
    const id = await collection.add({});

    return id;
  }

  static async updateById(id: string, data) {
    const ref = collection.doc(id);

    await ref.update(data);

    const doc = (await ref.get()).data();

    return doc;
  }

  static async findById(id: string) {
    const ref = await collection.doc(id).get();

    return ref;
  }
}

export { Order };
