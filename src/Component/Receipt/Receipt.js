import React from 'react'
import ReceiptList from './ReceiptList';
import "../../CSS/App.css";
import Typography from '@mui/material/Typography';
function Receipt() {
  return (
    <div>
      <Typography variant="p"
                sx={
                    {
                        fontSize: 30,
                        color: "var(--color2)",
                        fontWeight: "bold"
                    }
                }
            >
                Quản lý phiếu thu
            </Typography>
      <br></br>
      <ReceiptList />
    </div>
  )
}

export default Receipt