import registry from "../registry"
registry.addElement(2023, 3, 1, (input: string) => new Solver(input).solution)

type StringElement = { string: string, x: number, y: number }

const areAdjacent = (a: StringElement, b: StringElement): boolean => {
    return Math.abs(a.y - b.y) <= 1
        && ((a.x - 1 <= b.x && b.x <= a.x + a.string.length) || (b.x <= a.x - 1 && a.x - 1 <= b.x + b.string.length - 1))
}

class Solver {
    public readonly solution: string

    constructor(input: string) {
        console.log(input)
        const lines = input.split(/\n/).filter((e) => e !== "")
        const numbers: StringElement[] = []
        const symbols: StringElement[] = []
        lines.forEach((line, y) => {
            let number = ""
            for(let x = 0; x < line.length; x++) {
                const char = line.charAt(x)
                if (char.match(/\d/)) {
                    number += char
                    if (x === line.length - 1) numbers.push({ x: x - number.length + 1, y, string: number })
                } else {
                    if (number !== "") numbers.push({ x: x - number.length, y, string: number })
                    if (char !== ".") symbols.push({ x, y, string: char })
                    number = ""
                }
            }
        })
        let sum = 0
        numbersLoop: for (let i = 0; i < numbers.length; i++) {
            for (let j = 0; j < symbols.length; j++) {
                if (areAdjacent(numbers[i], symbols[j])) {
                    sum += parseInt(numbers[i].string)
                    continue numbersLoop
                }
            }
        }
        console.log("result", sum)
        this.solution = `${sum}`
    }
}
