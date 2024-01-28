import admin from 'firebase-admin';
const serviceAccount = JSON.parse(process.env.FIREBASE as string);
console.log("serviceAccount ",serviceAccount);
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}
const db = admin.firestore();
export {db};
