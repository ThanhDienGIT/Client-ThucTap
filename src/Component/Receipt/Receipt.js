import React from 'react'
import ReceiptList from './ReceiptList';
import ReceiptAddModal from './ReceiptAddModal';
function Receipt() {
  return (
    <div>
        {/* <ReceiptSearch /> */}
        <br></br>
        {/* <FindSelect /> */}
        <ReceiptAddModal />
        <hr></hr>
        <br></br>
        <ReceiptList />
    </div>
  )
}

export default Receipt