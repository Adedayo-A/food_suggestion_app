import React, { useState, useEffect } from 'react';
import {Routes, Route} from 'react-router-dom';

import Homepage from './home/homepage';
import FoodPage from './dashboard/foodResultPage';

import logo from './logo.svg';
import './App.css';

function App() {
  // const [currentTime, setCurrentTime] = useState(0);

  // useEffect(() => {
  //   fetch('/time').then(res => res.json()).then(data => {
  //     setCurrentTime(data.time);
  //   }).catch(error => console.error('Error fetching data:', error));;
  // }, []);
  
  return (
    <div>
      <Routes>
        <Route path='/' element={<Homepage />} />
        <Route path='/food-page' element={<FoodPage />} />
      </Routes>

      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header> */}

      {/* <p>The current time is {currentTime}.</p> */}
    </div>
  );
}

export default App;
