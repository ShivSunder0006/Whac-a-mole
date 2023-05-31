const square = document.querySelectorAll('.square')
const mole = document.querySelector('.mole')

const timeLeft = document.querySelector('#time')
let score = document.querySelector('#score')
let startGame = document.querySelector('#start')
let stopGame = document.querySelector('#stop')
let resetGame = document.querySelector('#reset')

let result = 0
let hitPosition
let currentTime = 60
let timerId = null
let countDownTimerId = null


function randomSquare() {
    square.forEach(square =>{
        square.classList.remove('mole')
    })

    let randomPosition = square[Math.floor(Math.random()*9)]
    randomPosition.classList.add('mole')

    hitPosition = randomPosition.id
}


square.forEach(square => {
    square.addEventListener('mousedown' , ()=> {
        if(square.id == hitPosition){
            result++
            score.textContent = result
            hitPosition = null
        }
    })
})

startGame.addEventListener('click' , moveMole)

function moveMole() {
    timerId = setInterval(randomSquare , 1000)
}


// moveMole()

// function countDown(){
//     currentTime--
//     timeLeft.innerHTML = currentTime

//     if(currentTime == 0){
//         clearInterval(countDownTimerId)
//         alert("Game Over. Your Final score is " + result)
//     }
// }

function countDown() {
    currentTime--
    timeLeft.textContent = currentTime
   
    if (currentTime == 0) {
      clearInterval(countDownTimerId)
      clearInterval(timerId)
      alert('GAME OVER! Your final score is ' + result)
    }
   
   }


function startTimer(){
    countDownTimerId = setInterval(countDown ,1000)
} 

startGame.addEventListener('click' , startTimer)


stopGame.addEventListener('click' , ()=>{
    clearInterval(countDownTimerId)
    clearInterval(timerId)
})

resetGame.addEventListener('click' , ()=>{
    result = 0
    hitPosition=null
    currentTime = 60
    timerId = null
    countDownTimerId = null
    score.textContent = result
    timeLeft.textContent = currentTime
    square.forEach(square =>{
        square.classList.remove('mole')
    })
}) 