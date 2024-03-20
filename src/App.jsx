
import {
  createRoutesFromElements,
  createBrowserRouter,
  Route,
  RouterProvider,
} from "react-router-dom";
import Register from "./Pagess/Register";
import Home from "./Pagess/Home";
import Login from "./Pagess/Login";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ForgotPasswart from "./Pagess/ForgotPasswart";

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
    
    <>
    <Route path="/" element={<Register />}> </Route>

    <Route path="/Login" element={<Login />}> </Route>

    <Route path="/Home" element={<Home />}> </Route>
    
    <Route path="/Forgot" element={<ForgotPasswart />}> </Route>
    </>
  
  
    )
  );

  return (
  <>
    <ToastContainer/>
    <RouterProvider router={router}/>
  </>
 
 
  )
}

export default App
