import registry from "../registry"
registry.addElement(2023, 11, 1, (input: string) => new Solver(input).solution)

type Galaxy = { x: number, y: number }

class Solver {
    public readonly solution: string

    constructor(input: string) {
        console.log(input)
        const rows = input.split(/\n/).filter((e) => e !== "").map((line) => line.split(""))
        for (let y = rows.length - 1; y >= 0; y--) {
            const row = rows[y]
            const galaxy = row.find((element) => element !== ".")
            if (galaxy === undefined) {
                const newRow = row.map(() => ".")
                rows.splice(y, 0, newRow)
            }
        }
        for (let x = rows[0].length - 1; x >= 0; x--) {
            let found = false
            for (let y = rows.length - 1; y >= 0; y--) {
                if (rows[y][x] !== ".") {
                    found = true
                    break
                }
            }
            if (!found) {
                for (let y = rows.length - 1; y >= 0; y--) {
                    rows[y].splice(x, 0, ".")
                }
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
                sum += (Math.abs(galaxies[i].x - galaxies[j].x) + Math.abs(galaxies[i].y - galaxies[j].y))
            }
        }
        console.log("result", sum)
        this.solution = `${sum}`
    }
}

export default Solver
