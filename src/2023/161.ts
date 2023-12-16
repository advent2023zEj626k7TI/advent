import registry from "../registry"
registry.addElement(2023, 16, 1, (input: string) => new Solver(input).solution)

type GridElement = {
    char: string
    beamRight: boolean
    beamUp: boolean
    beamLeft: boolean
    beamDown: boolean
}

class Solver {
    public readonly solution: string

    private static readonly completeBeam = (grid: GridElement[][], x: number, y: number, direction: "beamRight" | "beamUp" | "beamLeft" | "beamDown"): void => {
        const gridElement = grid[y]?.[x]
        if (gridElement === undefined || gridElement[direction]) return
        gridElement[direction] = true
        switch (gridElement.char) {
            case ".": {
                switch (direction) {
                    case "beamRight": {
                        Solver.completeBeam(grid, x + 1, y, direction)
                        break;
                    }
                    case "beamUp": {
                        Solver.completeBeam(grid, x, y - 1, direction)
                        break;
                    }
                    case "beamLeft": {
                        Solver.completeBeam(grid, x - 1, y, direction)
                        break;
                    }
                    case "beamDown": {
                        Solver.completeBeam(grid, x, y + 1, direction)
                        break;
                    }
                }
                break;
            }
            case "|": {
                switch (direction) {
                    case "beamRight": {
                        Solver.completeBeam(grid, x, y - 1, "beamUp")
                        Solver.completeBeam(grid, x, y + 1, "beamDown")
                        break;
                    }
                    case "beamUp": {
                        Solver.completeBeam(grid, x, y - 1, direction)
                        break;
                    }
                    case "beamLeft": {
                        Solver.completeBeam(grid, x, y - 1, "beamUp")
                        Solver.completeBeam(grid, x, y + 1, "beamDown")
                        break;
                    }
                    case "beamDown": {
                        Solver.completeBeam(grid, x, y + 1, direction)
                        break;
                    }
                }
                break;
            }
            case "-": {
                switch (direction) {
                    case "beamRight": {
                        Solver.completeBeam(grid, x + 1, y, direction)
                        break;
                    }
                    case "beamUp": {
                        Solver.completeBeam(grid, x - 1, y, "beamLeft")
                        Solver.completeBeam(grid, x + 1, y, "beamRight")
                        break;
                    }
                    case "beamLeft": {
                        Solver.completeBeam(grid, x - 1, y, direction)
                        break;
                    }
                    case "beamDown": {
                        Solver.completeBeam(grid, x - 1, y, "beamLeft")
                        Solver.completeBeam(grid, x + 1, y, "beamRight")
                        break;
                    }
                }
                break;
            }
            case "/": {
                switch (direction) {
                    case "beamRight": {
                        Solver.completeBeam(grid, x, y - 1, "beamUp")
                        break;
                    }
                    case "beamUp": {
                        Solver.completeBeam(grid, x + 1, y, "beamRight")
                        break;
                    }
                    case "beamLeft": {
                        Solver.completeBeam(grid, x, y + 1, "beamDown")
                        break;
                    }
                    case "beamDown": {
                        Solver.completeBeam(grid, x - 1, y, "beamLeft")
                        break;
                    }
                }
                break;
            }
            case "\\": {
                switch (direction) {
                    case "beamRight": {
                        Solver.completeBeam(grid, x, y + 1, "beamDown")
                        break;
                    }
                    case "beamUp": {
                        Solver.completeBeam(grid, x - 1, y, "beamLeft")
                        break;
                    }
                    case "beamLeft": {
                        Solver.completeBeam(grid, x, y - 1, "beamUp")
                        break;
                    }
                    case "beamDown": {
                        Solver.completeBeam(grid, x + 1, y, "beamRight")
                        break;
                    }
                }
                break;
            }
        }
    }

    constructor(input: string) {
        console.log(input)
        const grid: GridElement[][] = input.split("\n").filter((e) => e !== "").map((row) => row.split("").map((char) => {
            return {
                char,
                beamRight: false,
                beamUp: false,
                beamLeft: false,
                beamDown: false,
            }
        }))
        Solver.completeBeam(grid, 0, 0, "beamRight")
        let sum = 0
        grid.forEach((row) => {
            row.forEach((gridElement) => {
                if (gridElement.beamRight || gridElement.beamUp || gridElement.beamLeft || gridElement.beamDown) sum++
            })
        })
        console.log("result", sum)
        this.solution = `${sum}`
    }
}

export default Solver
