import { getDataBase } from "./communication.js";

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
getDataBase('637caad565b57a31e6bf11b3')
  .then((result) => {
    console.log(result);
    base = JSON.parse(result).record;
    loadingScreen.querySelector('.loading-screen__text').textContent = 'База касс загруженна...';
    console.log(JSON.parse(result).record); 
    setTimeout(() => {
      loadingScreen.classList.add('tab_closed')
    }, 300);
  })
    .catch((result) => {
      loadingScreen.querySelector('.loading-screen__text').textContent = 'Ошибка загрузки базы касс, code: ' + result;
      console.log(result);
    });
//forwarders
getDataBase('637cac9d65b57a31e6bf13ec')
  .then((result) => {
    forwarders = JSON.parse(result).record;
    loadingScreen.querySelector('.loading-screen__text').textContent = 'База экспедиторов загруженна...';
    console.log(JSON.parse(result).record);
  })
    .catch((result) => {
      loadingScreen.querySelector('.loading-screen__text').textContent = 'Ошибка загрузки базы экспедиторов, code: ' + result;
      console.log(result);
    });
//history
getDataBase('637cac0165b57a31e6bf133b')
  .then((result) => {
    console.log(result);
    history = JSON.parse(result).record;
    loadingScreen.querySelector('.loading-screen__text').textContent = 'история загруженна...';
    console.log('HISTORY:');
    console.log(JSON.parse(result).record); 
  })
    .catch((result) => {
      loadingScreen.querySelector('.loading-screen__text').textContent = 'Ошибка загрузки истории, code: ' + result;
      console.log(result);
    });
//users
getDataBase('637cab662b3499323b075126')
  .then((result) => {
    users = JSON.parse(result).record;
    loadingScreen.querySelector('.loading-screen__text').textContent = 'База пользователей загруженна...';
    console.log(JSON.parse(result).record); 
  })
    .catch((result) => {
      loadingScreen.querySelector('.loading-screen__text').textContent = 'Ошибка загрузки базы пользователей, code: ' + result;
      console.log(result);
    });



    /*
setTimeout(() => {
  for (let index = 0; index < 500; index++) {
    let e = {
      kkt: "0000000000000001",
      sn: "0000000001",
      location: "forwarder",
      forwarder: "Антон",
      issued: "22-11-2022",
      FNValidityPeriod: "31-06-2022",
      reader: "1234123412341234"
    }
    e.kkt = String(Math.floor(Math.random() * 9999999999999999));
    e.sn = String(Math.floor(Math.random() * 9999999999));
    e.issued = String(getRandomIntInclusive(1, 31) + '.' + getRandomIntInclusive(1, 12) + '.' + getRandomIntInclusive(2021, 2024));
    e.FNValidityPeriod = String(getRandomIntInclusive(1, 31) + '.' + getRandomIntInclusive(1, 12) + '.' + getRandomIntInclusive(2022, 2023));
    
    function func123() {
      var abc = "abcdefghijklmnopqrstuvwxyz";
      var rs = "";
      while (rs.length < 10) {
        rs += abc[Math.floor(Math.random() * abc.length)];
      }
      return rs;
    }
    e.forwarder = func123() + ' ' + func123() + ' ' + func123();
  
    const state = ['forwarder', 'shop', 'repair']
    e.location = state[Math.floor(Math.random() * state.length)];
  
    if (e.location !== 'forwarder') {
      e.forwarder = '';
    }
    base.push(e);
  }
  
  function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    let chislo = Math.floor(Math.random() * (max - min + 1) + min); // The maximum is inclusive and the minimum is inclusive
    if (chislo < 10) {
      chislo = "0" + String(chislo);
    }
    return chislo;
  }
  
}, 10000);
for (let index = 0; index < 500; index++) {
  let e = {
    kkt: "0000000000000001",
    sn: "0000000001",
    location: "forwarder",
    forwarder: "Антон",
    issued: "22-11-2022",
    FNValidityPeriod: "31-06-2022",
    reader: "1234123412341234"
  }
  e.kkt = String(Math.floor(Math.random() * 9999999999999999));
  e.sn = String(Math.floor(Math.random() * 9999999999));
  e.issued = String(getRandomIntInclusive(1, 31) + '.' + getRandomIntInclusive(1, 12) + '.' + getRandomIntInclusive(2021, 2024));
  e.FNValidityPeriod = String(getRandomIntInclusive(1, 31) + '.' + getRandomIntInclusive(1, 12) + '.' + getRandomIntInclusive(2022, 2023));
  
  function func123() {
    var abc = "abcdefghijklmnopqrstuvwxyz";
    var rs = "";
    while (rs.length < 10) {
      rs += abc[Math.floor(Math.random() * abc.length)];
    }
    return rs;
  }
  e.forwarder = func123() + ' ' + func123() + ' ' + func123();

  const state = ['forwarder', 'shop', 'repair']
  e.location = state[Math.floor(Math.random() * state.length)];

  if (e.location !== 'forwarder') {
    e.forwarder = '';
  }
  base.push(e);
}

function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  let chislo = Math.floor(Math.random() * (max - min + 1) + min); // The maximum is inclusive and the minimum is inclusive
  if (chislo < 10) {
    chislo = "0" + String(chislo);
  }
  return chislo;
}


*/
