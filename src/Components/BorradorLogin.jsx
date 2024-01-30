import React, { useState, useContext } from 'react';
import { CookieContext } from "../context/CookieContex";
import io from "socket.io-client";


const socket = io("http://localhost:5000");

function BorradorLogin() {
  const [nombre, setNombre] = useState('');
  const [id, setId] = useState('');
  const { updateCookie } = useContext(CookieContext); // Importa updateCookie desde el contexto
  const {cookieValue}=useContext(CookieContext)

  const handleNombreChange = (event) => {
    setNombre(event.target.value);
  };

  const handleIdChange = (event) => {
    setId(event.target.value);
  };

  const handleClick = () => {
    updateCookie(nombre); // Usa updateCookie para cambiar el valor de la cookie
    alert(`Nombre: ${nombre}, ID: ${id}`);
    socket.emit("userConnected", cookieValue);
  };

  return (
    <div>
      <input type="text" value={nombre} onChange={handleNombreChange} placeholder="Nombre" />
      <input type="text" value={id} onChange={handleIdChange} placeholder="ID" />
      <button onClick={handleClick}>Guardar</button>
    </div>
  );
}

export default BorradorLogin;
