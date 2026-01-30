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
    div.innerText = muvelet(sz1, sz2, (p1, p2)=>{
        return p1 + p2
    })
})


const muvelet = (a, b, callback)=>{
    return callback(a, b)
}

const muveletletrehoz = (jel)=>{
    if (jel == "+") {
        return(a, b) => {
            return a + b
        }
    } 
}

const fv = muveletletrehoz("+")
console.log(fv(1, 2))

muvelet(SZ1, sz2, muveletletrehoz("+"))