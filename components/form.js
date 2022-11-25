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

  if (form.querySelector('.formOption').value == 'forwarder') {
    let equipment = '';
    if (form.querySelector('.azu').checked && form.querySelector('.szu').checked) {
      equipment = ', Сетевое зарядное утсройство, Автомобильное зарядное утсройство'
    } else if (form.querySelector('.azu').checked) {
      equipment = ', Автомобильное зарядное утсройство'
    } else if (form.querySelector('.szu').checked) {
      equipment = ', Сетевое зарядное утсройство'
    }

    history.push(historyObj)

    updateDataBase('637cac0165b57a31e6bf133b', history)
      .then(() => {
        getDataBase('637cac0165b57a31e6bf133b')
          .then((result) => {
            printer({
              name: form.querySelector('.forwarder').value,
              kkt: form.querySelector('.kkt').value,
              sn: form.querySelector('.sn').value,
              userName: "Вертинский Дмитрий Алексеевич",
              equipment: "Мобильная касса" + equipment,
              reader: form.querySelector('.reader').value,
              number: form.querySelector('.number').value
            });
            informer('ok', 'Касса успешно выдана!')
            formSendButton.disabled = false;
            formSendButton.style.color = 'cornsilk';
            history = JSON.parse(result).record;
          })
      })
  }

}

function printer(obj) {

  let printWindow = window.open('', '', 'width=891px,height=630px,resizable=no,menubar=no,toolbar=no,location=no,status=no,scrollbars=no')
  printWindow.document.write(`
    <body style="display: flex;width: 100vw;height: 100vh;margin: 0;justify-content: space-between;font-family: 'Helvetica', 'Arial', sans-serif;">

       <div style="height: 100vh;width: 49.5vw;outline: 1px black solid;padding: 1vw;box-sizing: border-box;display: flex;flex-direction: column;">
          <p style="margin: 0;font-size: 1.0vw;text-align: center;">Магазин №462, Новосибирск, ул Шевченко, д.17/1</p>
          <svg class="barcode" id="barcode1"></svg>
          <h1 style="font-size: 1.7vw;margin: 0;">Корешок квитанции № ${Math.round(todayDate.getTime() / 1000)}</h1>
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
          <h1 style="font-size: 1.7vw;margin: 0;">Квитанция № ${Math.round(todayDate.getTime() / 1000)}</h1>
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
          setTimeout(() => {
            window.print();
          }, 200);
       </script>
    </body>
  `);
}
