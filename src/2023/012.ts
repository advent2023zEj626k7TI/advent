import * as lodash from "lodash"
import registry from "../registry"
registry[2023] = lodash.merge(registry[2023], {
    [1]: {
        [2]: (input: string) => new Solver(input).solution
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

const digits = ["one", "two", "three", "four", "five", "six", "seven", "eight", "nine"]
const revDigits = digits.map((string) => new MyString(string).revert())

class Solver {
    public readonly solution: string

    private static readonly getValue = (digitString: string): string => {
        const index = digits.indexOf(digitString) + 1
        if (index > 0) return `${index}`
        return digitString
    }

    constructor(input: string) {
        console.log(input)
        let lines = input.split(/\n/).filter((e) => e !== "").map((string) => new MyString(string))
        let sum = 0
        lines.forEach((line) => {
            const regexp1 = new RegExp(`(\\d|${digits.join("|")})`);
            const firstDigit = Solver.getValue((line.match(regexp1) ?? ["0"])[0])
            const regexp2 = new RegExp(`(\\d|${revDigits.join("|")})`);
            const lastDigit = Solver.getValue(new MyString((line.revert().match(regexp2) ?? ["0"])[0]).revert())
            const number = parseInt(firstDigit + lastDigit)
            sum += number
        })
        console.log("result", sum)
        this.solution = `${sum}`
    }
}

export default Solver
