'use strict';

document.querySelector('.name').textContent = 'Calculator';

const buttons = document.querySelector('.buttons');
const txtField = document.querySelector('.input');

const operators = ['+', '-', 'x', '÷'];
const funcKeys = ['⌫', '='];
const btnNums = new Array(10).fill();

let first, second, operation, nextNum;
let justCalculated = false;

function addOperator(pos, op) {
  buttons.insertAdjacentHTML(pos, `<button class="operator">${op}</button>`);
}

function addFuncKey(pos, op) {
  buttons.insertAdjacentHTML(pos, `<button class="key">${op}</button>`);
}

operators.forEach(function (op) {
  addOperator('afterbegin', op);
});

btnNums.forEach(function (_, i) {
  buttons.insertAdjacentHTML('beforeend', `<button>${i}</button>`);
});

funcKeys.forEach(function (op) {
  addFuncKey('beforeend', op);
});

const allBtns = document.querySelectorAll('.buttons button');

allBtns.forEach(function (btn) {
  btn.addEventListener('click', function () {
    // OPERATOR
    if (btn.classList.contains('operator')) {
      if (txtField.value === '') return;

      // Start a new calculation after =
      if (justCalculated) {
        first = Number(txtField.value);
        operation = undefined;
        justCalculated = false;
      }

      // Another operator was already selected
      if (operation) {
        const operatorIndex = txtField.value.lastIndexOf(operation);

        nextNum = txtField.value.slice(operatorIndex + 1);

        // Don't calculate if there is no second number
        if (nextNum === '') {
          txtField.value = txtField.value.slice(0, -1) + btn.textContent;

          operation = btn.textContent;
          return;
        }

        if (operation === '+') {
          first = first + Number(nextNum);
        } else if (operation === '-') {
          first = first - Number(nextNum);
        } else if (operation === 'x') {
          first = first * Number(nextNum);
        } else {
          if (Number(nextNum) === 0) {
            txtField.value = 'Error';
            operation = undefined;
            return;
          }

          first = first / Number(nextNum);
        }

        // First operator
      } else {
        first = Number(txtField.value);
      }

      operation = btn.textContent;
      txtField.value += operation;

      return;
    }

    // FUNCTION KEYS
    if (btn.classList.contains('key')) {
      // EQUALS
      if (btn.textContent === '=') {
        if (!operation) return;

        const operatorIndex = txtField.value.lastIndexOf(operation);

        second = Number(txtField.value.slice(operatorIndex + 1));

        // Don't calculate an empty second number
        if (txtField.value.slice(operatorIndex + 1) === '') return;

        if (operation === '+') {
          txtField.value = first + second;
        } else if (operation === '-') {
          txtField.value = first - second;
        } else if (operation === 'x') {
          txtField.value = first * second;
        } else {
          if (second === 0) {
            txtField.value = 'Error';
            operation = undefined;
            return;
          }

          txtField.value = first / second;
        }

        operation = undefined;
        justCalculated = true;

        // BACKSPACE
      } else {
        if (txtField.value === 'Error') {
          txtField.value = '';
          operation = undefined;
          justCalculated = false;
          return;
        }

        txtField.value = txtField.value.slice(0, -1);

        // If  removed the operator, forget it
        if (!/[+\-x÷]/.test(txtField.value)) {
          operation = undefined;
        }
      }

      return;
    }

    // NUMBER BUTTONS
    if (txtField.value === 'Error' || justCalculated) {
      txtField.value = '';
      operation = undefined;
      justCalculated = false;
    }

    txtField.value += btn.textContent;
  });
});
