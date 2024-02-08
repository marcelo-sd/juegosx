import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import "../Styles/intro.css"
import { Link } from "react-router-dom";
import {UsuChatsContext} from '../context/UsuarioChatsContex'
import { SocketContext } from '../context/SockedContex';




const UserCard = ({ usuario }) => {

  const socket = useContext(SocketContext);

  const { cookieValue, updateCookieChat } = useContext(UsuChatsContext);
 // const [usuario, setusuario] = useState(second)

 const handlerClick = () => {
  updateCookieChat(usuario.nombre); // Usa updateCookie para cambiar el valor de la cookie
  alert(`usuario prestario conectado: ${usuario.nombre}`);

  // Emitir el evento y pasar una función de callback
  socket.emit("startPrivateChat", usuario.nombre, (confirmation) => {
    if (confirmation === 'received') {
      console.log(`El servidor recibió el evento startPrivateChat para ${usuario.nombre}`);
    }
  });
  console.log('supuestamente se emitio')
};




  return (
    <div className="user-card" id={`user-card-${usuario.id}`}>
      {/* <img src={usuario.img} alt={usuario.nombre} className="user-img" id={`user-img-${usuario.id}`} /> */}
      <h2 className="user-name" id={`user-name-${usuario.id}`}>{usuario.nombre}</h2>
      <p className="user-desc" id={`user-desc-${usuario.id}`}>{usuario.descripcion}</p>
      <Link to="chat">
        <button className="chat-button" id={`chat-button-${usuario.id}`}
          onClick={handlerClick}
        >Chat</button>
      </Link>
      <button className="video-call-button" id={`video-call-button-${usuario.id}`}>Videollamada</button>
    </div>
  );
};

const UserList = () => {
  const [usuarios, setUsuarios] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios('http://localhost:3000/getUsers');
      setUsuarios(result.data);

  

    };
    fetchData();
  }, []);

  return (
    <div className="user-list">
      {usuarios.map(usuario => <UserCard key={usuario.id} usuario={usuario} />)}
    </div>
  );
};

export default UserList;
