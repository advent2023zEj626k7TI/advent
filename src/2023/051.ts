import registry from "../registry"
registry.addElement(2023, 5, 1, (input: string) => new Solver(input).solution)

class Solver {
    public readonly solution: string

    private static readonly getDestId = (sourceId: number, typeMaps: [number, number, number][]): number => {
        for (let i = 0; i < typeMaps.length; i++) {
            const typeMap = typeMaps[i]
            const [destStrat, sourceStart, length] = typeMap
            if (sourceStart <= sourceId && sourceId < sourceStart + length) {
                return sourceId + destStrat - sourceStart
            }
        }
        return sourceId
    }

    constructor(input: string) {
        console.log(input)
        const [seedsString, ...mapsStrings] = input.split(/\n\n/).filter((e) => e !== "")
        const seeds = ((seedsString.split(":")[1]).split(" ").filter((e) => e !== "")).map((string) => parseInt(string))
        const maps: [number, number, number][][] = []
        mapsStrings.forEach((mapsString) => {
            const mapStrings = mapsString.split(/\n/).filter((e) => e !== "")
            const typeMaps: [number, number, number][] = []
            mapStrings.forEach((mapString, index) => {
                if (index > 0) {
                    const typeMap = (mapString.split(" ").filter((e) => e !== "")).map((string) => parseInt(string)) as [number, number, number]
                    typeMaps.push(typeMap)
                }
            })
            maps.push(typeMaps)
        })
        let min = Infinity
        seeds.forEach((seed) => {
            let sourceId = seed
            maps.forEach((typeMaps) => {
                sourceId = Solver.getDestId(sourceId, typeMaps)
            })
            if (sourceId < min) min = sourceId
        })
        this.solution = `${min}`
    }
}

export default Solver
