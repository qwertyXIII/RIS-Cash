import { closer } from "./components/closer.js";
import { elementUpdater } from "./components/elementUpdater.js";
import { opener } from "./components/opener.js";
import { allCashSearch, base, FNValidityEndsSearch, forwarders, ForwardersSearch, history, historySearch, inForwarderSearch, inRepairSearch, kktGetForm, kktGiveForm, ShopSearch, todayDate } from "./components/constants.js";
import { formInptSwitch, formPlaceholder, getCash, giveCash } from "./components/form.js";


/* Действия при нажатии на переключатель вкладок */
document.querySelector('#allCash').addEventListener('click', () => {
  closer(); opener('allCash');
  elementUpdater('allCash', "all", "", base);
});
document.querySelector('#inRepair').addEventListener('click', () => {
  closer(); opener('inRepair');
  elementUpdater('inRepair', "repair", "", base);
});
document.querySelector('#inForwarder').addEventListener('click', () => {
  closer(); opener('inForwarder');
  elementUpdater('inForwarder', "forwarder", "", base);
});
document.querySelector('#history').addEventListener('click', () => {
  closer(); opener('history');
  elementUpdater('history', "", "", history);
});
document.querySelector('#forwarders').addEventListener('click', () => {
  closer(); opener('forwarders');
  elementUpdater('forwarders', "", "", forwarders);
});
document.querySelector('#inShop').addEventListener('click', () => {
  closer(); opener('inShop');
  elementUpdater('inShop', "shop", "", base);
});
document.querySelector('#createOrder').addEventListener('click', () => {
  closer(); opener('createOrder');
  formPlaceholder(forwarders, kktGiveForm, 'forwarderList');
  formPlaceholder(base, kktGiveForm, 'kktlist')
  formPlaceholder(base, kktGetForm, 'kktlist');
});
document.querySelector('#FNValidityEnds').addEventListener('click', () => {
  closer(); opener('FNValidityEnds');
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

for (let e of document.querySelector('.formOption')) {
  e.addEventListener('select', () => { formInptSwitch(e) })
}
