/** 
 * @typedef {{author: string, title1: string, concepts1: string, title2?: string,  concepts2?: string}} RowspanRowType  
 * @typedef {{author: string, title: string, concepts: string, concepts2?: string}} ColspanRowType
 * @typedef {{name: string, colSpan?: number}} HeaderType
 */

/**
 * @callback TableBodyCallback
 * @param {HTMLTableSectionElement} tbody
 * @returns {void}
 */

/** @type {HeaderType[]}  */
const rowspanHeaderArr = [
    { name: "Szerző" },
    { name: "Mű" },
    { name: "Fogalmak" }
];

/** @type {HeaderType[]} */
const colspanHeaderArr = [
    { name: "Szerző" },
    { name: "Mű" },
    { name: "Fogalmak", colSpan: 2 }
];

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
        concepts1: "regény",
        title2: "Az átváltozás",
        concepts2: "kisregény"
    }
];

/** @type {ColspanRowType[]} */
const colspanBodyArr = [
    {
        author: "Appolliniare",
        title: "A megsebzett galamb és a szökőkút",
        concepts: "Képvers",
        concepts2: "Emlékezés"
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
];

/**
 * Table feladata:
 *  - Létrehoz egy tbody-t (makeTableBodyWithHeader segítségével)
 *  - Privát mezőben tárolja (#tbody), kívülről csak getterrel érhető el
 *  - Ad egy metódust (metodus), ami meghívja a callbacket a tbody-val
 *  így a leszármazott / eseménykezelő kód nem fér hozzá közvetlenül a #tbody-hoz,
 *  de mégis tud vele dolgozni (a callback paraméterén keresztül).
 */

class Table {
    /** @type {HTMLTableSectionElement} */
    #tbody;

    get tbody() {
        return this.#tbody;
    }

    /** @param {HeaderType[]} tableheader */
    constructor(tableheader) {
        this.#tbody = makeTableBodyWithHeader(tableheader);
    }

    /** @param {TableBodyCallback} callback */
    metodus(callback) {
        callback(this.#tbody);
    }
}

class ColSpanTable extends Table {
    /** @param {HeaderType[]} tableheader */
    constructor(tableheader) {
        super(tableheader);
    }

    /** @param {ColspanRowType[]} rows */
    render(rows) {
        renderColspanBody(this.tbody, rows);
    }
}

class RowSpanTable extends Table {
    /** @param {HeaderType[]} tableheader */
    constructor(tableheader) {
        super(tableheader);
    }

    /** @param {RowspanRowType[]} rows */
    render(rows) {
        renderRowspanBody(this.tbody, rows);
    }
}

const cspan = new ColSpanTable(colspanHeaderArr);
cspan.render(colspanBodyArr);

const rspan = new RowSpanTable(rowspanHeaderArr);
rspan.render(rowspanBodyArr);

function createButton(text) {
    const btn = document.createElement("button");
    btn.innerText = text;
    document.body.appendChild(btn);
    return btn;
}

function onAddRowspanClick() {
    /** @type {RowspanRowType} */
    const obj = {
        author: "Appolliniare",
        title1: "A megsebzett galamb és a szökőkút",
        concepts1: "képvers",
        title2: "Búcsú",
        concepts2: "avantgárd"
    };

    this.metodus(function (tbody) {
        const tr = document.createElement("tr");
        tbody.appendChild(tr);

        const td1 = document.createElement("td");
        td1.innerText = obj.author;
        tr.appendChild(td1);

        const td2 = document.createElement("td");
        td2.innerText = obj.title1;
        tr.appendChild(td2);

        const td3 = document.createElement("td");
        td3.innerText = obj.concepts1;
        tr.appendChild(td3);
    });
}

const gomb = createButton("Rowspan hozzáadás");
gomb.addEventListener("click", onAddRowspanClick.bind(rspan));

// ------------------------------------------------------------
// ✅ 14. FELADAT – COLSPANOS GOMB HOZZÁADÁSA
// ------------------------------------------------------------
// Cél: legyen egy második gomb, ami a colspanos táblázathoz fűz hozzá egy új sort.
// Ugyanaz a minta, mint a rowspanos gombnál:
//
// 1) click esemény -> lefut az onAddColspanClick()
// 2) létrehozunk egy obj-t (ColspanRowType)
// 3) this.metodus(callback) -> a Table ősosztály "átadja" a privát tbody-t a callbacknek
// 4) a callback a tbody-hoz appendeli a friss <tr>-t és <td>-ket
//
// FONTOS: bind(cspan)
// - addEventListenerben a sima function this-e a gomb lenne
// - nekünk az kell, hogy this = cspan (a táblázat példány), ezért bindoljuk.

function onAddColspanClick() {
    /** 
     * Új adat (egy új sor a colspanos táblába)
     * @type {ColspanRowType}
     */
    const obj = {
        author: "Thomas Mann",
        title: "Mario és a varázsló",
        concepts: "Kisregény"
        // concepts2 nincs -> ezért majd colspan=2 lesz a concepts cellán
        // próbáld ki úgy is, hogy hozzáírod: concepts2: "valami"
    };

    // this itt csak akkor lesz a cspan példány, ha a listenernél bind(cspan)-t használsz
    this.metodus(function (tbody) {
        // 1) új sor
        const tr = document.createElement("tr");
        tbody.appendChild(tr);

        // 2) Szerző cella
        const td1 = document.createElement("td");
        td1.innerText = obj.author;
        tr.appendChild(td1);

        // 3) Mű cella
        const td2 = document.createElement("td");
        td2.innerText = obj.title;
        tr.appendChild(td2);

        // 4) Fogalmak 1. cella
        const td3 = document.createElement("td");
        td3.innerText = obj.concepts;

        // 5) COLSPAN LOGIKA:
        // Ha nincs concepts2, akkor a "Fogalmak" fejléc 2 oszlopot foglal,
        // tehát a td3-nak át kell fognia a 2 oszlopot -> colspan=2
        if (obj.concepts2 == null || obj.concepts2 === "") {
            td3.colSpan = 2;
            tr.appendChild(td3);
            return;
        }

        // Ha van concepts2 -> akkor td3 + td4 lesz (két külön cella)
        tr.appendChild(td3);

        const td4 = document.createElement("td");
        td4.innerText = obj.concepts2;
        tr.appendChild(td4);
    });
}

// Colspanos gomb létrehozása és eseménykezelő regisztrálása
const gombCol = createButton("Colspan hozzáadás");

// bind(cspan) -> a click handlerben a this a cspan példány lesz
gombCol.addEventListener("click", onAddColspanClick.bind(cspan));
