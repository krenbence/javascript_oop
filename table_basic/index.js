/** 
 * @typedef {{author: string, title1: string, concepts1: string, title2?: string,  concepts2?: string}} RowspanRowType  
 * @typedef {{author: string, title: string, concepts: string, concepts2?: string}} ColspanRowType
 * @typedef {{name: string, colSpan?: number}} HeaderType
 * @callback nev
 * @param {HTMLTableSectionElement}
*/

/** @type {HeaderType[]}  */
const rowspanHeaderArr = [{name: "Szerző"}, {name: "Mű"}, {name: "Fogalmak"}] 
/** @type {HeaderType[]}   */
const colspanHeaderArr = [{name: "Szerző"},{name: "Mű"} , {name: "Fogalmak" ,colSpan: 2}] 

/** @type {RowspanRowType[]}  */
const rowspanBodyArr = [
    {
        author: "Appolliniare",
        title1: "A megsebzett galamb és a szökőkút", 
        concepts1: "képvers", 
        title2: "Búcsú",
        concepts2: "avantgárd" 
    },
    {
        author: "Thomas Mann",
        title1: "Mario és a varázsló",
        concepts1: "kisregény" 
    },
    {
        author: "Franz Kafka",
        title1: "A per", 
        concepts1: "képvers", 
        title2: "Az átvlátozás", 
        concepts2: "kisregény" 
    }
]



/** @type {ColspanRowType[]} */
const colspanBodyArr = [ 
    {
        author: "Appolliniare", 
        title: "A megsebzett galamb és a szökőkút",
        concepts: "Képvers",  
        concepts2: "Emlékezés", 
    },
    {
        author: "Appolliniare", 
        title: "Búcsú", 
        concepts: "Avantgárd" 
    },
    {
        author: "Thomas Mann", 
        title: "Mario és a varázsló", 
        concepts: "Kisregény" 
    },
    {
        author: "Franz Kafka",
        title: "A per", 
        concepts: "regény" 
    },
    {
        author: "Franz Kafka", 
        title: "Az átváltozás",
        concepts: "kisregény", 
        concepts2: "groteszk" 
    }
]

// renderColspanBody(makeTableBodyWithHeader(colspanHeaderArr), colspanBodyArr)
// renderRowspanBody(makeTableBodyWithHeader(rowspanHeaderArr), rowspanBodyArr)

class Table{
    /**
     * @type {HTMLTableSectionElement}
     */
    #tbody;
    
    get tbody(){
        return this.#tbody
    }

    /**
     * @param {HeaderType} tableheader 
     */
    constructor(tableheader){
        this.#tbody=makeTableBodyWithHeader(tableheader)
    }

    /**
     * 
     * @param {nev} param 
     */
    metodus(param){
        param(this.tbody)    
}
}



class ColSpanTable extends Table{
    /**
     * 
     * @param {HeaderType} tableheader 
     */
    constructor(tableheader){
        super(tableheader)
    }

    render(ColspanRowType){
        renderColspanBody(this.tbody, ColspanRowType)
    }
}

class RowSpanTable extends Table{
    /**
     * @param {HeaderType} tableheader 
     */
    constructor(tableheader){
        super(tableheader)
    }

     render(RowspanRowType){
        renderRowspanBody(this.tbody, RowspanRowType)
    }
}

const cspan = new ColSpanTable(colspanHeaderArr)
cspan.render(colspanBodyArr)
const rspan = new RowSpanTable(rowspanHeaderArr)
rspan.render(rowspanBodyArr)

const gomb = document.createElement("button")
gomb.innerText = ("Rowspan hozzáadás")
gomb.addEventListener("click", function (){
    /**
     * @type {RowspanRowType}
     */
    const obj = {
        author: "Appolliniare",
        title1: "A megsebzett galamb és a szökőkút", 
        concepts1: "képvers", 
        title2: "Búcsú",
        concepts2: "avantgárd" 
    }

    this.metodus(function(tbody){
        const tr = document.createElement("tr")
        document.body.appendChild(tr)

        const td = document.createElement("td")
        td.innerText = obj.author
        tr.appendChild(td)

        const td2 = document.createElement("td")
        td2.innerText = obj.concepts1
        tr.appendChild(td2)

        const td3 = document.createElement("td")
        td3.innerText = obj.title1
        tr.appendChild(td3)

    })
})