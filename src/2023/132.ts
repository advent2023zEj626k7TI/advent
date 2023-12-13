import registry from "../registry"
registry.addElement(2023, 13, 2, (input: string) => new Solver(input).solution)

class Solver {
    public readonly solution: string

    constructor(input: string) {
        console.log(input)
        const patterns = input.split("\n\n").filter((e) => e !== "")
        let sum = 0
        patterns.forEach((pattern) => {
            const rows = pattern.split("\n").filter((e) => e !== "").map((row) => row.split(""))
            let positionFound = 0
            positionLoop: for (let i = 1; i < rows[0].length; i++) {
                let errorCount = 0
                mirrorLoop: for (let j = i - 1; j >= 0; j--) {
                    const k = 2 * i - j - 1
                    if (k >= rows[0].length) break mirrorLoop
                    for (let l = 0; l < rows.length; l++) {
                        if (rows[l][j] !== rows[l][k]) {
                            errorCount++
                            if (errorCount > 1) continue positionLoop
                        }
                    }
                }
                if (errorCount === 1) {
                    positionFound = i
                    break positionLoop
                }
            }
            sum += positionFound
            if (positionFound > 0) return
            positionLoop: for (let i = 1; i < rows.length; i++) {
                let errorCount = 0
                mirrorLoop: for (let j = i - 1; j >= 0; j--) {
                    const k = 2 * i - j - 1
                    if (k >= rows.length)  break mirrorLoop
                    for (let l = 0; l < rows[0].length; l++) {
                        if (rows[j][l] !== rows[k][l]) {
                            errorCount++
                            if (errorCount > 1) continue positionLoop
                        }
                    }
                }
                if (errorCount === 1) {
                    positionFound = i
                    break positionLoop
                }
            }
            sum += (positionFound * 100)
        })
        console.log("result", sum)
        this.solution = `${sum}`
    }
}

export default Solver
