import { elementTemplateTypeCash, elementTemplateTypeForwarder, elementTemplateTypeHistory, tabsContainer, todayDate } from "./constants.js";
import { informer } from "./informer.js";

export function elementUpdater(tab, location, searchText, base) {
  tabsContainer.querySelector('.' + tab).querySelector('.elements').innerHTML = '';
  let counter = 0;
  for (let i = 0; i < base.length; i++) {
    if (location == 'all' && searchText == '') {
      elementAppend(tab, base[i]); counter ++;
    } else if (location == 'FNValidityEnds' && searchText == '') {
      if ((Date.parse(base[i].FNValidityPeriod) - Date.parse(todayDate)) < 4320000) {
        elementAppend(tab, base[i]); counter ++;
      }
    } else if ((Date.parse(base[i].FNValidityPeriod) - Date.parse(todayDate)) < 4320000 && location == 'FNValidityEnds' && searchText !== '' && base[i].FNValidityPeriod.includes(searchText)) {
      elementAppend(tab, base[i]); counter ++;
    } else if ((Date.parse(base[i].FNValidityPeriod) - Date.parse(todayDate)) < 4320000 && location == 'FNValidityEnds' && searchText !== '' && base[i].kkt.includes(searchText)) {
      elementAppend(tab, base[i]); counter ++;
    } else if (location == 'all' && searchText !== '' && base[i].issued.includes(searchText)) {
      elementAppend(tab, base[i]); counter ++;
    } else if (location == 'all' && searchText !== '' && base[i].forwarder.includes(searchText)) {
      elementAppend(tab, base[i]); counter ++;
    } else if (tab == 'forwarders' && searchText == '') {
      elementAppendTypeForwarders(tab, base[i]); counter ++;
    } else if (tab == 'history' && searchText == '') {
      elementAppendTypeHistory(tab, base[i]); counter ++;
    } else if (location == 'all' && searchText !== '' && base[i].kkt.includes(searchText)) {
      elementAppend(tab, base[i]); counter ++;

    } else if (tab == 'forwarders' && searchText !== '' && base[i].name.includes(searchText)) {
      elementAppendTypeForwarders(tab, base[i]); counter ++;
    } else if (tab == 'history' && searchText !== '' && base[i].kkt.includes(searchText)) {
      elementAppendTypeHistory(tab, base[i]); counter ++;
    } else if (tab == 'history' && searchText !== '' && base[i].forwarder.includes(searchText)) {
      elementAppendTypeHistory(tab, base[i]); counter ++;
    } else if (tab == 'history' && searchText !== '' && base[i].issued.includes(searchText)) {  // not work
      elementAppendTypeHistory(tab, base[i]); counter ++;
    } else if (tab == 'history' && searchText !== '' && base[i].accepted.includes(searchText)) { // not work
      elementAppendTypeHistory(tab, base[i]); counter ++;
    } else if (location == base[i].location && searchText !== '' && base[i].issued.includes(searchText)) {
      elementAppend(tab, base[i]); counter ++;
    } else if (location == base[i].location && searchText !== '' && base[i].forwarder.includes(searchText)) {
      elementAppend(tab, base[i]); counter ++;
    } else if (location == base[i].location && searchText !== '' && base[i].kkt.includes(searchText)) {
      elementAppend(tab, base[i]); counter ++;

    } else if (location == base[i].location && searchText == '') {
      elementAppend(tab, base[i]); counter ++;
    }
  }
  informer('info', 'Найденно записей: ' + counter)
}

function elementAppend(tab, obj) {
  let element = elementTemplateTypeCash.content.querySelector('.element').cloneNode(true);
  let location;
  let kkt;
  if (obj.location == 'shop') {
    location = 'В магазине';
  } else if (obj.location == 'repair') {
    location = 'В ремонте по заявке ' + obj.order;
  } else if (obj.location == 'forwarder') {
    location = 'У экспедитора';
  } else 
  element.querySelector('.kkt-number').textContent = лле
  // По неизвестным мне причинам, строка ниже не работает... 
  element.querySelector('.kkt-number').textContent = obj.kkt;
  // P.s. Удивительн  о, но заработало... Не знаю что случилось...
  element.querySelector('.kkt-SN').textContent = obj.sn;
  element.querySelector('.kkt-location').textContent = location;
  element.querySelector('.kkt-forwarder').textContent = obj.forwarder + ' ' + obj.number;
  element.querySelector('.kkt-reader').textContent = obj.reader;
  element.querySelector('.kkt-FN-validity-period').textContent = obj.FNValidityPeriod;
  element.querySelector('.kkt-issued').textContent = obj.issued;
  // Обработчики событий //
  element.querySelector('.opener').addEventListener('click', function () {
    element.querySelector('.opener').classList.toggle('opener_flipped');
    element.querySelector('.element__invisible').classList.toggle('element__invisible_closed');
  });
  element.querySelector('.barcode-creator').addEventListener('click', function () {
    printBarCode(obj.kkt);
  });
  element.querySelector('.opener').addEventListener('dblclick', function () {
    for (let e of tabsContainer.querySelectorAll('.element')) {
      e.querySelector('.opener').classList.toggle('opener_flipped');
      e.querySelector('.element__invisible').classList.toggle('element__invisible_closed');
    }
  });
  if ((Date.parse(obj.FNValidityPeriod) - Date.parse(todayDate)) < 4320000) {
    element.querySelector('.kkt-number').style.color = 'red';
    element.querySelector('.kkt-FN-validity-period').style.color = 'red';
  }
  tabsContainer.querySelector('.' + tab).querySelector('.elements').append(element);
}

