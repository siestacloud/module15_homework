
// задание 2 Раздел 15.5
function initChat() {

    // поиск элементов в DOM
    const btnSend = document.querySelector(".j-click");
    const btnLocation = document.querySelector('.j-location');
    const outputField = document.querySelector(".chat__output");
    const chatInput = document.querySelector('.chat__input');

    // создаю веб-сокет
    let ws = createWebSocket()

    // вешаю обработчик на нажатие кнопки
    btnSend.addEventListener("click", () => {
        let value = chatInput.value
        if (value == "") {
            return
        }
        displayMyMessage(value)
        sendMess(ws, value)
        chatInput.value = ""
    })


    // вешаю обработчик на нажатие кнопки
    btnLocation.addEventListener("click", () => {
        displayMyLocation()
    })



    // функция отображения сообщения
    function displayMyMessage(mess) {
        const m = `<div class="chat__message mod-my">${mess}</div>`;
        outputField.innerHTML += m;
    }

    // функция отображения echo сообщения
    function displayEchoMessage(mess) {
        const m = `<div class="chat__message mod-echo">${mess}</div>`;
        outputField.innerHTML += m;
    }

    // aункция отображения location сообщения
    function displayMyLocation() {
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition((position) => {
                const { coords } = position;
                console.log(coords.latitude, coords.longitude);
                const m = `<div class="chat__message mod-my"><a href=" https://www.openstreetmap.org/#map=13/${coords.latitude}/${coords.longitude} " target="_blank">Гео-локация</a></div>`;
                outputField.innerHTML += m;
            });
        }
    }

    // функция создания сокета и обработка сообщений
    function createWebSocket() {
        let ws = new WebSocket('wss://echo-ws-service.herokuapp.com/');
        ws.onopen = () => {
            addGreenBorder()
        }
        ws.onclose = () => {
            addRedBorder()
        }
        ws.onerror = (event) => {
            addRedBorder()
            console.log(`Error: ${event.data}`);
        }
        ws.onmessage = (event) => {
            if (event.data.includes(this.noResponseData) && this.noResponseData.length) {
                console.log(event.data);
            }
            else {
                console.log("test");
                displayEchoMessage(event.data);
            }
        }
        return ws
    }


    // функция изменения border-color при ошибке или закрытии веб-сокета
    function addRedBorder() {
        chatInput.classList.add("red-border")
    }

    // функция изменения border-color при открытии веб-сокета
    function addGreenBorder() {
        chatInput.classList.add("green-border")
    }

    // функция отправки сообщения по web-сокету
    function sendMess(ws, mess) {
        ws.send(mess)
    }

}
