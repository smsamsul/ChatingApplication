import React from 'react'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

const ForgotPasswart = () => {
  return (
    <div className='forgotBox'>
      <div className='containerbox'>
        <h2>Forgot passward</h2>
      <TextField
          error
          id="outlined-error"
        
          defaultValue="Hello World"
        />
         <Button variant="contained" >
        Send
      </Button>

      </div>
    </div>
  )
}

export default ForgotPasswart
