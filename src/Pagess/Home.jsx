import React from 'react'
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { Outlet } from 'react-router-dom';
import Navbar from '../Components/Layout/Navbar';
const Home = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
    <Grid container >
        
      <Grid h2 xs={2} >
       <Navbar/>
      </Grid>
      <Grid h2 xs={10} >
       <Outlet/>
      </Grid>


    </Grid>
  </Box>
  )
}

export default Home
