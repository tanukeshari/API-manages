import React from "react";
import {createBrowserRouter, RouterProvider } from 'react-router-dom';
import Header from "./components/Layout/Header";
import Product from './components/Products/Product';
import CartProvider from'./store/cartProvider';
import About from "./components/Pages/About/About";
import UserProfile from './components/Layout/Profile/UserProfile';
import ContactUs from './components/Pages/ContactUS/ContactUs';
import AuthPage from './pages/AuthPage';
import HomePage from './pages/HomePage';
import Login from './components/Auth/Login';

const router = createBrowserRouter([
  {
    path :'/',
element: <Header/>,
children:[

{path:'/', element:<HomePage/>},
{path:'/Product',element:<Product/>},
{path:'/About', element:<About/>},
{path:'/Auth', element:<AuthPage/>},
{path:'/ContactUs',element:<ContactUs/>},
{path:'/Profile', element:<UserProfile/>},
{path:'/Login', element: <Login/>},

],
  },
]);
function App() {
  
  return (
    <CartProvider>
      <RouterProvider router = {router}/>
      </CartProvider>
    
  );
}

export default App;