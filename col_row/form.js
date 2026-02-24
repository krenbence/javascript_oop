import { Manager } from "./manager.js"

class FromController{
    /**@type {Manager} */
    #manager
    /**@type {FormField[]} */
    #FormFieldElemList
    /**@type {HTMLFormElement} */
    #form;
    /**
     * 
     * @param {FormFieldType[]} formFieldList 
     * @param {Manager} manager 
     */
    constructor(formFieldList,manager){
        this.#manager=manager
        const form = document.createElement('form')
        document.body.appendChild(form)
        this.#form=form
        this.#FormFieldElemList=[]
        for(const formField of formFieldList){
            const formFieldElem = new FormField(formField.id,formField.name,formField.label,formField.required, form)
            this.#FormFieldElemList.push(formFieldElem)
        }

        const button = document.createElement('button')
        button.innerText="hozzafűz"
        this.#form.appendChild(button)
        this.#form.addEventListener('submit',(e)=>{
            e.preventDefault()
            const elem = this.#createElement()
            if(elem){
                this.#manager.addElement(elem)
                e.target.reset()
            }
            
        })
    }
    /**
     * 
     * @returns {ColspanType | RowspanType |null}
     */
    #createElement(){
        let result={}
        let valid=true
        for(const inputField of this.#FormFieldElemList){
            
            if(inputField.validate()){
                result[inputField.name] = inputField.value
            }else{
                valid=false
            }
        }
        if(valid){return result}else{return null}
    }
}

class FormField{
    /**@type {HTMLInputElement} */
    #input
    /**@type {string} */
    #name
    /**@type {boolean} */
    #require
    /**@type {HTMLSpanElement} */
    #errorSpan
    get value(){
        return this.#input.value ? this.#input.value :undefined;
    }
    get name(){return this.#name}
    /**
     * 
     * @param {string} id 
     * @param {string} name 
     * @param {string} labelcontent 
     * @param {boolean} required 
     * @param {HTMLFormElement} parent 
     */
    constructor(id,name,labelcontent,required,parent){
        
        const div = document.createElement('div')
        parent.appendChild(div)

        const label = document.createElement('label')
        label.innerText=labelcontent
        label.htmlFor=id
        div.appendChild(label)

        div.appendChild(document.createElement('br'))

        const input = document.createElement('input')
        input.id=id
        input.name=name
        div.appendChild(input)

        this.#input=input
        this.#name=name
        const span = document.createElement('span')
        span.classList.add('error');
        div.appendChild(span)
        this.#require=required
        this.#errorSpan=span
    }
    /**
     * 
     * @returns {boolean}
     */
    validate(){
        let valid = true
        if(this.#require && !this.value){
            valid=false
            this.#errorSpan.innerText="kotelező"
        }else{
            this.#errorSpan.innerText=''
        }
        return valid
    }
}

export {FromController}