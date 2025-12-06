import fs from 'fs/promises'

async function readInput () {
    const data = await fs.readFile('./input.txt', 'utf-8')
    const lines = data.trim().split('\n')
    const paperRolls = lines.map(line => line.trim().split(''))
    return paperRolls
}

function howManyPaperRollsCanBeAccessed (paperRolls) {
    let paperRollCounter = 0

    for (let currentRow = 0; currentRow < paperRolls.length; currentRow++) {
        for (let currentColumn = 0; currentColumn < paperRolls[currentRow].length; currentColumn++) {
            const currentField = paperRolls[currentRow][currentColumn]
            if (doesFieldContainPaperRoll(currentField)) {
                const canPaperRollBeAccessed = checkSurroundingFields(paperRolls, currentRow, currentColumn)
                if (canPaperRollBeAccessed) {
                    paperRollCounter++
                }
            }
        }
    }
    return paperRollCounter
}

function checkSurroundingFields (paperRolls, baseRow, baseColumn) {
    let paperRollCounter = 0

    for (let currentRow = (baseRow - 1); currentRow <= (baseRow + 1); currentRow++) {
        for (let currentColumn = (baseColumn - 1); currentColumn <= (baseColumn + 1); currentColumn++) {
            if (currentRow === baseRow && currentColumn === baseColumn) {
                continue
            } else if (isFieldsOutOfBounce(paperRolls, currentRow, currentColumn)) {
                continue
            }
            if (doesFieldContainPaperRoll(paperRolls[currentRow][currentColumn])) {
                paperRollCounter++
            }
        }
    }

    return paperRollCounter < 4
}

function isFieldsOutOfBounce (paperRolls, row, column) {
    return row < 0 || row >= paperRolls.length || column < 0 || column >= paperRolls[row].length
}

function doesFieldContainPaperRoll (field) {
    return field === '@'
}

const paperRolls = await readInput() 
const result = howManyPaperRollsCanBeAccessed(paperRolls)
console.log(result);
