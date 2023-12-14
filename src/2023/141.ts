import registry from "../registry"
registry.addElement(2023, 14, 1, (input: string) => new Solver(input).solution)

class Solver {
    public readonly solution: string

    constructor(input: string) {
        console.log(input)
        const columns = input.split("\n").filter((e) => e !== "").map((column) => column.split(""))
        let sum = 0
        for (let y = 0; y < columns.length; y++) {
            for (let x = 0; x < columns[0].length; x++) {
                const char = columns[y][x]
                if (char === "O") {
                    for (let y2 = y - 1; y2 >= 0; y2--) {
                        const nextChar = columns[y2][x]
                        if (nextChar === ".") {
                            columns[y2 + 1][x] = "."
                            columns[y2][x] = "O"
                        } else {
                            sum += (columns.length - y2 - 1)
                            break
                        }
                        if (y2 === 0) {
                            sum += columns.length
                        }
                    }
                    if (y === 0) {
                        sum += columns.length
                    }
                }
            }
        }
        console.log("result", sum)
        this.solution = `${sum}`
    }
}

export default Solver
