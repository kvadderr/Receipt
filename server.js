//Подключаем библиотеки
const express = require('express');
const cors = require("cors");
const axios = require("axios");

//Создаем приложение на основе экспресс
const app = express();

//Приложение использует cors
app.use(cors());

//Чтобы читал 'application/json'
app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));


//Получаем данные для формирования чека
app.post('/getData', function (req, res, next) {
    var link = JSON.stringify(req.body);
    urlStr = 'https://pay.pay-ok.org/demo/?REQ='+link;
    axios.get(encodeURI(urlStr)).
    then(
        response => {
            res.send(response.data);
            console.log(response.data);
        }
    ).catch(
        error => {
            res.send(error.message);
            console.log("ERROR - "+error.message);
        }
    )
  
});

//Отправляем повторный запрос с данными об оплате
app.post('/sendData', function (req, res, next) {
    var link = JSON.stringify(req.body);
    urlStr = 'https://pay.pay-ok.org/demo/?REQ='+link;
    axios.get(encodeURI(urlStr)).
    then(
        response => {
            res.send(response.data);
            console.log(response.data);
        }
    ).catch(
        error => {
            res.send(error.message);
            console.log("ERROR - "+error.message);
        }
    )
  
});

//Отправляем данные для отправки
app.post('/Pay', function (req, res, next) {
    var link = JSON.stringify(req.body);
    urlStr = 'https://pay.pay-ok.org/demo/?REQ='+link;
    axios.get(encodeURI(urlStr)).
    then(
        response => {
            res.send(response.data);
            console.log(response.data);
        }
    ).catch(
        error => {
            res.send(error.message);
            console.log("ERROR - "+error.message);
        }
    )
  
});


//Проверяем были ли оплата
app.post('/getPayName', function (req, res, next) {
    var link = JSON.stringify(req.body);
    urlStr = 'https://pay.pay-ok.org/demo/?REQ='+link;
    axios.get(encodeURI(urlStr)).
    then(
        response => {
            res.send(response.data);
            console.log(response.data);
        }
    ).catch(
        error => {
            res.send(error.message);
            console.log("ERROR - "+error.message);
        }
    )
  
});

  //Приложение слушает 4000 порт
app.listen(4000);
console.log("Сервер на порту 4000: Запущен");
  


