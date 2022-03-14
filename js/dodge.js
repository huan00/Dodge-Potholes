//DOM elements
const gameboard = document.querySelector('#gameboard')
const currentScore = document.querySelector('#currentScore')
const start = document.querySelector('#start')
const modal = document.querySelector('#modal')
const loseModal = document.querySelector('#lose')
const finalScore = document.querySelector('#finalScore')
const playAgain = document.querySelector('#playAgain')
const healthBar = document.querySelector('#healthBar')
const bgDiv = document.querySelectorAll('.background')
const sideBar = document.querySelectorAll('.sidebar')
const gameTitle = document.querySelector('#gameTitle')
const arrowKeys = document.querySelectorAll('.arrowKeys')

const drivingSound = new Audio('../sound/driving.wav')
const collisionSound = new Audio('../sound/Collision.wav')
drivingSound.volume = 0.1
collisionSound.volume = 0.02

//global
let speed = 1000
let myTimeout = undefined
let health = 3
let i = 1
let score = 0
let hitTime = 0

//Game board grid size
const gridSize = { x: 10, y: 2 }

//functions
const createCar = () => {
  const carDiv = document.createElement('div')
  carDiv.setAttribute('id', 'car')
  carDiv.style.gridRowStart = 9
  carDiv.style.gridColumnStart = 2
  gameboard.appendChild(carDiv)
}
const createPothole = () => {
  //randomly create pothole on top of grid
  const randY = Math.floor(Math.random() * 3) + 1

  const div = document.createElement('div')
  div.classList.add('pothole')
  div.style.gridColumnStart = randY
  div.style.gridRowStart = 0

  gameboard.appendChild(div)
}

const checkHealth = (health) => {
  // link css animation with health bar.
  if (health === 2) {
    healthBar.classList.add('thrid')
  } else if (health === 1) {
    healthBar.classList.add('one')
  }
}

const update = (num) => {
  //update gameplay, health, pothole movement
  if (num % 3 != 0) {
    createPothole()
  }
  healthBar.innerHTML = `life: ${health}`
  const potHole = document.querySelectorAll('.pothole')
  potHole.forEach((hole) => {
    if (hole.style.gridRowStart > 9) {
      hole.parentNode.removeChild(hole)
    } else if (hole.style.gridRowStart < 10) {
      hole.style.gridRowStart++
    }
  })
}

const gameOver = () => {
  //check gameover status
  const poleHole = document.querySelectorAll('.pothole')
  poleHole.forEach((hole) => {
    const holeX = hole.style.gridColumnStart
    const holeY = hole.style.gridRowStart
    const carX = carPos.style.gridColumnStart
    const carY = carPos.style.gridRowStart

    //check if car hit pothole
    if (carX === holeX && carY === holeY && hitTime + 2 < i) {
      health = health - 1
      hitTime = i
      collisionSound.play()

      //if car hitted, -- health
      if (health === 2) {
        healthBar.classList.add('third')
      } else if (health === 1) {
        healthBar.classList.add('one')
      }
    }
    if (health <= 0) {
      healthBar.innerHTML = `life: 0`
      healthBar.classList.add('dead')
      clearTimeout(myTimeout)
      speed = 1000000000 //stop the movement
      loseModal.style.display = 'block'
      finalScore.innerText = currentScore.innerText
      return true
    }
  })
}

//clear pothole funtion
const clearPotHole = () => {
  const poleHole = document.querySelectorAll('.pothole')
  poleHole.forEach((hole) => {
    hole.parentNode.removeChild(hole)
  })
}

//reset game without reloading page.
const resetGame = () => {
  currentScore.innerText = 0
  i = 0
  carPos.style.gridRowStart = 9
  carPos.style.gridColumnStart = 2
  clearPotHole()
  healthBar.classList.remove('one')
  healthBar.classList.remove('third')
  healthBar.classList.remove('dead')
  health = 3
  hitTime = 0
  loseModal.style.display = 'none'
  speed = 1000
  drivingSound.play()
}

/********************************************************************
 *
 *
 *
 */

//create the car object
createCar()

//////////////////////

//Game start function
const gameStart = () => {
  drivingSound.play()
  currentScore.innerText = i

  speed > 300 ? (speed -= 10) : speed

  update(i)

  const myInterval = setInterval(gameOver, 10)

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

//event listener for the game

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

//play the game again
playAgain.addEventListener('click', () => {
  resetGame()
  gameStart()
})

//create dark theme when clicked
sideBar[0].addEventListener('click', () => {
  sideBar[0].classList.toggle('sidebarDark')
  sideBar[1].classList.toggle('sidebarDark')
  gameTitle.classList.toggle('gameTitle')
})

//on screen key for mobile play
arrowKeys.forEach((key) => {
  key.addEventListener('click', () => {
    switch (key) {
      case arrowKeys[1]:
        if (carPos.style.gridRowStart < 2) {
          break
        }
        carPos.style.gridRowStart--
        break
      case arrowKeys[3]:
        if (carPos.style.gridRowStart > 8) {
          break
        }
        carPos.style.gridRowStart++
        break
      case arrowKeys[0]:
        if (carPos.style.gridColumnStart < 2) {
          break
        }
        carPos.style.gridColumnStart--
        break
      case arrowKeys[2]:
        if (carPos.style.gridColumnStart > 2) {
          break
        }
        carPos.style.gridColumnStart++
        break
    }
  })
})
