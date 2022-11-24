import { informerBox } from "./constants.js";

const template = document.querySelector('#informer-template');

export function informer(status, message) {

  let element = template.content.querySelector('.informer').cloneNode(true);
  
  if (status == 'info') {
    element.querySelector('.informer__icon').setAttribute("name", "information-circle-outline");
  } else if (status == 'error') {
    element.querySelector('.informer__icon').setAttribute("name", "alert-circle-outline");
  } else if (status == 'ok') {
    element.querySelector('.informer__icon').setAttribute("name", "checkmark-circle-outline");
  }

  element.querySelector('.informer__text').textContent = message;

  informerBox.prepend(element);

  setTimeout(() => {
    element.classList.add('informer_active');
  }, 100);

  

  setTimeout(() => {
    element.classList.remove('informer_active');
    setTimeout(() => {
      element.remove();
    }, 500);
  }, 5000);
}