// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: window.env.APP_FIREBASE_API_KEY,
  authDomain: window.env.APP_FIREBASE_AUTH_DOMAIN,
  projectId: window.env.APP_PROJECT_ID,
  storageBucket: window.env.APP_STORAGE_BUCKET,
  messagingSenderId: window.env.APP_MESSAGING_SENDER_ID,
  appId: window.env.APP_ID,
};

export { firebaseConfig };
