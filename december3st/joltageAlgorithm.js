import { read } from 'fs'
import fs from 'fs/promises'

async function readInput () {
    const data = await fs.readFile('./input.txt', 'utf-8')
    const batteries = data.trim().split(/\s+/)    
    return batteries
}

function maximumJoltageForEachBank (batteriBanks) {
    let sum = 0

    for (const batteriBank of batteriBanks) {
        if (batteriBank.length !== 0) {
            
            let firstDigitIndex = highestJoltageForBatteryBank(
                0, 
                batteriBank.length - 1, 
                batteriBank
            )
            let secondDigitIndex = highestJoltageForBatteryBank(
                firstDigitIndex + 1,
                batteriBank.length,
                batteriBank
            )
            const number = String(
                batteriBank.charAt(firstDigitIndex) + batteriBank.charAt(secondDigitIndex)
            )

            sum += parseInt(number)
        }
    }

    return sum
}

function highestJoltageForBatteryBank (low, high, batteriBank) {
    let highestDigitIndex = low;
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
const result = maximumJoltageForEachBank(batteries)
console.log(result)

