import * as searchView from './views/searchView';
import * as recipeView from './views/recipeView';
import * as listView from './views/listView';
import * as likesView from './views/likesView';
import { elements, renderLoader, clearLoader } from './views/base';
import Search from './models/Search';
import Recipe from './models/Recipe';
import List from './models/List';
import Likes from './models/Likes';


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

        try {
            // Get Recipes using the Id
            await state.recipe.getRecipe();
            state.recipe.parseIngredients();
    
            // calculate time and servings
            state.recipe.calcTime();
            state.recipe.calcServing();

            // Render Recipe
            clearLoader();
            recipeView.renderRecipe(state.recipe, state.likes.isLiked(id));
            
        } catch (error) {
            alert(error)
        }   
    }
}
// Testing
state.likes = new Likes(); // just to access the method isLiked() at the start of program as we do not have likes class initialized in the beginning
likesView.toggleLikeMenu(state.likes.getNumLikes())


// List Controller
const controlList = (ingArr) => {

    // Create a List Object in the state if there is none already
    if (!state.list) state.list = new List();

    // add each item to List model and UI
    ingArr.forEach( (el,idx) => {
        state.list.addItem(el.count, el.unit, el.ingredient)
        listView.renderListItem( state.list.items[idx] )
        
        // Alternatively
        // const item = state.list.addItem(el.count, el.unit, el.ingredient)
        // listView.renderListItem( item )

    });

    
}

// Likes Controller
const controlLikes = (recipe) => {

    if (!state.likes) state.likes = new Likes();

    // If NOT yet liked
    if ( !state.likes.isLiked(recipe.id) ) {
        // Add to Likes class
        const newLikeItem = state.likes.addLike(recipe.id,recipe.img,recipe.title,recipe.author);
        // Toggle the heart style
        likesView.toggleLikeBtn(true);
        
        // Add to Likes list
        likesView.renderLikeListItem(newLikeItem)
        
    // If HAS been liked
    } else {
        // remove from Likes class
        state.likes.deleteLike(recipe.id)
        
        // Toggle the heart style
        likesView.toggleLikeBtn(false)
        
        // Remove from Likes list
        likesView.deleteLikeListItem(recipe.id)
    }
               
    likesView.toggleLikeMenu(state.likes.getNumLikes())

}

// Handling delete and update list item events
elements.shoppingList.addEventListener('click', e => {

    const id = e.target.closest('.shopping__item').dataset.itemid;
    
    if (e.target.matches('.shopping__delete, .shopping__delete *')) {
        // Delete from state
        state.list.deleteItem(id)
        // Delete from UI
        listView.deleteListItem(id);
    } else if (e.target.matches('.shopping__count-value')) {
        let newVal = e.target.value
        state.list.updateCount(id, newVal)
        console.log(state.list.items);
    }
})


// Handling Recipe button clicks
// especially for DOM elements not present at the start of application
elements.recipe.addEventListener('click', e => {
    
    if ( e.target.matches('.btn-increase, .btn-increase *') ) 
    {
        // To increase the sevings
        state.recipe.updateServings('inc')
        recipeView.updateServingIngredients(state.recipe)
        
    } else if ( state.recipe.servings >1 && e.target.matches('.btn-decrease, .btn-decrease *') ) 
    {
        // To decrease the sevings
        state.recipe.updateServings('dec')
        recipeView.updateServingIngredients(state.recipe)

    } else if (e.target.matches('.recipe__btn--add, .recipe__btn--add *') ) 
    {
        // To add the recipe to shopping list
        controlList(state.recipe.ingredients)
    } else if (e.target.matches('.recipe__love, .recipe__love *') ) {
        controlLikes(state.recipe);
    }
});


// To Trigger the controlRecipe
['hashchange', 'load'].forEach(curEvent => window.addEventListener(curEvent,controlRecipe))



// To Avoid the reload on submit & trigger the controlSearch
elements.searchForm.addEventListener('submit', e => {
    e.preventDefault();
    controlSearch();
})

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
