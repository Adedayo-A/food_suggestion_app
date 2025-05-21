import React from "react";
import iCard from '../interfaces/iCard';
import '../static/dashboard/display-result.css';
import Button from '@mui/material/Button';
import defaultRecipeImage from '../static/assets/default_recipe.jpeg'


export const DisplayResult = ({imageUrl, about, name, cookingSteps, nutritionalValues, ingredients}: iCard) => {
    
    const onRedirectToGoogle = (recipeName) => {
        window.open(`http://images.google.com/images?q=${recipeName}`, "_blank");

    } 

    return (
        <div className="recipe-card">
            <img src={imageUrl == "" ? imageUrl : defaultRecipeImage} alt={name} className="recipe-image" />
            <h2 className="recipe-name">{name}</h2>
            <span style={{fontWeight: "bold"}}> Should in case our image server is overloaded, click 
            <a href={`http://images.google.com/images?q=${name}`} target="_blank"> Here </a> to view Recipe.
            </span>
            {/* <Button variant='contained' onClick={ () => onRedirectToGoogle(title)}>
                Click Here to learn more
            </Button> */}
            <section className="about">
                <h3>📝 About This Recipe</h3>
                <p>{about}</p>
            </section>

            <section className="ingredients">
                <h3>🍴 Ingredients</h3>
                <ul>
                {ingredients.map((item, idx) => <li key={idx}>{item}</li>)}
                </ul>
            </section>

            <section className="nutrition">
                <h3>🔬 Nutritional Values</h3>
                <p>
                    {nutritionalValues}
                </p>
            </section>

            <section className="steps">
                <h3>🔥 Cooking Steps</h3>
                <ol>
                {cookingSteps.map((step, idx) => <li key={idx}>{step}</li>)}
                </ol>
            </section>
        </div>
    )
}