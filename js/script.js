//DOM elements
const gameboard = document.querySelector('#gameboard')
const currentScore = document.querySelector('#currentScore')
const start = document.querySelector('#start')
const modal = document.querySelector('#modal')
const loseModal = document.querySelector('#lose')
const finalScore = document.querySelector('#finalScore')
const playAgain = document.querySelector('#playAgain')
const healthBar = document.querySelector('#healthBar')

//global
let speed = 1000
let myTimeout = undefined
let health = 3
let i = 1
let score = 0

//Game board grid size
const gridSize = { x: 10, y: 2 }

//functions
const createCar = () => {
  const carDiv = document.createElement('div')
  carDiv.setAttribute('id', 'car')
  carDiv.style.gridRowStart = 9
  carDiv.style.gridColumnStart = 2
  carDiv.style.backgroundImage = "url('../image/red.png')"
  gameboard.appendChild(carDiv)
}
const createPothole = () => {
  const randY = Math.floor(Math.random() * 3) + 1

  const div = document.createElement('div')
  div.classList.add('pothole')
  div.style.gridColumnStart = randY
  div.style.gridRowStart = 0

  gameboard.appendChild(div)
}

const checkHealth = (health) => {
  if (health === 2) {
    healthBar.classList.add('thrid')
  } else if (health === 1) {
    healthBar.classList.add('one')
  }
}

const update = (num) => {
  if (num % 3 != 0) {
    createPothole()
  }
  if (gameOver()) {
    return
  } else {
    const potHole = document.querySelectorAll('.pothole')
    potHole.forEach((hole) => {
      if (hole.style.gridRowStart > 9) {
        hole.parentNode.removeChild(hole)
      } else if (hole.style.gridRowStart < 10) {
        hole.style.gridRowStart++
      }
    })
  }
}

const gameOver = () => {
  const poleHole = document.querySelectorAll('.pothole')
  poleHole.forEach((hole) => {
    const holeX = hole.style.gridColumnStart
    const holeY = hole.style.gridRowStart
    const carX = carPos.style.gridColumnStart
    const carY = carPos.style.gridRowStart

    if (carX === holeX && carY === holeY) {
      health--
      if (health === 2) {
        healthBar.classList.add('third')
      } else if (health === 1) {
        healthBar.classList.add('one')
      }
    }
    if (health <= 0) {
      healthBar.classList.add('dead')
      clearTimeout(myTimeout)
      speed = 1000000000
      loseModal.style.display = 'block'
      finalScore.innerText = currentScore.innerText
      return true
    }
  })
}

const clearPotHole = () => {
  const poleHole = document.querySelectorAll('.pothole')
  poleHole.forEach((hole) => {
    hole.parentNode.removeChild(hole)
  })
}
const resetGame = () => {
  currentScore.innerText = 0
  i = 0
  clearPotHole()
  healthBar.classList.remove('one')
  healthBar.classList.remove('third')
  healthBar.classList.remove('dead')
  health = 3
  loseModal.style.display = 'none'
  speed = 1000
}
/********************************************************************
 *
 *
 *
 */
createCar()

//////////////////////
const gameStart = (timestamp) => {
  currentScore.innerText = i

  speed > 400 ? (speed -= 10) : speed

  update(i)

  myTimeout = setTimeout(() => {
    requestAnimationFrame(gameStart)
  }, speed)
  i++
}

start.addEventListener('click', () => {
  gameStart()
  modal.style.display = 'none'
})
const carPos = document.querySelector('#car')
//controlling the car

window.addEventListener('keydown', (e) => {
  switch (e.key) {
    case 'ArrowUp':
      if (carPos.style.gridRowStart < 2) {
        break
      }
      carPos.style.gridRowStart--
      break
    case 'ArrowDown':
      if (carPos.style.gridRowStart > 8) {
        break
      }
      carPos.style.gridRowStart++
      break
    case 'ArrowLeft':
      if (carPos.style.gridColumnStart < 2) {
        break
      }
      carPos.style.gridColumnStart--
      break
    case 'ArrowRight':
      if (carPos.style.gridColumnStart > 2) {
        break
      }
      carPos.style.gridColumnStart++
      break
  }
})

playAgain.addEventListener('click', () => {
  resetGame()
  gameStart()
})
