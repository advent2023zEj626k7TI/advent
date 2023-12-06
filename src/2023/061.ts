import registry from "../registry"
registry.addElement(2023, 6, 1, (input: string) => new Solver(input).solution)

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
        const times = (lines[0].split(":")[1]).split(" ").filter((e) => e !== "").map((string) => parseInt(string))
        const recordDistances = (lines[1].split(":")[1]).split(" ").filter((e) => e !== "").map((string) => parseInt(string))
        // map distance by timeHeld
        // distance(timeHeld) = timeHeld * (time - timeHeld) = timeHeld * time - timeHeld^2
        // solve: - timeHeld^2 + time * timeHeld - recordDistance = 0
        let product = 1
        times.forEach((time, index) => {
            const recordDistance = recordDistances[index]
            // I hope there are no rounding problems :S
            const [timeHeld1, timeHeld2] = Solver.solveQuadraticEquation(-1, time, -recordDistance)
            let timeHeldMin = Math.ceil(timeHeld1)
            if (timeHeldMin === timeHeld1) timeHeldMin++
            let timeHeldMax = Math.floor(timeHeld2)
            if (timeHeldMax === timeHeld2) timeHeldMax--
            product *= (timeHeldMax - timeHeldMin + 1)
        })
        console.log("result", product)
        this.solution = `${product}`
    }
}

export default Solver
