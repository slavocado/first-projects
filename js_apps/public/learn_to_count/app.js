const minNumberInput = document.querySelector('#min-number');
const maxNumberInput = document.querySelector('#max-number');
const settings = document.querySelector('#settings');
const exercise = document.querySelector('#exercise');
const answer = document.querySelector('#answer');
const text = document.querySelector('#text');

let x = 0;
let y = 0;
let sign = '';
let min = 0;
let max = 0;
const signs = ['+','-'];

function beginGame(qualifiedName, value) {
    settings.style.display = 'none';
    exercise.style.display = 'flex';
    min = parseInt(minNumberInput.value);
    max = parseInt(maxNumberInput.value);
    pushToExercise();
}

function stopGame(){
    settings.style.display = '';
    exercise.style.display = 'none';
}

function checkAnswer() {
    if (sign === '+'){
        if (parseInt(answer.value) === x + y){
            answer.style.borderColor = 'hsl(171, 100%, 41%)';
            pushToExercise();
            answer.value = ''
        } else {
            answer.style.borderColor = 'hsl(348, 100%, 61%)';
        }
    } else {
        if (parseInt(answer.value) === x - y){
            answer.style.borderColor = 'hsl(171, 100%, 41%)';
            pushToExercise();
            answer.value = ''
        } else {
            answer.style.borderColor = 'hsl(348, 100%, 61%)';
        }
    }


}

function randInt(minNum, maxMun) {
    let rand = minNum + Math.random() * (maxMun + 1 - minNum);
    return Math.floor(rand);
}

function pushToExercise() {
    x = randInt(min, max);
    y = randInt(min, max);
    sign = signs[randInt(0, signs.length - 1)];

    if (x < y){
        [x, y] = [y, x]
    }

    text.innerText = `${x} ${sign} ${y} =`
}