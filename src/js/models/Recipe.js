import axios from 'axios';
import {APIpath} from '../config';

export default class Recipe {
    constructor(id) {
        this.id = id;
    }

    async getRecipe() {
        try {
            const res = await axios(`${APIpath}get?rId=${this.id}`);
            // console.log(res);
            this.title = res.data.recipe.title;
            this.author = res.data.recipe.publisher;
            this.img = res.data.recipe.image_url;
            this.url = res.data.recipe.source_url;
            this.ingredients = res.data.recipe.ingredients;

        } catch (error) {
            alert('Something Went Wrong!')
        }
    }
    
    calcTime() {
        const numIng = this.ingredients.length;
        const periods = Math.ceil(numIng / 3);
        this.time = periods*15 ; 
    }

    calcServing() {
        this.servings = 4;
    }
    
    
    parseIngredients() {

        const unitsLong = ['tablespoons','tablespoon','ounces','ounce','teaspoons','teaspoon','cups','slices','pounds']
        const unitsShort = ['tbsp','tbsp','oz','oz','tsp','tsp','cup','slice','pound']
        
        const newIngredients = this.ingredients.map((el,ido) => {

            // 1. HOMOGENOUS UNIT
            let curIngredient = el.toLowerCase(); // lower casing
            unitsLong.forEach((unit, idx) => curIngredient = curIngredient.replace( unit, unitsShort[idx] ) ); // plural to singular units

            // 2. REMOVE PARANTHESIS
            curIngredient = curIngredient.replace(/ *\([^)]*\) */g, " ");

            let arrIngredient = curIngredient.split(" ");
            const unitIndex = arrIngredient.findIndex( curWordIngredient => unitsShort.includes(curWordIngredient)); // the place of first identified unit

            let objIngredient ;

            
            // 3. PARSE INGREDIENTS INTO COUNT AND INGREDIENT 
            if (unitIndex > -1 && arrIngredient.slice(0,unitIndex).length <= 2) {
                /* 
                Condition 1: If any unit is found in the ingredient 
                Condition 2: If the words before the unit found is <=3 (to avoid extra words being mistaken as numbers.... Error related to recipe_id: 54454)
                */
                
                const arrCount = arrIngredient.slice(0,unitIndex);

                let count;
                
                if ( arrCount.length === 1 ) {
                    count = eval( arrIngredient[0].replace("-","+") ) //(first entry of arrIngredient is the count but make sure to replace the -ve sign)
                } else {
                    count = eval( arrCount.join('+') )
                }
                // Alternative to If-Else Block above
                    // count: eval( arrIngredient.slice(0,unitIndex).join("+").replace("-","+") ), // Important 
                
                objIngredient= {
                    count,
                    unit: arrIngredient[unitIndex],
                    ingredient: arrIngredient.slice(unitIndex+1).join(" ")
                }


            } else if ( parseInt(arrIngredient[0], 10) ) {
                // No Unit, Has Count // True if first entry is coerced into a 'Count'

                // console.log(typeof(parseInt(arrIngredient[0], 10)));
                objIngredient= {
                    // count: eval( parseInt(arrIngredient[0], 10).replace("-", "+") ), // ERROR here !
                    // count: eval( arrIngredient[0].replace("-", "+") ),
                    count: eval( arrIngredient[0].replace("-", "+") ),
                    unit: "",
                    ingredient: arrIngredient.slice(1).join(' ') // everything other than the first entry is assumed to be the ingredient text.
                }
                // console.log('hi2');
                
            } else if (unitIndex === -1 || arrIngredient.slice(0,unitIndex).length >2) {
                // No Unit, No Count // True if unit was never matched with any word of ingredient sentence.

                objIngredient= {
                    count: 1,
                    unit: "",
                    ingredient: curIngredient
                }
                // console.log('hi3');

            }
            // console.log(`test ${ido}: ${curIngredient}`);
        //    return curIngredient; 
           return objIngredient; 
        });
        this.ingredients = newIngredients;        
        // console.log(this.ingredients);
        
    }

    
}