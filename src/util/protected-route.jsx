import React, {useContext} from "react";
import { Outlet, Navigate } from "react-router-dom";

//import AuthContext  from './authcontext'

import { useAuth } from "./useAuth";

const ProtectedRoutes = () => {
    //const { greet } = useContext(AuthContext);
    
    const token = useAuth(); 

    console.log('mytoken', token)
    // Check if the user is authenticated
   if(!token) {
    // If not authenticated, redirect to the login page
     return <Navigate to="/login" />;
    }
    // If authenticated, render the child routes
    return <Outlet />;
};

    // const isLoggedIn = useAuth();
    // console.log('I am', isLoggedIn)
    // return isLoggedIn ? <Outlet /> : <Navigate to="/login" /

export default ProtectedRoutes;