import { Routes, Route } from 'react-router-dom';
import React from 'react';
import './CSS/App.css';
import Client from './Component/Client'
import Home from './Component/Home/Home';

import Employee from './Component/Employee/Employee'
import Customer from './Component/Customer/Customer'
<<<<<<< HEAD
import  Receipt  from './Component/Receipt/Receipt';
import KyThuMain from './Component/KyThu/KyThuMain'
import Turnover from './Component/Statistical/Turnover';
=======
import Receipt from './Component/Receipt/Receipt';
import KyThuMain from './Component/KyThu/KyThuMain';
import DistrictAndWard from './Component/DistrictAndWard/DistrictAndWard';

>>>>>>> Vinh
function App() {


  return (
    <div className="App">
      <React.Fragment>
        <Routes>
          <Route path='/' element={<Client />} />
<<<<<<< HEAD
          <Route path='/home' element={<Home />}>    
            <Route path='turnover' element={<Turnover />} />
            <Route path='customer' element={<Customer />} />
=======
          <Route path='/home' element={<Home />}>
            <Route path='statistical' element={<Statistical />} />
            <Route path='customer' element={<Customer collectCustomer={false} />} />
            <Route path='districtandward' element={<DistrictAndWard />} />
            <Route path='staff' element={<Statistical />} />
>>>>>>> Vinh
            <Route path='receipt' element={<Receipt />} />
            <Route path='employee' element={<Employee />} />
            <Route path='kythu' element={<KyThuMain />} />
            <Route path='collectcustomer' element={<Customer collectCustomer={true} />} />
          </Route>
          {/* <Route path='phieuthu' element={<PhieuThuMain />} /> */}
          <Route path='*' element={<Client />} />

        </Routes>
      </React.Fragment>
    </div>
  );
}

export default App;
