const canvas = document.querySelector('#myCanvas')
const ctx = canvas.getContext('2d')
const NYC = document.querySelector('#NYC')
const texas = document.querySelector('#texas')
const sanDiego = document.querySelector('#sanDiego')
const startBtn = document.querySelector('#start')
const modal = document.querySelector('#modal')

canvas.width = innerWidth * 0.3
canvas.height = innerHeight - 50

let health = canvas.width
let gameover = false
let speed = 0
let time = 0
let divider = 100

//creating the car class
class Car {
  constructor() {
    this.velocity = {
      x: 0,
      y: 0
    }
    const image = new Image()
    image.src = './image/redcar.png'
    image.onload = () => {
      this.image = image
      this.width = image.width * 0.04
      this.height = image.height * 0.04
      this.position = {
        x: canvas.width / 2 - this.width / 2,
        y: canvas.height - 100
      }
    }
  }

  draw() {
    // ctx.fillstyle = 'black'
    // ctx.fillRect(this.position.x, this.position.y, this.width, this.height)

    ctx.drawImage(
      this.image,
      this.position.x,
      this.position.y,
      this.width,
      this.height
    )
  }

  update() {
    if (this.image) {
      this.draw()
      this.position.x += this.velocity.x
      this.position.y += this.velocity.y
    }
  }
}

//creating the pothole class
class Pothole {
  constructor() {
    this.velocity = {
      x: 0,
      y: 1
    }

    const image = new Image()
    image.src = './image/potholev2.png'
    image.onload = () => {
      this.image = image
      this.width = image.width * 0.07
      this.height = image.height * 0.1
      this.position = {
        x: Math.floor(Math.random() * canvas.width) - 50,
        y: -50
      }
    }
  }

  draw() {
    ctx.drawImage(this.image, this.position.x, this.position.y, 40, this.height)
  }
  update() {
    if (this.image) {
      this.draw()
      this.position.y += this.velocity.y
    }
  }
}

//creating the healthbar
class HealthBar {
  constructor(health) {
    this.health = health
    this.width = canvas.width
  }

  draw() {
    ctx.fillStyle = 'green'
    ctx.fillRect(0, 0, health, 10)
  }

  update() {
    this.draw()
    this.width = health
  }
}

class keepScore {
  constructor() {
    this.score = 0
  }

  draw() {
    ctx.fillStyle = 'black'
    ctx.font = '20px Arial'
    ctx.fillText(`Score: ${this.score}`, canvas.width - 120, 35)
  }

  update() {
    this.draw()
    this.score++
  }
}

//checking for collission
const checkCollision = () => {
  pothole.forEach((hole) => {
    if (
      (car.position.x < hole.position.x + hole.width &&
        car.position.x + car.width > hole.position.x &&
        car.position.y < hole.position.y + hole.height &&
        car.height + car.position.y > hole.position.y) ||
      car.position.x < 0 ||
      car.position.x > canvas.width
    ) {
      health--
      if (health <= 0) {
        gameover = true
      }
    }
  })
}

const gameOver = () => {
  if (gameover) {
    ctx.fillStyle = 'black'
    ctx.font = '30px Arial'
    ctx.textAlign = 'center'
    ctx.fillText('Your Tires Popped!!', canvas.width / 2, canvas.height / 2)
    ctx.fillText(
      `Your score: ${score.score}`,
      canvas.width / 2,
      canvas.height / 2 + 40
    )
  }
}

// const createPoleHole = (time, divider) => {
//   if (time % divider === 0) {
//     pothole.push(new Pothole())
//   }
// }
const createPoleHole = (time, score) => {
  if (score > 1000 && score < 2000) {
    if (time % 50 === 0) {
      pothole.push(new Pothole())
    }
  } else if (score > 2000 && score < 3000) {
    if (time % 25 === 0) {
      pothole.push(new Pothole())
    }
  } else if (score > 3000 && score < 4000) {
    if (time % 10 === 0) {
      pothole.push(new Pothole())
    }
  } else if (score > 4000) {
    if (time % 8 === 0) {
      pothole.push(new Pothole())
    }
  } else {
    if (time % 100 === 0) {
      pothole.push(new Pothole())
    }
  }
}

const gameSpeed = (score) => {
  if (score > 1000 && score < 2000) {
    pothole.forEach((hole) => {
      hole.velocity.y = 2
      console.log('velocity 2')
    })
  } else if (score > 2000 && score < 3000) {
    pothole.forEach((hole) => {
      hole.velocity.y = 4
    })
  } else if (score > 3000 && score < 4000) {
    pothole.forEach((hole) => {
      hole.velocity.y = 6
    })
  } else if (score > 5000) {
    pothole.forEach((hole) => {
      hole.velocity.y = 8
    })
  }
}

/*************************** */
/*create class items */
const car = new Car()
const healthBar = new HealthBar(health)
const pothole = []
const score = new keepScore()

const animate = () => {
  speed++
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  ctx.fillStyle = 'grey'
  ctx.fillRect(0, 0, canvas.width, canvas.height)
  if (gameover) {
    gameOver()
    return
  }

  requestAnimationFrame(animate)
  gameSpeed(score.score)
  // createPoleHole(speed, pothole)
  score.update()
  healthBar.update()
  pothole.forEach((hole, index) => {
    if (hole.position.y > canvas.height) {
      setTimeout(() => {
        pothole.splice(index, 1)
        console.log(pothole)
      }, 0)
    } else {
      hole.update()
    }
  })
  checkCollision()
  car.update()

  createPoleHole(time, score.score)
  time++
}

addEventListener('keydown', (e) => {
  console.log(e.key)
  switch (e.code) {
    case 'ArrowUp':
      console.log('up')
      if (car.position.y >= 0) {
        car.velocity.y = -5
      }
      break
    case 'ArrowDown':
      if (car.position.y >= canvas.height - 100) return
      console.log('down')
      car.velocity.y = 5
      break
    case 'ArrowLeft':
      console.log('Left')
      if (car.position.x > 0) {
        car.velocity.x = -5
      }
      break
    case 'ArrowRight':
      console.log('Right')
      if (car.position.x + car.width < canvas.width) {
        car.velocity.x = 5
      }
      break
  }
})

addEventListener('keyup', (e) => {
  switch (e.key) {
    case 'ArrowUp':
      console.log('up')
      if (car.position.y >= canvas.height) return
      car.velocity.y = 0
      break
    case 'ArrowDown':
      console.log('down')
      car.velocity.y = 0
      break
    case 'ArrowLeft':
      console.log('Left')
      car.velocity.x = 0
      break
    case 'ArrowRight':
      console.log('Right')
      car.velocity.x = 0
      break
  }
})

startBtn.addEventListener('click', () => {
  createPoleHole()
  animate()
  modal.style.display = 'none'
})
