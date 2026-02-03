import { muvelet, muveletletrehoz } from "./function.js"

export class Gomb {
    constructor(input1, input2, muveletString, eredmenyDiv){
        this.muveletString = muveletString
        this.gomb = document.createElement("button")
        this.gomb.innerText = muveletString

        this.gomb.addEventListener("click", this.#calculate(input1, input2, eredmenyDiv))
    }

    #calculate(input1, input2, eredmenyDiv){
        return () => {
            const sz1 = Number(input1.value)
            const sz2 = Number(input2.value)

            const callback = muveletletrehoz(this.muveletString)
            const {result} = muvelet(sz1, sz2, callback)
            eredmenyDiv.innerText = result
        }
    }
}