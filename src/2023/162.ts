import registry from "../registry"
registry.addElement(2023, 16, 2, (input: string) => new Solver(input).solution)

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
        let grid: GridElement[][] = input.split("\n").filter((e) => e !== "").map((row) => row.split("").map((char) => {
            return {
                char,
                beamRight: false,
                beamUp: false,
                beamLeft: false,
                beamDown: false,
            }
        }))
        let max = 0
        grid.forEach((_row, y) => {
            grid = input.split("\n").filter((e) => e !== "").map((row) => row.split("").map((char) => {
                return {
                    char,
                    beamRight: false,
                    beamUp: false,
                    beamLeft: false,
                    beamDown: false,
                }
            }))
            let sum = 0
            Solver.completeBeam(grid, 0, y, "beamRight")
            grid.forEach((row) => {
                row.forEach((gridElement) => {
                    if (gridElement.beamRight || gridElement.beamUp || gridElement.beamLeft || gridElement.beamDown) sum++
                })
            })
            max = Math.max(max, sum)

            grid = input.split("\n").filter((e) => e !== "").map((row) => row.split("").map((char) => {
                return {
                    char,
                    beamRight: false,
                    beamUp: false,
                    beamLeft: false,
                    beamDown: false,
                }
            }))
            sum = 0
            Solver.completeBeam(grid, grid[0].length - 1, y, "beamLeft")
            grid.forEach((row) => {
                row.forEach((gridElement) => {
                    if (gridElement.beamRight || gridElement.beamUp || gridElement.beamLeft || gridElement.beamDown) sum++
                })
            })
            max = Math.max(max, sum)
        })
        grid[0].forEach((_col, x) => {
            grid = input.split("\n").filter((e) => e !== "").map((row) => row.split("").map((char) => {
                return {
                    char,
                    beamRight: false,
                    beamUp: false,
                    beamLeft: false,
                    beamDown: false,
                }
            }))
            let sum = 0
            Solver.completeBeam(grid, x, 0, "beamDown")
            grid.forEach((row) => {
                row.forEach((gridElement) => {
                    if (gridElement.beamRight || gridElement.beamUp || gridElement.beamLeft || gridElement.beamDown) sum++
                })
            })
            max = Math.max(max, sum)

            grid = input.split("\n").filter((e) => e !== "").map((row) => row.split("").map((char) => {
                return {
                    char,
                    beamRight: false,
                    beamUp: false,
                    beamLeft: false,
                    beamDown: false,
                }
            }))
            sum = 0
            Solver.completeBeam(grid, x, grid.length - 1, "beamLeft")
            grid.forEach((row) => {
                row.forEach((gridElement) => {
                    if (gridElement.beamRight || gridElement.beamUp || gridElement.beamLeft || gridElement.beamDown) sum++
                })
            })
            max = Math.max(max, sum)
        })
        console.log("result", max)
        this.solution = `${max}`
    }
}

export default Solver
