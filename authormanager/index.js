/**
 * @typedef {{id: number, author?: string, work?: string, concept?: string}} AuthorType
 * @typedef {{id: string, label: string, name: string}} FormFieldType
 */

import { FormView } from "./form.js";
import { ImportView } from "./importexport.js";
import { AuthorManager } from "./manager.js";
import { NavigationBar } from "./navigationbar.js"
import { TableView } from "./table.js";

const formFields = [{
    id: 'author',
    label: 'Név',
    name: 'author'
},
{
    id: 'work',
    label: 'Mű',
    name: 'work'
},
{
    id: 'concept',
    label: 'Fogalom',
    name: 'concept'
}]

const headerArray = ['Szerző', 'Mű', 'Fogalom']

const manager = new AuthorManager(); // példányosítjuk a Managert
const navbar = new Navbar(); // példányosítjuk a NavBart
navbar.appendTo(document.body); // hozzáfűzzük a navbart a document.body-hoz
const table = new Table('table', headerArray, manager); // példányosítjuk a table-t
table.appendTo(document.body); // hozzáfűzzük a table-t a document.body-hoz
navbar.addViewElement('Táblázat', table); // hozzáadjuk a table-t a navigációsbarhoz
const form = new FormController('tableForm', formFields, manager); // példányosítjuk a FormControllert
form.appendTo(document.body); // hozzáfűzzük a formControllert a document.body-hoz
const importExport = new ImportExport('importexport', manager); // példányosítjuk az ImportExportot
importExport.appendTo(document.body); // hozzáfűzzük az ImportExportot a document.body-hoz
navbar.addViewElement('Form', form); // hozzáadjuk a FormControllert a navbarhoz
navbar.addViewElement('Import/export', importExport); // hozzáadjuk az importExport-ot a navbarhoz

navbar.activate('table'); // meghívjuk a navbar activate metódusát a table azonosítójával