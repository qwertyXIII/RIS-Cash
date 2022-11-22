// Функция отправки запроса данных с сервера
export let getDataBase = function(id) {
  return new Promise(function(resolve, reject) {
  let xhttp = new XMLHttpRequest();
  xhttp.open('GET', 'https://api.jsonbin.io/v3/b/' + id, true);
  xhttp.onreadystatechange = function() {
    if (this.readyState == XMLHttpRequest.DONE) {
      if (this.status >= 200 && this.status < 400) {
        resolve(this.responseText);
      } else {
        reject(new Error('Error ' + this.status));
    }
   }
  };
    xhttp.setRequestHeader('X-Master-Key', '$2b$10$OLFT3Ctqe9OFt1NFRCgVvesMZJhyq.Q0AlLzqJI9bVcgjZ3x6VnL2');
    xhttp.send();
  });
}

// Функция добавления данных на сервер
export let updateDataBase = function(id, obj) {
  let json = JSON.stringify(obj)
  return new Promise(function(resolve, reject) {
  let xhttp = new XMLHttpRequest();
  xhttp.open("PUT", 'https://api.jsonbin.io/v3/b/' + id, true);
  xhttp.onreadystatechange = function() {
    if (this.readyState == XMLHttpRequest.DONE) {
      if (this.status >= 200 && this.status < 400) {
        resolve(this.responseText);
        console.log(this.responseText);
      } else {
        reject(new Error('Error ' + this.status));
    }
   }
  };
    xhttp.setRequestHeader("Content-Type", "application/json");
    xhttp.setRequestHeader('X-Master-Key', '$2b$10$OLFT3Ctqe9OFt1NFRCgVvesMZJhyq.Q0AlLzqJI9bVcgjZ3x6VnL2');
    xhttp.send(String(json));
  });
}

// Функция удаления данных на сервер
export let deleteDataBase = function(id) {
  return new Promise(function(resolve, reject) {
  let xhttp = new XMLHttpRequest();
  xhttp.open('DELETE', 'https://api.jsonbin.io/v3/b/' + id, true);
  xhttp.onreadystatechange = function() {
    if (this.readyState == XMLHttpRequest.DONE) {
      if (this.status >= 200 && this.status < 400) {
        resolve(this.responseText);
      } else {
        reject(new Error('Error ' + this.status));
    }
   }
  };
    xhttp.setRequestHeader('X-Master-Key', '$2b$10$OLFT3Ctqe9OFt1NFRCgVvesMZJhyq.Q0AlLzqJI9bVcgjZ3x6VnL2');
    xhttp.send();
  });
}