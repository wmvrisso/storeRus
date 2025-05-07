import React from 'react';
import StoreRusLogo from "../assets/StoreRus.com logo.png";
import ShoppingCart from "../assets/shopping-cart.png";
import { Link } from 'react-router-dom';


const Navbar = () => {
  return (
    <header className="navbar-wrapper">
      <nav className="navbar">
        <div className="navbar-left">
          <Link to="/"><img src= {StoreRusLogo} width={100} height={75}/></Link>
        </div>

        <div className="navbar-center">
          <Link to="/" id="navbar-title">StoreRus</Link>
        </div>

        <ul className="navbar-right">
          <li><Link to="/signup">Sign Up</Link></li>
          <li><Link to="/login">Login</Link></li>
          <li><Link to="/cart"><img src={ShoppingCart} className="navbar-logo"/></Link></li>
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;
