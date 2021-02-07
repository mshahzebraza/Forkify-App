import { elements } from './base';


export const getInput = () => elements.searchInput.value;


export const clearInput = () => {
    elements.searchInput.value = "";
}

export const clearResults = () => {
    elements.searchResList.innerHTML = "";
    elements.searchResPages.innerHTML = "";
}

export const highlightSelected = (id) =>{
    const selArr = document.querySelectorAll(`.results__link--active`); 
    selArr.forEach(el => {
        el.classList.remove(`results__link--active`)
    });
    
    document.querySelector(`.results__link[href="#${id}"]`).classList.add('results__link--active');
}

export const limitString = (el, limit=20) => {
    
    const newTitle=[];
    
    if (el.length >= limit) {

        el.split(' ').reduce( (acc,cur) => {
            if ( acc+cur.length < limit ) {
                newTitle.push(cur)
            }
            return acc += cur.length + 1; // to accomodate the spaces between the words
        }, 0)
        
        return `${newTitle.join(' ')} ...`;
    }
    return el;
    
}

const renderRecipe = recipe => {
    const markup = `
        <li>
            <a class="results__link" href="#${recipe.recipe_id}">
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

const createButton = (page,type)=> `
    <button class="btn-inline results__btn-type-${type}" data-goto="${type === 'prev' ? page-1: page+1}">
        <span>Page ${type === 'prev' ? page-1: page+1}</span>
        <svg class="search__icon">
            <use href="img/icons.svg#icon-triangle-${type === 'prev' ? 'left': 'right'}"></use>
        </svg>
    </button>
`

const renderButtons = (curPage, numResults,resPerPage)=>{

    const pages= Math.ceil(numResults/resPerPage);
    let btn;
    if ( curPage===1 && pages>1) {
        // Only Next Button
        btn = createButton(curPage,'next');
    } else if ( curPage>1 && curPage < pages) {
        // Both the Buttons
        btn = `
            ${createButton(curPage,'prev')}
            ${createButton(curPage,'next')}
        `;
    } else if (curPage === pages) {
        // Only Prev Button
        btn = createButton(curPage,'prev')
    } {
        
    }

    elements.searchResPages.insertAdjacentHTML('beforeend', btn);

}

// Important to note the syntax
export const renderResults = (res, page=1, resPerPage=10) => {
    // Render Results of Current Page
    const start=(page-1)*resPerPage;
    const end=page*resPerPage; //end value is not returned by the slice method
    res.slice(start,end).forEach(renderRecipe);

    // Render Pagination
    renderButtons(page, res.length,resPerPage);
}

