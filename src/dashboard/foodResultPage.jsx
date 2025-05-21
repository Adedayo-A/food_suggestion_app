import * as React from "react";
import { useLocation } from "react-router-dom";

import iRecipeApiResponse from "../interfaces/iRecipeApiResponse";
import Card from "../reusabale-components/card";
import '../static/dashboard/food-result-page.scss';
import {DisplayResult} from './displayResult'

// interface stateType {
//     recipes: iRecipeApiResponse[]
// }

const FoodPage = () => {

    const { state } = useLocation();
    // const { recipes } : stateType  = state;

    const [recipeData, setRecipeData] = React.useState([]);

    React.useEffect(() => {
        const storedRecipes = localStorage.getItem('recipeSuggestion');
        try{
            const parsed = storedRecipes ? JSON.parse(storedRecipes) : [];
            setRecipeData(parsed)
        } catch (e) {
            console.error("Error parsing stored courses")
            setRecipeData([]);
        }
    }, [])

    return (
        <div className="fr-container">
            <h2 className="fr-container_heading"> Yummy.. Here are my suggested Recipes for you.</h2>
            <div className="fr-container_card_container">
                { recipeData.map( (recipe, i) => {
                    return ( 
                        <div key={i}>
                            {/* <Card image = {recipe.image} description={recipe.how_to_prepare} 
                            title={recipe.recipe_name} ingredients={recipe.ingredients} nutritionalValues={recipe.nutritional_values} /> */}
                            
                            <DisplayResult imageUrl = {recipe.image} about = {recipe.about} cookingSteps={recipe.how_to_prepare} 
                            name={recipe.recipe_name} ingredients={recipe.ingredients} nutritionalValues={recipe.nutritional_values} />
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default FoodPage;