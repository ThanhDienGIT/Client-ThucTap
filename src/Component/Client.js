import React, {  useState } from 'react'
import {Box, Button, TextField} from '@mui/material'
import '../CSS/client.css'
import picture from '../image/Capture.PNG'
import md5 from 'md5'
import axios from 'axios'
import {CreateCookie} from './Cookie/CookieFunc';
import { useNavigate } from 'react-router-dom'

function Client() {
  const navigate = useNavigate();
  
  
  const [login,setLogin] = useState({
    Username : '',
    Password : ''
  });
  console.log(login)
  const [StateLogin , setStateLogin] = useState("Not connect")
  
  const Checklogin = () => {
    if(login.Username.length !==0 && login.Password.length !== 0) {
        axios.post('http://localhost:5199/api/Login',login)
            .then(res=>res.data)
            .then(res=> {
              setStateLogin(res)
              
            })
    } else {
      alert('Chưa có dữ liệu');
    }
  }

  if(StateLogin === 'Connect'){
    axios.get(`http://localhost:5199/api/Login/${login.Username}`)
      .then(res=>res.data)
      .then(res=>
        {
          CreateCookie(res)
          navigate('home')
        })
  }

  return (
    <div className='Client__app'>
        {/* Hình nền  */}
        <Box width="100%" height="101%" display="flex"
          sx={
            {
              backgroundImage : 'url("https://wallpaperaccess.com/full/1841213.jpg")',
              backgroundRepeat : 'no-repeat',
              backgroundSize: 'cover',
              justifyContent : 'space-around',
              alignItems : 'center',
              backgroundColor: '#F5F5F5',
              
            }
          }
        >

     
      
              <Box width="30%" height="60%" display="flex"
              sx={{backgroundColor: "white",
               
                opacity : 0.9,
                borderRadius:'10px',
                boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px", 
                flexDirection: 'column',
                alignItems : 'center'
              }}
              > 
               {/*Logo */}
                  <Box width="100%" height="42%" display="flex"
                  sx={{  
                    alignItems : 'center',
                    justifyContent: 'center',
                    flexDirection: 'column',
                    marginBottom: 2,
                    userSelect: "none"
                  }}
                  >
                  <img src={picture} alt='Logo' width={290}
                    style={{marginRight:8}}
                  />
                
                  </Box>
                  {/*input */}
                  <Box width="100%" height="25%" display="flex"
                  sx={{
                    alignItems : 'center',
                    justifyContent: 'center',
                    flexDirection: 'column',
                    marginBottom: 3
                  }}
                  >
                    <TextField id="outlined-uncontrolled" label="Tài khoản" variant="outlined"                    
                    sx={{
                        marginBottom : 3
                    }}
                    onChange={(e)=> {setLogin({...login,Username: e.target.value})}}
                    />
                    <TextField id="outlined-basic" label="Mật khẩu" variant="outlined"
                    type={'password'}
                    onChange={(e)=> {setLogin({...login,Password: e.target.value})}}
                    />
                  </Box>
                  {/*Button */}
                  <Box>
                  <Button variant="text" size="large" 
                    sx={{
                      marginRight:2
                    }}
                    onClick={Checklogin}
                        
                    
                  >Đăng nhập</Button>
                  <Button variant="text" onClick={()=>{alert('Hủy bỏ')}}>Hủy bỏ</Button>
                  
                  </Box>
                 
              </Box>
             
        </Box>


       
    </div>
  
  )
}

export default Client