import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.9.3/firebase-app.js';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyCzGoth_8e1o4fBxldZ7MCOjWhefbmQU44',
  authDomain: 'social-network-grow.firebaseapp.com',
  projectId: 'social-network-grow',
  storageBucket: 'social-network-grow.appspot.com',
  messagingSenderId: '1041924138616',
  appId: '1:1041924138616:web:d9b952d6c54925d7d92f8d',
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);