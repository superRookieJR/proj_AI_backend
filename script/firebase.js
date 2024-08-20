const { initializeApp } = require('firebase/app');
const { getFirestore, collection } = require('firebase/firestore');

const firebaseConfig = {
    apiKey: "AIzaSyDnq6CYcN6OSzJ4s9gDh5PjeYesC0sZL8g",
    authDomain: "proj-ai-database.firebaseapp.com",
    projectId: "proj-ai-database",
    storageBucket: "proj-ai-database.appspot.com",
    messagingSenderId: "237083024738",
    appId: "1:237083024738:web:b4745ed0de0963f602a03b",
    measurementId: "G-1BN6Q0F5L9"
}
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

module.exports = { db };