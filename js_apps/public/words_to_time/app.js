const text = document.querySelector('#text');
const result = document.querySelector('.result');
const wordsOutput = document.querySelector('.words');


text.addEventListener('input', () => {
    let words = 1;
    for (let letter of text.value) {
        if (letter === ' ') {
            words++;
        }
    }

    let seconds = Math.floor(words / 2);
    let minutes = 0;

    if (seconds > 59) {
        minutes = (seconds - (seconds % 60)) / 60;
        seconds = seconds - minutes * 60;
        result.innerText = `${minutes} min ${seconds} sec`;
    } else {
        result.innerText = `${seconds} sec`;
    }

    wordsOutput.innerText = words;
})