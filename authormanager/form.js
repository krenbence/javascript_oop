import { ViewElement } from "./viewelement.js"

class FormView extends ViewElement{
    /**
     * @param {string} id 
     */
    constructor(id){
        super(id)
        this.div.innerHTML = "form"
    }
}

export {FormView}