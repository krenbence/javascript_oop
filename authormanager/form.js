import { createInputAndErrorDiv } from "./gomszab.min.js";
import { AuthorManager } from "./manager.js";
import { ViewElement } from "./viewElement.js";

class FormView extends ViewElement {

    /**
     * @type {formInput[]}
     */
    #formInputList;
    /**
     * @type {AuthorManager}
     */
    #manager;
    /**
     * @type {HTMLFormElement}
     */
    #form;
    /**
     * 
     * @param {string} id 
     * @param {import("./index.js").FormFieldType[]} formFieldList 
     * @param {AuthorManager} manager 
     */
    constructor(id, formFieldList, manager){ // definiáljuk a konstruktort
    super(id); // meghívjuk a szülőosztály konstruktorát
    this.#manager = manager; // értéket adunk a privát manager tulajdonságnak
    this.#formInputList = []; // inicializáljuk a forminputlist tulajdonságot
    const form = document.createElement('form'); // létrehozunk egy formot
    for(const field of formFieldList){ // végigiterálunk a bemeneti formFieldList paraméteren
        const formInput = new FormInput(field.id, field.label, field.name, form); // példányosítjuk a forminputokat
        this.#formInputList.push(formInput); // hozzáadjuk a forminputlist listához
    }
    const button = document.createElement('button'); // létrehozunk egy gombot
    button.innerText = 'Küldés'; // a gomb szövege legyen Küldés
    form.appendChild(button); // a gombot hozzáfűzzük az űrlaphoz
    const resultDiv = document.createElement('div'); // létrehozunk egy resultDiv-et a megjelenítendő üzenetnek
    this.div.appendChild(resultDiv); // hozzácsatoljuk a resultDiv-et a viewElement div-hez
    this.div.appendChild(form); // hozzácsatoljuk a formot a divhez

    form.addEventListener('submit', (e) => { // feliratkozunk a form submit eseményére
        e.preventDefault(); // megakadályozzuk az űrlap alapértelmezett működését
        const element = this.#createElement(); // meghívjuk a createElementet
        this.#manager.addElement(element);
    })
    this.#manager.addElementResultCallback = (result) => { // definiáljuk az addElementResultCallbacket
        resultDiv.innerText = result; // beállítjuk a resultDiv értékének a kapott stringet
        setTimeout(() => { // meghívjuk a setTimeout-ot
            resultDiv.innerText = ''; // töröljük a resultDiv tartalmát
    }, 1500) // másfél másodperc múlva
}
}
    /**
     * @returns {import("./index.js").AuthorType}
     */
    #createElement(){ // createElement metódus definiálása
    /**
     * @type {import("./index.js").AuthorType}
     */
    let result = {}; // létrehozunk egy AuthorType típusú objektumot

    for(const formFieldInput of this.#formInputList){ // végigiterálunk a formInputList elemein
        if(formFieldInput.validate()){ // meghívjuk minden formInputra a validate függvényt
            result[formFieldInput.name] = formFieldInput.value; // a result objektum formInputField name értékével megegyező nevű tulajdonságának
            // megadjuk a forminput beviteli mezőjének az értékét
        }
    }

    return result; // visszatérünk az objektummal
    }
}

class FormField {
    
    /**
     * @type {HTMLInputElement}
     */
    #inputElement;
    /**
     * @type {HTMLDivElement}
     */
    #errorDiv;
    /**
     * @type {string}
     */
    #name;

    get name() {
        return this.#name
    }
    get value() {
        return this.#inputElement.value ? this.#inputElement.value : undefined
    }
    /**
     * 
     * @param {string} id 
     * @param {string} label 
     * @param {string} name 
     * @param {HTMLFormElement} parent 
     */
    constructor(id, label, name, parent) {
        const { input, errorDiv } = createInputAndErrorDiv({ id, label, name, parent })
        this.#name = name;
        this.#errorDiv = errorDiv
        this.#inputElement = input
    }
    /**
     * @returns {boolean}
     */
    validate() {
        let result = true;
        if (!this.value) {
            this.#errorDiv.innerText = "Mező kitöltése kötelező"
            result = false
        }
        else {
            this.#errorDiv.innerText = ""
        }
        return result;
    }
}

export { FormView }