import { Routes, Route } from 'react-router-dom';
import React from 'react';
import './CSS/App.css';
import Client from './Component/Client'
import Home from './Component/Home/Home';
import Employee from './Component/Employee/Employee'
import Turnover from './Component/Statistical/Turnover';
import DistrictAndWard from './Component/DistrictAndWard/DistrictAndWard';
import TuyenThuMain from './Component/TuyenThu/TuyenThuMain';
import  Receipt  from './Component/Receipt/Receipt';
import KyThuMain from './Component/KyThu/KyThuMain';
import EmployeeReceipt from './Component/EmployeeReceipt/EmployeeReceipt';
import HomePrivateStaff from './Component/Home/HomePrivateStaff';
import Statiscical from './Component/Statistical/Statiscical';
import Customer from './Component/Customer/Customer';
function App() {

  return (
    <div className="App">
      <React.Fragment>
        <Routes>
          <Route path='/' element={<Client />} />

          <Route   path='/home' element={<Home />}>    
            <Route path='turnover' element={<Turnover />} />
            <Route path='customer' element={<Customer />} />
            <Route path='privatestaff' element={<HomePrivateStaff />} />

            <Route path='customer' element={<Customer collectCustomer={false} />} />
            <Route path='districtandward' element={<DistrictAndWard />} />
            <Route path='statistical' element={<Statiscical/>}/>            
            <Route path='receipt' element={<Receipt />} />
            <Route path='empreceipt' element={<EmployeeReceipt />} />
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
