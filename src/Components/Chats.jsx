import React, { useState, useEffect,useContext } from "react";
import io from "socket.io-client";
import Cookies from "universal-cookie";
import {UsuChatsContext} from '../context/UsuarioChatsContex'
import { SocketContext } from '../context/SockedContex';



const cookies = new Cookies();



function Chat(location) {
  const argumento = location.state ? location.state.message : "Valor predeterminado";
  const socket = useContext(SocketContext);

  const { cookieValue, updateCookieChat } = useContext(UsuChatsContext);

  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [destinatario, setdestiantario] = useState('')


  const [ActualUsuario, setActualUsuario] = useState("");

  useEffect(() => {
    // Leer el valor de la cookie 'nombre' y asignarlo al estado
    console.log(location.state)
console.log(argumento)
    socket.on('privateChatMessage', (data) => {
      setMessages((messages) => [...messages, data.msg]);
      setdestiantario(data.sender)
      console.log(`Mensaje de ${data.sender}: ${data.msg}`);



          // Escuchar el evento 'test'
         /*  socket.on('test', (message, callback) => {
            console.log(message); // Debería imprimir 'Estás en la sala correcta'
            callback('received');
          }); */



    
    });




     setActualUsuario(cookies.get("nombre"));

    const username = ActualUsuario; // Aquí debes poner el nombre de usuario del cliente actual
    //socket.emit("userConnected", username); 



    // Escucha el evento 'error' y maneja el mensaje de error
    socket.on("error", (errorMsg) => {
      console.error(errorMsg);
      // Aquí puedes manejar el mensaje de error como consideres necesario
      // Por ejemplo, podrías mostrar un mensaje en la interfaz de usuario
    });

    return () => {
      // Limpiar el oyente del socket aquí
      socket.off('privateChatMessage');
    };



  }, [ActualUsuario]);


  



  const submitMessage = (e) => {
    e.preventDefault();
    let otherUsername;
    if (!destinatario || destinatario.trim() === '') {
      otherUsername = cookieValue; // Aquí debes poner el nombre de usuario del otro cliente
    } else {
      otherUsername = destinatario; // Aquí debes poner el nombre de usuario del otro cliente
    }
    
    socket.emit("privateChatMessage", message, otherUsername);
    setMessage("");
  };


  const handleClick = () => {
    updateCookieChat(''); // Usa updateCookie para borrar el valor de la cookie
    alert("Sesión cerrada");
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

        <h2>chaterar con:</h2>

        <h1 style={{ color: "red" }}>{cookieValue || argumento}</h1>

        <button
            id="logout-button"
            className="navbar-button"
            onClick={handleClick}
          >
            Cerrar chat
          </button>

        <h2>{ActualUsuario}</h2>

        <button type="submit">Enviar</button>
    
        <button onClick={() => socket.emit("startPrivateChat", cookieValue)}>
          Iniciar chat privado
        </button>
      </form>
    </div>
  );
}

export default Chat;
