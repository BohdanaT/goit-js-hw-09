function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, 0)}`;
};

const btnStartRef = document.querySelector('button[data-start]');
const btnStopRef = document.querySelector('button[data-stop]');

btnStartRef.addEventListener('click', onBtnStartClick);
btnStopRef.addEventListener('click', onBtnStopClick);

btnStopRef.disabled = true;
let timerId = null;

function onBtnStartClick() {
    btnStartRef.disabled = true;
    btnStopRef.disabled = false;

    timerId = setInterval(() => {
        document.body.style.backgroundColor = getRandomHexColor();
    }, 1000);
};

function onBtnStopClick() {
    btnStartRef.disabled = false;
    clearInterval(timerId);
};