/**
 * @import {FromFieldType, HeaderArrayType, ColSpanType, RowSpanType} from './functions.js'
 * 
 * @callback addCallback
 * @param {ColSpanType | RowSpanType}
 * @returns {void}
 */

class Manager{
    /**
     * @type {ColSpanType[] | RowSpanType[]}
     */
    #dataArry;
    /**
     * @type {addCallback}
     */
    #addCallback;
    /**
     * @param {addCallback} value
     */
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