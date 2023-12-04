import * as lodash from "lodash"
import registry from "../registry"
registry[2023] = lodash.merge(registry[2023], {
    [4]: {
        [2]: (input: string) => new Solver(input).solution
    }
})

class Solver {
    public readonly solution: string

    constructor(input: string) {
        console.log(input)
        const lines = input.split(/\n/).filter((e) => e !== "")
        const factors = lines.map(() => 1)
        lines.forEach((line, index) => {
            const [winningString, myString] = line.split(":")[1].split("|")
            const winning: Set<string> = new Set(winningString.split(" ").filter((e) => e !== ""))
            const my: Set<string> = new Set(myString.split(" ").filter((e) => e !== ""))
            let matches = 0
            winning.forEach((element) => {
                if (my.has(element)) matches++
            })
            for (let i = 1; i <= matches; i++) {
                factors[index + i] += factors[index]
            }
        })
        let sum = 0
        factors.forEach((factor) => {
            sum += factor
        })
        console.log("result", sum)
        this.solution = `${sum}`
    }
}

export default Solver
