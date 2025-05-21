import React, { useState, useEffect } from 'react';
import {Routes, Route, Navigate} from 'react-router-dom';
import { red } from '@mui/material/colors';

import Homepage from './home/homepage';
import FoodPage from './dashboard/foodResultPage';
import Login from './user/login';
import Register from './user/register';
import ProtectedRoutes from './util/protected-route';

import NavBar from './reusabale-components/navbar';
import AddIngredient from './profile/addIngredients';
import MyProfile from './profile/myprofile';
import Dashboard from './dashboard/foodResultPage';

import './App.css';


function App() {
  
  return (
    <div>
      <NavBar />
      <Routes>
        <Route element={<ProtectedRoutes/>}>
          <Route path='/add-ingredient' element={<AddIngredient />} />
          <Route path='/my-profile' element={<MyProfile />} />
        </Route>

        <Route path='/' element={<Homepage />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/dashboard' element={<FoodPage/>} />
      </Routes>
    </div>
  );
}

export default App;
