import React from "react";
import "../styles/navbar.css";
import { Link } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import { CookieContext } from "../context/CookieContex";

const Navbar = () => {
  const { cookieValue, updateCookie } = useContext(CookieContext);

  useEffect(() => {
    console.log("nombre");
  }, [cookieValue]);

  const handleClick = () => {
    updateCookie(''); // Usa updateCookie para borrar el valor de la cookie
    alert("Sesión cerrada");
  };

  return (
    <div className="navbarIndex">
      <nav id="navbar">
        <ul id="navbar-list" className="navbar-list">
          <li id="home-item" className="navbar-item">
            <Link to="/">Home</Link>
          </li>
          {cookieValue == "" || cookieValue == null ? (
            <p>esta vacio</p>
          ) : (
            <h1>{cookieValue}</h1>
          )}

          <li id="mercado-item" className="navbar-item">
            <Link to="/mercado">Mercado</Link>
          </li>
          <li id="mercado-item" className="navbar-item">
            <Link to="/uConec">Usuarios</Link>
          </li>
          <li id="game-item" className="navbar-item">
            <Link to="/game">Juego</Link>
          </li>
          <li id="llamada-item" className="navbar-item">
            <Link to="/llamada">Llamada</Link>
          </li>
          <li id="chat-item" className="navbar-item">
            <Link to="/chat">Chat</Link>
          </li>
          <li id="chat-item" className="navbar-item">
            <Link to="/login">login</Link>
          </li>

          <li>
            <h3>{cookieValue}</h3>
          </li>

          <button
            id="logout-button"
            className="navbar-button"
            onClick={handleClick}
          >
            Cerrar sesión
          </button>
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;
