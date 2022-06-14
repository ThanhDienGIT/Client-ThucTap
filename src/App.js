import { Routes, Route,  useNavigate } from 'react-router-dom';
import React, { useEffect } from 'react';
import './CSS/App.css';
import Client from './Component/Client'
import Home from './Component/Home/Home';
import Statistical from './Component/Statistical/Statistical';


function App() {


  

  return (
    <div className="App">
      <React.Fragment>
        <Routes>
          <Route path='/' element={<Client />} />
          <Route path='/home' element={<Home />}>    
            <Route path='statistical' element={<Statistical />} />
          </Route>
          <Route path='*' element={<Client />} />
        </Routes>
      </React.Fragment>
    </div>
  );
}

export default App;
