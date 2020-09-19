const pressedKey = document.querySelector('#pressedKey');
const randKeyContainer = document.querySelector('#randKeyContainer');
const letters = 'ABCDEFGHIGKLMNOPQRSTUVWXYZ'
let letter = ''

document.addEventListener('keydown', event => {
    pressedKey.innerText = `"${event.key}" key pressed`;
    if (event.key === letter.toLowerCase()) {
        putLetter();
        removeAndAddClass(pressedKey,'bg-danger', 'bg-success');
    } else {
        removeAndAddClass(pressedKey,'bg-success', 'bg-danger');
    }
})

function putLetter() {
    let rand = Math.floor(Math.random() * (letters.length - 1))
    letter = letters[rand];
    randKeyContainer.innerText = `Press "${letter}" key`;
}

function removeAndAddClass(element, classRemove, classAdd) {
    element.classList.remove(classRemove);
    element.classList.add(classAdd);
}

putLetter();