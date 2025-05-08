import React from "react";
import { useLocation } from "react-router-dom";

import iRecipeApiResponse from "../interfaces/iRecipeApiResponse";
import Card from "../reusabale-components/card";
import '../static/dashboard/food-result-page.scss';

interface stateType {
    recipes: iRecipeApiResponse[]
}

const FoodPage = () => {

    const { state } = useLocation();
    const { recipes } : stateType  = state;

    return (
        <div className="fr-container">
            <h2 className="fr-container_heading"> Hi friend! Here are my suggested recipes for you. Enjoy</h2>
            <div className="fr-container_card_container">
                {recipes.map( (recipe, i) => {
                    return ( 
                        <div key={i}>
                            <Card image = {recipe.image} description={recipe.how_to_prepare} 
                            title={recipe.recipe_name} ingredients={recipe.ingredients} />
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default FoodPage;