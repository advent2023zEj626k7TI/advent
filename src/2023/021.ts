import * as lodash from "lodash"
import registry from "../registry"
registry[2023] = lodash.merge(registry[2023], {
    [2]: {
        [1]: (input: string) => new Solver(input).solution
    }
})

type Round = { red: number, green: number, blue: number }

class Solver {
    public readonly solution: string

    constructor(input: string) {
        console.log(input)
        const games = input.split(/\n/).filter((e) => e !== "")
        const max: Round = { red: 12, green: 13, blue: 14 }
        let sum = 0
        games.forEach((game) => {
            const [gameIdString, record] = game.split(":")
            const gameId = parseInt((gameIdString.match(/\d/g) ?? []).join(""))
            const roundsStrings = record.split(";")
            const round: Round = { red: 0, green: 0, blue: 0 }
            roundsStrings.forEach((roundStrings) => {
                roundStrings.split(",").forEach((colorString) => {
                    const color = (colorString.match(/[a-z]/g) ?? []).join("") as keyof Round
                    const number = parseInt((colorString.match(/\d/g) ?? []).join(""))
                    if (round[color] < number) round[color] = number
                })
            })
            if (round.red <= max.red && round.green <= max.green && round.blue <= max.blue) sum += gameId
        })
        console.log("result", sum)
        this.solution = `${sum}`
    }
}

export default Solver
