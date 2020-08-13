import axios from 'axios';
// Global app controller
const APIpath = `https://forkify-api.herokuapp.com/api/search`; // The Api built by Jonas

async function getResults(query) {
    
    try {
        const res = await axios(`${APIpath}?q=${query}`);
        const recipes = res.data.recipes;
        
        console.log(recipes.forEach(el => {
            console.log(el.title);      
            console.log(el);      
            console.log(``);
        }) );
        
    } catch (error) {
        alert(error)
    }

}

getResults(`pizza`);