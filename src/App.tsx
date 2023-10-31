import React from 'react';
import './App.css';
import Navbar from './Components/Navbar';
import Containers from './Components/Containers';
import Images from './Components/Images';

function App() {
  return (
    <div className=" App">
       <Navbar/>
       {/* <Containers/> */}
       <Images/>
    </div>
  );
}

export default App;
