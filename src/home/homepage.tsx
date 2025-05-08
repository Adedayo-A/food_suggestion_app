import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import recipeList from '../dashboard/util/data';
import CustomMultiSelectDropdown from '../reusabale-components/custom-multiselect';
import {CustomButton} from '../reusabale-components/custom-button';
import '../static/home/homepage.scss';
import iRecipeApiResponse from '../interfaces/iRecipeApiResponse';

export default function Homepage() {
    const [selectedIngredients, setIngredients] = useState<string[]>([]);
    const [recipes, setRecipes] = useState(Array<iRecipeApiResponse>);

    const ingredients = selectedIngredients.length > 0 ? selectedIngredients.toString() : "";

    const prompt = ` List a few popular recipes I can make with these ingredients: ${ingredients}, and include the amounts of ingredients.`;
    const navigate = useNavigate();

    const toggleOption = ({ id }) => {
        setIngredients(prevSelected => {
            // if it's in, remove
            const newArray = [...prevSelected]
            if (newArray.includes(id)) {
                return newArray.filter(item => item !== id)
                // else, add
            } else {
                newArray.push(id)
                return newArray;
            }
        })
    }

    useEffect(() => {
        if(recipes.length > 0) {
            navigate('/food-page', {state: {recipes}});
        }
    }, [recipes])
        
    const handleSuggestionClick2 = async () => {
        await fetch('api/food-suggestion', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ prompt })
        })
        .then(res => res.json()).then(data => {setRecipes(data)}).catch( error => {
            console.error('Error fetching data', error);
            setRecipes([]);
        });
    }

    const handleSuggestionClick = async () => {
        try {
            const url = 'api/food-suggestion';
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({prompt})
            });
            if(response.ok) {
                const responseData = await response.json();
                const data = JSON.parse(responseData);
                setRecipes(data);

            } else {
                setRecipes([]);
            }
        } catch (error) {
            console.error("Error fetching data:", error);
        } finally {
        }
    }

    const buttonChildren = (
        <span> Get Suggestion </span>
    )
    return (
        <div className='i-body'>
            <div className='i-body_container'>
                <CustomMultiSelectDropdown options={recipeList} selected={selectedIngredients} toggleOption={toggleOption} />
                <CustomButton children={buttonChildren} onClick={handleSuggestionClick} disabled = { selectedIngredients.length === 0}/>
            </div>
        </div>
    )
}
