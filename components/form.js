import { authUser } from "./auth.js";
import { ApiKey, baseId, forwardersId, getDataBase, historyId, updateDataBase } from "./communication.js";
import { base, forwarders, history, todayDate } from "./constants.js";
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

export function formAutoComplete(base, form, inputTextSelector, completeSelector) {
  for (let i = 0; i < base.length; i++) {

    if (inputTextSelector == 'kkt') {
      if (base[i].kkt.includes(form.querySelector('.' + inputTextSelector).value)) {
        form.querySelector('.' + completeSelector).value = base[i].sn;
        return;
      } else {
        form.querySelector('.' + completeSelector).value = '';
      }

    } else if (inputTextSelector == 'forwarder') {
      if (base[i].name.includes(form.querySelector('.' + inputTextSelector).value)) {
        form.querySelector('.' + completeSelector).value = base[i].number;
        if (base[i].number == 'none') {
          form.querySelector('.' + completeSelector).value = '';
        }
        return;
      } else {
        form.querySelector('.' + completeSelector).value = '';
      }
    }
  }
}

for (let e of document.querySelector('.form-get').querySelectorAll('.form-element')) { e.classList.toggle('form-element_closed') }

function containsForwarders(name) {
  for (let i = 0; i < forwarders.length; i++) {
    if (forwarders[i].name === name) {
      return true;
    }
  }
  return false;
}
function containsCash(kkt) {
  for (let i = 0; i < base.length; i++) {
    if (base[i].kkt === kkt) {
      return true;
    }
  }
  return false;
}

export function getCash(form) {

  for (let i = 0; i < base.length; i++) {
    if (base[i].kkt == form.querySelector('.kkt').value) {
      if (base[i].location == 'shop') {
        informer('error', `Касса ${base[i].kkt} находится в магазине!`)
        return;
      } else if (form.querySelector('.formOption').value == 'repair' && base[i].location == 'forwarder') {
        informer('error', `Касса ${base[i].kkt} у экспедитора ${base[i].forwarder}!`);
        return;
      }
    }
  }

  let formSendButton = form.querySelector('.send');
  formSendButton.disabled = true;
  formSendButton.style.color = 'grey';

  let inputDate = new Date(form.querySelector('.fn').value).toLocaleDateString();

  let baseObj = {
    kkt: form.querySelector('.kkt').value,
    sn: form.querySelector('.sn').value,
    location: "shop",
    forwarder: "",
    issued: "",
    FNValidityPeriod: inputDate,
    reader: "",
    number: ""
  }
  let historyObj = {
    kkt: form.querySelector('.kkt').value,
    sn: "",
    issued: "",
    accepted: todayDate.toLocaleDateString(),
    location: "shop",
    forwarder: "",
    reader: "",
    order: ""
  }

  for (let i = 0; i < base.length; i++) {
    if (base[i].kkt == form.querySelector('.kkt').value) {
      if (form.querySelector('.fn').value == '') {
        baseObj.FNValidityPeriod = base[i].FNValidityPeriod;
      }
      baseObj.sn = base[i].sn;
      base.splice(i, 1, baseObj);
      break;
    }
  }

  if (!containsCash(form.querySelector('.kkt').value)) {
    if (form.querySelector('.fn').value == '') {
      for (let i = 0; i < base.length; i++) {
        if (base[i].kkt == form.querySelector('.kkt').value) {
          baseObj.FNValidityPeriod = base[i].FNValidityPeriod;
        }
      }
    }
    base.push(baseObj);
  }

  updateDataBase(baseId, base, ApiKey)
    .then(() => {
      getDataBase(baseId, ApiKey)
        .then((result) => {
          informer('ok', 'Касса успешно принята!')
          formSendButton.disabled = false;
          formSendButton.style.color = 'cornsilk';
          base = JSON.parse(result).record;
        })
    })

  history.push(historyObj);

  updateDataBase(historyId, history, ApiKey)
    .then(() => {
      getDataBase(historyId, ApiKey)
        .then((result) => {
          formSendButton.disabled = false;
          formSendButton.style.color = 'cornsilk';
          history = JSON.parse(result).record;
          for (let e of form.querySelectorAll('.form__input')) {
            e.value = '';
          }
        })
    })

}



