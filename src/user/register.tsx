import React, { useRef, useState, useEffect } from 'react'
import LockIcon from '@mui/icons-material/Lock';
import Person2Icon from '@mui/icons-material/Person2';
import { faCheck, faTimes, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';


import api from '../api/axios';
import Loader from '../reusabale-components/loader';
import '../static/user/register.css';

const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const REGISTER_URL = '/users/register';

export default function Register({ setToken }) {

  const userRef = useRef<any | (() => never)>( () => {
    throw new Error('Cannot call an event handler while rendering.')
  }
  );
  const errRef = useRef<any | (() => never)> (() => {
    throw new Error('Cannot call an event handler while rendering.')
  });

  const navigate = useNavigate();
  const [user, setUser] = useState('');
  const [validName, setValidName] = useState(false);
  const [userFocus, setUserFocus] = useState(false);

  const [pwd, setPwd] = useState('');
  const [validPwd, setValidPwd] = useState(false);
  const [pwdFocus, setPwdFocus] = useState(false);

  const [matchPwd, setMatchPwd] = useState('');
  const [validMatch, setValidMatch] = useState(false);
  const [matchFocus, setMatchFocus] = useState(false);

  const [errMsg, setErrMsg] = useState('');
  const [success, setSuccess] = useState(false);

  const [isDataLoading, setIsDataLoading] = useState(false);

  useEffect(() => {
    userRef.current.focus();
  }, [])

  useEffect(() => {
    setValidName(USER_REGEX.test(user));
  }, [user])

  useEffect(() => {
      setValidPwd(PWD_REGEX.test(pwd));
      console.log("valid?");
      setValidMatch(pwd === matchPwd);
      console.log('pwd', pwd);
      console.log('valid-match', validMatch);
      console.log('matchpsws', matchPwd);

  }, [pwd, matchPwd])

  useEffect(() => {
      setErrMsg('');
  }, [user, pwd, matchPwd])


  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsDataLoading(true);

    // if button enabled with JS hack
    const v1 = USER_REGEX.test(user);
    const v2 = PWD_REGEX.test(pwd);
    // if (!v1 || !v2) {
    //     setErrMsg("Invalid Entry");
    //   console.log("Hi3");    

    //     return;
    // }

    try {
      const response = await api.post(REGISTER_URL,
        JSON.stringify({ username: user, password: pwd }),
        {
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true
        }
      );

      // TODO: will remove console.logs before deployment
      console.log('reg', JSON.stringify(response?.data?.token))
      console.log('reg', JSON.stringify(response?.data?.user_id))


      const token = response?.data?.token
      const userId = response?.data?.user_id

      localStorage.setItem("token", token);
      localStorage.setItem('userId', userId);
      
      setIsDataLoading(false);

      //clear state and controlled inputs
      setSuccess(true);
      setUser('');
      setPwd('');
      setMatchPwd('');

      navigate('/');
    } catch (err) {
        
    }
  }

  return (
    <>
      {isDataLoading ? <Loader /> : 
      <div className='ct'>

        <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
        <div className='header-signin'>
          <div className='text'> Sign Up</div>
          <div className='underline'></div>
        </div>

        <div className='inputs'>

          <div className="input-wrapper">

              {/* <label htmlFor="username">
                Username:
                <FontAwesomeIcon icon={faCheck} className={validName ? "valid" : "hide"} />
                <FontAwesomeIcon icon={faTimes} className={validName || !user ? "hide" : "invalid"} />
              </label> */}

              <div className='input'>

                {/* <img src="{user_icon}" alt="user icon" /> */}

                <Person2Icon className='micon'  />
                <input
                  type="text" 
                  ref={userRef} 
                  placeholder='Username'
                  onChange={(e) => setUser(e.target.value)}
                  value={user}
                  onFocus={() => setUserFocus(true)}
                  onBlur={() => setUserFocus(false)}
                  required
                  aria-invalid={validName ? "false" : "true"}
                  aria-describedby="uidnote"
                />

              </div>

              <p id="uidnote" className={userFocus && user && !validName ? "instructions" : "offscreen"}>
                <FontAwesomeIcon icon={faInfoCircle} />
                4 to 24 characters.<br />
                Must begin with a letter.<br />
                Letters, numbers, underscores, hyphens allowed.
              </p>

          </div>
              
          <div className="input-wrapper">

              {/* <label htmlFor="password">
                Password:
                <FontAwesomeIcon icon={faCheck} className={validPwd ? "valid" : "hide"} />
                <FontAwesomeIcon icon={faTimes} className={validPwd || !pwd ? "hide" : "invalid"} />
              </label> */}

              <div className='input'>
                <LockIcon className='micon' />
                <input
                  type="password" 
                  placeholder='Password'
                  id="password"
                  onChange={(e) => setPwd(e.target.value)}
                  value={pwd}
                  required
                  aria-invalid={validPwd ? "false" : "true"}
                  aria-describedby="pwdnote"
                  onFocus={() => setPwdFocus(true)}
                  onBlur={() => setPwdFocus(false)}
                />
              </div>

              <p id="uidnote" className={userFocus && user && !validName ? "instructions" : "offscreen"}>
                  <FontAwesomeIcon icon={faInfoCircle} />
                  4 to 24 characters.<br />
                  Must begin with a letter.<br />
                  Letters, numbers, underscores, hyphens allowed.
              </p>

          </div>

          <div className="input-wrapper">
              {/* <label htmlFor="confirm_pwd">
                Confirm Password:
                <FontAwesomeIcon icon={faCheck} className={validMatch && matchPwd ? "valid" : "hide"} />
                <FontAwesomeIcon icon={faTimes} className={validMatch || !matchPwd ? "hide" : "invalid"} />
              </label> */}
          
              <div className='input'>
                {/* <img src="{password_icon}" alt="password icon" /> */}
                <LockIcon className='micon' />
                <input 
                  type="password" 
                  placeholder='Confirm Password'
                  id="confirm_pwd"
                  onChange={(e) => setMatchPwd(e.target.value)}
                  value={matchPwd}
                  required
                  aria-invalid={validMatch ? "false" : "true"}
                  aria-describedby="confirmnote"
                  onFocus={() => setMatchFocus(true)}
                  onBlur={() => setMatchFocus(false)}
                />
              </div>

              <p id="confirmnote" className={matchFocus && !validMatch ? "instructions" : "offscreen"}>
                {/* <FontAwesomeIcon icon={faInfoCircle} /> */}
                Must match the first password input field.
              </p>

          </div>
          
        </div>

        <div className='submit-container'>
                    <Button className='submit' variant='contained' disabled={!validMatch} onClick={handleSubmit}>
                         Sign Up
                    </Button>
        </div>

        <p className='already-registered'>
          Already registered?<br />
          <span className="line">
            <a href="/login">Sign In</a>
          </span>
        </p>
      </div> }
    </>
  )
}