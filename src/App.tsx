import React from 'react';
import logo from './logo.svg';
import './App.css';
import Navbar from './Components/Navbar';
import Usagecards from './Components/Usagecards';
import Containers from './Components/Containers';

function App() {
  return (
    <div className=" App">
       <Navbar/>
       <Usagecards/>
       <Containers/>
    </div>
  );
}

export default App;
