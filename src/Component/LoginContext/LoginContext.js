import axios from "axios";
import { useState, createContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { BreakCookie, cookie, GetCookie } from "../Cookie/CookieFunc";

const LoginContext = createContext();

function LoginProvider ({children}) {
   
   
    const Checklogin  = useNavigate();
    GetCookie(document.cookie)
    const [login,setLogin] = useState(cookie);
    //  Kiểm tra cookie để điều hướng URL
    
    
    useEffect(()=> {
    if(login.length !==0 ) {
       Checklogin('home')
    }else {
        Checklogin('')
    }
   },[login])
    

   


    const SetCookie = (value) => {
        setLogin(value)
    }
        const value = {
            login,
            SetCookie,
        }
    return(
        <LoginContext.Provider value={value}>
              {children}
        </LoginContext.Provider>
    )
}


export {LoginContext , LoginProvider}