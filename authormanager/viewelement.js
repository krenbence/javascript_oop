/**
 * @callback ActivateCallback
 * @returns {void}
 */

import { hide, show } from "./gomszab.min.js"

class ViewElement{ // ősosztály a megjelenítendő view osztályoknak

    /**
     * @type {string}
     */
    #id; // privát tulajdonság az osztály példányának

    /**
     * @type {HTMLDivElement}
     */
    #div; // példányosításkor létrehozunk egy divet az elemnek, azt tároljuk el benne

    /**
     * @type {ActivateCallback}
     */
    #activateCallback; // akkor fut le, amikor megjelenik az elem a képernyőn (opcionális lásd: activate függvény)

    get div(){ // getter definiálása a divnek
        return this.#div; // visszatér a privát div tulajdonsággal
    }

    get id(){ // getter az azonosítónak (navigációkor használatos)
        return this.#id;
    }

    /**
     * @param {ActivateCallback} value
     */
    set activateCallback(value){ // setter az activateCallbacknek
        this.#activateCallback = value; // beállítja az activatecallbacknek a bemeneti paramétert
    }

    constructor(id){ // konstruktor, bemeneti azonosítóval
        this.#id = id; // azonosító beállítása
        this.#div = document.createElement('div'); // div létrehozása és a div privát tulajdonság beállítása
        this.#div.id = id; // div azonosítójának beállítása
    }

    /**
     * @param {HTMLElement} parent
     * @returns {void}
     */
    appendTo(parent){ // definiálunk egy függvényt a példánynak, a bemeneti paraméter egy html elem
        parent.appendChild(this.#div); // a html elemhez hozzácsatoljuk a div tulajdonságot (lásd konstruktor)
    }

    /**
     * @param {string} id
     * @returns {void}
     */
    activate(id){ // függvényt definiálunk a példánynak
        if(this.#id === id){ // összehasonlítjuk a bemeneti id paramétert az id tulajdonsággal
            show(this.#div); // a divtől elveszi a hidden css osztályt

            if(this.#activateCallback){ // ha van activatecallback
                this.#activateCallback(); // akkor meghívjuk az activatecallbacket
            }
        }else{ // egyébként
            hide(this.#div); // hozzáfűzzük az elemhez a hidden css osztályt
        }
    }
}

export { ViewElement }; // exportáljuk a viewelementet