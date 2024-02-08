import React, { useState, useContext,useEffect } from 'react';
import { CookieContext } from "../context/CookieContex";
import io from "socket.io-client";
import { SocketContext } from '../context/SockedContex';



function BorradorLogin() {

  
  const socket = useContext(SocketContext);
  const [nombre, setNombre] = useState('');
  const [id, setId] = useState('');
  const { updateCookie } = useContext(CookieContext); // Importa updateCookie desde el contexto
  const {cookieValue}=useContext(CookieContext)

  const handleNombreChange = (event) => {
    setNombre(event.target.value);
  };

  useEffect(() => {
    window.addEventListener("beforeunload", (ev) => {  
      ev.preventDefault();
      return socket.emit('userDisconnected', cookieValue);
    });
  }, []);
  /////////////////////////////////////////////
  useEffect(() => {


/*       // Escuchar el evento 'test'
      socket.on('test', (message, callback) => {
        console.log(message); // Debería imprimir 'Estás en la sala correcta'
        callback('received');
      }); */

      
    if (cookieValue) {
      socket.emit("userConnected", cookieValue);
    }
  }, [cookieValue]);
  ////////////////////////////////////////////////////


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
