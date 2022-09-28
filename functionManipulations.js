export function inputToValidMath(input, x) {
    input = input.replace(/(PI|pi)/g, 'Math.PI')

    input = multiplications(input)

    //input = input.replaceAll('-x', `(${-x})`)
    //input = input.replaceAll('x', `(${x})`)

    input = everything(input)

    return input
}

function everything(input) {
    input = pow(input)
    input = sqrt(input)
    input = sin(input)
    input = cos(input)
    input = tan(input)
    input = abs(input)
    return input
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

function sqrt(input) {
    input = input.replaceAll('sqrt', 'Math.sqrt')
    return input
}

function sin(input) {
    input = input.replaceAll('sin', 'Math.sin')
    return input
}

function cos(input) {
    input = input.replaceAll('cos', 'Math.cos')
    return input
}

function tan(input) {
    input = input.replaceAll('tan', 'Math.tan')
    return input
}

function pow(input) {
    input = input.replaceAll('pow', 'Math.pow')
    input = input.replaceAll('^', '**')
    return input
}

function abs(input) {
    input = input.replaceAll('abs', 'Math.abs')
    return input
}
