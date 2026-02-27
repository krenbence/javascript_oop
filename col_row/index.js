/**
 * @import {FormFieldType,HeaderArrayType,ColspanType,RowspanType} from './functions.js' 
 */
import {Manager} from './manager.js'
import data from './data.json' with{type:"json"}
import { Table } from './table.js';
import { FromController } from './form.js';

const manager = new Manager();
const table=new Table(data.colspanHeaderArray,manager)
table.setAppendRow(renderTbodyColSpan)
for(const d of data.colspanDataArr){
    manager.addElement(d)
}
/**
 * 
 * @param {HTMLTableSectionElement} tbody 
 * @param {ColspanType} elem 
 */
function renderTbodyColSpan(tbody, elem){
    const tr = document.createElement('tr')
    tbody.appendChild(tr)

    createTAbleTD(elem.neve,tr)
    createTAbleTD(elem.kor,tr)  
    const td=createTAbleTD(elem.szerelme1,tr) 
    if(elem.szerelme2){
        createTAbleTD(elem.szerelme2,tr)
    }else{
        td.colSpan=2
    }
}
const form = new FromController(data.colspanFormFieldList,manager)
/**
 * 
 * @param {string} celltxt 
 * @param {HTMLTableRowElement} parentRow 
 * @returns {HTMLTableCellElement}
 */
function createTAbleTD(celltxt,parentRow){
    const td = document.createElement('td')
    td.innerText=celltxt
    parentRow.appendChild(td)
    return td
}