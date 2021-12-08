//Находим все инпуты на странице
let inputName = document.getElementById("inputName");
let inputPrice = document.getElementById("inputPrice");
let inputMail = document.getElementById("inputMail");
let inputLS = document.getElementById("inputLS");
let viewID = document.getElementById("viewID");
let btn = document.getElementById("btn");
//Проверка на то, добавляем ли мы данные, или же нет
var isAdded = new Boolean(true);

//Переменные 
var id = null;
var PayID = null;
var PayName = null;
var PayDate = null;
var textStatus = null;

function btnPressed(){
    if (isAdded){
        Pay();
    } else checkPay();
}


//Оплачиваем
function Pay(){

    //Генерируем JSON
    var jsonData = {
        PAY_ACTION: "REG_PAYMENT",
        PAY_ITOG: inputPrice.value + "00",
        PAY_NAME: inputName.value
    };
    
    (async () => {
        const rawResponse = await fetch('http://localhost:4000/Pay', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(jsonData)
        });

        const content = await rawResponse.json();

        if (content.STATUS == 'OK'){

            window.open(content.PAY_URL);
           
            //var txt = document.createTextNode("Сформировать чек");
            //btn.appendChild(txt);    

            btn.innerHTML = "Сформировать чек"


            isAdded = false;
            PayID = content.PAY_ID;
        }
        if (content.STATUS == 'ERROR') alert(content.ERROR_MSG);

        console.log(isAdded);
        console.log(PayID);

    })();
    
}


//Проверяем, а была ли оплата? 
function checkPay(){
    
    //Генерируем JSON
     var jsonData = {
        PAY_ACTION: "GET_PAYMENT_INFO",
        PAY_ID: PayID
    };

    (async () => {
        const rawResponse = await fetch('http://localhost:4000/getPayName', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(jsonData)
        });

        const content = await rawResponse.json();
        var data = content.STATUS.params;
        var options = content.STATUS.options;
        if (content.STATUS == 'ERROR') alert(content.ERROR_MSG);
        
        textStatus = data.status;     
        session_id = data.session_id; 

        if (textStatus == 0) {
            alert("Вы еще не произвели оплату!");
        }

        if (textStatus == 1) {
             //Формируем ID по стандарту
            id = session_id.slice(0, 8) + '-' + session_id.slice(8, 12) + '-' + session_id.slice(12, 16) +'-' + session_id.slice(16, 20)+'-' + session_id.slice(20);
            PayDate = data.paidDate;
            PayName = options.PAY_NAME;

            sendData();
        }


       
    })();
}

function sendData(){

    //Генерируем JSON
    var jsonData = {
        PAY_ID: id,
        PAY_ACTION: "REG",
        PAY_DATE: PayDate,
        PAY_EMAIL: inputMail.value,
        PAY_LS: inputLS.value,
        PAY_ITOG: inputPrice.value + "00",
        PAY_NAME: PayName
    };
    
    localStorage  = window.localStorage;
    localStorage.setItem('ID', id);

    (async () => {
        const rawResponse = await fetch('http://localhost:4000/sendData', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(jsonData)
        });

        const content = await rawResponse.json();

        if (content.STATUS == 'OK'){
            window.open("receipe.html", "_self");            
        }
        if (content.STATUS == 'ERROR') alert(content.ERROR_MSG);

        console.log(content);

    })();
    

}

