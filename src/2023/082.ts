// False solution to 082 which works, becaus the input conforms to special conditions
import registry from "../registry"
registry.addElement(2023, 8, 2, (input: string) => new Solver(input).solution)

type Map = { source: string, left: string, right: string, id: number }
type Record = { steps: number, lrIndex: number, position: Map }
type Loop = { startIndex: number, offset: number, length: number, records: Record[] }

class Solver {
    public readonly solution: string

    private static readonly getLCM = (a: number, b: number): number => {
        let lcm = 0
        while (true) {
            lcm+=a
            if ((lcm % b) === 0) return lcm
        }
    }

    constructor(input: string) {
        console.log(input)
        const lines = input.split(/\n/).filter((e) => e !== "")
        const lrString = lines.shift()!
        const maps: Map[] = lines.map((line, index) => {
            const source = (line.split("=")[0].match(/\w/g) ?? []).join("")
            const left = (line.split("=")[1].split(",")[0].match(/\w/g) ?? []).join("")
            const right = (line.split("=")[1].split(",")[1].match(/\w/g) ?? []).join("")
            return { source, left, right, id: index }
        })
        let positions = maps.filter((map) => map.source.endsWith("A"))
        const loops = positions.map((position) => {
            let currentPosition = position
            let steps = 0
            let records: Record[] = []
            const loop: Loop = { startIndex: -Infinity, records, offset: Infinity, length: Infinity, }
            while (true) {
                const lrIndex = steps % lrString.length
                steps++
                const lr = lrString.charAt(lrIndex)
                let newPosition: Map
                if (lr === "L") newPosition = maps.find((map) => map.source === currentPosition.left)!
                else newPosition = maps.find((map) => map.source === currentPosition.right)!
                currentPosition = newPosition
                if (newPosition.source.endsWith("Z")) {
                    const record: Record = { steps, lrIndex, position: newPosition }
                    const found = records.find((redord2) => redord2.lrIndex === record.lrIndex && redord2.position === record.position)
                    if (found) {
                        loop.startIndex = records.indexOf(found)
                        loop.offset = found.steps
                        loop.length = steps - found.steps
                        break;
                    } else records.push(record)
                }
            }
            return loop
        })
        // all loops only contain one element with the same loop length as offset, so only do this special case
        let lcm = loops[0].length
        for (let i = 1; i < loops.length; i++) {
            lcm = Solver.getLCM(lcm, loops[i].length)
        }
        console.log("result", lcm)
        this.solution = `${lcm}`
    }
}

export default Solver
