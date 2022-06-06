import React from 'react'
import { Link } from 'react-router-dom'
import {Button , Box} from "@mui/material"
import '../CSS/client.css'


function Client() {
  return (
    <div className='Client__app'>
      
        <Box
        sx={{
        width: 300,
        height: 300,
        backgroundColor: '#ffffff',
        display : 'flex',
        justifyContent: 'center',
        alignItems:'center',
        borderRadius: '10px',
        
      }}
        >
      <Link to={'home'} className="Client__app--link">
          <Button
          size ="large"
          // CSS
          sx={{
            fontSize:20,
            width: 150,
            height: 50,
            '&:hover': {
              backgroundColor: 'black',
              opacity: [0.9, 0.8, 0.7],
            },
          }}
          >
              Đăng nhập
          </Button>
      
       </Link>

       </Box>
    </div>
   
  )
}

export default Client