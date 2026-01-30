import { muvelet, muveletletrehoz } from "./function.js"

const input = document.createElement("input")
document.body.appendChild(input)


const input2 = document.createElement("input")
document.body.appendChild(input2)

const div = document.createElement("div")
document.body.appendChild(div)

const gomb = document.createElement("button")
gomb.innerText = "gomb"
div.appendChild(gomb)

gomb.addEventListener("click", function (){
    const sz1 = Number(input.value)
    const sz2 = Number(input2.value)
    const {result} = muvelet(sz1, sz2, muveletletrehoz("+"))
    div.innerText = result
    })


const fv = muveletletrehoz("+")
console.log(fv(1, 2))

muvelet(sz1, sz2, muveletletrehoz("+"))