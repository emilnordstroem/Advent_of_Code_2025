import fs from 'fs/promises'

async function readInput () {
    const data = await fs.readFile('./input.txt', 'utf-8')
    const clockPositionInstructions = data.trim().split(/\s+/)    
    return clockPositionInstructions
}

class Clock {

    constructor(from, to, currentPosition) {
        this.total = to - from + 1
        this.currentPosition = currentPosition
    }

    rotateLeftBy (numberOfClicks) {
        this.currentPosition = ((this.currentPosition - numberOfClicks) % this.total + this.total) % this.total
    }

    rotateRightBy (numberOfClicks) {
        this.currentPosition = (this.currentPosition + numberOfClicks) % this.total
    }

}

// Part One
async function clockPositionAlgorithm (target) {
    const clock = new Clock(0, 99, 50)
    const rotationInstructions = await readInput()

    let hitTargetCounter = 0

    for (const rotationInstruction of rotationInstructions) {
        const rotationDirection = rotationInstruction.charAt(0)
        const numberOfClicks = parseInt(rotationInstruction.slice(1))

        if (rotationDirection.toLocaleUpperCase() === 'L') {
            clock.rotateLeftBy(numberOfClicks)
        } else if (rotationDirection.toUpperCase() === 'R') {
            clock.rotateRightBy(numberOfClicks)
        }
        
        if (clock.currentPosition === target) {
            hitTargetCounter++
        }
    }

    return hitTargetCounter
}

const resultPartOne = await clockPositionAlgorithm(0)
console.log(resultPartOne);
