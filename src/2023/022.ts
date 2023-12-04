import registry from "../registry"
registry.addElement(2023, 2, 2, (input: string) => new Solver(input).solution)

type Round = { red: number, green: number, blue: number }

class Solver {
    public readonly solution: string

    constructor(input: string) {
        console.log(input)
        const games = input.split(/\n/).filter((e) => e !== "")
        let sum = 0
        games.forEach((game) => {
            const [_, record] = game.split(":")
            const roundsStrings = record.split(";")
            const round: Round = { red: 0, green: 0, blue: 0 }
            roundsStrings.forEach((roundStrings) => {
                roundStrings.split(",").forEach((colorString) => {
                    const color = (colorString.match(/[a-z]/g) ?? []).join("") as keyof Round
                    const number = parseInt((colorString.match(/\d/g) ?? []).join(""))
                    if (round[color] < number) round[color] = number
                })
            })
            sum += (round.red * round.green * round.blue)
        })
        console.log("result", sum)
        this.solution = `${sum}`
    }
}

export default Solver