export function giveCash(form) {

  for (let i = 0; i < base.length; i++) {
    if (base[i].kkt == form.querySelector('.kkt').value) {
      if (base[i].location != 'shop') {
        informer('error', `Касса ${base[i].kkt} не принята в магазин. Примите ее, чтобы выдать!`)
        return;
      }
    }
  }

  let formSendButton = form.querySelector('.send');
  formSendButton.disabled = true;
  formSendButton.style.color = 'grey';


  let baseObj = {
    kkt: form.querySelector('.kkt').value,
    sn: form.querySelector('.sn').value,
    location: form.querySelector('.from').value,
    forwarder: form.querySelector('.forwarder').value,
    issued: todayDate.toLocaleDateString(),
    FNValidityPeriod: "",
    reader: form.querySelector('.reader').value,
    number: form.querySelector('.number').value
  }
  let historyObj = {
    kkt: form.querySelector('.kkt').value,
    sn: form.querySelector('.sn').value,
    issued: todayDate.toLocaleDateString(),
    accepted: "",
    location: form.querySelector('.from').value,
    forwarder: form.querySelector('.forwarder').value,
    reader: form.querySelector('.reader').value,
    order: form.querySelector('.order').value
  }

  if (form.querySelector('.formOption').value == 'forwarder') {

    for (let i = 0; i < base.length; i++) {
      if (base[i].forwarder == form.querySelector('.forwarder').value) {
        informer('error', `Экспедитору ${base[i].forwarder} уже выданна касса ${base[i].kkt}`)
        formSendButton.disabled = false;
        formSendButton.style.color = 'cornsilk';
        return;
      }
    }

    let equipment = '';
    if (form.querySelector('.azu').checked && form.querySelector('.szu').checked) {
      equipment = ', Сетевое зарядное утсройство, Автомобильное зарядное утсройство'
    } else if (form.querySelector('.azu').checked) {
      equipment = ', Автомобильное зарядное утсройство'
    } else if (form.querySelector('.szu').checked) {
      equipment = ', Сетевое зарядное утсройство'
    }

    for (let i = 0; i < forwarders.length; i++) {
      if ((forwarders[i].number == '' || forwarders[i].number == 'none') && forwarders[i].name == form.querySelector('.forwarder').value) {
        forwarders[i].number = form.querySelector('.number').value;
        informer('info', `Номер телефона экспедитора ${form.querySelector('.forwarder').value}, обновлен - ${form.querySelector('.number').value}`);
        break;
      } else if (forwarders[i].number != '' && forwarders[i].number != 'none' && forwarders[i].number != form.querySelector('.number').value && forwarders[i].name == form.querySelector('.forwarder').value) {
        informer('info', `Номер телефона экспедитора ${form.querySelector('.forwarder').value}, изменен с ${forwarders[i].number} на ${form.querySelector('.number').value}`);
        forwarders[i].number = form.querySelector('.number').value;
        break;
      }
    }

    if (!containsForwarders(form.querySelector('.forwarder').value)) {
      forwarders.push({ name: form.querySelector('.forwarder').value, number: form.querySelector('.number').value })
      informer('info', `Добавлен новый экспедитор ${form.querySelector('.forwarder').value}, номер: ${form.querySelector('.number').value}`);
    }

    for (let i = 0; i < base.length; i++) {
      if (base[i].kkt == form.querySelector('.kkt').value) {
        baseObj.FNValidityPeriod = base[i].FNValidityPeriod;
        base.splice(i, 1, baseObj);
        break;
      }
    }

    if (!containsCash(form.querySelector('.kkt').value)) {
      base.push(baseObj);
    }

    updateDataBase(forwardersId, forwarders, ApiKey)
      .then(() => {
        getDataBase(forwardersId, ApiKey)
          .then((result) => {
            forwarders = JSON.parse(result).record;
            console.info('База экспедиторов обновлена')
          })
      })

    updateDataBase(baseId, base, ApiKey)
      .then(() => {
        getDataBase(baseId, ApiKey)
          .then((result) => {
            printer({
              name: form.querySelector('.forwarder').value,
              kkt: form.querySelector('.kkt').value,
              sn: form.querySelector('.sn').value,
              userName: authUser.name,
              equipment: "Мобильная касса" + equipment,
              reader: form.querySelector('.reader').value,
              number: form.querySelector('.number').value,
            });
            informer('ok', 'Касса успешно выдана!')
            formSendButton.disabled = false;
            formSendButton.style.color = 'cornsilk';
            base = JSON.parse(result).record;
          })
      })

  } else if (form.querySelector('.formOption').value == 'repair') {

    baseObj.forwarder = '   ';
    baseObj.number = form.querySelector('.order').value;


    for (let i = 0; i < base.length; i++) {
      if (base[i].kkt == form.querySelector('.kkt').value) {
        baseObj.FNValidityPeriod = base[i].FNValidityPeriod;
        base.splice(i, 1, baseObj);
        break;
      }
    }

    if (!containsCash(form.querySelector('.kkt').value)) {
      base.push(baseObj);
    }

    updateDataBase(baseId, base, ApiKey)
      .then(() => {
        getDataBase(baseId, ApiKey)
          .then((result) => {
            informer('ok', 'Касса успешно выдана в ремонт!')
            formSendButton.disabled = false;
            formSendButton.style.color = 'cornsilk';
            base = JSON.parse(result).record;
          })
      })
  }

  history.push(historyObj);

  updateDataBase(historyId, history, ApiKey)
    .then(() => {
      getDataBase(historyId, ApiKey)
        .then((result) => {
          formSendButton.disabled = false;
          formSendButton.style.color = 'cornsilk';
          history = JSON.parse(result).record;
          for (let e of form.querySelectorAll('.form__input')) {
            e.value = '';
          }
        })
    })

}

