import {elements} from './base'
import {limitString} from './searchView';


export const toggleLikeBtn =  (isLiked) => {
    const iconString = isLiked ? '' : '-outlined';
    document.querySelector('.recipe__love use').setAttribute('href',`img/icons.svg#icon-heart${iconString}`);
}

export const toggleLikeMenu = (numLikes) => {
    elements.likesMenu.style.visibility = numLikes > 0 ? "visible" : "hidden"; 
}

export const renderLikeListItem = like => {
    const likeMarkup = `
    <li>
        <a class="likes__link" href="#${like.id}">
            <figure class="likes__fig">
                <img src="${like.img}" alt="Test">
            </figure>
            <div class="likes__data">
                <h4 class="likes__name">${limitString(like.title) }</h4>
                <p class="likes__author">${like.author}</p>
            </div>
        </a>
    </li>
    `;
    elements.likesList.insertAdjacentHTML('beforeend', likeMarkup)
}

export const deleteLikeListItem = id => {
    console.log(id);
    const itemToDelete = document.querySelector(`.likes__link[href*="${id}"]`).parentElement;
    itemToDelete.parentElement.removeChild(itemToDelete);
}