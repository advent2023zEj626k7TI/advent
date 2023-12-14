import registry from "../registry"
registry.addElement(2023, 14, 2, (input: string) => new Solver(input).solution)

class Solver {
    public readonly solution: string

    private static readonly cycleRows = (rows: string[][]): string[][] => {
        const newRows = rows.map((row) => [...row])
        for (let y = 0; y < newRows.length; y++) {
            for (let x = 0; x < newRows[0].length; x++) {
                const char = newRows[y][x]
                if (char === "O") {
                    for (let y2 = y - 1; y2 >= 0; y2--) {
                        const nextChar = newRows[y2][x]
                        if (nextChar === ".") {
                            newRows[y2 + 1][x] = "."
                            newRows[y2][x] = "O"
                        } else {
                            break
                        }
                    }
                }
            }
        }
        for (let x = 0; x < newRows[0].length; x++) {
            for (let y = 0; y < newRows.length; y++) {
                const char = newRows[y][x]
                if (char === "O") {
                    for (let x2 = x - 1; x2 >= 0; x2--) {
                        const nextChar = newRows[y][x2]
                        if (nextChar === ".") {
                            newRows[y][x2 + 1] = "."
                            newRows[y][x2] = "O"
                        } else {
                            break
                        }
                    }
                }
            }
        }
        for (let y = newRows.length - 1; y >= 0; y--) {
            for (let x = 0; x < newRows[0].length; x++) {
                const char = newRows[y][x]
                if (char === "O") {
                    for (let y2 = y + 1; y2 < newRows.length; y2++) {
                        const nextChar = newRows[y2][x]
                        if (nextChar === ".") {
                            newRows[y2 - 1][x] = "."
                            newRows[y2][x] = "O"
                        } else {
                            break
                        }
                    }
                }
            }
        }
        for (let x = newRows[0].length - 1; x >= 0; x--) {
            for (let y = 0; y < newRows.length; y++) {
                const char = newRows[y][x]
                if (char === "O") {
                    for (let x2 = x + 1; x2 < newRows[0].length; x2++) {
                        const nextChar = newRows[y][x2]
                        if (nextChar === ".") {
                            newRows[y][x2 - 1] = "."
                            newRows[y][x2] = "O"
                        } else {
                            break
                        }
                    }
                }
            }
        }
        return newRows
    }

    constructor(input: string) {
        console.log(input)
        const rows = input.split("\n").filter((e) => e !== "").map((column) => column.split(""))
        let newRows = rows
        let loopStart = 0
        let loopLength = 0
        const storedRowss: string[][][] = [newRows]
        cycleLoop: for (let i = 1; i <= 1000000000; i++) {
            newRows = Solver.cycleRows(newRows)
            rowsLoop: for (let j = 0; j < storedRowss.length; j++) {
                const storedRows = storedRowss[j]
                for (let y = 0; y < newRows.length; y++) {
                    for (let x = 0; x < newRows[0].length; x++) {
                        if (newRows[y][x] !== storedRows[y][x]) {
                            continue rowsLoop
                        }
                    }
                }
                loopStart = j
                loopLength = i - loopStart
                break cycleLoop
            }
            storedRowss.push(newRows)
        }
        let resultRows = newRows
        if (loopLength > 0) {
            const remainder = (1000000000 - loopStart) % loopLength
            resultRows = storedRowss[loopStart + remainder]
        }
        let sum = 0
        for (let y = 0; y < resultRows.length; y++) {
            for (let x = 0; x < resultRows[0].length; x++) {
                const char = resultRows[y][x]
                if (char === "O") {
                    sum += (resultRows.length - y)
                }
            }
        }
        console.log("result", sum)
        this.solution = `${sum}`
    }
}

export default Solver
