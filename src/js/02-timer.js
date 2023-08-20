import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import Notiflix from 'notiflix';

const datePickerEl = document.querySelector('#datetime-picker');
const timerDaysEl = document.querySelector('span[data-days]');
const timerHoursEl = document.querySelector('span[data-hours]');
const timerMinutesEl = document.querySelector('span[data-minutes]');
const timerSecondsEl = document.querySelector('span[data-seconds]');
const startBtnEl = document.querySelector('button[data-start]');

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
};

startBtnEl.addEventListener('click', onTimerStart);
startBtnEl.disabled = true;

let selectedDate;

flatpickr(datePickerEl, {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
    onClose(selectedDates) {
        selectedDate = selectedDates[0].getTime();
        const deltaTime = selectedDate - Date.now();

        if (deltaTime > 0) {
            startBtnEl.disabled = false; 
        } else {
            Notiflix.Notify.warning("Please choose a date in the future");
        };
  },
});

function addLeadingZero(value) {
    return String(value).padStart(2, '0');
};

function onTimerStart() {
    const intervalId = setInterval(() => {
        const deltaDate = selectedDate - Date.now();

        if (deltaDate >= 0) {
            const { days, hours, minutes, seconds } = convertMs(deltaDate);

            timerDaysEl.textContent = addLeadingZero(days);
            timerHoursEl.textContent = addLeadingZero(hours);
            timerMinutesEl.textContent = addLeadingZero(minutes);
            timerSecondsEl.textContent = addLeadingZero(seconds);
        } else {
            clearInterval(intervalId);
        };
    }, 1000);
};