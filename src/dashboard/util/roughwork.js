// FOOD SUGGESTION BUTTON

// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';

// import '../static/dashboard/suggestionbutton.scss'

// export const SuggestionButton = ({foodsArr}) => {

//     const foods = foodsArr.toString();
//     const prompt = `please list the foods I can make from these ${foods}?`;
//     const navigate = useNavigate();
    
//     const [suggestedFood, setSuggestedFood] = useState("");

//        useEffect(() => {
//             if(suggestedFood != "")
//                 navigate('/food-page', {state: {suggestedFood: suggestedFood}});
//         }, [suggestedFood])
    
//     const handleSuggestionClick = async () => {
//         await fetch('api/food-suggestion', {
//             method: "POST",
//             headers: {
//                 "Content-Type": "application/json"
//             },
//             body: JSON.stringify({ prompt })
//         })
//         .then(res => res.json()).then(data => {
//             setSuggestedFood(data.result);
//             console.log(suggestedFood);
//             // navigate('/food-page', {state: {suggestedFood: suggestedFood}});
//         }).catch(error => console.error('Error fetching data', error));
//     }

//     const handleSuggestionClick2 = async () => {
//         try {
//             const url = 'api/food-suggestion';
//             const response = await fetch(url, {
//                 method: "POST",
//                 headers: {
//                     "Content-Type": "application/json",
//                 },
//                 body: JSON.stringify({prompt})
//             });
//             console.log(response);
//             if(response.ok) {
//                 const responseData = await response.json();
//                 setSuggestedFood(responseData);
//             } else {
//                 setSuggestedFood("");
//             }
//         } catch (error) {
//             console.error("Error fetching data:", error);
//         } finally {
//         }
//     }

//     return (
//         <button 
//             onClick={handleSuggestionClick2}
//             className="c-suggestion-button"
//         >
//             <span>Get Suggestion</span> 
//         </button>
//     )
// }