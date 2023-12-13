import registry from "../registry"
registry.addElement(2023, 12, 2, (input: string) => new Solver(input).solution)

type StoredResult = {
    map: number
    groups: number
    possibilities: number
}

class Solver {
    public readonly solution: string

    private static readonly getPossibleIndexes = (map: string[], group: number, lastGroup: boolean): number[] => {
        const indexes: number[] = []
        for (let i = 0; i < map.length; i++) {
            const char = map[i]
            if (char === ".") continue
            let fits = true
            for (let j = i + 1; j < i + group; j++) {
                const charNext = map[j]
                fits = fits && ["#", "?"].includes(charNext)
            }
            if (lastGroup) {
                for (let j = i + group; j < map.length; j++) {
                    const charNext = map[j]
                    fits = fits && [".", "?"].includes(map[j])
                }
            }
            fits = fits && [".", "?", undefined].includes(map[i + group])
            if (fits) indexes.push(i)
            if (char === "#") break
        }
        return indexes
    }

    private static readonly getPossibilities = (map: string[], groups: number[], storedResults: StoredResult[]): number => {
        let groupSum = 0
        groups.forEach((group) => groupSum += group)
        const remainingDamaged = map.filter((char) => char === "#" || char === "?").length
        if (groupSum > remainingDamaged) {
            return 0
        }
        const [group, ...remainingGroups] = groups
        if (groups.length === 1) {
            return Solver.getPossibleIndexes(map, group, true).length
        }
        const storedResult = storedResults.find((result) => map.length === result.map && groups.length === result.groups)
        if (storedResult) return storedResult.possibilities
        let possibilities = 0
        const indexes = Solver.getPossibleIndexes(map, group, false)
        indexes.forEach((index) => {
            const newMap: string[] = []
            let found = false
            for (let i = index + group + 1; i < map.length; i++) {
                if (!found && map[i] !== ".") found = true
                if (found) {
                    newMap.push(map[i])
                }
            }
            possibilities += Solver.getPossibilities(newMap, remainingGroups, storedResults)
        })
        storedResults.push({ map: map.length, groups: groups.length, possibilities })
        return possibilities
    };

    constructor(input: string) {
        console.log(input)
        const lines = input.split("\n").filter((e) => e !== "")
        let sum = 0
        lines.forEach((line) => {
            const [mapString, groupsString] = line.split(" ")
            const map = (mapString + "?" + mapString + "?" + mapString + "?" + mapString + "?" + mapString).split("")
            const groups: number[] = JSON.parse(`[${groupsString},${groupsString},${groupsString},${groupsString},${groupsString}]`)
            sum += Solver.getPossibilities(map, groups, [])
        })
        console.log("result", sum)
        this.solution = `${sum}`
    }
}

export default Solver
