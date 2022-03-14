import admin from "firebase-admin";

const { FIREBASE_CONNECTION } = process.env;

const serviceAccount = JSON.parse(FIREBASE_CONNECTION);
const credential = admin.credential.cert(serviceAccount);

admin.apps.length === 0 && admin.initializeApp({ credential });

const firestore = admin.firestore();

export { firestore };
