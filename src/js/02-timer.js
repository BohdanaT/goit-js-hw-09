import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
      if ( this.defaultDate) {
          return window.alert("Please choose a date in the future");
      }
  },
};
const datePicker = document.querySelector('#datetime-picker');
flatpickr(datePicker, options);


