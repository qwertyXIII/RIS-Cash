import { getDataBase, updateDataBase } from "./communication.js";
import { todayDate } from "./constants.js";

export function formPlaceholder(base, form, selector) {
  form.querySelector('.' + selector).innerHTML = '';
  if (selector == 'kktlist') {
    for (let i = 0; i < base.length; i++) {
      form.querySelector('.' + selector).prepend(new Option(base[i].kkt));
    }
  } else if (selector == 'forwarderList') {
    for (let i = 0; i < base.length; i++) {
      form.querySelector('.' + selector).prepend(new Option(base[i].name));
    }
  }
}

export function getCash(params) {
  let baseObj = { kkt: "", sn: "", location: "", forwarder: "", issued: "", FNValidityPeriod: "", reader: "", number: "" }

}

export function giveCash(form) {

  let baseObj = { 
    kkt: "", 
    sn: "", location: "", forwarder: "", 
    issued: "", 
    FNValidityPeriod: "", 
    reader: "", 
    number: "" }
  
  let historyObj = { 
    kkt: form.querySelector('.kkt').value, 
    sn: "", 
    issued: todayDate.toLocaleDateString(), 
    accepted: "", 
    location: form.querySelector('.from').value, 
    forwarder: form.querySelector('.forwarder').value, 
    reader: form.querySelector('.reader').value}

  let forwardersObj = { name: "", number: ""}

  

  updateDataBase('637cac0165b57a31e6bf133b', historyObj)
    .then(() => { getDataBase('637cac0165b57a31e6bf133b')
      .then((result) => { console.log(result); history = JSON.parse(result).record; 
  })})
  
}
