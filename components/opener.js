import { tabsContainer } from "./constants.js";

export function opener(element, name) {
  tabsContainer.querySelector('.' + name).classList.remove('tab_closed');
  element.classList.add('tab-selector_active');
}