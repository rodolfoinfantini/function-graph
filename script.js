'use strict'
import Graph from './Graph.js'

const input = document.querySelector('input')
const button = document.querySelector('button')

const canvas = document.createElement('canvas')
canvas.width = 800
canvas.height = 800
const ctx = canvas.getContext('2d')
document.body.appendChild(canvas)

let func = input.value
function f(x) {
    let treatedFunc = func.replaceAll(' ', '').trim()
    if (treatedFunc.length === 0) {
        stop = true
        alert('Invalid function')
        return
    }

    const multiplications = treatedFunc.match(/-?[\d.e]+x/g)
    if (multiplications)
        multiplications.forEach((multiplication) => {
            const number = multiplication.match(/[\d-.e]+/)[0]
            treatedFunc = treatedFunc.replace(multiplication, `${number}*x`)
        })

    treatedFunc = treatedFunc.replaceAll('x', x)
    treatedFunc = treatedFunc.replaceAll('--', '+')

    const squareRoots = treatedFunc.match(/sqrt\([\d-.e]+\)/g)
    if (squareRoots)
        squareRoots.forEach((root) => {
            const rootNumber = root.match(/[\d-.e]+/)[0]
            treatedFunc = treatedFunc.replace(root, Math.sqrt(rootNumber))
        })

    const sins = treatedFunc.match(/sin\([\d-.e]+\)/g)
    if (sins)
        sins.forEach((sin) => {
            const sinNumber = sin.match(/[\d-.e]+/)[0]
            treatedFunc = treatedFunc.replace(sin, Math.sin(sinNumber))
        })

    const coss = treatedFunc.match(/cos\([\d-.e]+\)/g)
    if (coss)
        coss.forEach((cos) => {
            const cosNumber = cos.match(/[\d-.e]+/)[0]
            treatedFunc = treatedFunc.replace(cos, Math.cos(cosNumber))
        })

    const tans = treatedFunc.match(/tan\([\d-.e]+\)/g)
    if (tans)
        tans.forEach((tan) => {
            const tanNumber = tan.match(/[\d-.e]+/)[0]
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
        console.error(e)
        console.log(treatedFunc)
        stop = true
        alert('Invalid function')
    }
}

let stop = false

const w = 30
const h = 30

const graph = new Graph(ctx, w, h, canvas.width, canvas.height)

function run() {
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

button.onclick = () => {
    func = input.value
    run()
}

run()
