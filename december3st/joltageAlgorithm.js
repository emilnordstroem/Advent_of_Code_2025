import { read } from 'fs'
import fs from 'fs/promises'

async function readInput () {
    const data = await fs.readFile('./input.txt', 'utf-8')
    const batteries = data.trim().split(/\s+/)    
    return batteries
}

function maximumJoltageForEachBank (batteriBanks, digitLimit) {
    let sum = 0

    for (const batteriBank of batteriBanks) {
        if (batteriBank.length === 0) {
            continue
        }
        let number = ''
        let lowerIndexLimit = 0

        for (let digitCounter = digitLimit; digitCounter > 0; digitCounter--) {
            const upperIndexLimit = batteriBank.length - (digitCounter - 1)

            const nextDigitIndex = highestJoltageForBatteryBank(
                lowerIndexLimit, 
                upperIndexLimit, 
                batteriBank
            )
            lowerIndexLimit = nextDigitIndex + 1
            number += batteriBank.charAt(nextDigitIndex)
        }

        sum += parseInt(number)
    }

    return sum
}

function highestJoltageForBatteryBank (low, high, batteriBank) {
    let highestDigitIndex = -1;
    let currentHighestJoltage = 0

    let currentIndex = low
    while (currentIndex < high) {
        const currentJoltage = parseInt(batteriBank.charAt(currentIndex))
        if (currentHighestJoltage < currentJoltage) {
            currentHighestJoltage = currentJoltage
            highestDigitIndex = currentIndex
        }
        currentIndex++
    }

    return highestDigitIndex
}

const batteries = await readInput()
const result = maximumJoltageForEachBank(batteries, 12)
console.log(result)

