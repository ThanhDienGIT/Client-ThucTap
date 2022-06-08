import { Routes, Route } from 'react-router-dom';
import React from 'react';
import './CSS/App.css';
import Client from './Component/Client'
import Home from './Component/Home/Home';

import Statistical from './Component/Statistical/Statistical';
// import PhieuThuMain from './Component/PhieuThu/PhieuThuMain';
import KyThuMain from './Component/KyThu/KyThuMain';
import Test from './Component/KyThu/Test';

function App() {

  return (
    <div className="App">
      <React.Fragment>
        <Routes>
          <Route path='/' element={<Client />} />
          <Route path='/home' element={<Home />}>    
            <Route path='statistical' element={<Statistical />} />
            {/* <Route path='phieuthu' element={<PhieuThuMain />} /> */}
            <Route path='kythu' element={<KyThuMain />} />
            <Route path='test' element={<Test />} />
          </Route>
          
        </Routes>
      </React.Fragment>
    </div>
  );
}

export default App;
