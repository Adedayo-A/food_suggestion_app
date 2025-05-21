import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, 
    IconButton, Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField,
    Snackbar,
    Alert,
    Card
    } 
    from '@mui/material';

import background_chef from '../static/assets/bg_chefs.jpeg';
import CheckboxListSecondary from '../reusabale-components/list-component';
import DiaglogButton from '../reusabale-components/dialog-add-btn';

import CustomMultiSelectDropdown from '../reusabale-components/custom-multiselect';
import {CustomButton} from '../reusabale-components/custom-button';
import '../static/home/homepage.scss';
import iRecipeApiResponse from '../interfaces/iRecipeApiResponse';
import { iIngredients, iingredient } from '../interfaces/iIngredients';
import api from '../api/axios';
import Loader from '../reusabale-components/loader';


const HOME_PAGE_URL = '/ingredients'
export default function Homepage() {
    type severityValues = "warning" | "success" | "error" | "info"

    //INGREDIENT
    const [selectedIngredients, setSelectedIngredients] = useState<iingredient[]>([]);
    const [ingredients, setIngredients] = useState<iingredient  []>([]);


    //API RESPONSE
    const [recipes, setRecipes] = useState(Array<iRecipeApiResponse>);
    
    //FILTER SEARCH
    const [filterText, setFilterText] = useState("");

    //SNACKBAR
    const [snackbarOpen, setSnackbarOpen] = useState(false)
    const [snackbarMessage, setSnackbarMessage] = useState("")
    const [snackbarSeverity, setSnackbarSeverity] = useState<severityValues>("success")

    // LOADER
    const [isDataLoading, setIsDataLoading] = useState(false);

    // PROMPT
    const selectedNames = selectedIngredients.map(a => a.name);
    const selectedIngredientsStr = selectedIngredients.length > 0 ? selectedNames.toString() : "";
    const prompt = ` List a few popular recipes I can make with these ingredients: ${selectedIngredientsStr}, and include the amounts of ingredients, with their nutritional values.`;
    
    const navigate = useNavigate();

    // useEffect(() => {
    //     handleLoadIngredients();
    // }, [handleLoadIngredients])

     useEffect(() => {
            handleLoadIngredients();
    }, [])

    const handleLoadIngredients = async () => {
        setIsDataLoading(true);

        await fetch('/api/ingredients?query=', {
            method: 'GET',
            headers: {
                "Content-Type": "application/json"
            },
        })
        .then(res => res.json())
        .then((data) =>  {
            setIngredients(data.ingredients)

            setIsDataLoading(false);

            if(data.ingredients.length > 0) {
            }
            // setSnackbarMessage("Ingredients retrieved")
            // setSnackbarSeverity("success")
        })
        .catch(err => {
            console.error('Error fetching data', err);
            setIngredients([]);
            setIsDataLoading(false);
            // setSnackbarMessage("An error occured trying to delete a product.")
            // setSnackbarSeverity("warning")
        })
    }


    const handleSnackbarClose = () => {
        setSnackbarOpen(false)
    }
        
    const handleSuggestionClick = async () => {
        try {
            setIsDataLoading(true)
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

                localStorage.setItem('recipeSuggestion', JSON.stringify(responseData));
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

    const handleFilterChange = async (event) => {
        setFilterText(event.target.value);
    }

    const filteredIngredients  = ingredients.filter( ingredient => 
        (ingredient.name && ingredient.name.toLowerCase().includes(filterText.toLocaleLowerCase()))
    );

    return (
        <> { isDataLoading ? <div className='loader-container'> <Loader /></div> :
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
                           
                            <CheckboxListSecondary handleToggle={handleToggling} selected={selectedIngredients} ingredients={filteredIngredients} isFavourite={false} />
                            
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
                            <Button className='submit-suggestion-btn' variant='contained' onClick={handleSuggestionClick}>
                                Get Suggestions
                            </Button>
                            {/* <div className="submit-suggestion" onClick={handleSuggestionClick}> Get Suggestions </div> */}
                        </div>
                    
                    </div>
                } 
            </div>
                
        }
        </>
    )
}
