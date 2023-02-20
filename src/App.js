import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Header from "./components/Layout/Header";
import Products from "./components/Products/Product";
import CartProvider from "./store/cartProvider";
import About from "./components/Pages/About/About";
import ContactUs from './components/Pages/ContactUS/ContactUs';
import HomePage from "./pages/HomePage";


import Product1 from "./components/Products/ProductImage/ProductImage";
import Login from "./components/Auth/Login";

const router = createBrowserRouter( [ 
  {
    path: '/',
    element: <Header/>,
    children: [
      { path: '/', element: <HomePage/> },
      { path: '/products', element: <Products/> },
      { path: '/about', element: <About/> },
      { path: '/contact', element: <ContactUs/>},
      {path: '/products/:id', element: <Product1/>},
      {path: '/login', element: <Login/>},
    ],
  },
] );

function App() {
  return (
    <CartProvider>
      <RouterProvider router={router}/>
      {/* <Header/>
      //<main>
       // <Products/>
      //</main> */}
    </CartProvider>
  );
}

export default App;