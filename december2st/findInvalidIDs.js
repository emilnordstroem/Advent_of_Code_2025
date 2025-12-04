import fs from 'fs/promises'

async function readInput () {
    const data = await fs.readFile('./input.txt', 'utf-8')
    const ids = data.trim().split(',')    
    return ids
}


function amountOfInvalidIDs (ids) {
    let sum = 0

    for (const id of ids) {
        const range = id.split('-')        

        let position = parseInt(range[0])
        const limit = parseInt(range[1])

        while (position <= limit) {
            if (isValueInvalid(position)) {
                sum += position
            }
            position++
        }
    }

    return sum
}

function isValueInvalid (value) {
    const valueString = `${value}`

    if (valueString.length % 2 !== 0) {
        return false
    }

    const leftSide = parseInt(valueString.slice(0, valueString.length / 2))
    const rightSide = parseInt(valueString.slice(valueString.length / 2, valueString.length))
    
    return leftSide / rightSide === 1    
}

const ids = await readInput()
const result = amountOfInvalidIDs(ids)
console.log(result)
