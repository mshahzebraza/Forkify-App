import { elements } from './base';


export const getInput = () => elements.searchInput.value;


export const clearInput = () => {
    elements.searchInput.value = "";
}

export const clearResults = () => {
    elements.searchResList.innerHTML = "";
}

const limitString = (el, limit=20) => {
    
    const newTitle=[];
    
    if (el.length >= limit) {

        el.split(' ').reduce( (acc,cur) => {
            if ( acc+cur.length < limit ) {
                newTitle.push(cur)
            }
            return acc += cur.length + 1;
        }, 0)
        
        return `${newTitle.join(' ')} ...`;
    }
    return el;
    
}

const renderRecipe = recipe => {
    const markup = `
        <li>
            <a class="results__link results__link--active" href="#${recipe.recipe_id}">
                <figure class="results__fig">
                    <img src="${recipe.image_url}" alt="${recipe.title}">
                </figure>
                <div class="results__data">
                    <h4 class="results__name">${limitString(recipe.title) }</h4>
                    <p class="results__author">${recipe.publisher}</p>
                </div>
            </a>
        </li> `;

    elements.searchResList.insertAdjacentHTML("beforeend", markup);
}


// Important to note the syntax
export const renderResults = res => {
    res.forEach(renderRecipe);
}
