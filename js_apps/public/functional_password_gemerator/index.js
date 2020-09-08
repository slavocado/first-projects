// DOM elements
const resultEl = document.getElementById('result');
const lengthEl = document.getElementById('length');
const uppercaseEl = document.getElementById('uppercase');
const lowercaseEl = document.getElementById('lovercase');
const numbersEl = document.getElementById('numbers');
const symbolsEl = document.getElementById('symbols');
const generateEl = document.getElementById('generate');
const clipboardEl = document.getElementById('clipboard');

const randomFunc = {
    lower: lower = getRandomLower,
    upper: upper = getRandomUpper,
    number: number = getRandomNumber,
    symbol: symbol = getRandomSymbol
};


// Generate event listener
generateEl.addEventListener('click', () => {
    const length = +lengthEl.value;
    const hasLower = lowercaseEl.checked;
    const hasUpper = uppercaseEl.checked;
    const hasNumber = numbersEl.checked;
    const hasSymbol = symbolsEl.checked;

    resultEl.value = generatePassword(
        hasUpper,
        hasLower,
        hasNumber,
        hasSymbol,
        length
    );
});

// Copy password to clipboard
clipboardEl.addEventListener('click', () => {
    if (!resultEl.value){
        alert('Nothing to copy');
        return;
    }
    resultEl.select();
    document.execCommand('copy');
    alert('Copied to clipboard')
})

// Generate password function
function generatePassword(upper, lower, number, symbol, length) {
    let generatedPassword = '';
    const typesCount = lower + upper + number + symbol;
    const typesArr = [{lower}, {upper}, {number}, {symbol}].filter(
        item => Object.values(item)[0]
    );

    if (typesCount === 0) {
        return 'Check out some checkboxes';
    }

    for (let i = 0; i < length; i += typesCount) {
        typesArr.forEach(type => {
            const funcName = Object.keys(type)[0];
            generatedPassword += randomFunc[funcName]();
        })
    }

    return generatedPassword.slice(0, length);
}

// Generator functions
function getRandomLower() {
    return String.fromCharCode(Math.floor(Math.random() * 26) + 97);
}

function getRandomUpper() {
    return String.fromCharCode(Math.floor(Math.random() * 26) + 65);
}

function getRandomNumber() {
    return String.fromCharCode(Math.floor(Math.random() * 10) + 48);
}

function getRandomSymbol() {
    const symbols = '!@#$%^&*(){}[]/'
    return symbols[Math.floor(Math.random() * symbols.length)];
}

