import registry from "../registry"
registry.addElement(2023, 5, 2, (input: string) => new Solver(input).solution)

class Solver {
    public readonly solution: string

    private static readonly getDestRanges = (sourceRanges: [number, number][], typeMaps: [number, number, number][]): [number, number][] => {
        const destRanges: [number, number][] = []
        sourceRanges.forEach((sourceRange) => {
            sourceLoop: for (let i = sourceRange[0]; i < sourceRange[0] + sourceRange[1]; i++) {
                let mapUpperBoundary = Infinity
                    for (let j = 0; j < typeMaps.length; j++) {
                    const typeMap = typeMaps[j]
                    const [destStrat, sourceStart, length] = typeMap
                    if (sourceStart <= i && i < sourceStart + length) {
                        const maxRangeInput = sourceRange[0] + sourceRange[1] - i
                        const maxRangeMap = sourceStart + length - i
                        const maxRange = Math.min(maxRangeInput, maxRangeMap)
                        destRanges.push([i + destStrat - sourceStart, maxRange])
                        i += (maxRange - 1)
                        continue sourceLoop
                    }
                    if (i < sourceStart && sourceStart < mapUpperBoundary) mapUpperBoundary = sourceStart
                }
                const maxRangeInput = sourceRange[0] + sourceRange[1] - i
                const maxRangeMap = mapUpperBoundary - i
                const maxRange = Math.min(maxRangeInput, maxRangeMap)
                destRanges.push([i, maxRange])
                i += (maxRange - 1)
            }
        })
        return destRanges
    }

    constructor(input: string) {
        const start = Date.now()
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
        const seedRanges: [number, number][] = []
        for (let i = 0; i < seeds.length; i+=2) {
            const seedStart = seeds[i]
            const seedRange = seeds[i + 1]
            seedRanges.push([seedStart, seedRange])
        }
        let sourceRanges = seedRanges
        maps.forEach((typeMaps) => {
            sourceRanges = Solver.getDestRanges(sourceRanges, typeMaps)
        })
        let min = Math.min(...(sourceRanges.map((range) => range[0])))
        this.solution = `${min}`
        console.log("timing:", Date.now() - start)
    }
}

export default Solver
