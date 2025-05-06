import React from 'react';
import '../Navbar.css';
import StoreRusLogo from "../assets/StoreRus.com logo.png";
import ShoppingCart from "../assets/shopping-cart.png"
const Navbar = () => {
  return (

    <nav className="navbar">
      <div className="navbar-left">
        <a href="/" className="logo"><img src= {StoreRusLogo} width={100} height={75}/></a>
      </div>
      <div className="navbar-center">
        <ul className="nav-links">
          <li>
            <a id="navbar-title" href="/">StoreRus</a>
          </li>
          
        </ul>
      </div>
      <div className="navbar-right">
        <ul className="links-right">
          <li>
            <a href="/signup" id="sign-up">Sign Up</a>
          </li>
          <li>
            <a href="/login" id="sign-in">Sign In</a>
          </li>
          <li>
            <a href="/cart" id="shopping-cart"><img src={ShoppingCart} width={75} height={50}/></a>
          </li>
          
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
