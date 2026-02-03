import { Gomb } from "./gomb.js";


const input1 = document.createElement("input")
document.body.appendChild(input1)


const input2 = document.createElement("input")
document.body.appendChild(input2)

const div = document.createElement("div")
document.body.appendChild(div)

const pluszGomb = new Gomb(input1, input2, "+", div)
const minuszGomb = new Gomb(input1, input2, "-", div)
const szorzasGomb = new Gomb(input1, input2, "*", div)

div.appendChild(pluszGomb.gomb)
div.appendChild(minuszGomb.gomb)
div.appendChild(szorzasGomb.gomb)