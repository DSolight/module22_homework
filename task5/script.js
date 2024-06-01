document.addEventListener("DOMContentLoaded", () => {
    const wsUrl = "wss://echo-ws-service.herokuapp.com/";
    const chatDisplay = document.querySelector(".chat-display");
    const inputText = document.querySelector(".input-text");
    const btnSend = document.querySelector(".btn-send");
    const geoButton = document.querySelector(".geo-button");
    let websocket;

    // Открытие WebSocket соединения
    function openWebSocket() {
        websocket = new WebSocket(wsUrl);

        websocket.onopen = () => {
            console.log("WebSocket соединение открыто");
        };

        websocket.onmessage = (event) => {
            displayMessage(event.data, "received");
        };

        websocket.onerror = (event) => {
            console.error("WebSocket ошибка: ", event);
        };

        websocket.onclose = (event) => {
            console.log("WebSocket соединение закрыто");
        };
    }

    // Отображение сообщения в окне переписки
    function displayMessage(message, type) {
        const messageElement = document.createElement("div");
        messageElement.classList.add("chat-message", type);
        if (type === "sent" && message.startsWith("https://")) {
            messageElement.innerHTML = `<a href="${message}" target="_blank">Посмотреть на карте</a>`;
        } else {
            messageElement.textContent = message;
        }
        chatDisplay.appendChild(messageElement);
        chatDisplay.scrollTop = chatDisplay.scrollHeight; // Автоскролл вниз
    }

    // Отправка сообщения
    btnSend.addEventListener("click", () => {
        const message = inputText.value;
        if (message !== "" && websocket.readyState === WebSocket.OPEN) {
            websocket.send(message);
            displayMessage(message, "sent");
            inputText.value = "";
        } else {
            console.log("Введите сообщение или установите соединение");
        }
    });

    // Отправка гео-локации
    geoButton.addEventListener("click", () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(position => {
                let latitude = position.coords.latitude;
                let longitude = position.coords.longitude;
                let locationUrl = `https://www.openstreetmap.org/?mlat=${latitude}&mlon=${longitude}#map=18/${latitude}/${longitude}`;
                if (websocket.readyState === WebSocket.OPEN) {
                    displayMessage(locationUrl, "sent");
                } else {
                    console.log("WebSocket соединение не установлено");
                }
            }, () => {
                alert('Не удалось определить местоположение.');
            });
        } else {
            alert('Гео-локация не поддерживается вашим браузером.');
        }
    });

    // Автоматическое открытие соединения при загрузке страницы
    openWebSocket();
});