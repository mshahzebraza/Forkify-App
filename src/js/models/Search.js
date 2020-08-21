import axios from 'axios';

export default class Search {
    constructor(query) {
        this.query = query;
    }

    async getResults(){

        try {
            const APIpath = `https://forkify-api.herokuapp.com/api/search`; // The API built by Jonas

            const result = await axios(`${APIpath}?q=${this.query}`);
            this.recipes = result.data.recipes; // an array of recipe objects

            /* 
            console.log(this.recipes.forEach(el => {
                console.log(el.title);      
                console.log(el);      
                console.log(``);
            }) );
             */
            
        } catch (error) {
            alert(error)
        }

    }
}
