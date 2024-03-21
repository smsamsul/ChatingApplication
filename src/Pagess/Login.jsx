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
import { getAuth, 
  sendEmailVerification,signInWithEmailAndPassword,
  GoogleAuthProvider,signInWithPopup, } from "firebase/auth";

const Login = () => {

  const auth = getAuth();

  let navigate =  useNavigate()

let [regdata, setregdata] = useState ({

email:"",

password:""

})
let [regError, setregError] = useState ({

email:"",

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
  }
  else if (!regdata.password) {
      setregError({...regError, password: "password Required"});
  } else if (regdata.password.length < 6) {
      setregError({...regError, password: "password must be at least 6 characters long"});
  } else {
      setloading(true);

      signInWithEmailAndPassword(auth, regdata.email, regdata.password)
          .then((userCredential) => {
              setloading(false);
              if(!userCredential.user.emailVerified){
                toast.error('please veryfied your email ', {
                  position: "top-center"
              }
              
              );

              }
              else{
                toast.success('Login successful ', {
                  position: "top-center"
              }
              
              );
              navigate("/Home")

              }
              // const auth = getAuth();
            
            setregdata({ email: "", name: "", password: "" });

              sendEmailVerification(auth.currentUser)
                  .then(() => {

      
                  });
          })
          .catch((error) => {
              setloading(false);
              const errorCode = error.code;
              const errorMessage = error.message;
              console.log(error);
              if(error.message.includes("(auth/invalid-credential")){
                setregError({...regError,email: "invalid-credential"})
              }
             
          });
  }
};

const handlleGlogin = () => { 
  const provider = new GoogleAuthProvider();
  signInWithPopup(auth, provider)
  .then((result) => {
    toast.success('Login successful ', {
    position: "top-center"
  }
  
  );
  navigate("/Home/Feed")
   
  })
  .catch((error) => {
    console.log(error)
  });
}

  return (
    <Grid container spacing={4}>
    <Grid  xs={6}>
       <div  className='regbox'>
        <div onClick={handlleGlogin}>
        <Image imgsrc="assets/Google.png" >
      
      </Image >

        </div>
      
        <h2>Login to your account!</h2>
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
        <Button  onClick={handlleSubmit} variant="contained"> Login to Continue </Button>}

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
      <div className='forgot'>
      <Link  to="/Forgot"> Forgot passward </Link>
      </div>

        <p className='center'>Don’t have an account ? Sign up ?  
        <Link className='center1' to="/"> Sign up</Link></p>

       </div>
    </Grid>
    <Grid xs={6}>
     <Image className="regimg" imgsrc="assets/login.jpg"/>
    </Grid>
  </Grid>
  )
}

export default Login