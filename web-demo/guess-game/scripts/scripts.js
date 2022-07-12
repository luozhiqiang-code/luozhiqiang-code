let randomNumber = Math.floor(Math.random()*100)+1;

const guesses = document.querySelector('.guesses');
const lastResult = document.querySelector('.lastResult');
const lowOrHi = document.querySelector('.lowOrHi');

const guessSubmit = document.querySelector('.guessSubmit');
const guessField = document.querySelector('.guessField');

let guessCount = 1;
let resetButtom;

function checkGuess(){
    let userGuess = Number(guessField.value);
    if(guessCount===1){
      guesses.textContent = 'last guess number:';
    }
    guesses.textContent += userGuess + ' ';

    if(userGuess === randomNumber){
        lastResult.textContent = 'congratulation';
        lastResult.style.backgroundColor = 'green';
        lowOrHi.textContent='';
        setGameOver();
    }else if(guessCount===10){
        lastResult.textContent = '!!game over!!';
        setGameOver();
    }else{
        lastResult.textContent = 'you are wrong!';
        lastResult.style.backgroundColor = 'red';
        if(userGuess < randomNumber){
            lowOrHi.textContent = 'your number is smaller than ours';
        }else{
            lowOrHi.textContent = 'your number is bigger than ours';
        }
    }
  guessCount++;
  guessField.value = '';
  guessField.focus();
}

guessSubmit.addEventListener('click',checkGuess);

function setGameOver(){
    guessField.disabled = true;
    guessSubmit.disabled  = true;
    resetButtom = document.createElement('button');
    resetButtom.textContent = 'start new game';
    document.body.appendChild(resetButtom);
    resetButtom.addEventListener('click',resetGame);
}

function resetGame(){
    guessCount = 1;
    const resetParas = document.querySelectorAll('.resultParas p');
    for(let i = 0;i < resetParas.length; i++){
          resetParas[i].textContent = '';
    }

    resetButtom.parentNode.removeChild(resetButtom);

    guessField.disabled = false;
    guessField.disabled = false;
    guessField.value = '';
    guessField.focus();

    lastResult.style.backgroundColor = 'white';
    randomNumber = Math.floor(Math.random()*100)+1;

}