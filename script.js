'use strict';

// selecting elements
const player0El = document.querySelector('.player--0')
const player1El = document.querySelector('.player--1')
const score1El = document.getElementById('score--0')
const score2El = document.getElementById('score--1')
const current0El = document.getElementById('current--0')
const current1El = document.getElementById('current--1')
const diceEl = document.querySelector('.dice')
const btnNewEl = document.querySelector('.btn--new')
const btnRollEl = document.querySelector('.btn--roll')
const btnHoldEl = document.querySelector('.btn--hold')

let scores, currentScore, activePlayer, playing;

function gameInit() {
    scores = [0, 0]
    currentScore = 0
    activePlayer = 0
    playing = true
    score1El.textContent = 0
    score2El.textContent = 0
    diceEl.classList.add('hidden')
    current0El.textContent = 0
    current1El.textContent = 0
    player0El.classList.add('player--active')
    player1El.classList.remove('player--active')
    player0El.classList.remove('player--winner')
    player1El.classList.remove('player--winner')
}
// initialize game at the beginning
gameInit()

const switchPlayer = () => {
    document.getElementById(`current--${activePlayer}`).textContent = 0
    activePlayer = activePlayer === 0 ? 1 : 0
    currentScore = 0
    player0El.classList.toggle('player--active')
    player1El.classList.toggle('player--active')
}


btnRollEl.addEventListener('click', function () {
    if (!playing) return
    // generating random dice roll
    const dice = Math.trunc(Math.random() * 6) + 1
    diceEl.classList.remove('hidden')

    // display dice
    diceEl.src = `dice-${dice}.png`

    if (dice !== 1) {
        currentScore += dice
        document.getElementById(`current--${activePlayer}`).textContent = currentScore
    } else {
        switchPlayer()
    }

})

btnHoldEl.addEventListener('click', function () {
    if (!playing) return
    scores[activePlayer] += currentScore
    document.getElementById(`score--${activePlayer}`).textContent = scores[activePlayer]


    if (scores[activePlayer] >= 100) {
        playing = false
        diceEl.classList.add('hidden')
        document.querySelector(`.player--${activePlayer}`).classList.add('player--winner')
        document.querySelector(`.player--${activePlayer}`).classList.remove('player--active')
    } else {
        switchPlayer()
    }

})


btnNewEl.addEventListener('click', function () {
    // reinitialize game when "New Game" button is clicked
    gameInit()
})