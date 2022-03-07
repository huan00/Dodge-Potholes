const gameboard = document.querySelector('#gameboard')

const gridSize = [{ x: 3, y: 10 }]
console.log(gameboard)

const box = document.createElement('div')
box.style.gridRowStart = 1
box.style.gridColumnStart = 1
box.style.backgroundColor = 'black'

gameboard.appendChild(box)

let frameTime = 0

let i = box.style.gridRowStart
// console.log(i)
// while (box.style.gridRowStart < 10) {
//   box.style.gridRowStart = i++
// }

let interval = 1000

let timer = 0

const moveBlockDown = () => {
  if (box.style.gridRowStart < 10) box.style.gridRowStart = i++
}
let move = setInterval(moveBlockDown, 1000)
// moveBlockDown()
