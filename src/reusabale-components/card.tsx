import '../static/reusable-components/card.scss';
import iCard from '../interfaces/iCard';
import Button from '@mui/material/Button';


export default function Card(props: iCard) {

    const onRedirectToGoogle = (recipeName) => {
        window.open(`http://images.google.com/images?q=${recipeName}`, "_blank");

    } 

    return (
        <div className="c-card-container">
            <div className='c-card-results'>
                <h5>Recipe image</h5>
                <img className="c-card-container_image" src={props.imageUrl} alt="recipe image" />
            
                <Button variant='contained' onClick={ () => onRedirectToGoogle(props.name)}>
                    Click Here to learn more </Button>

            </div>

            <div>
                <h2><u>Recipe title</u></h2>
                <h2 className="c-card-container_title"> {props.name} </h2>
            </div>

            <div>
                <h2>INGREDIENTS</h2>
                {props.ingredients.map((ingredient, i) => {
                    return (
                        <span key={i}>
                            <span>*{ingredient}</span>
                            <span>  </span> 
                        </span>
                    )
                })}
            </div>

            <section className="steps">
                <h3>🔥 Cooking Steps</h3>
                <ol>
                {props.cookingSteps.map((step, idx) => <li key={idx}>{step}</li>)}
                </ol>
            </section>

            <div>
                <h2> Nutritional values </h2>
                <p className="c-card-container_text"> {props.nutritionalValues} </p>
            </div>
        </div>
    )
} 