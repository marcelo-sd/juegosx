import React, { useState, useContext } from 'react';
import { CookieContext } from "../context/CookieContex";

function BorradorLogin() {
  const [nombre, setNombre] = useState('');
  const [id, setId] = useState('');
  const { updateCookie } = useContext(CookieContext); // Importa updateCookie desde el contexto

  const handleNombreChange = (event) => {
    setNombre(event.target.value);
  };

  const handleIdChange = (event) => {
    setId(event.target.value);
  };

  const handleClick = () => {
    updateCookie(nombre); // Usa updateCookie para cambiar el valor de la cookie
    alert(`Nombre: ${nombre}, ID: ${id}`);
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
