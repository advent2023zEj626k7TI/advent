import registry from "../registry"
registry.addElement(2023, 4, 1, (input: string) => new Solver(input).solution)

class Solver {
    public readonly solution: string

    constructor(input: string) {
        console.log(input)
        const lines = input.split(/\n/).filter((e) => e !== "")
        let sum = 0
        lines.forEach((line) => {
            const [winningString, myString] = line.split(":")[1].split("|")
            const winning: Set<string> = new Set(winningString.split(" ").filter((e) => e !== ""))
            const my: Set<string> = new Set(myString.split(" ").filter((e) => e !== ""))
            let matches = 0
            winning.forEach((element) => {
                if (my.has(element)) matches++
            })
            if (matches > 0) {
                sum += (Math.pow(2, matches - 1))
            }
        })
        console.log("result", sum)
        this.solution = `${sum}`
    }
}

export default Solver
