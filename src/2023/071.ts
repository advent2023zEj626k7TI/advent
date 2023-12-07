import registry from "../registry"
registry.addElement(2023, 7, 1, (input: string) => new Solver(input).solution)

type Hand = {
    cards: string
    type: string
    bid: number
}

type Counter = {
    card: string
    count: number
}

class Solver {
    public readonly solution: string

    private static readonly cards = ["2", "3", "4", "5", "6", "7", "8", "9", "T", "J", "Q", "K", "A"]
    private static readonly handTypess = ["High card", "One pair", "Two pair", "Three of a kind", "Full house", "Four of a kind", "Five of a kind"]

    private static readonly compareHands = (a: Hand, b: Hand): number => {
        if (a.type !== b.type) return Solver.handTypess.indexOf(a.type) - Solver.handTypess.indexOf(b.type)
        for (let i = 0; i < 5; i++) {
            if (a.cards.charAt(i) !== b.cards.charAt(i)) return Solver.cards.indexOf(a.cards.charAt(i)) - Solver.cards.indexOf(b.cards.charAt(i))
        }
        return 0
    }

    private static readonly parseLine = (input: string): Hand => {
        const [cards, bidString] = input.split(" ")
        const counters: Counter[] = []
        for (let i = 0; i < cards.length; i++) {
            const char = cards.charAt(i)
            const counter = counters.find((counter2) => counter2.card === char)
            if (counter) counter.count++
            else counters.push({ card: char, count: 1 })
        }
        let type = "High card"
        const counts = JSON.stringify(counters.map((counter) => counter.count).sort())
        if (counts === JSON.stringify([1,1,1,2].sort())) type = "One pair"
        if (counts === JSON.stringify([1,2,2].sort())) type = "Two pair"
        if (counts === JSON.stringify([1,1,3].sort())) type = "Three of a kind"
        if (counts === JSON.stringify([2,3].sort())) type = "Full house"
        if (counts === JSON.stringify([1,4].sort())) type = "Four of a kind"
        if (counts === JSON.stringify([5].sort())) type = "Five of a kind"
        const hand = { cards, type, bid: parseInt(bidString) }
        return hand
    }

    constructor(input: string) {
        console.log(input)
        const lines = input.split(/\n/).filter((e) => e !== "")
        const hands = lines.map(Solver.parseLine).sort(Solver.compareHands)
        let sum = 0
        hands.forEach((hand, index) => {
            sum += (hand.bid * (index + 1))
        })
        console.log("result", sum)
        this.solution = `${sum}`
    }
}

export default Solver
