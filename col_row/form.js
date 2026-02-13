class FormController{
    /**
     * @type {Manager}
     */
    #manager

    /**
     * @type {FormField[]}
     */
    #formFieldElemList
    /**
     * 
     * @param {FormFieldType[]} formFieldList 
     * @param {Manager} manager 
     */
    constructor(formFieldList, manager){
        const form = document.createElement("from")
        document.body.appendChild(form)
        this.#formFieldElemList = []
        for(const formField of formFieldList){
            const formFiedElem = new FormField(formField.id, formField.name, formField.label, formField.required, form)
            this.#formFieldElemList.push(formFiedElem)
        }




        const submitButton = document.createElement("button")
        submitButton.innerText = "küldés"
        form.appendChild(submitButton)
        form.addEventListener("submit", (e) => {
        e.preventDefault()
        const elem = this.#createElement()
        if(elem){
            this.#manager.addElement(elem)
            e.target.reset()
        }
        })
    }

    /**
     * @returns {ColspanType | RowspanType | null}
     */
    #createElement(){
        let result = {}
        let valid = true
        for(const inputField of this.#formFieldElemList){
            if(inputField.validate()){
                result[inputField.name]=inputField.value
            }else{
                valid = false
            }   
        }
        if(valid){
            return result
        }else{
            return null
        } 
    }

}

class FormField{
    
    /**
     * @type {HTMLInputElement}
     */
    #input

    /**
     * @type {string}
     */
    #name

    /**
     * @type {boolean}
     */
    #requied

    /**
     * @type {HTMLDivElement}
     */
    #errordiv

    get value(){
        return this.#input.value? this.#input.value : undefined
    }

    get name(){
        return this.#name
    }

    /**
     * @param {string} id 
     * @param {string} name 
     * @param {string} labelContent 
     * @param {boolean} required 
     * @param {HTMLFormElement} parent 
     */
    constructor(id, name, labelContent, required, parent){
    const div = document.createElement("div")
    parent.appendChild(div)

    const label = document.createElement("label")
    label.innerText = labelContent
    div.appendChild(label)

    div.appendChild(document.createElement('br'))

    const input = document.createElement("input")
    input.id = id
    input.name = name
    div.appendChild(input)
    this.#input = input
    this.#name = name

    const errordiv = document.createElement("div")
    errordiv.classList.add("error")
    div.appendChild(errordiv)

    this.#requied = required
    this.#errordiv = errordiv
    
    }
    validate(){
        let result = true
        
        if (this.#requied && !this.value){
            result = false
            this.#errordiv.innerText = "Kötelező"
        }else{
            this.#errordiv.innerText = ""
        }
    }
}

export {FormController}