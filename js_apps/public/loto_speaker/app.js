const container = document.querySelector('.number');
const speedInput = document.querySelector('#speed-input');
const speedInputLabel = document.querySelector('#speed-input-label');

const fromNumber = 1;
const toNumber = 90;
const numberNames = [
    {number: 1, name: 'кол'},
    {number: 2, name: 'пара'},
    {number: 3, name: 'троица'},
    {number: 10, name: 'часовой'},
    {number: 11, name: 'барабанные палочки'},
    {number: 12, name: 'дюжина'},
    {number: 13, name: 'чертова дюжина'},
    {number: 18, name: 'в первый раз'},
    {number: 22, name: 'утята'},
    {number: 25, name: 'опять 25'},
    {number: 44, name: 'стульчики'},
    {number: 50, name: 'полста'},
    {number: 55, name: 'перчатки'},
    {number: 66, name: 'валенки'},
    {number: 69, name: 'туда сюда'},
    {number: 77, name: 'топорики'},
    {number: 80, name: 'бабушка'},
    {number: 88, name: 'калачики'},
    {number: 89, name: 'сосед дедушки'},
    {number: 90, name: 'дедушка'}
]


let delay = 2000

let arr = [];
for (let i = fromNumber; i <= toNumber; i++) {
    arr.push(i)
}

let interval;

speedInput.addEventListener('input', (e)=>{
    delay = e.target.value * 1000;
    speedInputLabel.innerText = `Скорость перебора цифр: ${e.target.value} cек`
})

// https://ru.wikipedia.org/wiki/%D0%A2%D0%B0%D1%81%D0%BE%D0%B2%D0%B0%D0%BD%D0%B8%D0%B5_%D0%A4%D0%B8%D1%88%D0%B5%D1%80%D0%B0_%E2%80%94_%D0%99%D0%B5%D1%82%D1%81%D0%B0
function shuffle(arr) {
    let j, temp;
    for (let i = arr.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        temp = arr[j];
        arr[j] = arr[i];
        arr[i] = temp;
    }
    return arr;
}

shuffle(arr)

function startGame() {
    let i = 0;
    container.innerText = 'Приготовились';
    interval = setInterval(() => {
        if (i < toNumber) {
            container.innerText = arr[i];

            let utterance;

            let numberName = numberNames.find(names => names.number === arr[i])
            if (numberName){
                let name = numberName.name;
                utterance = new SpeechSynthesisUtterance(name);
                utterance.rate = 1.2;
            } else {
                utterance = new SpeechSynthesisUtterance(arr[i]);
                utterance.rate = 1;
            }

            speechSynthesis.speak(utterance);
            i++
        } else {
            container.innerText = 'Игра завершилась';
            clearInterval(interval);
        }
    }, delay)
}

function stopGame() {
    clearInterval(interval);
    container.innerText = 'Игра завершилась';
}