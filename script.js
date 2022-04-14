'use strict'
import Graph from './Graph.js'
import { inputToValidMath } from './functionManipulations.js'

const precision = 0.1

const input = document.querySelector('input.function')
const centerButton = document.querySelector('button.center')

// const widthInput = document.querySelector('input.x')
// const widthSpan = document.querySelector('span.x')
const heightInput = document.querySelector('input.y')
const heightSpan = document.querySelector('span.y')

const canvas = document.createElement('canvas')
canvas.width = window.innerWidth
canvas.height = window.innerHeight
const ctx = canvas.getContext('2d')
document.body.appendChild(canvas)

let func = input.value
function f(x) {
    let treatedFunc = func.replaceAll(' ', '').trim()
    if (treatedFunc.length === 0) {
        stop = true
        return
    }

    treatedFunc = inputToValidMath(treatedFunc, x)

    try {
        return eval(treatedFunc)
    } catch (e) {
        stop = true
        return
    }
}

let stop = false

let w = 50
let h = 50

let graph

function setup() {
    zoom = 1
    ctx.restore()
    graph = new Graph(ctx, w, h, canvas.width, canvas.height)
    run()
}

// widthInput.oninput = debounce(setup, 300, () => {
//     widthSpan.textContent = 'Graph width: ' + widthInput.value
//     w = +widthInput.value
// })
// widthInput.oninput()

heightInput.oninput = debounce(setup, 300, () => {
    h = +heightInput.value
    heightSpan.textContent = `Graph height: ${h} (-${h / 2} .. ${h / 2})`
})
heightInput.oninput()

function reset() {
    ctx.clearRect(
        -(canvas.width * 100),
        -(canvas.height * 100),
        canvas.width * 1000,
        canvas.height * 1000
    )
}

function run() {
    func = input.value
    reset()
    graph.drawAxes()
    const lastPoint = {
        x: null,
        y: null,
    }
    for (let i = -graph.width / 2; i <= graph.width / 2; i += precision) {
        if (stop) {
            stop = false
            break
        }

        const x = i
        const y = f(x)

        if (lastPoint.x !== null) graph.drawLine(lastPoint.x, lastPoint.y, x, y)

        lastPoint.x = x
        lastPoint.y = y
    }
}

// button.onclick = run

input.oninput = debounce(run, 200)

let isMouseDown = false
let zoom = 1

const lastMousePos = { x: null, y: null }
document.body.onmousemove = (e) => {
    if (lastMousePos.x === null || !isMouseDown) {
        lastMousePos.x = e.clientX
        lastMousePos.y = e.clientY
        return
    }
    const xDistance = (e.clientX - lastMousePos.x) / zoom
    const yDistance = (e.clientY - lastMousePos.y) / zoom
    // const image = new Image()
    // image.onload = () => {
    ctx.translate(xDistance, yDistance)
    // reset()
    // ctx.drawImage(image, 0, 0)
    // }
    // image.src = canvas.toDataURL()
    run()
    lastMousePos.x = e.clientX
    lastMousePos.y = e.clientY
}
canvas.onmousedown = () => {
    isMouseDown = true
}
canvas.onmouseup = () => {
    isMouseDown = false
}
canvas.onmouseleave = canvas.onmouseup

centerButton.onclick = () => {
    setup()
}

document.body.onwheel = (e) => {
    const ratio = e.deltaY > 0 ? 0.9 : 1.1
    zoom *= ratio
    ctx.scale(ratio, ratio)
    run()
}

window.onresize = debounce(() => {
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
    setup()
})

function debounce(cb, delay = 200, ignoredCb) {
    let timeout

    return (...args) => {
        if (ignoredCb) ignoredCb(...args)
        clearTimeout(timeout)
        timeout = setTimeout(() => {
            cb(...args)
        }, delay)
    }
}

setup()
