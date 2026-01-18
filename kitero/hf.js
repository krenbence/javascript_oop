// konstruktor
function Tanyer(szin){
    this.szin = szin
}

function KisTanyer(szin){
    Tanyer.call(this, szin)
    this.meret = "kicsi"
}

Object.setPrototypeOf(KisTanyer.prototype, Tanyer.prototype)

function NagyTanyer(szin){
    Tanyer.call(this, szin)
    this.meret = "nagy"
}

Object.setPrototypeOf(NagyTanyer.prototype, Tanyer.prototype)

function Pohar(){
    
}

const tanyer1 = new NagyTanyer("piros")
const tanyer2 = new KisTanyer("zöld")
const tanyer3 = new KisTanyer("kék")
const pohar = new Pohar()

console.log(tanyer1)
console.log(tanyer2)
console.log(tanyer3)
console.log(pohar)

// Class

class Tanyercl{
    constructor(szin){
        this.szin = szin
    }
}

class KisTanyercl extends Tanyercl{
    constructor(szin){
        super(szin)
        this.meret = "kicsi"
    }
}

class NagyTanyercl extends Tanyercl{
    constructor(szin){
        super(szin)
        this.meret = "nagy"
    }
}

class Poharcl{
    constructor(){

    }
}

const tanyer4 = new KisTanyercl("piros")
const tanyer5 = new KisTanyercl("kék")
const tanyer6 = new NagyTanyercl("zöld")
const pohar2 = new Poharcl()

console.log(tanyer4)
console.log(tanyer5)
console.log(tanyer6)
console.log(pohar2)