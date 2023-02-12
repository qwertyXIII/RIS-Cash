import { closer } from "./components/closer.js";
import { elementUpdater } from "./components/elementUpdater.js";
import { opener } from "./components/opener.js";
import { allCashSearch, base, FNValidityEndsSearch, forwarders, ForwardersSearch, history, historySearch, inForwarderSearch, inRepairSearch, kktGetForm, kktGiveForm, ShopSearch } from "./components/constants.js";
import { formAutoComplete, formPlaceholder, getCash, giveCash } from "./components/form.js";





/* Действия при нажатии на переключатель вкладок */
document.querySelector('#allCash').addEventListener('click', (e) => {
  closer(); opener(e.target,  'allCash');
  elementUpdater('allCash', "all", "", base);
});
document.querySelector('#inRepair').addEventListener('click', (e) => {
  closer(); opener(e.target,  'inRepair');
  elementUpdater('inRepair', "repair", "", base);
});
document.querySelector('#inForwarder').addEventListener('click', (e) => {
  closer(); opener(e.target,  'inForwarder');
  elementUpdater('inForwarder', "forwarder", "", base);
});
document.querySelector('#history').addEventListener('click', (e) => {
  closer(); opener(e.target,  'history');
  elementUpdater('history', "", "", history);
});
document.querySelector('#forwarders').addEventListener('click', (e) => {
  closer(); opener(e.target,  'forwarders');
  elementUpdater('forwarders', "", "", forwarders);
});
document.querySelector('#inShop').addEventListener('click', (e) => {
  closer(); opener(e.target,  'inShop');
  elementUpdater('inShop', "shop", "", base);
});
document.querySelector('#createOrder').addEventListener('click', (e) => {
  closer(); opener(e.target,  'createOrder');
  formPlaceholder(forwarders, kktGiveForm, 'forwarderList');
  formPlaceholder(base, kktGiveForm, 'kktlist')
  formPlaceholder(base, kktGetForm, 'kktlist');
});
document.querySelector('#FNValidityEnds').addEventListener('click', (e) => {
  closer(); opener(e.target,  'FNValidityEnds');
  elementUpdater('FNValidityEnds', "FNValidityEnds", "", base);
});

/* SEARCH */
allCashSearch.addEventListener('keyup', () => {
  elementUpdater('allCash', 'all', allCashSearch.value, base);
});
inRepairSearch.addEventListener('keyup', () => {
  elementUpdater('inRepair', 'repair', inRepairSearch.value, base);
});
inForwarderSearch.addEventListener('keyup', () => {
  elementUpdater('inForwarder', 'forwarder', inForwarderSearch.value, base);
});
ShopSearch.addEventListener('keyup', () => {
  elementUpdater('inShop', 'shop', ShopSearch.value, base);
});
FNValidityEndsSearch.addEventListener('keyup', () => {
  elementUpdater('FNValidityEnds', 'FNValidityEnds', FNValidityEndsSearch.value, base);
});
ForwardersSearch.addEventListener('keyup', () => {
  elementUpdater('forwarders', '', ForwardersSearch.value, forwarders);
});
historySearch.addEventListener('keyup', () => {
  elementUpdater('history', '', historySearch.value, history);
});

/* FORMS */
document.querySelector('#kkt-get').addEventListener('click', (e) => {
  console.log(e); getCash(kktGetForm);
});
document.querySelector('#kkt-give').addEventListener('click', (e) => {
  console.log(e); giveCash(kktGiveForm);
});

/* AUTO COMPLITE FORM */ // formAutoComplete(base, form, inputText, selector)
kktGiveForm.querySelector('.kkt').oninput = () => {
  formAutoComplete(base, kktGiveForm, 'kkt', 'sn');
}
kktGiveForm.querySelector('.forwarder').oninput = () => {
  formAutoComplete(forwarders, kktGiveForm, 'forwarder', 'number');
}

kktGetForm.querySelector('.kkt').oninput = () => {
  formAutoComplete(base, kktGetForm, 'kkt', 'sn');
}