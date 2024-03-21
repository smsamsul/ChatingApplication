
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
import Meassage from "./Pagess/Meassage";
import Setting from "./Pagess/Setting";
import Feed from "./Pagess/Feed";

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
    
    <>
    <Route path="/" element={<Register />}> </Route>

    <Route path="/Login" element={<Login />}> </Route>

    <Route path="/Forgot" element={<ForgotPasswart />}> </Route>

    <Route path="/Home" element={<Home/>}> 

    <Route path="Feed" element={<Feed/>}> </Route>

    <Route path="Meassage" element={<Meassage/>}> </Route>

    <Route path="Setting" element={<Setting />}> </Route>

    </Route>
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
