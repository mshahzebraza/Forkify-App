import Search from './models/Search';
import * as searchView from './views/searchView'
import { elements, renderLoader, clearLoader } from './views/base';


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
        renderLoader(elements.searchRes); //To add the loader icon while we wait for the search results
        // NOTE: didnt need to prefix base.renderLoader as i directly imported the loader instead of importing everything in general
    
        // 4. Search for the recipes from the result object
        await state.search.getResults();
    
        // 5. Render the results on the UI
        clearLoader();
        searchView.renderResults(state.search.recipes);

    }

}


elements.searchForm.addEventListener('submit', e => {
    e.preventDefault();
    controlSearch();
})
