let operators = ["+", "-", "*"];
const startBtn = document.getElementById("start-btn");
const question = document.getElementById("question");
const controls = document.querySelector(".controls-container");
const result = document.getElementById("result");
const errorMessage = document.getElementById("error-msg");
let answerValue;
let operatorQuestion;
let counter= 0;


//Random Value Generator
const randomValue = (min, max) => Math.floor(Math.random() * (max - min)) + min;
const questionGenerator = () => {
  //Two random values between 1 and 20
  let [num1, num2] = [randomValue(1, 20), randomValue(1, 20)];
  //For getting random operator
  let randomOperator = operators[Math.floor(Math.random() * operators.length)];
  if (randomOperator == "-" && num2 > num1) {
    [num1, num2] = [num2, num1];
  }
  //Solve equation
  let solution = eval(`${num1}${randomOperator}${num2}`);
  //For placing the input at random position
  //(1 for num1, 2 for num2, 3 for operator, anything else(4) for solution)
  let randomVar = randomValue(1, 5);
  if (randomVar == 1) {
    answerValue = num1;
    question.innerHTML = `<input type="number" id="inputValue" placeholder="?"\> ${randomOperator} ${num2} = ${solution}`;
  } else if (randomVar == 2) {
    answerValue = num2;
    question.innerHTML = `${num1} ${randomOperator}<input type="number" id="inputValue" placeholder="?"\> = ${solution}`;
  } else if (randomVar == 3) {
    answerValue = randomOperator;
    operatorQuestion = true;
    question.innerHTML = `${num1} <input type="text" id="inputValue" placeholder="?"\> ${num2} = ${solution}`;
  } else {
    answerValue = solution;
    question.innerHTML = `${num1} ${randomOperator} ${num2} = <input type="number" id="inputValue" placeholder="?"\>`;
  }

   // Add event listener to the input field
   const inputValue = document.getElementById("inputValue");
   inputValue.addEventListener("input", checkAnswer);
};

const checkAnswer = (event) => {
    const userAnswer = event.target.value;
    if (userAnswer == answerValue) {
      questionGenerator();
    }
};


//Start Game
startBtn.addEventListener("click", () => {
  operatorQuestion = false;
  answerValue = "";
  errorMessage.innerHTML = "";
  errorMessage.classList.add("hide");
  //Controls and buttons visibility
  controls.classList.add("hide");
  startBtn.classList.add("hide");
  questionGenerator();
});
//Stop Game
const stopGame = (resultText) => {
  result.innerHTML = resultText;
  startBtn.innerText = "Restart";
  controls.classList.remove("hide");
  startBtn.classList.remove("hide");
};