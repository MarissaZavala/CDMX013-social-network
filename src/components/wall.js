import { endSesion } from '../lib/auth.js';

export const wall = () => {
  const div = document.createElement('div');
  const upperBanner = document.createElement('div');
  const growLetters = document.createElement('img');
  const textUserName = document.createElement('p');
  const userIcon = document.createElement('img');
  const postTextBox = document.createElement('input');
  const buttonCreatePost = document.createElement('button');
  const postsSection = document.createElement('div'); // Sección donde se verán las publicaciones
  const publishedPost = document.createElement('div'); // Caja donde estarán las publicaciones aún no tiene estilos
  const bottomBanner = document.createElement('div');
  const bottomLine = document.createElement('div');
  const homeIcon = document.createElement('img');
  const logOut = document.createElement('img');

  growLetters.setAttribute('src', '/images/lettering.png');
  textUserName.textContent = 'PlantLover1'; // Supongo que este campo se va a obtener de la base de datos
  userIcon.setAttribute('src', '/images/userIcon.png');
  postTextBox.placeholder = 'What are you thinking?';
  buttonCreatePost.textContent = 'Post';
  homeIcon.setAttribute('src', 'images/homeIcon.png');
  logOut.setAttribute('src', '/images/log-out.png');

  upperBanner.classList.add('upperBanner');
  growLetters.classList.add('growLetters');
  userIcon.classList.add('userIcon');
  postTextBox.classList.add('postTextBox');
  buttonCreatePost.classList.add('postButton');
  bottomBanner.classList.add('bottomBanner');
  bottomLine.classList.add('bottomLine');
  homeIcon.classList.add('homeIcon');
  logOut.classList.add('logOut');

  logOut.addEventListener('click', () => {
    endSesion();
  });
  upperBanner.append(growLetters, textUserName, userIcon);
  postsSection.append(publishedPost);
  bottomBanner.append(bottomLine, logOut);

  div.append(upperBanner, postTextBox, buttonCreatePost, postsSection, bottomBanner);
  return div;
};