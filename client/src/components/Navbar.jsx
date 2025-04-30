import React from 'react';
import '../Navbar.css';

const Navbar = () => {
  return (

    <nav className="navbar">
      <div className="navbar-left">
        <a href="/" className="logo"><img src="../assets/StoreRus.com logo.png"/></a>
      </div>
      <div className="navbar-center">
        <ul className="nav-links">
          <li>
            <a className="navbar-title" href="/">StoreRus</a>
          </li>
          <li>
            <a href="#">Sign Up</a>
          </li>
        </ul>
      </div>
      <div className="navbar-right">
        <ul className="nav-links">
          <li>
            <a href="#" className="shopping-cart">Shopping Cart</a>
          </li>
          <li>
            <a href="#" className="sign-in">Sign In</a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
