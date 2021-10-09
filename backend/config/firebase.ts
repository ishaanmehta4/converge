export const admin = require('firebase-admin');
var serviceAccount = require('./serviceAccountKey.json');

admin.initializeApp({
  credential: admin.credential.cert( serviceAccount ),
});

console.log('>> Connected to Firebase.');
export const auth = admin.auth();
// export const messaging = admin.messaging();
