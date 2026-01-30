const muvelet = (a, b, callback)=>{
    const result = callback(a, b)
    return {
        result//:result
    }
}

const muveletletrehoz = (jel)=>{
    if (jel == "+") {
        return(a, b) => {
            return a + b
        }
    }
}

export{muvelet, muveletletrehoz}