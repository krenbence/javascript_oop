/**
 * @import {FormFieldType,HeaderArrayType,ColspanType,RowspanType} from './functions.js' 
 *
 * @callback addCallback
 * @param {ColspanType | RowspanType} type
 * @returns {void}
 * */
class Manager{
    /**@type {ColspanType[] | RowspanType[]} */
    #dataArry;
    /**@type {addCallback} */
    #addCallback;
    /**@param {addCallback} value */
    set addCallback(value){
        this.#addCallback=value
    }
    constructor(){
        this.#dataArry=[]
    }
    /**
     * 
     * @param {ColspanType | RowspanType} colRowType 
     * @returns {void}
     */
    addElement(colRowType){
        this.#dataArry.push(colRowType)
        if(this.#addCallback){this.#addCallback(colRowType)}
    }
}



export {Manager}