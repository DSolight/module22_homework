const status = document.querySelector('#status');
const btn = document.querySelector('.j-btn-test');
const screen = document.querySelector('#screenSize');
// Функция, выводящая текст об ошибке
const error = () => {
    status.textContent = 'Информация о местоположении недоступна';
}

// Функция, срабатывающая при успешном получении геолокации
const success = (position) => {
    console.log('position', position);
    const latitude  = position.coords.latitude;
    const longitude = position.coords.longitude;

    status.textContent = `Широта: ${latitude} °, Долгота: ${longitude} °`;

}

btn.addEventListener('click', () => {
   status.textContent = '';

    if (!navigator.geolocation) {
        status.textContent = 'Информация о местоположении недоступна';
    } else {
        status.textContent = 'Определение местоположения…';
        navigator.geolocation.getCurrentPosition(success, error);
    }

    screen.textContent = 'Ширина экрана: ' + window.innerWidth + 'px; Высота экрана: ' + window.innerHeight + 'px;';

});