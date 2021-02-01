import { elements } from "./base";
import { Fraction } from 'fractional'

const formatCount = (count) => {
    if (count){

        // True If the count does not contain decimal 
        if ( Math.ceil(count)-count === 0 ) {
            return count;
        } 
        
        const [int, dec] = count.toString().split('.').map(el => parseInt(el,10));
        const fr = new Fraction( parseFloat(`0.${dec}`,10) )
    
        if (int === 0) {
            return `${fr.numerator}/${fr.denominator}`
        } else if (int > 0) {
            return `${int} ${fr.numerator}/${fr.denominator}`
        }
        
    }
    return '?'; // Executes only if there is no count or is undefined

}



const createIngredient = (curIng)=> {
    // This is not getting any value in the curIng variable

        const ingredientMarkup = `<li class="recipe__item">
            <svg class="recipe__icon">
                <use href="img/icons.svg#icon-check"></use>
            </svg>
            <div class="recipe__count">${formatCount(curIng.count)}</div>
            <div class="recipe__ingredient">
                <span class="recipe__unit">${curIng.unit}</span>
                ${curIng.ingredient}
            </div>
        </li>`;

        return ingredientMarkup;

        // elements.ingredientList.insertAdjacentHTML("beforeend",ingredientMarkup)
    }

export const renderRecipe = recipe => {
    let markup = `
            <figure class="recipe__fig">
                <img src="${recipe.img}" alt="${recipe.title}" class="recipe__img">
                <h1 class="recipe__title">
                    <span>${recipe.title}</span>
                </h1>
            </figure>

        <div class="recipe__details">
            <div class="recipe__info">
                <svg class="recipe__info-icon">
                    <use href="img/icons.svg#icon-stopwatch"></use>
                </svg>
                <span class="recipe__info-data recipe__info-data--minutes">${recipe.time}</span>
                <span class="recipe__info-text"> minutes</span>
            </div>
            <div class="recipe__info">
                <svg class="recipe__info-icon">
                    <use href="img/icons.svg#icon-man"></use>
                </svg>
                <span class="recipe__info-data recipe__info-data--people">${recipe.servings}</span>
                <span class="recipe__info-text"> servings</span>

                <div class="recipe__info-buttons">
                    <button class="btn-tiny">
                        <svg>
                            <use href="img/icons.svg#icon-circle-with-minus"></use>
                        </svg>
                    </button>
                    <button class="btn-tiny">
                        <svg>
                            <use href="img/icons.svg#icon-circle-with-plus"></use>
                        </svg>
                    </button>
                </div>

            </div>
            <button class="recipe__love">
                <svg class="header__likes">
                    <use href="img/icons.svg#icon-heart-outlined"></use>
                </svg>
            </button>
        </div>



        <div class="recipe__ingredients">
            <ul class="recipe__ingredient-list">
                ${
                    recipe.ingredients.map(createIngredient )
                    // contains an array whose entries contain finalized markup of each ingredient
                    .join('') 
                    // The array of the markUp (string) is now joined to form a mega-string of Markup containing all ingredients at one time
                }
            </ul>

            <button class="btn-small recipe__btn">
                <svg class="search__icon">
                    <use href="img/icons.svg#icon-shopping-cart"></use>
                </svg>
                <span>Add to shopping list</span>
            </button>
        </div>

        <div class="recipe__directions">
            <h2 class="heading-2">How to cook it</h2>
            <p class="recipe__directions-text">
                This recipe was carefully designed and tested by
                <span class="recipe__by">${recipe.author}</span>. Please check out directions at their website.
            </p>
            <a class="btn-small recipe__btn" href="${recipe.url}" target="_blank">
                <span>Directions</span>
                <svg class="search__icon">
                    <use href="img/icons.svg#icon-triangle-right"></use>
                </svg>

            </a>
        </div>    
    `
    elements.recipe.insertAdjacentHTML('afterbegin', markup)
    recipe.ingredients.map(curIng => createIngredient(curIng) )
}
