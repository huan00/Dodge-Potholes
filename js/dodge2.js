const canvas = document.querySelector('#myCanvas')
const ctx = canvas.getContext('2d')
const startBtn = document.querySelector('#start')
const modal = document.querySelector('#modal')
const playAgain = document.querySelector('#playAgain')
const modalAgain = document.querySelector('#modalAgain')
const arrowKeys = document.querySelectorAll('.arrowKeys')
const drivingSound = new Audio('./sound/driving.wav')
const levelSound = new Audio('./sound/level.mp3')
const collisionSound = new Audio('./sound/Collision.wav')

drivingSound.volume = 0.1
collisionSound.volume = 0.02

//global varible
//set canvas size
//custom canvas size
let ww = parseInt(innerWidth)
let health = canvas.width
let gameover = false
let speed = 0
let time = 0
let divider = 100

const customWidth = (width) => {
  let ww = width
  if (ww > 500) {
    return ww * 0.3
  } else {
    return ww * 0.6
  }
}

canvas.width = customWidth(ww)
canvas.height = innerHeight * 0.9
const highwayImage = new Image()
highwayImage.src = './image/highwayRoad.png'

//creating the car class
class Car {
  constructor() {
    this.velocity = {
      //movement speed
      x: 0,
      y: 0
    }

    //loading the image into the DOM, for the canvas
    const image = new Image()
    image.src = './image/red.png'
    image.onload = () => {
      this.image = image
      this.width = image.width * 0.04
      this.height = image.height * 0.04
      this.position = {
        x: canvas.width / 2 - this.width / 2,
        y: canvas.height * 0.7
      }
    }
  }

  draw() {
    //executing the image into the canvas
    ctx.drawImage(
      this.image,
      this.position.x,
      this.position.y,
      this.width,
      this.height
    )
  }

  update() {
    //action for requestanimationFrame
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
    //preparing the load image
    const image = new Image()
    image.src = './image/potholev2.png'
    image.onload = () => {
      this.image = image
      this.width = image.width * 0.07
      this.height = image.height * 0.1
      this.position = {
        //loading position for the object
        x: Math.floor(Math.random() * canvas.width) - 50,
        y: -50
      }
    }
  }

