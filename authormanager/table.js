import { createTableCell, createTableHeader } from "./gomszab.min.js";
import { AuthorManager } from "./manager.js";
import { ViewElement } from "./viewElement.js";


class Table extends ViewElement {
    /** @type {AuthorManager} */
    #manager; // privát tulajdonság a managernek
    /** @type {HTMLTableSectionElement} */
    #tbody // privát tulajdonság a táblázat törzsének

    /**
     * 
     * @param {string[]} headerArray
     * @param {string} id 
     * @param {AuthorManager} manager
     */
    constructor(id, headerArray, manager){
    super(id); // szülőosztály konstruktorának meghívása
    this.#manager = manager; // a manager értéke a bemeneti manager példány
    const table = document.createElement('table'); // létrehozunk egy táblázatot
    this.div.appendChild(table); // hozzácsatoljuk a táblázatot a divhez
    const thead = createTableHeader(headerArray); // létrehozzuk a táblázat fejlécét a string tömb alapján
    table.appendChild(thead); // hozzácsatoljuk a táblázathoz a theadet
    this.#tbody = document.createElement('tbody'); // létrehozzuk a tbody-t
    table.appendChild(this.#tbody); // hozzácsatoljuk a tbody-t a tablehöz
    this.#manager.tableCallback = (authorList) => { // definiáljuk a manager tablecallback-jét (a setter meg
        if(authorList.length === 0){ // ha a lista üres
            const tr = document.createElement('tr'); // létrehozunk egy sor elemet
            this.#tbody.appendChild(tr); // hozzácsatoljuk a tbody-hoz
            const td = createTableCell(tr, 'Nincs megjelenítendő elem!'); // létrehozunk egy cellát
            //tartalommal és hozzácsatoljuk a sorhoz
            td.colSpan = 3; // kiterjesztjük a cellát 3 oszlopos szélességre
        } // bele lehetne tenni else ágba
        for(const author of authorList){ // végigiterálunk az authorlistán
            const tr = document.createElement('tr'); // létrehozunk egy sort
            this.#tbody.appendChild(tr); // hozzácsatoljuk a tbodyhoz

            createTableCell(tr, author.name) // létrehozunk egy cellát a sorhoz az author nevével
            createTableCell(tr, author.work) // létrehozunk egy cellát a sorhoz az author nevével
            createTableCell(tr, author.concept) // létrehozunk egy cellát a sorhoz az author nevével
            }

        }
        this.activateCallback = () => { // definialjuk az activate callbacket
            this.#tbody.innerHTML = "" // toroljuk a tbody tartalmat
            this.#manager.getAllElement() // meghivjuk a manager getall elementjet (ami meghivja  a tablecallbacket lasd authormanagger.getallelement)
        }
    }
}

export { Table } // exportaljuk a Tablet