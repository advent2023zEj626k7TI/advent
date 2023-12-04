const registry: { [year: number]: {
    [day: number]: {
        [part: number]: ((input: string) => string) | undefined
    } | undefined
} | undefined } = {}

export default registry
