const digits = document.querySelector('.digits');
const answers = document.querySelectorAll('.answer');
const answersWrapper = document.querySelector('.answers');

let min = 0;
let max = 10;
let x;
let y;
let sign;
const signs = ['+', '-'];

let generate = {
    randInt: function (minNum, maxMun) {
        let rand = minNum + Math.random() * (maxMun + 1 - minNum);
        return Math.floor(rand);
    },

    exercise: function () {
        x = this.randInt(min, max);
        y = this.randInt(min, max);
        sign = signs[this.randInt(0, signs.length - 1)];

        if (x < y) {
            [x, y] = [y, x]
        }

        return `<span class="digit">${x}</span><span class="digit">${sign}</span><span class="digit">${y}</span>`;
    },

    answers: function () {
        answers.forEach(answer => {
            answer.innerHTML = generate.randInt(y - y, x + x);
        })
    }
}

function putRightAnswer() {
    let res = sign === '+' ? x + y : x - y;
    answers[generate.randInt(0, 3)].innerHTML = res;
}

function addAndRemoveClass(element, className, timeout) {
    element.classList.add(className);
    setTimeout(() => {
        element.classList.remove(className);
    }, timeout)
}


digits.innerHTML = generate.exercise();
generate.answers();
putRightAnswer();

answers.forEach(answer => {
    answer.addEventListener('click', () => {
        let res = sign === '+' ? x + y : x - y;
        if (+answer.innerHTML === res){
            digits.innerHTML = generate.exercise();
            generate.answers();
            putRightAnswer();
            addAndRemoveClass(digits, 'pop', 500)
        } else {
            addAndRemoveClass(digits, 'shake', 500);
            addAndRemoveClass(answersWrapper, 'shake', 500);
            window.navigator.vibrate(200);
        }


    })
})