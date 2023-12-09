import registry from "../registry"
registry.addElement(2023, 9, 1, (input: string) => new Solver(input).solution)

class Solver {
    public readonly solution: string

    constructor(input: string) {
        console.log(input)
        const histories = input.split(/\n/).filter((e) => e !== "")
        const stacks: number[][][] = histories.map((history) => {
            const stack: number[][] = []
            let line = history.split(" ").map((string) => parseInt(string))
            stack.push(line)
            while(line.find((element) => element !== 0) !== undefined) {
                const nextLine: number[] = []
                line.forEach((element, index) => {
                    if (index > 0) {
                        const prevElement = line[index - 1]
                        nextLine.push(element - prevElement)
                    }
                })
                line = nextLine
                stack.push(line)
            }
            return stack
        })
        let sum = 0
        stacks.forEach((stack) => {
            stack[stack.length - 1].push(0)
            for (let i = stack.length - 2; i >= 0; i--) {
                const line = stack[i]
                const prevLine = stack[i + 1]
                line.push(line[line.length - 1] + prevLine[prevLine.length - 1])
            }
            const line = stack[0]
            sum += line[line.length - 1]
        })
        console.log("result", sum)
        this.solution = `${sum}`
    }
}

export default Solver
