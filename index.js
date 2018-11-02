//Declerations
const calculator = document.querySelector('.calculator');
const screen = document.querySelector('.screen');
let input = 0;
let previousNum = 0;
let inBetweenNum = 0;
let currentNum = 0;
let runningTotal = 0;
let modifier = '';
let output = 0;
let start = false;
let mod = false;

//Click event on calc
calculator.addEventListener('click', (evt) => {
  let buttonValue = evt.target.value;

  //Number clicks
  if (evt.target.classList.contains('num')) {
    mod = false;
    if (!isNaN(input) && input != 0) {
      inBetweenNum = currentNum;
      currentNum = currentNum + buttonValue;
    } else {
      currentNum = buttonValue;
    }

    input = currentNum;
  }

  // + - / x = clicks
  else if (evt.target.classList.contains('modifier') || evt.target.id == 'equals') {
    mod = true;
    if (modifier != '') {
      modify(previousNum);
    }
    previousNum = currentNum;
    currentNum = 0;
    modifier = buttonValue;
    input = buttonValue;
  }

  //Clear calc
  else if (evt.target.id == 'C') {
    input = 0;
    previousNum = 0;
    currentNum = 0;
    runningTotal = 0;
    modifier = '';
    output = 0;
    start = false;
  }

  //Delete last number entry
  else if (evt.target.id == 'delete' && mod == false) {
    currentNum = inBetweenNum;
    input = currentNum;
  }

  //Add decimal point
  else if (evt.target.id == 'decimal' && input % 1 == 0) {
    currentNum = currentNum + '.';
    input = currentNum;
  }

  //Make positive or negative
  else if (evt.target.id == 'plusOrMinus') {
    currentNum = -currentNum;
    input = currentNum;
  }

  //Display total on eual press
  if (evt.target.id == 'equals') {
    screen.innerText = runningTotal;
  } else {
    screen.innerText = input;
  }
});

//Do math functions
function modify(prev) {
  if (start) {
    prev = runningTotal;
  }
  switch (modifier) {
    case '+':
      runningTotal = Number(prev) + Number(currentNum);
      break;
    case '-':
      runningTotal = Number(prev) - Number(currentNum);
      break;
    case '÷':
      runningTotal = Number(prev) / Number(currentNum);
      break;
    case 'x':
      runningTotal = Number(prev) * Number(currentNum);
      break;
  }
  start = true;
}
