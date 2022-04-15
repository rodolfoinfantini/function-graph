export function inputToValidMath(input, x) {
    input = input.replace(/(PI|pi)/g, Math.PI)

    input = multiplications(input)

    input = input.replaceAll('x', x)
    input = input.replaceAll('--', '+')

    input = everything(input)

    return input
}

function everything(input) {
    input = power(input)
    input = sqrt(input)
    input = sin(input)
    input = cos(input)
    input = tan(input)
    input = abs(input)
    return input
}

function hasInvalidOperators(input) {
    return input.match(/[a-zA-Z\^\|]/g) !== null
}

function multiplications(input) {
    if (input.startsWith('-x')) input = input.replace('-x', '-1x')

    const multiplications = input.match(/-?[\d.e]+x/g)
    if (multiplications)
        multiplications.forEach((multiplication) => {
            const number = multiplication.match(/[\d-.e]+/)[0]
            input = input.replace(multiplication, `${number}*x`)
        })
    return input
}

function genericFunction(input, current, mathFunc, regex = /\)+/) {
    current = current.replace(regex, '')
    const parentheses = current.match(/\(/g)
    if (!current.endsWith(')') && parentheses !== null)
        current += ')'.repeat(parentheses.length)
    let currentNumber = parentheses
        ? current.replace(/^[^(]*\(/, '').slice(0, -1)
        : current.replace(/^[^|]*\|/, '').slice(0, -1)
    try {
        if (hasInvalidOperators(currentNumber)) throw new Error()
        currentNumber = eval(currentNumber)
    } catch (error) {
        currentNumber = everything(currentNumber)
        currentNumber = eval(currentNumber)
    }
    input = input.replace(current, mathFunc(currentNumber))
    return input
}

function sqrt(input) {
    /*
    const squareRootsSquared = input.match(/sqrt\([^\)]*\)\^2/g)
    if (squareRootsSquared)
        for (const sRoot of squareRootsSquared) {
            const sRootNumber = sRoot.match(/\((.*?)\)/)[1]
            input = input.replace(sRoot, sRootNumber)
        }
        const squareRoots = input.match(/sqrt\([^\)]*\)/g)
        if (squareRoots)
            for (const root of squareRoots)
                input = genericFunction(input, root, Math.sqrt)
    */

    input = input.replaceAll('sqrt', 'Math.sqrt')
    return input
}

function sin(input) {
    /*
    const sin = input.match(/sin\([^\)]*\)/g)
    if (sin) for (const s of sin) input = genericFunction(input, s, Math.sin)
    */

    input = input.replaceAll('sin', 'Math.sin')
    return input
}

function cos(input) {
    /*
    const cos = input.match(/cos\([^\)]*\)/g)
    if (cos) for (const c of cos) input = genericFunction(input, c, Math.cos)
    */

    input = input.replaceAll('cos', 'Math.cos')
    return input
}

function tan(input) {
    /*
    const tan = input.match(/tan\([^\)]*\)/g)
    if (tan) for (const t of tan) input = genericFunction(input, t, Math.tan)
    */

    input = input.replaceAll('tan', 'Math.tan')
    return input
}

function power(input) {
    input = input.replaceAll('pow', 'Math.pow')
    input = power2(input)
    return input
    const power = input.split(/\b[\+\-\*]/).filter((item) => {
        return item.includes('^')
    })
    if (!input.matchAll(/[\+\-\*]/g)) power.push(input)
    power.forEach((item) => {
        const number = item.split('^')[0]
        const exponent = item.split('^')[1]
        input = input.replace(item, Math.pow(+number, +exponent))
    })
    return input
}

function power2(input) {
    const power = input.match(/[\d-.e]+\^[\d-.e]+/g)
    if (power) {
        power.forEach((p) => {
            const powerNumber = p.split('^')[0]
            const powerExponent = p.split('^')[1]
            input = input.replace(p, Math.pow(+powerNumber, +powerExponent))
        })
        //        input = everything(input)
    }

    return input
}

function abs(input) {
    /*
    const abs = input.match(/\|.+\|/g)
    if (abs) for (const a of abs) input = genericFunction(input, a, Math.abs)
    */

    input = input.replaceAll('abs', 'Math.abs')
    return input
}
