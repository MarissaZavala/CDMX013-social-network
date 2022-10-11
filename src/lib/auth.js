import {
  getAuth,
  signInWithRedirect,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signOut,
  onAuthStateChanged,
} from 'https://www.gstatic.com/firebasejs/9.10.0/firebase-auth.js';

import { app } from './firebase.js';
import { onNavigate } from '../main.js';

export const auth = getAuth(app);

// eslint-disable-next-line max-len
export const createAccount = (emailValue, passwordValue) => createUserWithEmailAndPassword(auth, emailValue, passwordValue);

// eslint-disable-next-line max-len
export const signIn = (emailValue, passwordValue) => signInWithEmailAndPassword(auth, emailValue, passwordValue);
export const provider = new GoogleAuthProvider();
export const verifyWithGoogle = () => signInWithRedirect(auth, provider);
export const redirect = () => signInWithRedirect(auth);

export const getUserState = () => onAuthStateChanged(auth, (user) => {
  if (user) {
    // User is signed in, see docs for a list of available properties
    // https://firebase.google.com/docs/reference/js/firebase.User
    const uid = user.uid;
    const email = user.email;
    console.log(`El usuario ${uid}se encuentra activo`);
    console.log(user);
    console.log(email);
    // ...
  } else {
    // User is signed out
    // ...
    console.log('No hay usuarios activos');
  }
});

export const endSesion = () => signOut(auth)
  .then(() => {
    onNavigate('/');
  // Sign-out successful.
  }).catch((error) => {
  // An error happened.
  });