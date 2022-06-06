import { Routes, Route } from 'react-router-dom';
import React from 'react';
import './CSS/App.css';
import Client from './Component/Client'
import Home from './Component/Home/Home';
import Admin from './Component/Admin/Admin';
import Statistical from './Component/Statistical/Statistical';
import Customer from './Component/Customer/Customer';


function App() {
  return (
    <div className="App">
      <React.Fragment>
        <Routes>
          <Route path='/' element={<Client />} />
          <Route path='/home' element={<Home />}>
            <Route path='admin' element={<Admin />} />
            <Route path='statistical' element={<Statistical />} />
            <Route path='customer' element={<Customer />} />
          </Route>
        </Routes>
      </React.Fragment>
    </div>
  );
}

export default App;
