import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Checkbox from '@mui/material/Checkbox';
import Avatar from '@mui/material/Avatar';
import { iingredient } from '../interfaces/iIngredients';
import Loader from '../reusabale-components/loader';
import { TextField, Snackbar, Alert } from '@mui/material';
import defaultingredienting from '../static/assets/default_ingredient.jpeg';


import Button from '@mui/material/Button';

import '../static/reusable-components/list-component.css';


interface iList {
    ingredients: iingredient[];
    handleToggle: (arg) => void;
    selected: any[]
    isFavourite: boolean
}

// export default function CheckboxListSecondary: React.FC<iList> = ({props}:{props: any[]})

export default function CheckboxListSecondary (props : iList) {

    //SNACKBAR
    const [snackbarOpen, setSnackbarOpen] = React.useState(false)
    const [snackbarMessage, setSnackbarMessage] = React.useState("")
    const [snackbarSeverity, setSnackbarSeverity] = React.useState<severityValues>("success")
    const [checked, setChecked] = React.useState([1]);

    //SEVERITY TYPE
    type severityValues = "warning" | "success" | "error" | "info"

    //LOADER
    const [isDataLoading, setIsDataLoading] = React.useState(false);
    
    // USER DETAILS
    const [userId, setUserId] = React.useState(0);
    const [isLoggedIn, setLoggedIn] = React.useState(false);

    React.useEffect( () => {
        const userIdFromStorage = localStorage.getItem('userId');
        const validateData = userIdFromStorage ? userIdFromStorage : '';
        if(validateData == '') {
            setLoggedIn(false)
        } else {
            const userId = Number(validateData);
            setUserId(userId);
            setLoggedIn(true);
        }
    },[])

  const handleToggle = (value: number) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];
    console.log('we here')
    if (currentIndex === -1) {
        //has not been added, add
      newChecked.push(value);
    } else {
        //has been added, remove
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  const handleSnackbarClose = () => {
        setSnackbarOpen(false)
  }

  const handleAddToFavourite = async (ingId: number, userId: number) => {
    try {
        setIsDataLoading(true);
        setSnackbarOpen(true);
        const url = 'api/add-favourite-ingredient';
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(
                {
                    ingredientId: ingId,
                    userId: userId
                }
            )
        });
        if(response.ok) {
            const responseData = await response.json();
            const msg = responseData.success;

            if(msg == true)
                setSnackbarMessage("ingredients successfully added")

            setIsDataLoading(false)

        } else {
            setIsDataLoading(false)
            // setSnackbarOpen(false)
            setSnackbarMessage("error occured while trying to add ingredient")
        }
    } catch (error) {
        console.error("Error fetching data:", error);
        setIsDataLoading(false)
        // setSnackbarOpen(false)
        setSnackbarMessage("error occured while trying to add ingredient")
    } 
  }

  return (
     <> { isDataLoading ? <Loader /> : 

        <List className='list-component' dense sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
            {props.ingredients.map((prop, index) => {
            const labelId = `checkbox-list-secondary-label-${prop.id}`;
            const isSelected = props.selected.some(el => el.id == prop.id);

            return (
                <ListItem
                    key={prop.id}
                    
                    secondaryAction= {
                        <Checkbox        
                            edge="end"
                            // onChange={props.handleToggle}
                            //onChange={handleToggle(prop.id)}
                            onClick={() => props.handleToggle(prop)}
                            //checked={checked.includes(prop.id)}
                            checked={isSelected}
                            inputProps={{ 'aria-labelledby': labelId }}
                        />
                }
                    disablePadding
                >

                    <ListItemButton>

                    <ListItemAvatar>
                        <Avatar
                        alt={`Avatar n°${index + 1}`}
                        src={prop.imageUrl == "" ? defaultingredienting : prop.imageUrl}
                        />
                    </ListItemAvatar>
                    <ListItemText id={labelId} primary={prop.name} />
                    </ListItemButton>

                    {
                        isLoggedIn && !props.isFavourite ? 
                        // <button onClick={() => {handleAddToFavourite(prop.id, userId)}} >
                        //  Add To Favorite
                        // </button>

                        < ListItemButton>
                            <ListItemText onClick={() => {handleAddToFavourite(prop.id, userId)}}> Add To Favourite</ListItemText>
                        </ListItemButton> 
                        : <div></div>
                    }

                </ListItem>
                );

            })}
        </List>
    } 
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
</>

  );
}
