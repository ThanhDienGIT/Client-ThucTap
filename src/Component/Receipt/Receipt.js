import React from 'react'
import ReceiptList from './ReceiptList';
import FindSelect from './ReceiptSearch/FindSelect';
import ReceiptSearch from './ReceiptSearch/ReceiptSearch';
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