
function initBtn() {
    // поиск элементов в DOM
    let btn = document.querySelector(".btn");
    let btnIcon = document.querySelector(".btn__icon-first");
    let btnIconClick = document.querySelector(".btn__icon-second");

    btn.addEventListener("click", () => {
        btnIcon.classList.toggle("j-show")
        btnIconClick.classList.toggle("j-show")
    })
}


function initAlert() {
    // поиск элементов в DOM
    let btn = document.querySelector(".j-alert");
    btn.addEventListener("click", () => {
        alert(`width: ${window.screen.width}\nheight: ${window.screen.height}`)
    })
}


function initChat() {

    // поиск элементов в DOM
    const btnSend = document.querySelector(".j-click");
    const btnLocation = document.querySelector('.j-location');
    const outputField = document.querySelector(".chat__output");
    const chatInput = document.querySelector('.chat__input');


    let ws = createWebSocket()
    btnSend.addEventListener("click", () => {
        let value = chatInput.value
        if (value == "") {
            addRedBorder()
            return
        }
        displayMyMessage(value)
        sendMess(ws, value)
    })


    btnLocation.addEventListener("click", () => {
        displayMyLocation()
    })



    // Функция обработки полученного результата
    function displayMyMessage(mess) {
        const m = `<div class="chat__message mod-my">${mess}</div>`;
        outputField.innerHTML += m;
    }

    // Функция обработки полученного результата
    function displayEchoMessage(mess) {
        const m = `<div class="chat__message mod-echo">${mess}</div>`;
        outputField.innerHTML += m;
    }

    // Функция обработки полученного результата
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


    function addRedBorder() {
        chatInput.classList.add("red-border")
    }
    function addGreenBorder() {
        chatInput.classList.add("green-border")
    }


    function createWebSocket() {
        // Создание сокета и обработка сообщений
        let ws = new WebSocket('wss://echo-ws-service.herokuapp.com/');
        ws.onopen = () => {
            addGreenBorder()
        }
        ws.onclose = () => {
            addRedBorder()
        }
        ws.onerror = (event) => {
            console.log(`Error: ${event.data}`, 'warning');
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

    function sendMess(ws, mess) {
        ws.send(mess)

    }

}

// Точка входа
document.addEventListener("DOMContentLoaded", function () {
    initBtn()
    initAlert()
    initChat()
});
