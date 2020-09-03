const topInput = document.getElementById('top-input');
const rightInput = document.getElementById('right-input');
const bottomInput = document.getElementById('bottom-input');
const leftInput = document.getElementById('left-input');
const borderChanger = document.querySelector('.border-changer')

let topVal = topInput.value;
let rightVal = rightInput.value;
let bottomVal = bottomInput.value;
let leftVal = leftInput.value;

changeBorder()

topInput.addEventListener('input', e => {
    topVal = e.target.value;
    console.log('top val ' + topVal)
    changeBorder()
})

rightInput.addEventListener('input', e => {
    rightVal = e.target.value;
    console.log('right val ' + rightVal)
    changeBorder()
})

bottomInput.addEventListener('input', e => {
    bottomVal = e.target.value;
    console.log('bottom val ' + bottomVal)
    changeBorder()
})

leftInput.addEventListener('input', e => {
    leftVal = e.target.value;
    console.log('left val ' + leftVal)
    changeBorder()
})

function changeBorder() {
    borderChanger.style.borderRadius = `${topVal}% ${100-topVal}%
    ${100-bottomVal}% ${bottomVal}% /
    ${leftVal}% ${100-rightVal}%
    ${rightVal}% ${100-leftVal}%`;

    console.log(`${topVal}% ${100-topVal}%
    ${100-bottomVal}% ${bottomVal}% /
    ${leftVal}% ${100-rightVal}%
    ${rightVal}% ${100-leftVal}%`)
}