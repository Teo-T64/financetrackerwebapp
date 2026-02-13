import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Income from "./pages/Income";
import Expense from "./pages/Expense";
import Category from "./pages/Category";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Filter from "./pages/Filter";
import { Toaster } from "react-hot-toast";

function App(){

    return(
      <>
        <BrowserRouter>
          <Routes>
            <Route path="/dashboard" element = {<Home/>}/>
            <Route path="/income" element = {<Income/>}/>
            <Route path="/expense" element = {<Expense/>}/>
            <Route path="/category" element = {<Category/>}/>
            <Route path="/login" element = {<Login/>}/>
            <Route path="/signup" element = {<SignUp/>}/>
            <Route path="/filter" element = {<Filter/>}/>


          </Routes>
        </BrowserRouter>
        <Toaster/>
      </>
    )
}

export default App;