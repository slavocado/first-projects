const frame = document.querySelector('.frame');
const line = document.querySelector('.line');
const text = 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam animi distinctio dolor doloribus ex exercitationem harum hic id ipsam magni maiores officia, placeat';
let step = 0;

document.addEventListener('keydown', event => {
    let key = event.key;

    if (key === text.charAt(step)){
        // if right key pressed
        step++;
        moveLine();
        frame.style.borderColor = '#53aa5d';
        addAndRemoveClass(frame, 'pop', 50)
    } else if (!event.shiftKey){
        // if wrong key pressed
        frame.style.borderColor = '#e86666';
        addAndRemoveClass(frame, 'shake', 500)
    }
})

function fillLine(text) {
    for (let index = 0; index < text.length; index++) {
        line.innerHTML += `<div class="letter">${text[index]}</div>`
    }
}

function moveLine(){
    line.style.left = `calc(50% - ${4 * step}rem)`;
}

function addAndRemoveClass(element, className, timeout){
    element.classList.add(className);
    setTimeout(()=>{
        element.classList.remove(className);
    }, timeout)
}

fillLine(text)