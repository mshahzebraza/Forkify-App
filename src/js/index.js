import Search from './models/Search';
import * as searchView from './views/searchView';
import * as recipeView from './views/recipeView';
import { elements, renderLoader, clearLoader } from './views/base';
import Recipe from './models/Recipe';
import List from './models/List';


// Global State
const state = {};

// SEARCH Controller
const controlSearch = async () => {

    // 1. Read query from view
    // const query = searchView.getInput();
    // Testing
    const query = 'pizza';
    

    if (query) {

        // 2. Search and add the search result to the state object
        state.search = new Search(query);
    
        // 3. Prepare UI for the results
        searchView.clearResults(); // clear display of previously searched results
        searchView.clearInput(); // clear the search input field
        renderLoader(elements.searchRes); //To add the loader icon while we wait for the search results
        // NOTE: didnt need to prefix base.renderLoader as i directly imported the loader instead of importing everything in general
    
        try {
            // 4. Search for the recipes from the result object
            await state.search.getResults();
        
            // 5. Render the results on the UI
            clearLoader();
            searchView.renderResults(state.search.recipes);
            
        } catch (error) {
            clearLoader();
        }

    }

}

// RECIPE Controller
const controlRecipe = async () => {
    // Get the recipe_id of the active recipe
    const id = window.location.hash.replace('#','');
    
    if (id) {
        // Prepare UI for the changes
        // a. Clear the last Recipe
        elements.recipe.innerHTML= ""
        // b. Render Loader
        renderLoader(elements.recipe);

        if (state.search) searchView.highlightSelected(id)
        
        // Create the recipe object from class and save into the state object
        state.recipe = new Recipe(id);
        // Testing
        // window.r = state.recipe ;
        try {
            // Get Recipes using the Id
            await state.recipe.getRecipe();
            state.recipe.parseIngredients();
    
            // calculate time and servings
            state.recipe.calcTime();
            state.recipe.calcServing();

            // Render Recipe
            clearLoader();
            recipeView.renderRecipe(state.recipe);
            
        } catch (error) {
            alert(error)
        }
        
    }


}

// To Trigger the controlRecipe
['hashchange', 'load'].forEach(curEvent => window.addEventListener(curEvent,controlRecipe))

// Handling Recipe button clicks
elements.recipe.addEventListener('click', e=>{
    if ( e.target.matches('.btn-increase, .btn-increase *') ) {
        state.recipe.updateServings('inc')
    } else if ( state.recipe.servings >1 && e.target.matches('.btn-decrease, .btn-decrease *') ) {
        state.recipe.updateServings('dec')
    }
    recipeView.updateServingIngredients(state.recipe)
    // console.log(state.recipe.ingredients);
})


// To Avoid the reload on submit & trigger the controlSearch
elements.searchForm.addEventListener('submit', e => {
    e.preventDefault();
    controlSearch();
})

// Testing
window.addEventListener('load', e => {
    e.preventDefault();
    controlSearch();
})

// For Pagination Buttons
elements.searchResPages.addEventListener('click', e=>{
    const btn = e.target.closest('.btn-inline')
    if (btn) {
        const gotoPage = parseInt(btn.dataset.goto, 10); // The Key // the dataset attribute of the button element is read here to know which page does the user clicking to go 
        // !!!!!!!!!!! ^^^ Important ^^^ !!!!!!!!!!!
        searchView.clearResults();
        searchView.renderResults(state.search.recipes, gotoPage);
    }
})


window.l = new List();