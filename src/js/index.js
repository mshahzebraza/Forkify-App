// Global app controller

// Default Imports

import str from './models/Search';
console.log(`Imported the string "${str}" from "Search" Model.`);

// Named Imports

// import {add, mul, ID} from "./views/searchView"
// console.log(`Using imported named modules from searchView : ${add(ID,2)} and ${mul(3,5)}`);

// import {add as ModA, mul as ModB, ID} from "./views/searchView"
// console.log(`Using imported named modules from searchView : ${ModA(ID,2)} and ${ModB(3,5)}`);

import * as searchView from './views/searchView';
console.log(`Using imported named modules from searchView : ${searchView.add( searchView.ID, 2 )} and ${ searchView.mul(3,5)}`);