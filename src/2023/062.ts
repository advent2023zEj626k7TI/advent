import registry from "../registry"
registry.addElement(2023, 6, 2, (input: string) => new Solver(input).solution)

class Solver {
    public readonly solution: string

    private static readonly solveQuadraticEquation = (a: number, b: number, c: number): [number, number] => {
        const D = Math.pow(b, 2) - 4 * a * c
        const d = Math.sqrt(D)
        const x1 = (-b + d) / (2 * a)
        const x2 = (-b - d) / (2 * a)
        return [x1, x2]
    }

    constructor(input: string) {
        console.log(input)
        const lines = input.split(/\n/).filter((e) => e !== "")
        const time = parseInt((lines[0].match(/\d/g) ?? []).join(""))
        const recordDistance = parseInt((lines[1].match(/\d/g) ?? []).join(""))
        // map distance by timeHeld
        // distance(timeHeld) = timeHeld * (time - timeHeld) = timeHeld * time - timeHeld^2
        // solve: - timeHeld^2 + time * timeHeld - recordDistance = 0
        // I hope there are no rounding problems :S
        const [timeHeld1, timeHeld2] = Solver.solveQuadraticEquation(-1, time, -recordDistance)
        let timeHeldMin = Math.ceil(timeHeld1)
        if (timeHeldMin === timeHeld1) timeHeldMin++
        let timeHeldMax = Math.floor(timeHeld2)
        if (timeHeldMax === timeHeld2) timeHeldMax--
        const result = (timeHeldMax - timeHeldMin + 1)
        console.log("result", result)
        this.solution = `${result}`
    }
}

export default Solver
