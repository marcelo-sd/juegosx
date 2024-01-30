import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';

function ListaDeUsuarios() {
  const [usuariosConectados, setUsuariosConectados] = useState([]);

  useEffect(() => {
    const socket = io('http://localhost:5000');

    // Escucha los eventos de 'usuarioConectado' y 'usuarioDesconectado'
    socket.on('usuarioConectado', (username) => {
      setUsuariosConectados((prev) => [...prev, username]);
    });

    socket.on('usuarioDesconectado', (username) => {
      setUsuariosConectados((prev) => prev.filter((nombreUsuario) => nombreUsuario !== username));
    });

    return () => socket.disconnect(); // Desconecta cuando el componente se desmonta
  }, []);

  return (
    <div>
      {usuariosConectados.map((nombre) => (
        <div key={nombre}>
          {nombre}
          <span style={{ color: 'green' }}>●</span>
        </div>
      ))}
    </div>
  );
  
}
export default ListaDeUsuarios
