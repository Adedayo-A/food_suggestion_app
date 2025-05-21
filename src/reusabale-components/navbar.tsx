// import * as React from 'react';
import React, { useState, useEffect, useCallback } from 'react';

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
// import { useAuth } from './AuthContext';
import { useNavigate } from 'react-router-dom';
import { colors } from '@mui/material';
import { brown } from '@mui/material/colors';
import { useAuth } from '../util/useAuth'

import DiaglogButton from '../reusabale-components/dialog-add-btn';


export default function NavBar() {

//  const { token } = useAuth();
// console.log(token);
  const [open, setOpen] = useState(false)
//   const [loggedIn, setLogin] = useState(isLoggedIn)

  const navigate = useNavigate();

  const goToHome = () => {
    navigate("/")
  }

  const goToProfile = () => {
    navigate("/my-profile")
  }

  const addAnIngredient = () => {
    navigate("/add-ingredient")
    // setOpen(true)
  }

  const handleAddProduct = async () => {}

  const handleClose = async () => {
    setOpen(false)
  }

  const logoutUser = () => {
    // logout()
    // setLogin(false)
    navigate("/login");
    localStorage.clear();

  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>

          <IconButton
            onClick={goToHome}
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>

          <Typography variant="h4" component="div" sx={{ flexGrow: 1 }} style={{cursor: 'pointer'}} onClick={goToHome}>
            Recipe <span style={{color: 'rgb(102, 21, 21)'}}>finder</span>
          </Typography>
         
          <Box display="flex" justifyContent="flex-start">
            <Button variant='contained' onClick={addAnIngredient}> Add New Ingredient </Button>
          </Box>

          <Button variant='contained' onClick={goToProfile}> My Profile </Button>

            {/* {
                isLoggedIn ? <div></div> :
                <div>
                    <a href='/register'>
                        REGISTER
                    </a>
                    <a href='/login'>
                        Login
                    </a>
                </div>    
            }     */}

                <div>
                    <a href='/register'>
                        <Button variant='contained'> REGISTER </Button>
                    </a>
                    <a href='/login'>
                        <Button variant='contained'> Login</Button>
                    </a>
                </div>
                        
            <Button onClick={logoutUser} color="inherit">Logout</Button>
          

        </Toolbar>
      </AppBar>
    </Box>
  );
}