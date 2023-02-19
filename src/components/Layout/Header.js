import React, { useContext, useState } from "react";
import { Outlet , NavLink } from 'react-router-dom';

import Cart from "../cart/cart";
import classes from './Header.module.css';
import CartContext from "../../store/cartcontext";

const Header = () => {
    const cartct = useContext(CartContext);
    let cartnum = +(cartct.item.length);
    // console.log(' header', cartct )

    const [show, setCart] = useState(false);

    return (
        <>
        <header className={classes.header}>
            <div className={classes.container}>
                <div>
                <ul className={classes.flex}>
                    <li><NavLink to="/">Home</NavLink></li>
                    <li><NavLink to="/Product">Store</NavLink></li>
                    <li><NavLink to="/About">About</NavLink></li>
                    <li><NavLink to='/ContactUs'>Contact Us</NavLink></li>
                    <li><NavLink to='/Profile'> Profile</NavLink></li>
                    <li><NavLink to='/login'>login</NavLink></li>
                    
                </ul>
                </div>
                <div className={classes.cartsection}>
                    <span className={classes.cartqty}> {cartnum}</span>
                <button onClick={() => setCart(!show)} className={classes.cart}>Cart</button>
                </div>
            </div>
           { show ? <div className={classes.toggle}>
                <Cart/>
            </div> : null}
        </header>
        <Outlet/>
        </>
    );
};

export default Header;