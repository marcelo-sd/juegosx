import React from "react";
import "../styles/navbar.css";
import { Link } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import { CookieContext } from "../context/CookieContex";
import io from "socket.io-client";

import { SocketContext } from '../context/SockedContex';

const Navbar = () => {
  const socket = useContext(SocketContext);

  const { cookieValue, updateCookie } = useContext(CookieContext);
  const [alerta, setAlerta] = useState(0);
  const [contenidos, setContenidos] = useState([])

  useEffect(() => {

 

  socket.on('test', (message) => {
    console.log(message);
    setAlerta(alerta => alerta + 1); // Increment alerta by 1
    setContenidos(contenidos => [...contenidos, message]); // Add new message to contenidos array
  });

  return () => {
    // Desvincula el evento 'test'
    socket.off('test' );
  };


  }),[]; 

  const handleClick = () => {
    updateCookie(""); // Usa updateCookie para borrar el valor de la cookie
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
          <li id="chat-item" className="navbar-item">
            <Link to="/mensaje">mensaje</Link>
          </li>
         
          <li id="alert-item" className="navbar-item">
  <div id="alert-counter">{alerta || 0}</div>
  <div id="alert-content">
    {contenidos.map((contenido, index) => (<>
            <p key={index}>{contenido}</p>
            <Link to={{
                pathname: "/chat",
                state: { message: contenido }
            }}><button>ir al chat</button></Link>
            </>
    ))}
  </div>
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
