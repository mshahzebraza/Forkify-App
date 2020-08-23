import Search from './models/Search';

// Global State

const state = {};


const controlSearch = async () => {

    // 1. Read query from view
    const query = 'Pizza';

    if (query) {

        // 2. Search and add the search result to the state object
        state.search = new Search(query);
    
        // 3. Prepare UI for the results
            // Some Loaders etc
    
        // 4. Search for the recipes from the result object
        await state.search.getResults();
    
        // 5. Render the results on the UI
        
        console.log(state.search.recipes);
        console.log(' ');
        
        state.search.recipes.forEach(el => {
            console.log( el.title );
            console.log( el );
            console.log( ' ' );
        })
        
    }

}



document.querySelector('.search').addEventListener('submit', e => {
    e.preventDefault();
    controlSearch();
})
