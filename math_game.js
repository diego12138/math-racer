function getRandomNumber(){
    return Math.floor(Math.random() * 99) + 2;
}

function generateTwoDifferentNumbers(){
    let num1 = getRandomNumber();
    let num2 = getRandomNumber();

    while(num1 === num2){
        num2 = getRandomNumber();
    }

    return [num1, num2];
}

function displayNumbers(){
    const [number1,number2] = generateTwoDifferentNumbers();
    document.getElementById("number1").textContent = number1;
    document.getElementById("number2").textContent = number2;
}


function generateOperator(){
    let operators = ['+', '-', '*', '/'];
    return operators[Math.floor(Math.random() * operators.length)];
}

function displayOperator(){
    const operator = generateOperator();
    document.getElementById("operator").textContent = operator;
}

window.onload = function(){
    displayOperator();
    displayNumbers();
}