  draw() {
    //drawing out the object in the screen
    ctx.drawImage(this.image, this.position.x, this.position.y, 40, this.height)
  }
  update() {
    // action for requestanimationFrame
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

//creating score class
class keepScore {
  constructor() {
    this.score = 0
  }

  draw() {
    ctx.fillStyle = 'white'
    ctx.font = '20px Arial'
    ctx.fillText(`Score: ${this.score}`, canvas.width - 120, 35)
  }

  update() {
    this.draw()
    this.score++
  }
}

//checking for collision
const checkCollision = () => {
  pothole.forEach((hole) => {
    if (
      (time > 100 &&
        //use javascript Rect collision formula to check collision in the game
        car.position.x < hole.position.x + hole.width - 3 &&
        car.position.x + car.width > hole.position.x &&
        car.position.y < hole.position.y + hole.height &&
        car.height + car.position.y > hole.position.y) ||
      car.position.x < 0 - car.width ||
      car.position.x > canvas.width
    ) {
      health--
      collisionSound.play()
      if (health <= 0) {
        gameover = true
      }
    }
  })
}

//game over display.
const gameOver = () => {
  if (gameover) {
    drivingSound.pause()
    modalAgain.style.display = 'block'
    ctx.fillStyle = 'red'
    ctx.font = '20 Arial'
    ctx.textAlign = 'center'
    ctx.fillText('Your Tires Popped!!', canvas.width / 2, canvas.height / 2)
    ctx.fillText(
      `Your score: ${score.score}`,
      canvas.width / 2,
      canvas.height / 2 + 40
    )
  }
}

const loopAudio = (audio) => {
  audio.loop = true
  audio.play()
}

//creating different level for the game base on score.
const createPoleHole = (time, score) => {
  if (score < 1000) {
    if (time % 100 === 0) {
      pothole.push(new Pothole())
    }
  } else if (score > 1000 && score < 2000) {
    if (time % 50 === 0) {
      pothole.push(new Pothole())
      if (score > 1000 && score < 1100) {
        levelSound.play()
      }
    }
  } else if (score > 2000 && score < 3000) {
    if (time % 25 === 0) {
      pothole.push(new Pothole())
      if (score === 2000 && score < 2100) {
        levelSound.play()
      }
    }
  } else if (score > 3000 && score < 4000) {
    if (time % 10 === 0) {
      pothole.push(new Pothole())
      if (score === 3000 && score < 3100) {
        levelSound.play()
      }
    }
  } else if (score > 4000 && score < 5000) {
    if (time % 30 === 0) {
      pothole.push(new Pothole())
      pothole.push(new Pothole())
      if (score === 4000 && score < 4100) {
        levelSound.play()
      }
    }
  } else if (score > 5000 && score < 6000) {
    if (time % 30 === 0) {
      pothole.push(new Pothole())
      pothole.push(new Pothole())
      pothole.push(new Pothole())
      if (score === 5000 && score < 5100) {
        levelSound.play()
      }
    }
  } else if (score > 6000 && score < 7000) {
    if (time % 30 === 0) {
      pothole.push(new Pothole())
      pothole.push(new Pothole())
      pothole.push(new Pothole())
      pothole.push(new Pothole())
      if (score === 6000 && score < 6100) {
        levelSound.play()
      }
    }
  } else if (score > 7000 && score < 8000) {
    if (time % 30 === 0) {
      pothole.push(new Pothole())
      pothole.push(new Pothole())
      pothole.push(new Pothole())
      pothole.push(new Pothole())
      pothole.push(new Pothole())
      if (score === 7000 && score < 8100) {
        levelSound.play()
      }
    }
  } else if (score > 8000 && score < 9000) {
    if (time % 30 === 0) {
      pothole.push(new Pothole())
      pothole.push(new Pothole())
      pothole.push(new Pothole())
      pothole.push(new Pothole())
      pothole.push(new Pothole())
      pothole.push(new Pothole())
      if (score === 8000 && score < 8100) {
        levelSound.play()
      }
    }
  } else if (score > 9000) {
    if (time % 30 === 0) {
      pothole.push(new Pothole())
      pothole.push(new Pothole())
      pothole.push(new Pothole())
      pothole.push(new Pothole())
      pothole.push(new Pothole())
      pothole.push(new Pothole())
      pothole.push(new Pothole())
      pothole.push(new Pothole())
      if (score === 9000 && score < 9100) {
        levelSound.play()
      }
    }
  }
}

//speeding up the object on the screen, base on score.
const gameSpeed = (score) => {
  if (score > 1000 && score < 2000) {
    pothole.forEach((hole) => {
      hole.velocity.y = 2
    })
  } else if (score > 2000 && score < 3000) {
    pothole.forEach((hole) => {
      hole.velocity.y = 4
    })
  } else if (score > 3000 && score < 4000) {
    pothole.forEach((hole) => {
      hole.velocity.y = 6
    })
  } else if (score > 4000 && score < 5000) {
    pothole.forEach((hole) => {
      hole.velocity.y = 8
    })
  } else if (score > 5000 && score < 6000) {
    pothole.forEach((hole) => {
      hole.velocity.y = 10
    })
  } else if (score > 6000) {
    pothole.forEach((hole) => {
      hole.velocity.y = 10
    })
  }
}

/*************************** */
/*create class items and require element for the game */
const car = new Car()
const healthBar = new HealthBar(health)
const pothole = []
const score = new keepScore()

//main animation function
const animate = () => {
  speed++
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  ctx.drawImage(highwayImage, 0, 0, canvas.width, canvas.height)
  if (gameover) {
    gameOver()
    return
  }

  //main function for animation.
  requestAnimationFrame(animate)
  gameSpeed(score.score)
  score.update()
  healthBar.update()
  pothole.forEach((hole, index) => {
    if (time > 500 && hole.position.y > canvas.height) {
      setTimeout(() => {
        pothole.splice(index, 1)
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

//event listener for the game
addEventListener('keydown', (e) => {
  switch (e.code) {
    case 'ArrowUp':
      if (car.position.y >= 0) {
        car.velocity.y = -5
      }
      break
    case 'ArrowDown':
      if (car.position.y >= canvas.height - 100) return

      car.velocity.y = 5
      break
    case 'ArrowLeft':
      if (car.position.x > 0) {
        car.velocity.x = -5
      }
      break
    case 'ArrowRight':
      if (car.position.x + car.width < canvas.width) {
        car.velocity.x = 5
      }
      break
  }
})

//stop the car when key is release
addEventListener('keyup', (e) => {
  switch (e.key) {
    case 'ArrowUp':
      car.velocity.y = 0
      break
    case 'ArrowDown':
      car.velocity.y = 0
      break
    case 'ArrowLeft':
      car.velocity.x = 0
      break
    case 'ArrowRight':
      car.velocity.x = 0
      break
  }
})

//game start btn
startBtn.addEventListener('click', () => {
  createPoleHole()
  animate()
  loopAudio(drivingSound)
  modal.style.display = 'none'
})

playAgain.addEventListener('click', () => {
  location.reload()
})

//on screen arrowkey
arrowKeys.forEach((key) => {
  key.addEventListener('pointerdown', () => {
    switch (key) {
      case arrowKeys[1]:
        car.velocity.y = -1

        break
      case arrowKeys[3]:
        if (car.position.y >= canvas.height - 100) return

        car.velocity.y = 1
        break
      case arrowKeys[0]:
        if (car.position.x > 0) {
          car.velocity.x = -1
        }
        break
      case arrowKeys[2]:
        if (car.position.x + car.width < canvas.width) {
          car.velocity.x = 1
        }
        break
    }
  })
})

arrowKeys.forEach((key) => {
  key.addEventListener('mouseup', () => {
    switch (key) {
      case arrowKeys[1]:
        car.velocity.y = 0

        break
      case arrowKeys[3]:
        if (car.position.y >= canvas.height - 100) return

        car.velocity.y = 0
        break
      case arrowKeys[0]:
        if (car.position.x > 0) {
          car.velocity.x = 0
        }
        break
      case arrowKeys[2]:
        if (car.position.x + car.width < canvas.width) {
          car.velocity.x = 0
        }
        break
    }
  })
})
