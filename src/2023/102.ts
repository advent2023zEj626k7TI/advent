import registry from "../registry"
registry.addElement(2023, 10, 2, (input: string) => new Solver(input).solution)

type LoopPipe = {
    x: number
    y: number
    char: string
    steps: number
    nextDirection: "north" | "west" | "south" | "east"
}

class Solver {
    public readonly solution: string

    private static readonly getNextPipe = (prevPipe: LoopPipe, grid: string[][]): LoopPipe => {
        const nextPipe: LoopPipe = { ...prevPipe }
        nextPipe.steps = prevPipe.steps + 1
        if (prevPipe.nextDirection === "north") {
            nextPipe.y = prevPipe.y - 1
            nextPipe.char = grid[nextPipe.y][nextPipe.x]
            if (nextPipe.char === "|") {
                nextPipe.nextDirection = "north"
            }
            if (nextPipe.char === "7") {
                nextPipe.nextDirection = "west"
            }
            if (nextPipe.char === "F") {
                nextPipe.nextDirection = "east"
            }
        }
        if (prevPipe.nextDirection === "west") {
            nextPipe.x = prevPipe.x - 1
            nextPipe.char = grid[nextPipe.y][nextPipe.x]
            if (nextPipe.char === "-") {
                nextPipe.nextDirection = "west"
            }
            if (nextPipe.char === "L") {
                nextPipe.nextDirection = "north"
            }
            if (nextPipe.char === "F") {
                nextPipe.nextDirection = "south"
            }
        }
        if (prevPipe.nextDirection === "south") {
            nextPipe.y = prevPipe.y + 1
            nextPipe.char = grid[nextPipe.y][nextPipe.x]
            if (nextPipe.char === "|") {
                nextPipe.nextDirection = "south"
            }
            if (nextPipe.char === "L") {
                nextPipe.nextDirection = "east"
            }
            if (nextPipe.char === "J") {
                nextPipe.nextDirection = "west"
            }
        }
        if (prevPipe.nextDirection === "east") {
            nextPipe.x = prevPipe.x + 1
            nextPipe.char = grid[nextPipe.y][nextPipe.x]
            if (nextPipe.char === "-") {
                nextPipe.nextDirection = "east"
            }
            if (nextPipe.char === "J") {
                nextPipe.nextDirection = "north"
            }
            if (nextPipe.char === "7") {
                nextPipe.nextDirection = "south"
            }
        }
        return nextPipe
    }

    constructor(input: string) {
        console.log(input)
        const grid = input.split(/\n/).filter((e) => e !== "").map((line) => line.split(""))
        const loopOnGrid: (LoopPipe | null)[][] = grid.map((line) => line.map(() => null))
        for (let x = 0; x < grid[0].length; x++) {
            for (let y = 0; y < grid.length; y++) {
                const char = grid[y][x]
                if (char === "S") {
                    // S only has two connections, so we can just follow them
                    const connectedNorth = y > 0 && ["|", "7", "F"].includes(grid[y - 1][x])
                    const connectedEast= x < grid[0].length - 1 && ["-", "J", "7"].includes(grid[y][x + 1])
                    const connectedSouth= y < grid.length - 1 && ["|", "L", "J"].includes(grid[y + 1][x])
                    const connectedWest= x > 0 && ["-", "L", "F"].includes(grid[y][x - 1])
                    const startPipe: LoopPipe = { x, y, char: "S", steps: 0, nextDirection: "north" }
                    if (connectedNorth && connectedSouth) {
                        startPipe.char = "|"
                        startPipe.nextDirection = "north"
                    }
                    if (connectedWest && connectedEast) {
                        startPipe.char = "-"
                        startPipe.nextDirection = "west"
                    }
                    if (connectedNorth && connectedEast) {
                        startPipe.char = "L"
                        startPipe.nextDirection = "north"
                    }
                    if (connectedNorth && connectedWest) {
                        startPipe.char = "J"
                        startPipe.nextDirection = "north"
                    }
                    if (connectedSouth && connectedWest) {
                        startPipe.char = "7"
                        startPipe.nextDirection = "south"
                    }
                    if (connectedSouth && connectedEast) {
                        startPipe.char = "F"
                        startPipe.nextDirection = "south"
                    }
                    loopOnGrid[y][x] = startPipe
                    let nextPipe = Solver.getNextPipe(startPipe, grid)
                    while (loopOnGrid[nextPipe.y][nextPipe.x] === null) {
                        loopOnGrid[nextPipe.y][nextPipe.x] = nextPipe
                        nextPipe = Solver.getNextPipe(nextPipe, grid)
                    }
                }
            }
        }
        let sum = 0
        for (let x = 0; x < loopOnGrid[0].length; x++) {
            for (let y = 0; y < loopOnGrid.length; y++) {
                const gridElement = loopOnGrid[y][x]
                if (gridElement === null) {
                    let count = 0
                    let prevBend = "-"
                    for (let y2 = y + 1; y2 < loopOnGrid.length; y2++) {
                        const testGridElement = loopOnGrid[y2][x]
                        if (testGridElement !== null) {
                            if (testGridElement.char === "-") count++
                            if (testGridElement.char === "7") prevBend = "7"
                            if (testGridElement.char === "F") prevBend = "F"
                            if (testGridElement.char === "L") {
                                if (prevBend === "7") count++
                                prevBend = "-"
                            }
                            if (testGridElement.char === "J") {
                                if (prevBend === "F") count++
                                prevBend = "-"
                            }
                        }
                    }
                    if (count % 2 === 1) {
                        sum++
                    }
                }
            }
        }
        console.log("result", sum)
        this.solution = `${sum}`
    }
}

export default Solver
