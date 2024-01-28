import admin from 'firebase-admin';
console.log('FIREBASE ENV:', process.env.FIREBASE);

const serviceAccount = JSON.parse(process.env.FIREBASE as string);

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}
const db = admin.firestore();
export {db};
