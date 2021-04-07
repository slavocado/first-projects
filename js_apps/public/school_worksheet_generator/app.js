const numOfExercises = 10;
const numOfCols = 4

function generateAndPut(){
    const minNumber = parseInt(document.querySelector('#min-number').value);
    const maxNumber = parseInt(document.querySelector('#max-number').value);
    const isAddition = document.querySelector('#addition').checked;
    const isSubtraction = document.querySelector('#subtraction').checked;
    const isMultiplication = document.querySelector('#multiplication').checked;
    const signs = [];

    if (Number.isNaN(minNumber)){
        alert('Enter min number');
        return ;
    }
    if (Number.isNaN(maxNumber)){
        alert('Enter max number');
        return ;
    }

    // Add sign which must be in exercises
    if (isAddition){ signs.push('+') }
    if (isSubtraction){ signs.push('-') }
    if (isMultiplication){ signs.push('*') }
    if (signs.length === 0){
        alert('Enter one or more operations');
        return ;
    }

    for (let colNum = 1; colNum <= numOfCols; colNum++) {
        let column = document.querySelector(`.col-${colNum}`)
        let exercises = '';

        for (let i = 0; i < numOfExercises; i++) {
            const sign = randSign(signs);
            let firstRand = 0;
            let secondRand = 0;

            if (sign === '*'){
                firstRand = randInt(0, 10);
                secondRand = randInt(0, 10);
            } else {
                firstRand = randInt(minNumber,maxNumber);
                secondRand = randInt(minNumber,maxNumber);
                if (firstRand < secondRand){
                    [firstRand, secondRand] = [secondRand, firstRand]
                }
            }

            exercises +=
                `<div class="container is-size-3">
                    ${firstRand} ${sign} ${secondRand} =
                </div>`;
        }

        column.innerHTML = exercises;
    }
}

function randInt(min, max) {
    let rand = min + Math.random() * (max + 1 - min);
    return Math.floor(rand);
}

// Returns random sign from array
function randSign(signsArr){
    return signsArr[randInt(0, signsArr.length - 1)];
}
