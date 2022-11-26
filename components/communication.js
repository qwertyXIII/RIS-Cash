
export const baseId = '50729c6a-dac7-4eff-b4ac-a052fcd461d7/756457e7-6e90-412f-95e7-855a6b67db71';
export const usersId = '50729c6a-dac7-4eff-b4ac-a052fcd461d7/f8306ccd-b949-45f3-bdfa-d0cfbffcac7b';
export const historyId = '50729c6a-dac7-4eff-b4ac-a052fcd461d7/0224c0de-76d3-4820-b669-378423c01ffc';
export const forwardersId = '50729c6a-dac7-4eff-b4ac-a052fcd461d7/b3a88eab-7fdc-40a7-9791-fdc8820d96b7';
export const ApiKey = '415fe3f2-b1df-45d0-b93f-84f5f30cad70';


// Функция отправки запроса данных с сервера
export let getDataBase = function(id, key) {
  return new Promise(function(resolve, reject) {
  let xhttp = new XMLHttpRequest();
  xhttp.open('GET', 'https://api.jsonstorage.net/v1/json/' + id + '?apiKey=' + key, true);
  xhttp.onreadystatechange = function() {
    if (this.readyState == XMLHttpRequest.DONE) {
      if (this.status >= 200 && this.status < 400) {
        resolve(this.responseText);
      } else {
        reject(new Error('Error ' + this.status));
    }
   }
  };
    // xhttp.setRequestHeader('X-Master-Key', '$2b$10$OLFT3Ctqe9OFt1NFRCgVvesMZJhyq.Q0AlLzqJI9bVcgjZ3x6VnL2');
    xhttp.send();
  });
}

// Функция добавления данных на сервер
export let updateDataBase = function(id, obj, key) {
  let json = JSON.stringify(obj)
  return new Promise(function(resolve, reject) {
  let xhttp = new XMLHttpRequest();
  xhttp.open("PUT", 'https://api.jsonstorage.net/v1/json/' + id + '?apiKey=' + key, true);
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
    // xhttp.setRequestHeader('X-Master-Key', '$2b$10$OLFT3Ctqe9OFt1NFRCgVvesMZJhyq.Q0AlLzqJI9bVcgjZ3x6VnL2');
    xhttp.send(String(json));
  });
}