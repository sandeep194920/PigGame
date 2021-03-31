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
// const activePlayerEl = document.querySelector('.player--active');
// player--active
score1El.textContent = 0
score2El.textContent = 0
const scores = [0, 0]
let currentScore = 0
let activePlayer = 0
let playing = true

const switchPlayer = () => {
    document.getElementById(`current--${activePlayer}`).textContent = 0
    activePlayer = activePlayer === 0 ? 1 : 0
    currentScore = 0
    player0El.classList.toggle('player--active')
    player1El.classList.toggle('player--active')
}

diceEl.classList.add('hidden')

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
        // document.querySelector(`.player--${activePlayer}`).classList.add('player--active')
    } else {
        //switch player

        switchPlayer()
    }

})

btnHoldEl.addEventListener('click', function () {
    if (!playing) return
    scores[activePlayer] += currentScore
    document.getElementById(`score--${activePlayer}`).textContent = scores[activePlayer]


    if (scores[activePlayer] >= 10) {
        playing = false
        diceEl.classList.add('hidden')
        document.querySelector(`.player--${activePlayer}`).classList.add('player--winner')
        document.querySelector(`.player--${activePlayer}`).classList.remove('player--active')
    } else {
        switchPlayer()
    }

})