import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { TextField, Snackbar, Alert } from '@mui/material';
import { useLocation } from "react-router-dom";

import CheckboxListSecondary from '../reusabale-components/list-component';

import '../static/home/homepage.scss';
import iRecipeApiResponse from '../interfaces/iRecipeApiResponse';
import { iIngredients, iingredient } from '../interfaces/iIngredients';
import api from '../api/axios';
import Loader from '../reusabale-components/loader';


const HOME_PAGE_URL = '/ingredients';

export default function MyProfile() {

    // SEVERITY TYPES
    type severityValues = "warning" | "success" | "error" | "info"

    const { state } = useLocation(); //onload, I lose it. using localstorage
    //const userId  = state;
    const userId = localStorage.getItem('userId');

    // const [selectedIngredients, setSelectedIngredients] = useState<string[]>([]);
    const [selectedIngredients, setSelectedIngredients] = useState<iingredient[]>([]);

    //GET INGREDIENTS
    const [ingredients, setIngredients] = useState<iingredient  []>([]);

    //RESPONSE FROM LLM
    const [recipes, setRecipes] = useState(Array<iRecipeApiResponse>);

    //SEARCH INGREDIENTS
    const [filterText, setFilterText] = useState("");

    //SNACKBAR
    const [snackbarOpen, setSnackbarOpen] = useState(false)
    const [snackbarMessage, setSnackbarMessage] = useState("")
    const [snackbarSeverity, setSnackbarSeverity] = useState<severityValues>("success")

    //LOADER
    const [isDataLoading, setIsDataLoading] = useState(false);

    // PROMPT
    const selectedNames = selectedIngredients.map(a => a.name);
    const selectedIngredientsStr = selectedIngredients.length > 0 ? selectedNames.toString() : "";
    const prompt = ` List a few popular recipes I can make with these ingredients: ${selectedIngredientsStr}, and include the amounts of ingredients, with their nutritional values.`;
    // List top 5 recipes
    //const prompt = ` List a few popular recipes I can make with these ingredients: ${selectedIngredientsStr}, and include the amounts of ingredients.`;
    
    
    const navigate = useNavigate();
    
    useEffect(() => {
        handleLoadIngredients();
    }, [])

    const handleToggling = (ing: iingredient) => {
        console.log('ingre', ing);
        setSelectedIngredients(prevSelected => {
            // if it's in, remove
            const newArray = [...prevSelected]
            console.log('aa', newArray);

            if (newArray.some(el => el.id == ing.id)) {
                console.log('bb', newArray)
                return newArray.filter(item => item.id !== ing.id)
                // else, add
            } else {
                newArray.push(ing)
                console.log('cc', ing)
                return newArray;
            }
        }) 
    }

    const handleLoadIngredients = async () => {
        
        setIsDataLoading(true);

        await fetch(`/api/my-ingredients?user_id=${userId}`, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json"
            },
        })
        .then(res => res.json())
        .then((data) =>  {
            console.log(data)
            setIngredients(data)

            setIsDataLoading(false);

            setSnackbarMessage("data retrieved")
            setSnackbarSeverity("success")
        })
        .catch(err => {
            console.error('Error fetching data', err);
            setIngredients([]);
            setIsDataLoading(false);
        })
    }

    const handleSnackbarClose = () => {
        setSnackbarOpen(false)
    }
        
    const handleSuggestionClick = async () => {
        try {
            setIsDataLoading(true);
            setSnackbarOpen(true);
            const url = 'api/integrations/recipe-suggestion';
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({prompt})
            });
            if(response.ok) {
                const responseData = await response.json();
                // const data = JSON.parse(responseData);
                setRecipes(responseData);
                setIsDataLoading(false)
                setSnackbarOpen(false)
                setSnackbarMessage("successful")

                localStorage.setItem('recipeSuggestion', JSON.stringify(responseData))

               navigate('/dashboard');

            } else {
                setRecipes([]);
                setIsDataLoading(false)
                setSnackbarOpen(false)
                setSnackbarMessage("error occured")
            }
        } catch (error) {
            console.error("Error fetching data:", error);
            setIsDataLoading(false)
            setSnackbarOpen(false)
            setSnackbarMessage("error occured")
        } 
    }

    const handleFilterChange = async (event) => {
        setFilterText(event.target.value);
    }

    const filteredIngredients  = ingredients.filter( ingredient => 
        (ingredient.name && ingredient.name.toLowerCase().includes(filterText.toLocaleLowerCase()))
    );

    return (
        <> { isDataLoading ? <div className='loader-container'> <Loader /></div> 
            :
            <div className="main-wrapper">
                { ingredients == undefined || ingredients.length == 0 ?
                    <div className="no-data-found"> 
                        <div>
                            No data found. Click on the Add New button to add Ingredients
                        </div>
                    </div> :

                    <div className='homepage-parent'>

                        <div className='homepage-searchfield-container'>
                            <TextField
                                className='homepage-searchfield' 
                                label="Search Ingredient" variant='outlined' value={filterText} 
                                onChange={handleFilterChange}>
                            </TextField>
                        </div>

                        <div className='homepage-parent_2'>
                            <CheckboxListSecondary handleToggle={handleToggling} selected={selectedIngredients} ingredients={filteredIngredients} isFavourite= {true}/>

                            <Snackbar
                                open={snackbarOpen}
                                autoHideDuration={4000}
                                onClose={handleSnackbarClose}
                                anchorOrigin={{vertical: 'top', horizontal: 'right'}}
                            >
                                <Alert onClose={handleSnackbarClose} severity={snackbarSeverity}
                                    sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    minHeight: '80px'
                                    }}>

                                    {snackbarMessage}
                                </Alert>
                                
                            </Snackbar>

                        </div>

                        <div className="homepage-parent_3">
                            <div className="submit-suggestion" onClick={handleSuggestionClick}> Get Suggestions </div>
                        </div>
                    
                    </div>
                }
            </div>
                
        }
        </>
    )
}
