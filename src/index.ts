import "./2023/042"
import "./2023/041"
import "./2023/032"
import "./2023/031"
import "./2023/022"
import "./2023/021"
import "./2023/012"
import "./2023/011"
import registry from "./registry"
export { }

const body = document.querySelector("body")!
const yearInput = document.createElement("input")
yearInput.placeholder = "year"
yearInput.type = "number"
body.appendChild(yearInput)
const dayInput = document.createElement("input")
dayInput.placeholder = "day"
dayInput.type = "number"
body.appendChild(dayInput)
const partInput = document.createElement("input")
partInput.placeholder = "part"
partInput.type = "number"
body.appendChild(partInput)
const input = document.createElement("textarea")
input.placeholder = "input"
body.appendChild(input)
const button = document.createElement("button")
button.innerText = "run"
body.appendChild(button)
const output = document.createElement("input")
output.type = "text"
output.placeholder = "output"
output.disabled = true
body.appendChild(output)
button.onclick = () => {
    const func = registry[yearInput.valueAsNumber]?.[dayInput.valueAsNumber]?.[partInput.valueAsNumber]
    if (func) {
        output.value = func(input.value)
    } else {
        output.value = "not implemented"
    }
}
