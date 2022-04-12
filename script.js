'use strict'
import Graph from './Graph.js'

const input = document.querySelector('input.function')
const button = document.querySelector('button')

const widthInput = document.querySelector('input.x')
const widthSpan = document.querySelector('span.x')
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
        return //alert('Invalid function')
    }

    const multiplications = treatedFunc.match(/-?[\d.e]+x/g)
    if (multiplications)
        multiplications.forEach((multiplication) => {
            const number = multiplication.match(/[\d-.e]+/)[0]
            treatedFunc = treatedFunc.replace(multiplication, `${number}*x`)
        })

    treatedFunc = treatedFunc.replaceAll('x', x)
    treatedFunc = treatedFunc.replaceAll('--', '+')
    treatedFunc = treatedFunc.replace(/(PI|pi)/g, Math.PI)

    const squareRoots = treatedFunc.match(/sqrt\(.+\)/g)
    if (squareRoots)
        squareRoots.forEach((root) => {
            let rootNumber = root.match(/\((.*?)\)/)[1]
            try {
                rootNumber = eval(rootNumber)
            } catch (error) {}
            treatedFunc = treatedFunc.replace(root, Math.sqrt(rootNumber))
        })

    const sins = treatedFunc.match(/sin\(.+\)/g)
    if (sins)
        sins.forEach((sin) => {
            let sinNumber = sin.match(/\((.*?)\)/)[1]
            try {
                sinNumber = eval(sinNumber)
            } catch (error) {}
            treatedFunc = treatedFunc.replace(sin, Math.sin(sinNumber))
        })

    const coss = treatedFunc.match(/cos\(.+\)/g)
    if (coss)
        coss.forEach((cos) => {
            let cosNumber = cos.match(/\((.*?)\)/)[1]
            try {
                cosNumber = eval(cosNumber)
            } catch (error) {}
            treatedFunc = treatedFunc.replace(cos, Math.cos(cosNumber))
        })

    const tans = treatedFunc.match(/tan\(.+\)/g)
    if (tans)
        tans.forEach((tan) => {
            let tanNumber = tan.match(/\((.*?)\)/)[1]
            try {
                tanNumber = eval(tanNumber)
            } catch (error) {}
            treatedFunc = treatedFunc.replace(tan, Math.tan(tanNumber))
        })

    const powers = treatedFunc.match(/[\d-.e]+\^-?[\d.e]+/g)
    if (powers)
        powers.forEach((power) => {
            const powerNumber = power.split('^')[0]
            const powerExponent = power.split('^')[1]
            treatedFunc = treatedFunc.replace(
                power,
                Math.pow(+powerNumber, +powerExponent)
            )
        })

    const abs = treatedFunc.match(/\|[\d-.e]+\|/g)
    if (abs)
        abs.forEach((absNumber) => {
            const absNumberNumber = absNumber.match(/[\d-.e]+/)[0]
            treatedFunc = treatedFunc.replace(
                absNumber,
                Math.abs(absNumberNumber)
            )
        })

    try {
        return eval(treatedFunc)
    } catch (e) {
        // console.error(e)
        // console.log(treatedFunc)
        stop = true
        // alert('Invalid function')
    }
}

let stop = false

let w = 50
let h = 50

let graph

function setup() {
    graph = new Graph(ctx, w, h, canvas.width, canvas.height)
    run()
}

widthInput.oninput = debounce(setup, 300, () => {
    widthSpan.textContent = 'Graph width: ' + widthInput.value
    w = +widthInput.value
})

heightInput.oninput = debounce(setup, 300, () => {
    heightSpan.textContent = 'Graph height: ' + heightInput.value
    h = +heightInput.value
})

function run() {
    func = input.value
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    graph.drawAxes()
    const lastPoint = {
        x: null,
        y: null,
    }
    for (let i = -w / 2; i <= w / 2; i += 0.1) {
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

button.onclick = run

input.oninput = debounce(run, 200)

setup()

window.onresize = debounce(() => {
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
    setup()
})

function debounce(cb, delay = 200, ignoredCb) {
    let timeout

    return (...args) => {
        if (ignoredCb) ignoredCb()
        clearTimeout(timeout)
        timeout = setTimeout(() => {
            cb(...args)
        }, delay)
    }
}