function elementAppendTypeForwarders(tab, obj) {
  let element = elementTemplateTypeForwarder.content.querySelector('.element').cloneNode(true);
  element.querySelector('.forwarder-name').textContent = obj.name;
  element.querySelector('.forwarder-number').textContent = obj.number;
  tabsContainer.querySelector('.' + tab).querySelector('.elements').append(element);
}

function elementAppendTypeHistory(tab, obj) {
  let element = elementTemplateTypeHistory.content.querySelector('.element').cloneNode(true);
  element.querySelector('.kkt-number').textContent = obj.kkt;
  element.querySelector('.kkt-SN').textContent = obj.sn;
  element.querySelector('.kkt-reader').textContent = obj.reader;
  element.querySelector('.kkt-issued').textContent = obj.issued;
  element.querySelector('.kkt-accepted').textContent = obj.accepted;
  if (obj.location == 'forwarder' && obj.issued !== '') {
    element.querySelector('.kkt-location').textContent = 'Выдано экспедитору: ' + obj.forwarder;
  } else if (obj.location == 'forwarder' && obj.Accepted !== '') {
    element.querySelector('.kkt-location').textContent = 'Принято от экспедитора: ' + obj.forwarder;
  } else if (obj.location == 'repair' && obj.issued !== '') {
    element.querySelector('.kkt-location').textContent = 'Выдано в ремонт по заявке ' + obj.order;
  } else if (obj.location == 'repair' && obj.Accepted !== '') {
    element.querySelector('.kkt-location').textContent = 'Принято из ремонта';
  }
  element.querySelector('.opener').addEventListener('click', function () {
    element.querySelector('.opener').classList.toggle('opener_flipped');
    element.querySelector('.element__invisible').classList.toggle('element__invisible_closed');
  });
  element.querySelector('.opener').addEventListener('dblclick', function () {
    for (let e of tabsContainer.querySelectorAll('.element')) {
      e.querySelector('.opener').classList.toggle('opener_flipped');
      e.querySelector('.element__invisible').classList.toggle('element__invisible_closed');
    }
  });
  if ((Date.parse(obj.FNValidityPeriod) - Date.parse(todayDate)) < 4320000) {
    element.querySelector('.kkt-number').style.color = 'red';
    element.querySelector('.kkt-FN-validity-period').style.color = 'red';
  }
  tabsContainer.querySelector('.' + tab).querySelector('.elements').prepend(element);
}

function printBarCode(number) {
  let printWindow = window.open('', '', 'width=891px,height=630px,resizable=no,menubar=no,toolbar=no,location=no,status=no,scrollbars=no')
  printWindow.document.write(`
  <body class="body">
    
      <svg class="barcode" id="barcode"></svg>
  
    <style>
      html {
        width: 100vw;
        height: 100vh;
        margin: 0;
        padding: 0;
      }
      body {
        width: 100vw;
        height: 100vh;
        margin: 0;
        padding: 10px;
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        grid-auto-rows: 5vh;
        align-items: center;
        justify-self: center;
        grid-gap: 2.4vw;
        box-sizing: border-box;
      }
      .barcode {margin: 1%;width: 20vw;height: 5vh; outline: 1px black solid;}
            @media print {
              @page { margin: 10px; }
              body { margin: 0.5cm; }
            }
    </style>
    <script src="https://cdn.jsdelivr.net/npm/jsbarcode@3.11.5/dist/barcodes/JsBarcode.code128.min.js"></script>
    <script>
      JsBarcode('#barcode', '${number}', {
        width: 4,
        height: 40,
        displayValue: true
      });
    </script>
  </body>
    
  `);
  setTimeout(() => {
    printWindow.print();
  }, 500);
}

/*
[
  {
    "kkt": "0000000000000001",
    "sn": "0000000001",
    "issued": "22.11.2022",
    "Accepted": "",
    "location": "forwarder",
    "forwarder": "Familiya Imya Otchestvo",
    "reader": "0000000000000001"
  }
]
  */