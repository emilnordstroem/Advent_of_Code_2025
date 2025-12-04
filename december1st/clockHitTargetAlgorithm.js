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

    leftRotationalDistanceTo (target) {
        return (this.currentPosition - target + this.total) % this.total
    }

    leftRotationEncounter (numberOfClicks, target){
        if (numberOfClicks === 0) return 0;
    
        const distanceToTarget = this.leftRotationalDistanceTo(target)
        
        if (distanceToTarget > numberOfClicks) {
            return 0
        } else if (distanceToTarget === 0) {
            return Math.floor(numberOfClicks / this.total)
        }
        
        return Math.floor((numberOfClicks - distanceToTarget) / this.total) + 1
    }

    rotateRightBy (numberOfClicks) {
        this.currentPosition = (this.currentPosition + numberOfClicks) % this.total
    }

    rightRotationalDistanceTo (target) {
        return (target - this.currentPosition + this.total) % this.total
    }

    rightRotationEncounter (numberOfClicks, target){
        if (numberOfClicks === 0) return 0;
    
        const distanceToTarget = this.rightRotationalDistanceTo(target)
        
        if (distanceToTarget > numberOfClicks) {
            return 0
        } else if (distanceToTarget === 0) {
            return Math.floor(numberOfClicks / this.total)
        }
        
        return Math.floor((numberOfClicks - distanceToTarget) / this.total) + 1
    }

}

// Part Two
async function clockHitTargetAlgorithm (target) {
    const clock = new Clock(0, 99, 50)
    const rotationInstructions = await readInput()

    let counter = 0

    for (const rotationInstruction of rotationInstructions) {

        const rotationDirection = rotationInstruction.charAt(0)
        const numberOfClicks = parseInt(rotationInstruction.slice(1))

        if (rotationDirection.toLocaleUpperCase() === 'L') {
            counter += clock.leftRotationEncounter(numberOfClicks, target)
            clock.rotateLeftBy(numberOfClicks)
        } else if (rotationDirection.toUpperCase() === 'R') {
            counter += clock.rightRotationEncounter(numberOfClicks, target)
            clock.rotateRightBy(numberOfClicks)
        }

    }

    return counter
}

const resultPartOne = await clockHitTargetAlgorithm(0)
console.log(resultPartOne);