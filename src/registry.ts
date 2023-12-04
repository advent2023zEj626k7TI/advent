import * as lodash from "lodash"

class Registry {
    private readonly registry: { [year: number]: {
        [day: number]: {
            [part: number]: ((input: string) => string) | undefined
        } | undefined
    } | undefined } = {}

    public readonly addElement = (year: number, day: number, part: number, callback: (input: string) => string) => {
        this.registry[year] = lodash.merge(this.registry[year], {
            [day]: {
                [part]: callback
            }
        })
    }

    public readonly getElement = (year: number, day: number, part: number): ((input: string) => string) | undefined => {
        return this.registry[year]?.[day]?.[part]
    }
}

const registry = new Registry()

export default registry
