let display = document.getElementById('display');
let numbers = document.querySelectorAll('.numbers');
let operators = document.querySelectorAll('.operators');
let result = document.getElementById('ig');
let clearDisplay = document.getElementById('clearDisplay');
let Display = false;
let clear = document.getElementById('clear')
let erro = document.getElementById('erro')

for (var nb = 0; nb < numbers.length; nb++) {
    numbers[nb].addEventListener("click", function (e) {

        var stringAtual = display.innerHTML;
        var lastChar = stringAtual[stringAtual.length - 1];

        if (Display === false) {
            display.innerHTML += e.target.innerHTML;
        } else if (Display === true && lastChar === "+" || lastChar === "-" || 
        lastChar === "*" || lastChar === "÷") {

            Display = false;
            display.innerHTML += e.target.innerHTML;
        }else {

            Display = false;
            display.innerHTML = "";
            display.innerHTML += e.target.innerHTML;
        }

    });
}

for (var op = 0; op < operators.length; op++) {
    operators[op].addEventListener("click", function (e) {

        var stringAtual = display.innerHTML;
        var lastChar = stringAtual[stringAtual.length - 1];
        if (lastChar === "+" ||lastChar === "." || lastChar === "-" || lastChar === "*" || lastChar === "÷") {
            var novaString = stringAtual.substring(0, stringAtual.length - 1) + e.target.innerHTML;
            display.innerHTML = novaString;
        } else if (stringAtual.length == 0) {
            erro.innerHTML=("Coloque um número primeiro");
            setTimeout(()=>{
                erro.innerHTML="";
            }, 2000);
            return
        }else {
            display.innerHTML += e.target.innerHTML;
        }

    });
}


result.addEventListener("click", function () {

    var Calculo = display.innerHTML;

    var numbers = Calculo.split(/\+|\-|\*|\÷/g);

    var operators = Calculo.replace(/[0-9]|\./g, "").split("");

    var divisao = operators.indexOf("÷");
    while (divisao != -1) {
        numbers.splice(divisao, 2, numbers[divisao] / numbers[divisao + 1]);
        operators.splice(divisao, 1);
        divisao = operators.indexOf("÷");
    }

    var multiplicacao = operators.indexOf("*");
    while (multiplicacao != -1) {
        numbers.splice(multiplicacao, 2, numbers[multiplicacao] * numbers[multiplicacao + 1]);
        operators.splice(multiplicacao, 1);
        multiplicacao = operators.indexOf("*");
    }

    var subtracao = operators.indexOf("-");
    while (subtracao != -1) {
        numbers.splice(subtracao, 2, numbers[subtracao] - numbers[subtracao + 1]);
        operators.splice(subtracao, 1);
        subtracao = operators.indexOf("-");
    }

    var adicao = operators.indexOf("+");
    while (adicao != -1) {
        numbers.splice(adicao, 2, parseFloat(numbers[adicao]) + parseFloat(numbers[adicao + 1]));
        operators.splice(adicao, 1);
        adicao = operators.indexOf("+");
    }

    display.innerHTML = numbers[0];

    Display = true;
    alert(`RESULTADO: ${Calculo} = ${display.innerHTML}`)
});

clearDisplay.addEventListener("click", function () {
    display.innerHTML = "";
})

clear.addEventListener("click", function(){
   display.innerHTML= display.innerHTML.toString().slice(0, -1);
})