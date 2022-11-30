import { ApiKey, baseId, forwardersId, getDataBase, historyId, usersId } from "./communication.js";
import { informer } from "./informer.js";

export let kktGetForm = document.querySelector('.form-get');
export let kktGiveForm = document.querySelector('.form-give');

export const tabsContainer = document.querySelector('.tabs');

export const informerBox = document.querySelector('.informer-box');

export const elementTemplateTypeCash = document.querySelector('#element-template-cash');
export const elementTemplateTypeForwarder = document.querySelector('#element-template-forwarders');
export const elementTemplateTypeHistory = document.querySelector('#element-template-history');

export const allCashSearch = tabsContainer.querySelector('.allCash').querySelector('.search__input');
export const inRepairSearch = tabsContainer.querySelector('.inRepair').querySelector('.search__input');
export const inForwarderSearch = tabsContainer.querySelector('.inForwarder').querySelector('.search__input');
export const historySearch = tabsContainer.querySelector('.history').querySelector('.search__input');
export const ShopSearch = tabsContainer.querySelector('.inShop').querySelector('.search__input');
export const FNValidityEndsSearch = tabsContainer.querySelector('.FNValidityEnds').querySelector('.search__input');
export const ForwardersSearch = tabsContainer.querySelector('.forwarders').querySelector('.search__input');

export let loadingScreen = document.querySelector('.loading-screen');

export let todayDate = new Date();

export let base = [];
export let forwarders = [];
export let history = [];
export let users = [];
  
//base
getDataBase(baseId, ApiKey)
  .then((result) => {
    console.log(result);
    base = JSON.parse(result);
    loadingScreen.querySelector('.loading-screen__text').textContent = 'База касс загруженна...';
    console.log(JSON.parse(result)); 
    setTimeout(() => {
      loadingScreen.classList.add('tab_closed')
    }, 300);
  })
    .catch((result) => {
      loadingScreen.querySelector('.loading-screen__text').textContent = 'Ошибка загрузки базы касс, code: ' + result;
      console.log(result);
      informer('error', 'Ошибка загрузки базы касс, перезагрузите страницу!');
    });
//forwarders
getDataBase(forwardersId, ApiKey)
  .then((result) => {
    forwarders = JSON.parse(result);
    loadingScreen.querySelector('.loading-screen__text').textContent = 'База экспедиторов загруженна...';
    console.log(JSON.parse(result));
  })
    .catch((result) => {
      loadingScreen.querySelector('.loading-screen__text').textContent = 'Ошибка загрузки базы экспедиторов, code: ' + result;
      console.log(result);
      informer('error', 'Ошибка загрузки базы экспедиторов, перезагрузите страницу!');
    });
//history
getDataBase(historyId, ApiKey)
  .then((result) => {
    console.log(result);
    history = JSON.parse(result);
    loadingScreen.querySelector('.loading-screen__text').textContent = 'история загруженна...';
    console.log('HISTORY:');
    console.log(JSON.parse(result)); 
  })
    .catch((result) => {
      loadingScreen.querySelector('.loading-screen__text').textContent = 'Ошибка загрузки истории, code: ' + result;
      console.log(result);
      informer('error', 'Ошибка загрузки истории, она будет недоступна!');
    });
//users
getDataBase(usersId, ApiKey)
  .then((result) => {
    users = JSON.parse(result);
    loadingScreen.querySelector('.loading-screen__text').textContent = 'База пользователей загруженна...';
    console.log(JSON.parse(result)); 
  })
    .catch((result) => {
      loadingScreen.querySelector('.loading-screen__text').textContent = 'Ошибка загрузки базы пользователей, code: ' + result;
      console.log(result);
      informer('error', 'Ошибка загрузки базы пользователей, перезагрузите страницу!');
    });