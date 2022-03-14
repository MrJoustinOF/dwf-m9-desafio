import { firestore } from "lib/fb";

const collection = firestore.collection("users");

class User {
  static async createAuthRef(props) {
    const { id } = await collection.add(props);

    return id;
  }

  static async find(id: string) {
    const ref = await collection.doc(id).get();

    return ref;
  }

  static async updateById(id: string, obj) {
    await collection.doc(id).update(obj);
  }
}

export { User };
