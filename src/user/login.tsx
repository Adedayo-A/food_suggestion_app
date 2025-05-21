import React, { useEffect, useState } from 'react'
// import  from '@mui/material/pa;
import LockIcon from '@mui/icons-material/Lock';
import Person2Icon from '@mui/icons-material/Person2';
import { useNavigate } from 'react-router-dom';

import '../static/user/login.css';
import api from '../api/axios';
import Loader from '../reusabale-components/loader';
import { SnackbarComp } from '../reusabale-components/snackbar-alert';


const LOGIN_URL = '/users/login';

type msgs = 'No Server Response' | 'Username Taken' | 'Login Failed' | 'Login Successful';
type severityValues = "warning" | "success" | "error" | "info";

export default function Login({ setToken }) {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [action, setAction] = useState("Sign Up")
  const [isDataLoading, setIsDataLoading] = useState(false);

  const [snackBarOpen, setSnackBarOpen] = useState(false);
  const [snackBarMsg, setSnackBarMsg] = useState<msgs>("Login Successful");
  const [snackbarSeverity, setSnackbarSeverity] = useState<severityValues>("success");
  const [userId, setUserId] = useState()

  const [token, setTokn] = useState("");
  
  const navigate = useNavigate();

  var timeout;

  useEffect( () => {
    // navigate('/my-profile', { state: userId} );
  }, [token])

  const handleSubmit = async e => {
    e.preventDefault();
    setIsDataLoading(true);
    setSnackBarOpen(true);
    clearTimeout(timeout)
    timeout = setTimeout(function () {
      setSnackBarOpen(false);
    }, 10000)

    try {
      const response = await api.post(LOGIN_URL,
        JSON.stringify({ username: username, password: password }),
        {
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true
        }
      );

      // TODO: remove console.logs before deployment
      console.log(JSON.stringify(response?.data));
      console.log(JSON.stringify(response?.data?.token))

      const token = response?.data?.token
      const userId = response?.data?.user_id

      console.log("userId", userId);
      
      setTokn(token);
      setUserId(userId);

      localStorage.setItem("token", token);
      localStorage.setItem('userId', userId);
            
      setIsDataLoading(false);
      setSnackBarMsg('Login Successful');
      setSnackbarSeverity('success');

      // navigate('/');
      navigate('/my-profile', { state: userId} );

    } catch(err) {
      setIsDataLoading(false);
      setSnackBarMsg("Login Failed");
      setSnackbarSeverity("error")
      console.log(err);
    }

  }

  return(
    <> {isDataLoading ? <Loader /> :
        <div className='ct'>
          <div className='header-signin'>
            <div className='text'> Login </div>
            <div className='underline'></div>
          </div>

          <div className='inputs'>

            <div className='input'>
              <Person2Icon className='micon'  />
              <input type="text" 
              placeholder='Username'
              onChange={(e) => setUserName(e.target.value)}
              />
            </div>

            <div className='input'>
              <LockIcon className='micon' />
              <input type="password" 
              placeholder='Password'
              onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          
          </div>

          <div className='submit-container'>
            <div className="submit" onClick={handleSubmit}>Login</div>
          </div>

          <SnackbarComp open={snackBarOpen} snackbarmsg={snackBarMsg} 
              snackbarseverity={snackbarSeverity} onClose={() => setSnackBarOpen(false)} />
        </div> 
      }
    </>
  )

}
