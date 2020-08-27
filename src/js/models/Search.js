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

        } catch (error) {
            alert(error)
        }

    }
}

// NOTES 
/* 
This Module is used to export the functionality of a search module into the main index.js file where we will only be able to use the functionality without needed to fill the whole file with all this code... 
In other words, MVC is being implemented in such a way that the functional units are coded in some file and are made accessible in the main index.js file so that the main file remains neat and clean!
After importing the functionality we'll be able to use the module and hence an object will be created from the search will be most likely saved in some are other than the main index.js file.
*/