import registry from "../registry"
registry.addElement(2023, 11, 2, (input: string) => new Solver(input).solution)

type Galaxy = { x: number, y: number }

class Solver {
    public readonly solution: string

    constructor(input: string) {
        console.log(input)
        const rows = input.split(/\n/).filter((e) => e !== "").map((line) => line.split(""))
        const emptyRows: number[] = []
        for (let y = rows.length - 1; y >= 0; y--) {
            const row = rows[y]
            const galaxy = row.find((element) => element !== ".")
            if (galaxy === undefined) {
                emptyRows.push(y)
            }
        }
        const emptyColumns: number[] = []
        for (let x = rows[0].length - 1; x >= 0; x--) {
            let found = false
            for (let y = rows.length - 1; y >= 0; y--) {
                if (rows[y][x] !== ".") {
                    found = true
                    break
                }
            }
            if (!found) {
                emptyColumns.push(x)
            }
        }
        const galaxies: Galaxy[] = []
        for (let x = rows[0].length - 1; x >= 0; x--) {
            for (let y = rows.length - 1; y >= 0; y--) {
                if (rows[y][x] !== ".") {
                    galaxies.push({ x, y })
                }
            }
        }
        let sum = 0
        for (let i = 0; i < galaxies.length; i++) {
            for (let j = i + 1; j < galaxies.length; j++) {
                const minX = Math.min(galaxies[i].x, galaxies[j].x)
                const maxX = Math.max(galaxies[i].x, galaxies[j].x)
                const minY = Math.min(galaxies[i].y, galaxies[j].y)
                const maxY = Math.max(galaxies[i].y, galaxies[j].y)
                const emptyColumnsBetween = emptyColumns.filter((x) => minX < x && x < maxX)
                const emptyRowsBetween = emptyRows.filter((y) => minY < y && y < maxY)
                sum += (Math.abs(galaxies[i].x - galaxies[j].x) + Math.abs(galaxies[i].y - galaxies[j].y) + emptyColumnsBetween.length * (1000000 - 1) + emptyRowsBetween.length * (1000000 - 1))
            }
        }
        console.log("result", sum)
        this.solution = `${sum}`
    }
}

export default Solver
