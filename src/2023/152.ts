import registry from "../registry"
registry.addElement(2023, 15, 2, (input: string) => new Solver(input).solution)

type Lense = { label: string, length: string }

class Solver {
    public readonly solution: string

    constructor(input: string) {
        console.log(input)
        const steps = input.replaceAll("\n", "").split(",").filter((e) => e !== "")
        const boxes: Lense[][] = []
        for (let i = 0; i < 265; i++) {
            boxes.push([])
        }
        steps.forEach((step) => {
            const [label, sign, length] = step.split(/(-|=)/)
            let HASH = 0
            for (let i = 0; i < label.length; i++) {
                HASH += label.charCodeAt(i)
                HASH = (HASH * 17) % 256
            }
            if (sign === "-") {
                boxes[HASH] = boxes[HASH].filter((lens) => lens.label !== label)
            } else {
                const lens = boxes[HASH].find((lens2) => lens2.label === label)
                if (lens) lens.length = length
                else boxes[HASH].push({ label, length })
            }
        })
        let sum = 0
        boxes.forEach((box, boxIndex) => {
            box.forEach((lens, lensIndex) => {
                sum += ((boxIndex + 1) * (lensIndex + 1) * parseInt(lens.length))
            })
        })
        console.log("result", sum)
        this.solution = `${sum}`
    }
}

export default Solver
