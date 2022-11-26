import { users } from "./constants.js";
import { informer } from "./informer.js";

export let authUser = {};

let authInput = document.querySelector('#auth-input');
function auth() {
  console.log(authInput);
  for (let i = 0; i < users.length; i++) {
    if (users[i].user == authInput.value) {
      document.querySelector('#authUser').textContent = users[i].name;
      document.querySelector('.auth-screen').classList.add('tab_closed');
      authUser = users[i];
      informer('ok', `Вы авторизовались как ${authInput.value}, ${users[i].name}`);
    }
  }
  console.log(authUser);
}

document.querySelector('#auth').addEventListener('click', () => {
  auth();
});