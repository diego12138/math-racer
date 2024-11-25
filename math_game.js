let operators = ["+", "-", "*"];
const startBtn = document.getElementById("start-btn");
const question = document.getElementById("question");
const controls = document.querySelector(".controls-container");
const result = document.getElementById("result");
const errorMessage = document.getElementById("error-msg");
const timerDisplay = document.getElementById("timer");
const scoreDisplay = document.getElementById("score");
let answerValue;
let counter= 0;
let countdown;
let timeLeft = 120;
let score = 0;

const randomValue = (min, max) => Math.floor(Math.random() * (max - min)) + min;
const questionGenerator = () => {
  let [num1, num2] = [randomValue(1, 20), randomValue(1, 20)];
  let randomOperator = operators[Math.floor(Math.random() * operators.length)];
  if (randomOperator == "-" && num2 > num1) {
    [num1, num2] = [num2, num1];
  }
  let solution = eval(`${num1}${randomOperator}${num2}`);
  let randomVar = randomValue(1, 5);
  if (randomVar == 1) {
    answerValue = num1;
    question.innerHTML = `<input type="number" id="inputValue" placeholder="?"\> ${randomOperator} ${num2} = ${solution}`;
  } else if (randomVar == 2) {
    answerValue = num2;
    question.innerHTML = `${num1} ${randomOperator}<input type="number" id="inputValue" placeholder="?"\> = ${solution}`;
  } else {
    answerValue = solution;
    question.innerHTML = `${num1} ${randomOperator} ${num2} = <input type="number" id="inputValue" placeholder="?"\>`;
  }
   const inputValue = document.getElementById("inputValue");
   inputValue.addEventListener("input", checkAnswer);
   inputValue.focus();
};

const startTimer =() => {
  timer = setInterval(() => {
    if (timeLeft <=0){
      clearInterval(timer);
      endGame();
    }
    else{
      timeLeft--;
      timerDisplay.textContent = `Time: ${timeLeft}`;
    }
  }, 1000);
}

const checkAnswer = (event) => {
  const userAnswer = event.target.value;
  if (userAnswer == answerValue) {
    score++;
    scoreDisplay.textContent = `Score: ${score}`;
    questionGenerator();
  }
};

startBtn.addEventListener("click", () => {
  answerValue = "";
  errorMessage.innerHTML = "";
  errorMessage.classList.add("hide");
  controls.classList.add("hide");
  startBtn.classList.add("hide");
  timeLeft = 120;
  startTimer(); 
  questionGenerator();
});

const endGame = () => {
  question.innerHTML = `Game over! Your score is ${score}.`;
  errorMessage.classList.remove("hide");
  errorMessage.innerHTML = "Time's up!";
  clearInterval(timer);
  
};

