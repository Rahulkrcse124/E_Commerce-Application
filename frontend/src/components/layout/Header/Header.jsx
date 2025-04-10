import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./header.css";
import { FaSearch, FaShoppingCart, FaUser } from "react-icons/fa";

const Header = () => {
  const [navActive, setNavActive] = useState(false);
  const navigate = useNavigate(); 

  const toggleNav = () => {
    setNavActive(!navActive);
  };

  return (
    <header className="header">
      
      <div
        className={`burger-menu ${navActive ? "active" : ""}`}
        onClick={toggleNav}
      >
        <div className="burger-line"></div>
        <div className="burger-line"></div>
        <div className="burger-line"></div>
      </div>

      
      <div className="logo">ECOMMERCE.</div>

      <nav>
        <ul className={`nav-links ${navActive ? "active" : ""}`}>
          <li>
            <Link to="/" onClick={toggleNav}>Home</Link>
          </li>
          <li>
            <Link to="/products" onClick={toggleNav}>Products</Link>
          </li>
          <li>
            <Link to="/contact" onClick={toggleNav}>Contact</Link>
          </li>
          <li>
            <Link to="/about" onClick={toggleNav}>About</Link>
          </li>
        </ul>
      </nav>

      
      <div className="icons-container">
        <FaSearch className="icon" onClick={() => navigate("/search")} />

        <FaShoppingCart className="icon" onClick={()=> navigate("/cart")} />

        <FaUser className="icon" onClick={() => navigate("/login")} />
      </div>
    </header>
  );
};

export default Header;