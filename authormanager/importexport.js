import { AuthorManager } from "./manager.js";
import { ViewElement } from "./viewelement.js";

class ImportExport extends ViewElement { // definiáljuk ImportExport osztályt leszármazik a ViewElementből

    /**
     * @type {AuthorManager}
     */
    #manager; // privát manager tulajdonság definiálása

    /**
     * @param {string} id
     * @param {AuthorManager} manager
     */
    constructor(id, manager){ // konstruktor definiálása
        super(id); // szülőosztály konstruktorának meghívása
        this.#manager = manager; // manager tulajdonságnak az érték megadása
        const resultDiv = document.createElement('div')
        this.div.appendChild(resultDiv); // resultdiv hozzácsatolása a divhez
        this.#manager.importResultCallback = (message) => { // importResultCallback függvény definiálása (hívjuk az AuthorManager.addElementList függvényben)
            resultDiv.innerText = message; // resultdiv tartalmának beállítása
        setTimeout(() => { // settimeout hívása
            resultDiv.innerText = ''; // resultDiv tartalmának törlése
        }, 1500) // másfél másodperc múlva
    }

    const importInput = document.createElement('input'); // input létrehozása
    importInput.type = 'file'; // input típusának file-ra állítása
    this.div.appendChild(importInput); // input hozzáfűzése a div-hez
  
    importInput.addEventListener('change', (e) => { // input change eseményére való feliratkozás
    const file = e.target.files[0]; // elkérjük az esemény targetjének a files tulajdonságából az első elemet
    const reader = new FileReader(); // példányosítjuk a FileReader osztályt
    reader.onload = () => { // feliratkozunk a reader load eseményére a callback-el (akkor fut le, ha a fájl beolvasása a memóriába sikeres volt)

        /**
         * @type {import("./index.js").AuthorType[]}
         */
        const result = []; // létrehozunk egy result tömböt üres tömbként

        const fileContent = reader.result; // elkérjük a fileReader példány result tulajdonságát
        const fileContentLines = fileContent.split('\n'); // szétválasztjuk a fájl tartalmát soronként
        for(const fileLine of fileContentLines){ // végigiterálunk a sorokon
            const currentRowData = fileLine.split(';'); // szétválasztjuk a sorokat ; mentén

            /**
             * @type {import("./index.js").AuthorType}
             */
            const authorType = { // deklarálunk egy author típusú objektumot
                author: currentRowData[0], // ahol az author a sor első pontosvesszőjéig tartó string
                work: currentRowData[1], // ahol az work a sor második pontosvesszőjéig tartó string
                concept: currentRowData[2] // a második pontosvessző utáni rész legyen a concept
            }

            result.push(authorType); // hozzáadjuk az objektumot a result tömbhöz
        }

        this.#manager.addElementList(result) // meghívjuk a tömbbel az AuthorManager.addElementList metódusát
    }

    reader.readAsText(file, 'UTF-8'); // elkezdjük beolvasni a fájlt a memóriába (ha sikeres akkor fut le az onloadban megadott callback)
    })

        const exportButton = document.createElement('button') // létrehozunk egy gombot
        exportButton.innerText = 'export' // megadjuk a gomb szövegét
        this.div.appendChild(exportButton) // hozzáfűzzük a divhez a gombot

        exportButton.addEventListener('click', () => { // feliratkozunk a gomb klikk eseményére
            const a = document.createElement('a') // létrehozunk egy linket
            const content = this.#manager.getExportContent(); // elkérjük az authorok string reprezentációját az AuthorManagertől
            const file = new Blob([content]); // példányosítunk egy Blobot, amelynek megadunk egy tömböt, ami tartalmazza az authorok string reprezentációját
            const url = URL.createObjectURL(file) // létrehozunk egy url-t a blob alapján
            a.href = url; // megadjuk a link href-jének a létrehozott blob url-jét
            a.download = 'export.csv'; // megadjuk a letöltendő fájl nevét
            a.click() // klikkelünk a linken
            URL.revokeObjectURL(a.href); // visszavonjuk a blob linkjének az url-jét
        })
    }
}

export {ImportExport} // exportáljuk az osztályt
