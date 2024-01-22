import React from "react";
import "../styles/navbar.css";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="navbarIndex">
      <nav id="navbar">
        <ul id="navbar-list" className="navbar-list">
          
          
          <li id="mercado-item" className="navbar-item">
            <Link to="mercado">Mercado</Link>
          </li>
          <li id="game-item" className="navbar-item">
            <Link to="game">Juego</Link>
          </li>
          <li id="llamada-item" className="navbar-item">
            <Link to="llamada">Llamada</Link>
          </li>
          <button
            id="logout-button"
            className="navbar-button"
            onClick={() => {
              console.log("Cerrar sesión");
            }}
          >
            Cerrar sesión
          </button>
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;
