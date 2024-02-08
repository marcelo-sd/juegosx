import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';

const socket = io('http://localhost:5000');

function App() {
  const [users, setUsers] = useState({});

  useEffect(() => {
    // Escuchar el evento 'usConccs'
    socket.on('usConccs', (users) => {
      console.log('Usuarios conectados:', users);
      setUsers(users);
    });


    socket.on('message', (data) => {
      // Actualizar el estado con el mensaje recibido
    
      console.log(data.text)
    });

    // Emitir el evento 'obtenerUs' al cargar el componente
    socket.emit('obtenerUs');
  }, []);

  return (
    <div>
      <h1>Usuarios conectados:</h1>
      {Object.keys(users).map((username) => (
        <p key={username}>{username}</p>
      ))}
    </div>
  );
}

export default App;
