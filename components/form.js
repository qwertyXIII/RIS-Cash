import { getDataBase, updateDataBase } from "./communication.js";
import { history, todayDate } from "./constants.js";
import { informer } from "./informer.js";

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

for (let e of document.querySelector('.form-get').querySelectorAll('.form-element')) { e.classList.toggle('form-element_closed') }

export function formInptSwitch(e) {
  console.log(123);
}

export function getCash(params) {
  let baseObj = { kkt: "", sn: "", location: "", forwarder: "", issued: "", FNValidityPeriod: "", reader: "", number: "" }

}

export function giveCash(form) {
  let formSendButton = form.querySelector('.send');
  formSendButton.disabled = true;
  formSendButton.style.color = 'grey';
  let baseObj = {
    kkt: "",
    sn: "", location: "", forwarder: "",
    issued: "",
    FNValidityPeriod: "",
    reader: "",
    number: ""
  }
  let historyObj = {
    kkt: form.querySelector('.kkt').value,
    sn: "",
    issued: todayDate.toLocaleDateString(),
    accepted: "",
    location: form.querySelector('.from').value,
    forwarder: form.querySelector('.forwarder').value,
    reader: form.querySelector('.reader').value,
    order: form.querySelector('.order').value
  }
  let forwardersObj = { name: "", number: "" }

  history.push(historyObj)

  updateDataBase('637cac0165b57a31e6bf133b', history)
    .then(() => {
      getDataBase('637cac0165b57a31e6bf133b')
        .then((result) => {
          informer('ok', 'Касса успешно выдана!')
          formSendButton.disabled = false;
          formSendButton.style.color = 'cornsilk';
          history = JSON.parse(result).record;
        })
    })

}
