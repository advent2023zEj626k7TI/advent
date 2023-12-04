import * as lodash from "lodash"
import registry from "../registry"
registry[2023] = lodash.merge(registry[2023], {
    [1]: {
        [1]: (input: string) => new Solver(input).solution
    }
})

class MyString extends String {
    public readonly revert = (): string => {
        let result = ""
        for (let i = this.length - 1; i >= 0; i--) {
            result += this.charAt(i)
        }
        return result
    }
}

class Solver {
    public readonly solution: string

    constructor(input: string) {
        console.log(input)
        let lines = input.split(/\n/).filter((e) => e !== "").map((string) => new MyString(string))
        let sum = 0
        lines.forEach((line) => {
            const firstDigit = (line.match(/\d/) ?? ["0"])[0]
            const lastDigit = (line.revert().match(/\d/) ?? ["0"])[0]
            const number = parseInt(firstDigit + lastDigit)
            sum += number
        })
        console.log("result", sum)
        this.solution = `${sum}`
    }
}

export default Solver
