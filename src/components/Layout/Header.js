import React, { Fragment, useContext,  useState } from "react";
import { Button} from 'react-bootstrap';
import {NavLink,Outlet ,useNavigate} from 'react-router-dom'

import Cart from "../cart/cart";
import classes from './Header.module.css';
import CartContext from '../../store/cartcontext';
import AuthContext from "../../store/auth-context";

const Header = () => {
   const cartCtx=useContext(CartContext)
   const [show, setShow] = useState(false);
   const handleShow = () => setShow(true);
   const handleClose = () => setShow(false);
   const authCtx = useContext(AuthContext);
   const isLoggedIn= authCtx.isLoggedIn;
   const navigate= useNavigate()
   const hasItems=cartCtx.item.length > 0;
   
   
   // const logoutHandler=()=>{
   //    localStorage.removeItem('idToken')
   //    localStorage.removeItem("userEmail")
   //    navigate('/login')
   //    cartCtx.setCartItems([])
   //    cartCtx.setToken(null)
   // }
   
 
   console.log(cartCtx.item)
   
   const totalNumber = cartCtx.item.reduce((acc,cur)=>{
     return acc+cur.quantity;
   },0)
 
   return (
      <Fragment>
         <header className={classes.header}>
            <div className={classes.container}>
                <div>
                <ul className={classes.flex}>
                    <li><NavLink to="/">Home</NavLink></li>
                    {isLoggedIn &&<li><NavLink to="/products">Store</NavLink></li>}
                    <li><NavLink to='/about'>About</NavLink></li>
                    <li><NavLink to='/contact'>Contact Us</NavLink></li>
                    {!isLoggedIn ?<li> <NavLink to="/login" id="link"> Login </NavLink></li>
                                : <li><NavLink onClick={() => {  
                                    localStorage.removeItem('token')
                                    localStorage.removeItem("userEmail")
                                    navigate('/login')
                                    cartCtx.setCartItems([])
                                    cartCtx.setToken(null)
                                }
                            }>Logout</NavLink> </li>
                        }        
                    {/* {!isLoggedIn && <li><NavLink to='/login'>Login</NavLink></li>}
                    {isLoggedIn && <li><NavLink to='/' onClick={logoutHandler}>LogOut</NavLink></li>} */}
                </ul>
                </div>
                <Button variant="outline-info" onClick={handleShow}>
                     Cart <span>{totalNumber}</span>
                     </Button>
                     {hasItems &&<Cart
                     show={show}
                     onHide={handleClose}
                     //   backdrop="static"
                     
                     keyboard={false}
                     onClick={handleClose}
                     />}
            </div>
         </header> 
         <Outlet/>
      </Fragment>
      
    );
};
      //   <>
      //   <header className={classes.header}>
      //       <div className={classes.container}>
      //           <div>
      //           <ul className={classes.flex}>
      //               <li><NavLink to="/">Home</NavLink></li>
      //               <li><NavLink to="/products">Store</NavLink></li>
      //               <li><NavLink to='/about'>About</NavLink></li>
      //               <li><NavLink to='/contact'>Contact Us</NavLink></li>
      //           </ul>
      //           </div>
      //           <div className={classes.cartsection}>
      //               <span className={classes.cartqty}> {cartnum}</span>
      //           <button onClick={() => setCart(!show)} className={classes.cart}>Cart</button>
      //           </div>
      //       </div>
      //      { show ? <div className={classes.toggle}>
      //           <Cart/>
      //       </div> : null}
      //   </header>
      //   <Outlet/>
      //   </>
    


export default Header;