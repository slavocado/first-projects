const frame = document.querySelector('.frame');
const line = document.querySelector('.line');
const heading = document.querySelector('.heading');
const stats = document.querySelector('.end-screen');
const restart = document.querySelector('.restart');
const loader = document.querySelector('#loader')
let text = 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam animi distinctio dolor doloribus ex exercitationem harum hic id ipsam magni maiores officia, placeat';
let step = 0;

let lineMehods = {
    // fills line with letters from text
    fill: function (text) {
        for (let index = 0; index < text.length; index++) {
            line.innerHTML += `<div class="letter">${text[index]}</div>`
        }
    },
    clear: function () {
        line.innerHTML = '';
    },
    // move all line block to the left
    move: function (steps) {
        line.style.left = `calc(50% - ${4 * steps}rem)`;
    }
}

let stopWatch = {
    seconds: 0,
    minutes: 0,
    isWorking: false,
    interval: null, //variable for setInterval
    // function which counts seconds and minutes
    start: function () {
        this.interval = setInterval(() => {
            this.seconds++

            if (this.seconds === 60) {
                this.seconds = 0;
                this.minutes++;
            }
        }, 1000)
    },
    stop: function () {
        clearInterval(this.interval);
        this.isWorking = false;
    }
}

let statistics = {
    timeElement: document.querySelector('#time'),
    accuracyElement: document.querySelector('#accuracy'),
    speedElement: document.querySelector('#speed'),
    typos: 0,
    calculateAccuracy: function (totalLetters) {
        return Math.floor(100 - (this.typos / totalLetters * 100)); // in percents
    },
    wordsInText: 0,
    calculateSpeed: function () {
        let seconds = stopWatch.minutes * 60 + stopWatch.seconds;
        return Math.floor(this.wordsInText / seconds * 60);
    }
}

function addAndRemoveClass(element, className, timeout) {
    element.classList.add(className);
    setTimeout(() => {
        element.classList.remove(className);
    }, timeout)
}

async function getRandomQuote() {
    const api_url = 'https://quote-garden.herokuapp.com/api/v2/quotes/random';
    const response = await fetch(api_url);
    return await response.json();
}

getRandomQuote().then(r => {
    text = r.quote.quoteText;
    lineMehods.fill(text);
    loader.style.display = 'none';
    heading.innerText = 'Start typing'
});


function prepareForNewRound() {
    step = 0;
    lineMehods.clear();
    getRandomQuote().then(r => {
        text = r.quote.quoteText;
        lineMehods.fill(text);
    });
    heading.innerText = 'Start typing';
    lineMehods.move(0);
    frame.style.borderColor = '#000';
    stats.classList.remove('end-screen-down');
}

document.addEventListener('keydown', event => {
    let key = event.key;

    //Check if user begin typing
    if (step === 0) {
        heading.style.opacity = 0;

        if (!stopWatch.isWorking) {
            stopWatch.isWorking = true;
            stopWatch.start();
        }
    }

    // Check if user ended typing
    if (step === text.length - 1) {
        heading.style.opacity = 1;
        heading.innerText = 'Good work!🎈🎉✨';
        stopWatch.stop();
        statistics.timeElement.innerText = `${stopWatch.minutes} min ${stopWatch.seconds} sec`;
        statistics.accuracyElement.innerText = statistics.calculateAccuracy(text.length) + '%';
        statistics.wordsInText = text.match(/(\w+)/g).length;
        statistics.speedElement.innerText = statistics.calculateSpeed()+ ' wpm';
        setTimeout(() => {
            stats.classList.add('end-screen-down');
        }, 1000);
    }

    if (key === text.charAt(step)) {
        // if right key pressed
        step++;
        lineMehods.move(step);
        frame.style.borderColor = '#53aa5d';
        addAndRemoveClass(frame, 'pop', 50)
    } else if (!event.shiftKey) {
        // if wrong key pressed
        frame.style.borderColor = '#e86666';
        addAndRemoveClass(frame, 'shake', 500);
        statistics.typos++;
    }
})