import registry from "../registry"
registry.addElement(2023, 15, 1, (input: string) => new Solver(input).solution)

class Solver {
    public readonly solution: string

    constructor(input: string) {
        console.log(input)
        const steps = input.replaceAll("\n", "").split(",").filter((e) => e !== "")
        let sum = 0
        steps.forEach((step) => {
            let HASH = 0
            for (let i = 0; i < step.length; i++) {
                HASH += step.charCodeAt(i)
                HASH = (HASH * 17) % 256
            }
            sum += HASH
        })
        console.log("result", sum)
        this.solution = `${sum}`
    }
}

export default Solver
