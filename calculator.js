'use strict';

document.querySelector('.name').textContent = 'Calculator';
const buttons = document.querySelector('.buttons');
const txtField = document.querySelector('.input')
const operators = ['+', '-', 'x', '÷']
const funcKeys = ['⌫','=']
const btnNums = new Array(10).fill();
let first,second,operation


function addOperator(pos,op){
  buttons.insertAdjacentHTML(pos, `<button class="operator">${op}</button>`);
}

function addFuncKey(pos,op){
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
    if(btn.classList.contains('operator')){
      first = Number(txtField.value.split(btn.textContent[0]))
      operation = btn.textContent
      txtField.value += operation
    } else if(btn.classList.contains('key')){
      if(btn.textContent === '='){
        second = Number(txtField.value.split(operation)[1])
        if(operation === '+'){
          txtField.value = first + second
        } else if(operation === '-'){
          txtField.value = first - second
        } else if(operation === 'x'){
          txtField.value = first * second
        } else txtField.value = first / second
      }else txtField.value = txtField.value.slice(0,-1)
    } else txtField.value += btn.textContent
  });
});