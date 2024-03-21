import React, { useState } from 'react'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { useNavigate } from 'react-router-dom';
import { LineWave } from 'react-loader-spinner'
import { toast } from 'react-toastify';
import Image from '../Components/Image';


const ForgotPasswart = () => {

  let navigate =  useNavigate()
  const auth = getAuth();
  let [value,setvalue] = useState ("")

  let [loading,setloading] = useState (false)

  

  const handleClick = () => { 
    if (!value.trim()) {
      toast.error('Please provide an email', {
        position: "top-center"
      });
      return;
    }
  
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) {
      toast.error('Please type a valid email address', {
        position: "top-center"
      });
      
      return;
    }
    setloading(true)
    sendPasswordResetEmail(auth, value)
      .then(() => {
        toast.success('Please check your email', {
          position: "top-center"
        });
        setloading(false)
       
        navigate("/Login")
      })
      .catch((error) => {
        const errorMessage = error.message;
        console.log(errorMessage);
        if (errorMessage.includes("(auth/invalid-value-(email)")) {
          console.log("done");
          
        }
      });
  }

  return (
    <div className='forgotBox'>
      
      <div className='containerbox'>
        <h2>Forgot passward</h2>
      <TextField
      
       onChange={(e)=>setvalue(e.target.value)}
          error
          id="outlined-error"
        
          
          placeholder='email'
        />
         <Button onClick={handleClick} variant="contained" >
        Send
      </Button>
      { loading &&
      <LineWave
     visible={true}
     height="100"
     width="100"
     color="#4fa94d"
     ariaLabel="line-wave-loading"
     wrapperStyle={{}}
     wrapperClass=""
     firstLineColor=""
     middleLineColor=""
     lastLineColor=""
  />}
      
      </div>
    </div>
  )
}

export default ForgotPasswart
