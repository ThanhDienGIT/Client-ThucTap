import { Routes, Route } from 'react-router-dom';
import React from 'react';
import './CSS/App.css';
import Client from './Component/Client'
import Home from './Component/Home/Home';

import Statistical from './Component/Statistical/Statistical';
import Customer from './Component/Customer/Customer';


function App() {

  return (
    <div className="App">
      <React.Fragment>
        <Routes>
          <Route path='/' element={<Client />} />
          <Route path='/home' element={<Home />}>    
            <Route path='statistical' element={<Statistical />} />
<<<<<<< HEAD
          
=======
            <Route path='customer' element={<Customer />} />
>>>>>>> 8a6a475791902a96f2702dc75228d42638bd8dfd
          </Route>
        </Routes>
      </React.Fragment>
    </div>
  );
}

export default App;
