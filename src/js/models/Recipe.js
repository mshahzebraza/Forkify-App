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
        
        const newIngredients = this.ingredients.map(el => {


            // 1. HOMOGENOUS UNIT

            // lower casing each ingredient sentence
            let curIngredient = el.toLowerCase();
            
            // changing plural units to singular units
            unitsLong.forEach((unit, idx) => {
                curIngredient = curIngredient.replace(unit, unitsShort[idx]);
            });
                        

            // 2. REMOVE PARANTHESIS

            curIngredient = curIngredient.replace(/ *\([^)]*\) */g, " ");
            // console.log(curIngredient);
            
            let arrIngredient = curIngredient.split(" ");
            // console.log(arrIngredient);

            // check which first word of the current Ingredient sentence matches any entry of the unitsShort array (returns -1 if no unit is found)
            const unitIndex = arrIngredient.findIndex( curWordIngredient => unitsShort.includes(curWordIngredient));
            // console.log(unitIndex);
            // console.log('');

            let objIngredient ;
            
            

            // 3. PARSE INGREDIENTS INTO COUNT AND INGREDIENT 
            if (unitIndex > -1) {
                // Has Unit , Has Count // True if unit is matched at any place of the sentence
                // console.log( arrIngredient.slice(0,unitIndex) ); // means everything before the unitIndex is coerced into the 'Count'
                // console.log( arrIngredient.slice(0,unitIndex).join("+") ); // means everything before the unitIndex is coerced into the 'Count'
                // console.log( eval( arrIngredient.slice(0,unitIndex).join("+")) ); // means everything before the unitIndex is coerced into the 'Count'
                objIngredient= {
                    // count: eval( arrIngredient.slice(0,unitIndex+1).join("+") ), // ERROR Here!
                    count: eval( arrIngredient.slice(0,unitIndex).join("+").replace("-","+") ), // Important 
                    // Saved the IF statement for two cases..
                    // (Case 1. If the ingredient includes '-' sign, then replace)
                    // (Case 2. If it doesn't then simply join)
                    // count: eval( arrIngredient.slice(0,unitIndex).replace("-","+") ), // means everything before the unitIndex is coerced into the 'Count'
                    unit: arrIngredient[unitIndex],
                    ingredient: arrIngredient.slice(1).join(" ")
                }
                // console.log(objIngredient);

            } else if ( parseInt(arrIngredient[0], 10) ) {
                // No Unit, Has Count // True if first entry is coerced into a 'Count'

                // console.log(typeof(parseInt(arrIngredient[0], 10)));
                objIngredient= {
                    // count: eval( parseInt(arrIngredient[0], 10).replace("-", "+") ), // ERROR here !
                    count: eval( arrIngredient[0].replace("-", "+") ),
                    unit: "",
                    ingredient: arrIngredient.slice(1).join(' ') // everything other than the first entry is assumed to be the ingredient text.
                }
                // console.log(objIngredient);
                
            } else if (unitIndex === -1) {
                // No Unit, No Count // True if unit was never matched with any word of ingredient sentence.

                objIngredient= {
                    count: 1,
                    unit: "",
                    ingredient: curIngredient
                }
                // console.log(objIngredient);

            }
            
        //    return curIngredient; 
           return objIngredient; 
        });
        this.ingredients = newIngredients;        
        // console.log(this.ingredients);
        
    }

    
}