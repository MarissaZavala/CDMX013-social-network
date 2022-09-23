import { onNavigate } from '../main.js';
import { signIn } from '../lib/auth.js';

export const LogOn = () => {
  const div = document.createElement('div');
  const title = document.createElement('h2');
  const brandIcon = document.createElement('img');
  const buttonSignIn = document.createElement('button');
  const inputEmail = document.createElement('input');
  const inputPassword = document.createElement('input');
  const errorInput = document.createElement('p');
  const authGoogleSeccion = document.createElement('p');
  const askSeccion = document.createElement('div');
  const buttonGoogle = document.createElement('button');
  const askAccount = document.createElement('p');
  const linkRegister = document.createElement('a');
 

  title.textContent = 'Welcome back';
  brandIcon.setAttribute('src', '/images/icon.png');
  brandIcon.classList.add('brandIcon');
  inputEmail.setAttribute('type', 'email');
  inputEmail.placeholder = 'Enter your email';
  inputPassword.placeholder = 'Enter password';
  inputPassword.setAttribute('type', 'password');
  errorInput.classList.add('errorInput');
  buttonSignIn.textContent = 'Sign In';
  buttonSignIn.classList.add('buttonSignInW');
  authGoogleSeccion.textContent = ('--- or ---');
  authGoogleSeccion.classList.add('authGoogleSeccion');
  buttonGoogle.textContent = ('Sign in whit Google');
  buttonGoogle.classList.add('buttonGoogle');
  askSeccion.classList.add('askSeccion');
  askAccount.textContent = 'Don’t have an account ?';
  linkRegister.setAttribute('href', '/register');
  linkRegister.textContent = 'Register';

  buttonSignIn.addEventListener('click', () => {
    const emailValue = inputEmail.value;
    const passwordValue = inputPassword.value;
    if (emailValue === '' || passwordValue === '') {
      errorInput.innerHTML = 'Please fill in the required fields';
    } else {
      signIn(emailValue, passwordValue)
        .then((userCredential) => {
          const user = userCredential.user;
          onNavigate('/wall');
        })
        .catch((error) => {
          if (error.code === 'auth/invalid-email') {
            errorInput.innerHTML = 'Please enter a valid email';
          }
          if (error.code === 'auth/user-not-found') {
            errorInput.innerHTML = 'Please enter a valid email';
          } else if (error.code === 'auth/weak-password') {
            errorInput.innerHTML = 'Please enter a password with at least 6 characters';
          }
        });
    }
  });
  askSeccion.append(askAccount, linkRegister);

  div.append(title, brandIcon, inputEmail, inputPassword, errorInput, buttonSignIn, authGoogleSeccion, buttonGoogle, askSeccion);
  return div;
};