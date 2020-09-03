const topInput = document.getElementById('top-input');
const rightInput = document.getElementById('right-input');
const bottomInput = document.getElementById('bottom-input');
const leftInput = document.getElementById('left-input');
const borderChanger = document.querySelector('.border-changer')
const propertyShower = document.getElementById('property-shower')

let topVal = topInput.value;
let rightVal = rightInput.value;
let bottomVal = bottomInput.value;
let leftVal = leftInput.value;

changeBorder()

topInput.addEventListener('input', e => {
    topVal = e.target.value;
    changeBorder()
})

rightInput.addEventListener('input', e => {
    rightVal = e.target.value;
    changeBorder()
})

bottomInput.addEventListener('input', e => {
    bottomVal = e.target.value;
    changeBorder()
})

leftInput.addEventListener('input', e => {
    leftVal = e.target.value;
    changeBorder()
})

function changeBorder() {
    let borderRad = `${topVal}% ${100-topVal}% ${100-bottomVal}% ${bottomVal}% / ${leftVal}% ${100-rightVal}% ${rightVal}% ${100-leftVal}%`

    borderChanger.style.borderRadius = borderRad;
    propertyShower.innerText = borderRad;
}

function copyProp() {
    navigator.clipboard.writeText(propertyShower.innerText).then(() => {
        alert("Copied text: " + propertyShower.innerText);
    })
        .catch(err => {
            console.log('Something went wrong ', err);
        });
}