import fs from 'fs/promises'

async function readInput () {
    const data = await fs.readFile('./input.txt', 'utf-8')
    const lines = data.trim().split('\n')
    return lines
}

async function getFreshIngredientsInterval () {
    const data = await readInput()
    const filteredData = data.filter(line => line.includes('-'))
    const intervals = filteredData.map(line => {
        const interval = line.split('-')
        return {
            start: parseInt(interval[0]), 
            end: parseInt(interval[1].replace('\r', ''))
        }
    })
    return intervals
}

async function getIngredientIds () {
    const data = await readInput()
    const filteredData = data.filter(line => !line.includes('-'))
    const ingredientIds = filteredData.map(line => parseInt(line.replace('\r', '')))
    return ingredientIds
}

async function howManyIngredientsAreFresh (ingredentsId) {
    const freshIngredientsInterval = await getFreshIngredientsInterval()
    let validIngredientsCounter = 0
    
    for (const id of ingredentsId) {
        if (isIdValid(id, freshIngredientsInterval)) {
            validIngredientsCounter++
        }
    }

    return validIngredientsCounter
}

function isIdValid (ingredient, intervals) {
    for (const interval of intervals) {
        if (interval.start <= ingredient && interval.end >= ingredient) {
            return true
        }
    }
    return false
}


const ingredientIds = await getIngredientIds()
const resultat = await howManyIngredientsAreFresh(ingredientIds)
console.log(resultat)
