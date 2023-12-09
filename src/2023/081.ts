import registry from "../registry"
registry.addElement(2023, 8, 1, (input: string) => new Solver(input).solution)

type Map = { source: string, left: string, right: string }

class Solver {
    public readonly solution: string

    constructor(input: string) {
        console.log(input)
        const lines = input.split(/\n/).filter((e) => e !== "")
        const lrString = lines.shift()!
        const maps: Map[] = lines.map((line) => {
            const source = (line.split("=")[0].match(/\w/g) ?? []).join("")
            const left = (line.split("=")[1].split(",")[0].match(/\w/g) ?? []).join("")
            const right = (line.split("=")[1].split(",")[1].match(/\w/g) ?? []).join("")
            return { source, left, right }
        })
        let sum = 0
        let position = maps.find((map) => map.source === "AAA")!
        while (position.source !== "ZZZ") {
            const lr = lrString.charAt(sum % lrString.length)
            if (lr === "L") position = maps.find((map) => map.source === position.left)!
            else position = maps.find((map) => map.source === position.right)!
            sum++
        }
        console.log("result", sum)
        this.solution = `${sum}`
    }
}

export default Solver
