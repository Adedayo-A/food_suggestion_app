import '../static/reusable-components/card.scss';
import iCard from '../interfaces/iCard';

export default function Card(props: iCard) {
    return (
        <div className="c-card-container">
            <div>
                <h5>Recipe image</h5>
                <img className="c-card-container_image" src={props.image} alt="recipe image" />
            </div>
            <div>
                <h2><u>Recipe title</u></h2>
                <h2 className="c-card-container_title"> {props.title} </h2>
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

            <div>
                <h2>How TO PREPARE</h2>
                <p className="c-card-container_text"> {props.description} </p>
            </div>
        </div>
    )
} 