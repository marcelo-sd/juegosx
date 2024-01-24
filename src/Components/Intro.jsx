import React, { useEffect, useState } from 'react';
import axios from 'axios';
import "../Styles/intro.css"

const UserCard = ({ usuario }) => (
  <div className="user-card" id={`user-card-${usuario.id}`}>
    {/* <img src={usuario.img} alt={usuario.nombre} className="user-img" id={`user-img-${usuario.id}`} /> */}
    <h2 className="user-name" id={`user-name-${usuario.id}`}>{usuario.nombre}</h2>
    <p className="user-desc" id={`user-desc-${usuario.id}`}>{usuario.descripcion}</p>
    <button className="chat-button" id={`chat-button-${usuario.id}`}>Chat</button>
    <button className="video-call-button" id={`video-call-button-${usuario.id}`}>Videollamada</button>
  </div>
);

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
