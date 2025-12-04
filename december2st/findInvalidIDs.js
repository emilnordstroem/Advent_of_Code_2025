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

function isValueInvalid(value) {
    const valueString = String(value)
    const size = valueString.length

    let blockLength = 1
    while (blockLength <= Math.floor(size / 2)) {
        if (size % blockLength === 0) {
            const valueStringBlock = valueString.slice(0, blockLength)
            const repetitions = size / blockLength

            const candidateBlock = valueStringBlock.repeat(repetitions)

            if (candidateBlock === valueString) {
                return true
            }            
        }

        blockLength++
    }

    return false
}

const ids = await readInput()
const result = amountOfInvalidIDs(ids)
console.log(result)
