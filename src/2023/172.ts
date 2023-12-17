import registry from "../registry"
registry.addElement(2023, 17, 2, (input: string) => new Solver(input).solution)

type Best = { direction: "up" | "down" | "left" | "right", stepsRemaining: number, lossSoFar: number, x: number, y: number }

class GridElement {
    public readonly loss: number
    public best: Best[] = []

    public constructor(loss: number) {
        this.loss = loss
    }

    public addBest(checkBest: Best): boolean {
        const newBest: Best[] = []
        for (let i = 0; i < this.best.length; i++) {
            const best = this.best[i]
            if (checkBest.direction !== best.direction) {
                newBest.push(best)
                continue
            }
            if (best.stepsRemaining === checkBest.stepsRemaining && best.lossSoFar <= checkBest.lossSoFar) {
                return false
            }
            if (best.stepsRemaining === checkBest.stepsRemaining && best.lossSoFar > checkBest.lossSoFar) {
                continue
            }
            if (best.stepsRemaining > 6 || checkBest.stepsRemaining > 6) {
                newBest.push(best)
                continue
            }
            if (best.stepsRemaining >= checkBest.stepsRemaining && best.lossSoFar <= checkBest.lossSoFar) {
                return false
            }
            if (best.stepsRemaining > checkBest.stepsRemaining) {
                newBest.push(best)
                continue
            }
            if (best.lossSoFar < checkBest.lossSoFar) {
                newBest.push(best)
                continue
            }
        }
        newBest.push(checkBest)
        this.best = newBest
        return true
    }
}

class Solver {
    public readonly solution: string

    private static readonly getNewBest = (grid: GridElement[][], best: Best): Best[] => {
        const newBest: Best[] = []
        if (best.x < 0 || best.y < 0 || best.x >= grid[0].length || best.y >= grid.length) return newBest
        const gridElement = grid[best.y][best.x]
        if (best.stepsRemaining <= 6 && best.y >= 3 && (best.direction === "left" || best.direction === "right")) {
            {
                const checkBest: Best = { ...best, direction: "up", stepsRemaining: 10, lossSoFar: best.lossSoFar + gridElement.loss }
                newBest.push(checkBest)
            }
        }
        if (best.stepsRemaining > 0 && best.direction === "up") {
            const checkBest: Best = { ...best, lossSoFar: best.lossSoFar + gridElement.loss }
            newBest.push(checkBest)
        }
        if (best.stepsRemaining <= 6 && best.x >= 3 && (best.direction === "up" || best.direction === "down")) {
            {
                const checkBest: Best = { ...best, direction: "left", stepsRemaining: 10, lossSoFar: best.lossSoFar + gridElement.loss }
                newBest.push(checkBest)
            }
        }
        if (best.stepsRemaining > 0 && best.direction === "left") {
            const checkBest: Best = { ...best, lossSoFar: best.lossSoFar + gridElement.loss }
            newBest.push(checkBest)
        }
        if (best.stepsRemaining <= 6 && best.y <= grid.length - 5 && (best.direction === "left" || best.direction === "right")) {
            {
                const checkBest: Best = { ...best, direction: "down", stepsRemaining: 10, lossSoFar: best.lossSoFar + gridElement.loss }
                newBest.push(checkBest)
            }
        }
        if (best.stepsRemaining > 0 && best.direction === "down") {
            const checkBest: Best = { ...best, lossSoFar: best.lossSoFar + gridElement.loss }
            newBest.push(checkBest)
        }
        if (best.stepsRemaining <= 6 && best.x <= grid[0].length - 5 && (best.direction === "up" || best.direction === "down")) {
            {
                const checkBest: Best = { ...best, direction: "right", stepsRemaining: 10, lossSoFar: best.lossSoFar + gridElement.loss }
                newBest.push(checkBest)
            }
        }
        if (best.stepsRemaining > 0 && best.direction === "right") {
            const checkBest: Best = { ...best, lossSoFar: best.lossSoFar + gridElement.loss }
            newBest.push(checkBest)
        }
        return newBest
    }

    constructor(input: string) {
        const startTime = Date.now()
        console.log(input)
        const grid = input.split(/\n/).filter((e) => e !== "").map((line) => line.split("").map((loss) => new GridElement(parseInt(loss))))
        const start: Best = { direction: "right", stepsRemaining: 10, lossSoFar: 0, x: 0, y: 0 }
        const start2: Best = { direction: "down", stepsRemaining: 10, lossSoFar: 0, x: 0, y: 0 }
        let bestResult = Infinity
        let bestToCheck = [start, start2]
        while (bestToCheck.length > 0) {
            const checkBest = bestToCheck.pop()!
            const gridElement = grid[checkBest.y][checkBest.x]
            if (bestResult > checkBest.lossSoFar) {
                if (checkBest.x === grid[0].length - 1 && checkBest.y === grid.length - 1) {
                    bestResult = Math.min(bestResult, checkBest.lossSoFar)
                } else if (gridElement.addBest(checkBest)) {
                    switch (checkBest.direction) {
                        case "right": {
                            bestToCheck = bestToCheck.concat(Solver.getNewBest(grid, {
                                direction: checkBest.direction,
                                stepsRemaining: checkBest.stepsRemaining - 1,
                                lossSoFar: checkBest.lossSoFar,
                                x: checkBest.x + 1,
                                y: checkBest.y,
                            }))
                            break;
                        }
                        case "down": {
                            bestToCheck = bestToCheck.concat(Solver.getNewBest(grid, {
                                direction: checkBest.direction,
                                stepsRemaining: checkBest.stepsRemaining - 1,
                                lossSoFar: checkBest.lossSoFar,
                                x: checkBest.x,
                                y: checkBest.y + 1,
                            }))
                            break;
                        }
                        case "left": {
                            bestToCheck = bestToCheck.concat(Solver.getNewBest(grid, {
                                direction: checkBest.direction,
                                stepsRemaining: checkBest.stepsRemaining - 1,
                                lossSoFar: checkBest.lossSoFar,
                                x: checkBest.x - 1,
                                y: checkBest.y,
                            }))
                            break;
                        }
                        case "up": {
                            bestToCheck = bestToCheck.concat(Solver.getNewBest(grid, {
                                direction: checkBest.direction,
                                stepsRemaining: checkBest.stepsRemaining - 1,
                                lossSoFar: checkBest.lossSoFar,
                                x: checkBest.x,
                                y: checkBest.y - 1,
                            }))
                            break;
                        }
                    }
                }
            }
        }
        console.log("result", bestResult)
        this.solution = `${bestResult}`
        console.log("runtime", Date.now() - startTime)
    }
}

export default Solver
