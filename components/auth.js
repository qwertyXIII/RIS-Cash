import { closer } from "./closer.js";
import { users } from "./constants.js";
import { informer } from "./informer.js";

export let authUser = {};

function auth() {
  for (let i = 0; i < users.length; i++) {
    if (users[i].user == document.querySelector('#auth-input').value) {
      document.querySelector('#authUser').textContent = users[i].name;
      if (users[i].role == 'developer') {
        document.querySelector('#authRole').textContent = 'Разработчик';
      } else if (users[i].role == 'admin') {
        document.querySelector('#authRole').textContent = 'Администратор';
      } else if (users[i].role == 'user') {
        document.querySelector('#authRole').textContent = 'Пользователь';
      } else {
        document.querySelector('#authRole').textContent = 'Роль не определена';
      }
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
  closer();
  document.querySelector('.auth-screen').classList.remove('tab_closed');
});