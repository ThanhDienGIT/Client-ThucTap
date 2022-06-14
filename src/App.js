import { Routes, Route,  useNavigate } from 'react-router-dom';
import React, { useEffect } from 'react';
import './CSS/App.css';
import Client from './Component/Client'
import Home from './Component/Home/Home';
import Statistical from './Component/Statistical/Statistical';
// import PhieuThuMain from './Component/PhieuThu/PhieuThuMain';
import KyThuMain from './Component/KyThu/KyThuMain';


function App() {


  

  return (
    <div className="App">
      <React.Fragment>
        <Routes>
          <Route path='/' element={<Client />} />
          <Route path='/home' element={<Home />}>    
            <Route path='statistical' element={<Statistical />} />
<<<<<<< HEAD
          </Route>
          <Route path='*' element={<Client />} />
=======
            {/* <Route path='phieuthu' element={<PhieuThuMain />} /> */}
            <Route path='kythu' element={<KyThuMain />} />
            
          </Route>
          
>>>>>>> ebfb133471f33bf09784530235bb408b7e419a57
        </Routes>
      </React.Fragment>
    </div>
  );
}

export default App;
