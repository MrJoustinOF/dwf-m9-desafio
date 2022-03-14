import { firestore } from "lib/fb";

const collection = firestore.collection("auth");

class Auth {
  static async find(email: string) {
    const query = await collection.where("email", "==", email).get();
    const [ref] = query.docs;

    return ref;
  }

  static async updateById(id: string, obj: any) {
    await collection.doc(id).update(obj);
  }

  static async createDoc(obj: any) {
    await collection.add(obj);
  }

  static async setCodeAsInvalid(id: string) {
    await collection.doc(id).update({ code: null });
  }
}

export { Auth };
