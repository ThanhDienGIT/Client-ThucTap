import { Routes, Route } from 'react-router-dom';
import React from 'react';
import './CSS/App.css';
import Client from './Component/Client'
import Home from './Component/Home/Home';

import Statistical from './Component/Statistical/Statistical';
import Employee from './Component/Employee/Employee';


function App() {

  return (
    <div className="App">
      <React.Fragment>
        <Routes>
          <Route path='/' element={<Client />} />
          <Route path='/home' element={<Home />}>    
            <Route path='statistical' element={<Statistical />} />
            <Route path='employee' element={<Employee />} />
          </Route>
        </Routes>
      </React.Fragment>
    </div>
  );
}

export default App;
