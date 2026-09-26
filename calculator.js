'use strict';

const btns = document.querySelectorAll('button');
const field = document.querySelector('.input');

let firstNum, secondNum, operation;
btns.forEach(function (btn) {
  btn.addEventListener('click', function () {
    if (btn.textContent === '⌫') {
      field.value = field.value.slice(0, -1);
    } else if (btn.textContent === '=') {
      secondNum = Number(field.value.split(operation)[1]);

      if (operation === '+') {
        field.value = firstNum + secondNum;
      } else if (operation === '-') {
        field.value = firstNum - secondNum;
      } else if (operation === '÷') {
        field.value = firstNum / secondNum;
      } else if (operation === '%') {
        field.value = firstNum % secondNum;
      }
    } else if (btn.classList.contains('operator')) {
      firstNum = Number(field.value);

      operation = btn.textContent;

      field.value += operation;
    } else {
      field.value += btn.textContent;
    }
  });
});
