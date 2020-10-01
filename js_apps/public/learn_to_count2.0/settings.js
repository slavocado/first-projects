const settings = document.querySelector('.settings');
const settingNumberMin = document.querySelector('#setting-number-min');
const settingNumberMax = document.querySelector('#setting-number-max');
const minNumber = document.querySelector('#min');
const maxNumber = document.querySelector('#max');

let min = +minNumber.value;
let max = +maxNumber.value;

minNumber.addEventListener('input', (e)=>{
    settingNumberMin.innerHTML = minNumber.value;
    min = +minNumber.value;
})

maxNumber.addEventListener('input', (e)=>{
    settingNumberMax.innerHTML = maxNumber.value;
    max = +maxNumber.value;
})
