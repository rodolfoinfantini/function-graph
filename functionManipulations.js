export function inputToValidMath(input, x) {
    input = input.replace(/(PI|pi)/g, Math.PI)

    input = multiplications(input)

    input = input.replaceAll('x', x)
    input = input.replaceAll('--', '+')

    input = everything(input)

    return input
}

function everything(input) {
    input = sqrt(input)
    input = sin(input)
    input = cos(input)
    input = tan(input)
    input = power(input)
    input = abs(input)
    return input
}

function hasInvalidOperators(input) {
    return input.match(/[a-zA-Z\^]/g) !== null
}

function multiplications(input) {
    const multiplications = input.match(/-?[\d.e]+x/g)
    if (multiplications)
        multiplications.forEach((multiplication) => {
            const number = multiplication.match(/[\d-.e]+/)[0]
            input = input.replace(multiplication, `${number}*x`)
        })
    return input
}

function genericFunction(input, current, mathFunc, regex = /\((.*?)\)/) {
    let currentNumber = regex
        ? current.match(regex)[1]
        : current.replace(/^[^(]*\(/, '').slice(0, -1)
    // let currentNumber = current.match(regex)[1]
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
    const squareRootsSquared = input.match(/sqrt\(.+\)\^2/g)
    if (squareRootsSquared)
        for (const sRoot of squareRootsSquared) {
            const sRootNumber = sRoot.match(/\((.*?)\)/)[1]
            input = input.replace(sRoot, sRootNumber)
        }

    const squareRoots = input.match(/sqrt\(.+\)/g)
    if (squareRoots)
        for (const root of squareRoots)
            input = genericFunction(input, root, Math.sqrt)

    return input
}

function sin(input) {
    const sins = input.match(/sin\(.+\)/g)
    if (sins)
        for (const sin of sins) input = genericFunction(input, sin, Math.sin)

    return input
}

function cos(input) {
    const coss = input.match(/cos\(.+\)/g)
    if (coss)
        for (const cos of coss) input = genericFunction(input, cos, Math.cos)

    return input
}

function tan(input) {
    const tans = input.match(/tan\(.+\)/g)
    if (tans)
        for (const tan of tans) input = genericFunction(input, tan, Math.tan)

    return input
}

function power(input) {
    const powers = input.match(/[\d-.e]+\^-?[\d.e]+/g)
    if (powers) {
        powers.forEach((power) => {
            const powerNumber = power.split('^')[0]
            const powerExponent = power.split('^')[1]
            input = input.replace(power, Math.pow(+powerNumber, +powerExponent))
        })
        input = everything(input)
    }

    return input
}

function abs(input) {
    const abs = input.match(/\|.+\|/g)
    if (abs)
        for (const a of abs)
            input = genericFunction(input, a, Math.abs, /\|(.*?)\|/)

    return input
}
