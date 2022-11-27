import { users } from "./constants.js";
import { informer } from "./informer.js";

export let authUser = {};

function auth() {
  for (let i = 0; i < users.length; i++) {
    if (users[i].user == document.querySelector('#auth-input').value) {
      document.querySelector('#authUser').textContent = users[i].name;
      document.querySelector('.auth-screen').classList.add('tab_closed');
      authUser = users[i];
      informer('ok', `Вы авторизовались как ${users[i].user}, ${users[i].name}`);
      return;
    }
  }
  informer('error', `Не найден пользователь ${document.querySelector('#auth-input')}`);
}

document.querySelector('#auth').addEventListener('click', () => {
  auth();
});

document.querySelector('#exit').addEventListener('click', () => {
  document.querySelector('.auth-screen').classList.remove('tab_closed');
});