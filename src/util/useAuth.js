import axios from "axios";
import { createContext, useContext, useEffect, useMemo, useState } from "react";

export const useAuth = () => {
    const token = localStorage.getItem("token")

    useEffect(() => {
        if (token) {
          axios.defaults.headers.common["Authorization"] = "Bearer " + token;
          localStorage.setItem('token',token);
        } else {
          delete axios.defaults.headers.common["Authorization"];
          localStorage.removeItem('token')
        }
    }, [token]);

    return token

    // const user = localStorage.getItem('token');
    // console.log(user);
    // if (user === null || user === 'undefined') {
    //     return false;
    // } else {
    //     return true;
    // }
}

// import axios from "axios";
// import { createContext, useContext, useEffect, useMemo, useState } from "react";

// import { AuthContext } from "./authcontext";
// const AuthProvider = ({ children }) => {
//   // State to hold the authentication token
//   const [token, setToken_] = useState(localStorage.getItem("token"));

//   // Function to set the authentication token
//   const setToken = (newToken) => {
//     setToken_(newToken);
//   };

//   useEffect(() => {
//     if (token) {
//       axios.defaults.headers.common["Authorization"] = "Bearer " + token;
//       localStorage.setItem('token',token);
//     } else {
//       delete axios.defaults.headers.common["Authorization"];
//       localStorage.removeItem('token')
//     }
//   }, [token]);

//   const greet = "Hello"

//   // Memoized value of the authentication context
//   const contextValue = useMemo(
//     () => ({
//       token,
//       setToken,
//     }),
//     [token]
//   );

//   const contextValue2 = 
//   {
//     token,
//     setToken,
//   }

//   // Provide the authentication context to the children components
// //   return (
// //     <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
// //   );

//   return (
//     <AuthContext.Provider 
//     value={{ token, setToken, greet}}
//     >{children}</AuthContext.Provider>
//   );
  
// };

// export const useAuth = () => {
//   return useContext(AuthContext);
// };

// export default AuthProvider;

