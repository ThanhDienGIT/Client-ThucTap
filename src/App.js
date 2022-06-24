import { Routes, Route } from 'react-router-dom';
import React from 'react';
import './CSS/App.css';
import Client from './Component/Client'
import Home from './Component/Home/Home';
import Employee from './Component/Employee/Employee'
import Customer from './Component/Customer/Customer'
import Turnover from './Component/Statistical/Turnover';
import Receipt from './Component/Receipt/Receipt';
import DistrictAndWard from './Component/DistrictAndWard/DistrictAndWard';
import KyThuMain from './Component/KyThu/KyThuMain';
import TuyenThuMain from './Component/TuyenThu/TuyenThuMain';

function App() {


  return (
    <div className="App">
      <React.Fragment>
        <Routes>
          <Route path='/' element={<Client />} />

          <Route path='/home' element={<Home />}>    
            <Route path='turnover' element={<Turnover />} />
            <Route path='customer' element={<Customer />} />

            <Route path='customer' element={<Customer collectCustomer={false} />} />
            <Route path='districtandward' element={<DistrictAndWard />} />

            <Route path='receipt' element={<Receipt />} />
            <Route path='employee' element={<Employee />} />
            <Route path='kythu' element={<KyThuMain />} />

            <Route path='collectcustomer' element={<Customer collectCustomer={true} />} />

            <Route path='tuyenthu' element={<TuyenThuMain />} />

          </Route>
          {/* <Route path='phieuthu' element={<PhieuThuMain />} /> */}
          <Route path='*' element={<Client />} />

        </Routes>
      </React.Fragment>
    </div>
  );
}

export default App;
