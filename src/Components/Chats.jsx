import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import Cookies from 'universal-cookie';

const socket = io('http://localhost:5000');
const cookies = new Cookies();

function Chat() {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [Usuario, setUsuario] = useState("julio");
  const [ActualUsuario, setActualUsuario] = useState("");

  useEffect(() => {

    
 // Leer el valor de la cookie 'nombre' y asignarlo al estado
 setActualUsuario(cookies.get('nombre'));


    const username = ActualUsuario;  // Aquí debes poner el nombre de usuario del cliente actual
    socket.emit('userConnected', username);

    socket.on('privateChatMessage', (msg) => {
            setMessages((messages) => [...messages, msg]);
    });
   

    // Escucha el evento 'error' y maneja el mensaje de error
    socket.on('error', (errorMsg) => {
      console.error(errorMsg);
      // Aquí puedes manejar el mensaje de error como consideres necesario
      // Por ejemplo, podrías mostrar un mensaje en la interfaz de usuario
    });
  }, [ActualUsuario]);

  const startPrivateChat = (otherUsername) => {
    socket.emit('startPrivateChat', otherUsername);
  };

  const submitMessage = (e) => {
    e.preventDefault();
    const otherUsername = Usuario;  // Aquí debes poner el nombre de usuario del otro cliente
    socket.emit('privateChatMessage', message, otherUsername);
    setMessage('');
  };

  return (
    <div>
      {messages.map((message, index) => (
        <p key={index}>{message}</p>
      ))}
      <form onSubmit={submitMessage}>
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />

        <h2>usuario otro</h2>

        <input
          type="text"
          value={Usuario}
          onChange={(e) => setUsuario(e.target.value)}
        />

        <h2>{ActualUsuario}</h2>

        <button type="submit">Enviar</button>
        <button onClick={() => startPrivateChat(Usuario)}>Iniciar chat privado</button>

      </form>
    </div>
  );
}

export default Chat;
