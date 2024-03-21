import React, { useState } from 'react'
import Image2 from '../Image2'
import { IoHomeOutline } from "react-icons/io5";
import { FaRegMessage } from "react-icons/fa6";
import { AiOutlineLogout } from "react-icons/ai";
import { getAuth, signOut } from "firebase/auth";
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const Navbar = () => {
const auth = getAuth();
let navigate = useNavigate()
const [open, setOpen] = React.useState(false);
const handleOpen = () => setOpen(true);
const handleClose = () => setOpen(false);

  const handlleLogout = () => { 

    signOut(auth).then(() => {
      navigate("/Login")
      // Sign-out successful.
    }).catch((error) => {
      // An error happened.
    });

   }

  return (
    <div className='navBox'>
   
  <Image2 imgsrc="/public/assets/profile.png"/>
    <br />
   <IoHomeOutline className='icon'/>
    <br />
   < FaRegMessage className='icon'/>
   <br />
   < AiOutlineLogout onClick={handleOpen} className='icon'/>
   
   <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            <h2 className='red'>would you Logout your account?</h2>
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <div className='flex'>
            <button onClick={handlleLogout} className='bt1'>Confrim Logout</button>
            
            <button onClick={()=>setOpen(false)}  className='bt2'>Skip Logout</button>

            </div>
           
          </Typography>
        </Box>
      </Modal>
    </div>
  )
}

export default Navbar
