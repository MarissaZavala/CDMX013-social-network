import { onNavigate } from '../main.js';
import { createAccount, verifyWithGoogle } from '../lib/auth.js';

export const register = () => {
  const div = document.createElement('div');
  const title = document.createElement('h2');
  const lettering = document.createElement('img');
  lettering.classList.add('growRegister');
  const inputEmail = document.createElement('input');
  inputEmail.setAttribute('type', 'email');
  const inputPassword = document.createElement('input');
  inputPassword.setAttribute('type', 'password');
  const confirmPassword = document.createElement('input');
  confirmPassword.setAttribute('type', 'password');
  const buttonRegister = document.createElement('button');
  buttonRegister.classList.add('buttonRegister2');
  const buttonGoogle = document.createElement('button');
  buttonGoogle.classList.add('buttonGoogle');
  const errorInput = document.createElement('p');
  errorInput.classList.add('errorInput');
  const askRegister = document.createElement('p');
  const linkSignin = document.createElement('a');
  linkSignin.setAttribute('href', '/signin');
  const lineRegister = document.createElement('div');
  const lineOr = document.createElement('p');

  title.textContent = 'Welcome to';
  lettering.setAttribute('src', '/images/lettering.png');
  inputEmail.placeholder = 'Enter your email';
  inputPassword.placeholder = 'Enter password';
  confirmPassword.placeholder = 'Confirm password';
  buttonRegister.textContent = 'Register';
  askRegister.textContent = 'Already have an account ?';
  linkSignin.textContent = 'Sign In';
  lineRegister.classList.add('lineRegister');
  lineOr.textContent = 'OR';
  lineOr.classList.add('lineOr');

  buttonRegister.addEventListener('click', () => {
    const emailValue = inputEmail.value;
    const passwordValue = inputPassword.value;
    if (emailValue === '' || passwordValue === '') {
      errorInput.innerHTML = 'Please fill in the required fields';
    } else {
      createAccount(emailValue, passwordValue)
        .then((userCredential) => {
          const user = userCredential.user;
          onNavigate('/signin');
        })
        .catch((error) => {
          if (error.code === 'auth/email-already-in-use') {
            errorInput.innerHTML = 'This email is already in use';
          } else if (error.code === 'auth/invalid-email') {
            errorInput.innerHTML = 'Please enter a valid email';
          } else if (error.code === 'auth/weak-password') {
            errorInput.innerHTML = 'Please enter a password with at least 6 characters';
          }
        });
    }
  });
  buttonGoogle.addEventListener('click', () => {
    verifyWithGoogle();
  });

  div.append(title, lettering, inputEmail, inputPassword, confirmPassword, errorInput, buttonRegister, lineRegister, lineOr, buttonGoogle, askRegister, linkSignin);
  return div;
};