const status = document.querySelector('#status');
const targetZone = document.querySelector('#targetZone');
const btn = document.querySelector('.j-btn-test');
const timezoneInfo = document.querySelector("#timeZone");
// Функция, выводящая текст об ошибке
const error = () => {
    status.textContent = 'Невозможно получить ваше местоположение';
}

// Функция, срабатывающая при успешном получении геолокации
const success = (position) => {
    console.log('position', position);
    const latitude  = position.coords.latitude;
    const longitude = position.coords.longitude;
    const url = `https://api.ipgeolocation.io/timezone?apiKey=32bcd4a6e4b548968e7afcdb682ac679&lat=${latitude}&long=${longitude}`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            const timezone = data.timezone;
            const dateTime = data.date_time_txt;

            timezoneInfo.textContent = "Временная зона: " + timezone;
            targetZone.textContent = "Местное время: " + dateTime;
        })

    status.textContent = `Широта: ${latitude} °, Долгота: ${longitude} °`;
}

btn.addEventListener('click', () => {
    timezoneInfo.textContent = '';
    targetZone.textContent = '';

    if (!navigator.geolocation) {
        status.textContent = 'Geolocation не поддерживается вашим браузером';
    } else {
        status.textContent = 'Определение местоположения…';
        navigator.geolocation.getCurrentPosition(success, error);
    }
});