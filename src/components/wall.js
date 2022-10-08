import { onAuthStateChanged, getAuth } from 'https://www.gstatic.com/firebasejs/9.10.0/firebase-auth.js';
import { endSesion, auth } from '../lib/auth.js';
import { onNavigate } from '../main.js';
import {
  postCollection, onRealTime, deleteDocPost, getPost, updatePost,
} from '../lib/firestore.js';

// HTML elements
export const wall = () => {
  const div = document.createElement('div');
  const upperBannerDiv = document.createElement('div');
  const growLetters = document.createElement('img');
  const textUserName = document.createElement('p');
  const userIcon = document.createElement('img');
  const makePostForm = document.createElement('form');
  const postTextBox = document.createElement('input');
  const buttonCreatePost = document.createElement('button');
  const postsSectionDiv = document.createElement('div'); // Sección donde se verán las publicaciones
  const publishedPost = document.createElement('div'); // Caja donde estarán las publicaciones aún no tiene estilos
  const userIconPost = document.createElement('img');
  const text = document.createElement('p');
  const heartIcon = document.createElement('img');
  const likeIcon = document.createElement('img');
  const likeCount = document.createElement('p');
  const bottomBannerDiv = document.createElement('div');
  const bottomLine = document.createElement('div');
  const homeIcon = document.createElement('img');
  const logOut = document.createElement('img');

  growLetters.setAttribute('src', '/images/lettering.png');
  userIcon.setAttribute('src', '/images/userIcon.png');
  postTextBox.placeholder = 'What are you thinking?';
  buttonCreatePost.textContent = 'Post';
  userIconPost.setAttribute('src', '/images/userIcon.png');
  text.textContent = 'Remember to water your plants less on winter!';
  heartIcon.setAttribute('src', '/images/heartIcon.png');
  likeIcon.setAttribute('src', '/images/likeIcon.png');
  likeCount.textContent = '+ 2 likes';
  homeIcon.setAttribute('src', 'images/homeIcon.png');
  logOut.setAttribute('src', '/images/log-out.png');

  div.classList.add('wall-div');
  upperBannerDiv.classList.add('upperBannerDiv');
  growLetters.classList.add('growLetters');
  textUserName.classList.add('userName');
  userIcon.classList.add('userIcon');
  postTextBox.classList.add('postTextBox');
  makePostForm.classList.add('makePostForm');
  buttonCreatePost.classList.add('postButton');
  postsSectionDiv.classList.add('postsSectionDiv');
  bottomBannerDiv.classList.add('bottomBannerDiv');
  bottomLine.classList.add('bottomLine');
  homeIcon.classList.add('homeIcon');
  logOut.classList.add('logOut');

  const modalContainer = document.createElement('dialog');
  modalContainer.classList.add('modalBack');
  const modalAlert = document.createElement('div');
  modalAlert.classList.add('publishedPost');
  const message = document.createElement('p');
  message.classList.add('message');
  const editInput = document.createElement('input');
  editInput.classList.add('editInput');
  const acceptButton = document.createElement('button');
  acceptButton.classList.add('acceptButton');
  const cancelButton = document.createElement('button');
  cancelButton.classList.add('cancelButton');
  cancelButton.textContent = 'Cancel';

  modalAlert.append(message, editInput, cancelButton, acceptButton);
  modalContainer.append(modalAlert);

  let editStatus = false;

  // Functions
  const user = auth.currentUser;
  console.log(user);
  onAuthStateChanged(getAuth(), () => {
    if (user) {
      console.log(user.displayName);
      textUserName.textContent = user.email;
    }
    if (user === null) {
      onNavigate('/');
      console.log('No hay usuarios activos');
    }
  });

  onRealTime((querySnapshot) => {
    const postinfo = [];
    postsSectionDiv.innerHTML = '';
    querySnapshot.forEach((doc) => {
      postinfo.push(doc.data());
      const html = `<div class='publishedPost'>
                    <img class='userIcon' src='/images/userIcon.png'>
                    <p class='userName'>${doc.data().user}</p>
                    <p class='publishedText'>${doc.data().post}</p>
                    <img class='heartIcon' src='/images/heartIcon.png'>
                     <img class='likeIcon' src='/images/likeIcon.png'>
                    <img class='deleteButton' src='/images/delete.png' data-id='${doc.id}'>
                    <img class='editButton' src='/images/edit.png' data-id='${doc.id}'>
                    </div>`;
      postsSectionDiv.innerHTML += html;
    });

    const deletePostButtons = document.querySelectorAll('.deleteButton');
    deletePostButtons.forEach((btn) => {
      btn.addEventListener('click', ({ target: { dataset } }) => {
        console.log(dataset.id);
        deleteDocPost(dataset.id);
      });
    });
    const editPostButtons = document.querySelectorAll('.editButton');
    editPostButtons.forEach((btn) => {
      btn.addEventListener('click', async (e) => {
        const doc = await getPost(e.target.dataset.id);
        const post = doc.data();

        postTextBox.value = post.post;
        editStatus = true;
        modalContainer.showModal();
        message.textContent = 'Edit your message';
      });
    });
    console.log(postinfo);
  });

  // Event Listeners

  makePostForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const postValue = postTextBox.value;
    console.log(postValue);
    //postCollection(postValue, user);
    editStatus = true;
    if (editStatus) {
      const getId = getPost(e.target.dataset.id);
      updatePost(getId, postValue);
    } else {
      postCollection(postValue, user);
    }
    makePostForm.reset();
  });

  logOut.addEventListener('click', () => {
    endSesion()
      .then(() => {
        onNavigate('/');
      });
  });
  upperBannerDiv.append(growLetters, textUserName, userIcon);
  makePostForm.append(postTextBox, buttonCreatePost);
  bottomBannerDiv.append(bottomLine, logOut);

  div.append(modalContainer, upperBannerDiv, makePostForm, postsSectionDiv, bottomBannerDiv);
  return div;
};

