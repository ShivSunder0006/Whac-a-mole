const square = document.querySelectorAll('.square')
const mole = document.querySelector('.mole')

const timeLeft = document.querySelector('#time')
let score = document.querySelector('#score')
let startGame = document.querySelector('#start')
let stopGame = document.querySelector('#stop')
let resetGame = document.querySelector('#reset')
let getScore = document.querySelector('#prev-score')
let clearScore = document.querySelector('#clear-score')
const scoreFromLocalStorage = JSON.parse( localStorage.getItem("myScore") )

let result = 0
let hitPosition
let currentTime = 60
let timerId = null
let countDownTimerId = null
let myScore = [10,23,42]


function renderScore(score){
    let listItems = ""
    for (let i = 0; i < score.length; i++) {
        listItems += `
            <li>
                <a target='_blank' href='${score[i]}'>
                    ${score[i]}
                </a>
            </li>
        `
    }
    ulEl.innerHTML = listItems
}

// console.log(myScore)

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
    timerId = setInterval(randomSquare , 700)
}


function countDown() {
    currentTime--
    timeLeft.textContent = currentTime
   
    if (currentTime == 0) {
      clearInterval(countDownTimerId)
      clearInterval(timerId)
      alert('GAME OVER! Your final score is ' + result)
        // myScore.push(result)
        // localStorage.setItem("myScore", JSON.stringify(myScore) )
    }
   }

function startTimer(){
    countDownTimerId = setInterval(countDown ,700)
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

// getScore.addEventListener('click', ()=>{
//     if(scoreFromLocalStorage){
//         myScore = scoreFromLocalStorage
//         renderScore(myScore)
//     }
// })

// clearScore.addEventListener('click', ()=>{
//     localStorage.clear()
//     myScore = []
//     renderScore(myScore)
// })