function printer(obj) {

  let printWindow = window.open('', '', 'width=891px,height=630px,resizable=no,menubar=no,toolbar=no,location=no,status=no,scrollbars=no')
  printWindow.document.write(`
    <body style="display: flex;width: 100vw;height: 100vh;margin: 0;justify-content: space-between;font-family: 'Helvetica', 'Arial', sans-serif;">

       <div style="height: 100vh;width: 49.5vw;outline: 1px black solid;padding: 1vw;box-sizing: border-box;display: flex;flex-direction: column;">
          <p style="margin: 0;font-size: 1.0vw;text-align: center;">Магазин №462, Новосибирск, ул Шевченко, д.17/1</p>
          <svg class="barcode" id="barcode1"></svg>
          <h1 style="font-size: 1.7vw;margin: 0;">Корешок квитанции № ${todayDate.getTime()}</h1>
          <div style="outline: 1px black solid;
             display: flex;flex-wrap: wrap;margin: 10px 0 0 0;">
             <div class="table1">Заводской номер ККТ:</div>
             <div class="table2">${obj.kkt}</div>
             <div class="table1">Серийый номер: </div>
             <div class="table2">${obj.sn}</div>
             <div class="table1">Кард-ридер №: </div>
             <div class="table2">${obj.reader}</div>
             <div class="table1">Выдано экспедитору: ФИО и телефон</div>
             <div class="table2">${obj.name}, ${obj.number}</div>
             <div class="table1">Комплектность: </div>
             <div class="table2">${obj.equipment}</div>
          </div>
          <div style="margin: 20px 0 0 0;">
             <p class="text">Настоящим, я ${obj.name}, подтвеждаю факт передачи мне кассового оборудования со стороны ООО "МВМ".</p>
             <p class="text">Я осознаю, что несу ответственность за переданное мне оборудование.</p>
             <p class="text">Обязаюсь сдать оборудование в магазин, из которого то было выданно мне, в срок не позднее чем через 72 часа после предъявления требования со стороны магазина.</p>
          </div>
          <div style="margin: auto 0 0 0;display: flex;flex-wrap: wrap;align-items: end;">
             <p class="text1">Бланк заполнен верно, с условиями передачи оборудования ознакомлен, оборудование переданно ${todayDate.toLocaleDateString()}</p>
             <p class="text2 podpis" style="position: relative;">____________________</p>
             <p class="text1">Оборудование передал специалист сервисной зоны ${obj.userName}:</p>
             <p class="text2">____________________</p>
             <p class="text1">Оборудование получил специалист сервисной зоны _____________________________</p>
             <p class="text2">____________________</p>
             <p class="text1" style=" width: 100%;">дата сдачи оборудования ____________________</p>
          </div>
       </div>

       <div style="height: 100vh;width: 49.5vw;outline: 1px black solid;padding: 1vw;box-sizing: border-box;display: flex;flex-direction: column;">
          <p style="margin: 0;font-size: 1.0vw;text-align: center;">Магазин №462, Новосибирск, ул Шевченко, д.17/1</p>
          <svg class="barcode" id="barcode1"></svg>
          <h1 style="font-size: 1.7vw;margin: 0;">Квитанция № ${todayDate.getTime()}</h1>
          <div style="outline: 1px black solid;
             display: flex;flex-wrap: wrap;margin: 10px 0 0 0;">
             <div class="table1">Заводской номер ККТ:</div>
             <div class="table2">${obj.kkt}</div>
             <div class="table1">Серийый номер: </div>
             <div class="table2">${obj.sn}</div>
             <div class="table1">Кард-ридер №: </div>
             <div class="table2">${obj.reader}</div>
             <div class="table1">Выдано экспедитору: ФИО и телефон</div>
             <div class="table2">${obj.name}, ${obj.number}</div>
             <div class="table1">Комплектность: </div>
             <div class="table2">${obj.equipment}</div>
          </div>
          <div style="margin: 20px 0 0 0;">
             <p class="text">Настоящим, я ${obj.name}, подтвеждаю факт передачи мне кассового оборудования со стороны ООО "МВМ".</p>
             <p class="text">Я осознаю, что несу ответственность за переданное мне оборудование.</p>
             <p class="text">Обязаюсь сдать оборудование в магазин, из которого то было выданно мне, в срок не позднее чем через 72 часа после предъявления требования со стороны магазина.</p>
          </div>
          <div style="margin: auto 0 0 0;display: flex;flex-wrap: wrap;align-items: end;">
             <p class="text1">Бланк заполнен верно, с условиями передачи оборудования ознакомлен, оборудование переданно ${todayDate.toLocaleDateString()}</p>
             <p class="text2 podpis" style="position: relative;">____________________</p>
             <p class="text1">Оборудование передал специалист сервисной зоны ${obj.userName}:</p>
             <p class="text2">____________________</p>
             <p class="text1">Оборудование получил специалист сервисной зоны _____________________________</p>
             <p class="text2">____________________</p>
             <p class="text1" style=" width: 100%;">дата сдачи оборудования ____________________</p>
          </div>
       </div>

       <style>
          @media print {
            @page { margin: 10px; }
            body { margin: 0.5cm; }
          }
          .podpis:after {content: "Подпись экспедитора";position: absolute;right: 26px;bottom: -8px;font-size: 8px;}
          .barcode {margin: 0 0 0 50%;width: 50%;height: 5%;}
          .table1 {width: 30%;outline: 1px solid black;padding: 5px;box-sizing: border-box;display: flex;align-items: center;font-size: 75%;font-weight: bold;}
          .table2 {width: 70%;outline: 1px solid black;padding: 5px;box-sizing: border-box;display: flex;align-items: center;font-size: 75%;}
          .text {font-size: 12px;}
          .text1 {width: 60%;font-size: 75%;}
          .text1 {width: 60%;font-size: 75%;margin: 10px 0 0 0;}
          .text2 {width: 40%;font-size: 75%;margin: 10px 0 0 0;height: 15px;text-align: end;}
       </style>
       <script src="https://cdn.jsdelivr.net/npm/jsbarcode@3.11.5/dist/barcodes/JsBarcode.code128.min.js"></script>
       <script>
          JsBarcode("#barcode1", "${obj.kkt}", {
            width: 4,
            height: 40,
            displayValue: false
          });
          JsBarcode("#barcode2", "${obj.kkt}", {
            width: 4,
            height: 40,
            displayValue: false
          });
       </script>
    </body>
  `);
  setTimeout(() => {
    printWindow.print();
  }, 500);
}
