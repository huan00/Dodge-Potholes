//DOM elements
const gameboard = document.querySelector('#gameboard')

//global
let speed = 5000

//Game board grid size
const gridSize = { x: 10, y: 2 }
//starting car pos
const car = { x: 9, y: 2 }
let control = car

//functions
const createCar = (car) => {
  const carDiv = document.createElement('div')
  carDiv.setAttribute('id', 'car')
  carDiv.style.gridRowStart = car.x
  carDiv.style.gridColumnStart = car.y
  carDiv.style.backgroundImage = "url('../image/red.png')"
  gameboard.appendChild(carDiv)
}
const createPothole = () => {
  const randX = Math.floor(Math.random()) + 1
  const randY = Math.floor(Math.random() * 3) + 1

  const div = document.createElement('div')
  div.classList.add('pothole')
  div.style.gridColumnStart = randY
  div.style.gridRowStart = randX

  gameboard.appendChild(div)
}
const createRandomPothole = () => {
  const createP = setInterval(createPothole, Math.random() * 5 * 5)
}

const gameStart = (speed) => {
  createCar(car)
  createPothole()
  let i = 1

  const gameSpeed = setInterval(() => {
    const pothole = document.querySelectorAll('.pothole')
    createPothole()

    pothole.forEach((hole) => {
      const holeX = hole.style.gridColumnStart
      const holeY = hole.style.gridRowStart
      const carX = carPos.style.gridColumnStart
      const carY = carPos.style.gridRowStart

      if (carX === holeX && carY === holeY) {
        clearInterval(gameSpeed)
        alert('gameOver')
      }

      console.log(holeX + ' ' + holeY)

      if (hole.style.gridRowStart > 9) {
        hole.parentNode.removeChild(hole)
      } else if (hole.style.gridRowStart < 10) {
        hole.style.gridRowStart++
      }
    })
  }, 500)
}

gameStart()
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

// const gameOver = (pothole) => {
//   const carX = carPos.style.gridRowStart
//   const carY = carPos.style.gridColumnStart

//   pothole.forEach((hole) => {

//     pothole.forEach(hole => {
//       if(hole.)
//     })
//   })
// }
