import React, { useState } from 'react'
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Image from '../Components/Image';
import Alert from '@mui/material/Alert';
import { FaEyeSlash } from "react-icons/fa6";
import { IoEyeOutline } from "react-icons/io5";
import { Link } from 'react-router-dom';
import { LineWave } from 'react-loader-spinner'
import {  toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { getAuth, createUserWithEmailAndPassword,sendEmailVerification } from "firebase/auth";

const Register = () => {

  const auth = getAuth();

  let navigate =  useNavigate()

let [regdata, setregdata] = useState ({

email:"",
name:"",
password:""

})
let [regError, setregError] = useState ({

email:"",
name:"",
password:""

})

let [openeye,setopeneye] = useState (false)
let [loading,setloading] = useState (false)

const handlleChange = (e) => { 

setregdata({...regdata,[e.target.name]: e.target.value})

setregError({...regError, [e.target.name]: "" })

 }
 const handlleSubmit = (e) => {
  e.preventDefault(); // Prevent default form submission behavior

  let pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  if (!regdata.email) {
      setregError({...regError, email: "email Required"});
  } else if (!pattern.test(regdata.email)) {
      setregError({...regError, email: "please enter a valid email"});
  } else if (!regdata.name) {
      setregError({...regError, name: "name Required"});
  } else if (!regdata.password) {
      setregError({...regError, password: "password Required"});
  } else if (regdata.password.length < 6) {
      setregError({...regError, password: "password must be at least 6 characters long"});
  } else {
      setloading(true);

      createUserWithEmailAndPassword(auth, regdata.email, regdata.password)
          .then((userCredential) => {
              setloading(false);
              const auth = getAuth();
              sendEmailVerification(auth.currentUser)
                  .then(() => {
                      toast.success('Registration successful! Please check your email', {
                          position: "top-center"
                      });
                      navigate("/Login")
                      // Clear input fields after successful registration
                      setregdata({ email: "", name: "", password: "" });
                      
                  });
          })
          .catch((error) => {
              setloading(false);
              const errorCode = error.code;
              const errorMessage = error.message;
              console.log(error);
              if(error.message.includes("email-already-in-use")){
                setregError({...regError,email: "already this email exists"})
              }
             
          });
  }
};

  return (
    <Grid container spacing={4}>
    <Grid  xs={6}>
       <div className='regbox'>
        <h2>Get started with easily register</h2>
        <p>Free register and you can enjoy it</p>

        <div className='passwardeye'>
        <TextField name="email" label=" Email Address" 
        color="secondary" focused
        value={regdata.email}
        onChange={handlleChange}
        />
        </div>
        {regError.email &&
         <Alert severity="success">{regError.email}</Alert>
        }
        <div className='passwardeye'>
        <TextField name="name" label="Ful name" 
        color="secondary" 
        focused 
        value={regdata.name}
        onChange={handlleChange}
        />
        </div>
        {regError.name &&
         <Alert severity="success">{regError.name}</Alert>
        }
    <div className='passwardeye'>
      
    <TextField name='password' label="Password"
    color="secondary" focused 
    value={regdata.password}
    autoComplete="new-password"
    type={openeye ? "text" : "password"  }
     onChange={handlleChange}
        />
        {openeye && 
        <FaEyeSlash onClick={()=>setopeneye(!openeye)} className='eye'/>}

        {!openeye &&
        <IoEyeOutline onClick={()=>setopeneye(!openeye)} className='eye'/>

          }
        </div>
        {regError.password &&
        <Alert severity="success">{regError.password}</Alert>
        }

        <div className='bt'>
          {! loading &&
        <Button  onClick={handlleSubmit} variant="contained"> Sign up </Button>}

        {loading &&             
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
  /> }
      </div>
    
        <p className='center'>Already  have an account ?  
        <Link className='center1' to="#"> Sign In</Link></p>

       </div>
    </Grid>
    <Grid xs={6}>
     <Image className="regimg" imgsrc="assets/reg.png"/>
    </Grid>
  </Grid>
  )
}

export default Register

