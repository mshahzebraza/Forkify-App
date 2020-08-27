import Search from './models/Search';
import * as searchView from './views/searchView'
import { elements } from './views/base';


// Global State

const state = {};


const controlSearch = async () => {

    // 1. Read query from view
    const query = searchView.getInput();

    if (query) {

        // 2. Search and add the search result to the state object
        state.search = new Search(query);
    
        // 3. Prepare UI for the results
        searchView.clearResults(); // clear display of previously searched results
        searchView.clearInput(); // clear the search input field
    
        // 4. Search for the recipes from the result object
        await state.search.getResults();
    
        // 5. Render the results on the UI
        searchView.renderResults(state.search.recipes);

        
        // console.log(state.search.recipes);
        // console.log(' ');
        /* 
        state.search.recipes.forEach(el => {
            console.log( el.title );
            console.log( el );
            console.log( ' ' );
        })
         */
    }

}


elements.searchForm.addEventListener('submit', e => {
    e.preventDefault();
    controlSearch();
})
