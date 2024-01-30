import React, { useState, useEffect,useContext } from "react";
import io from "socket.io-client";
import Cookies from "universal-cookie";
import {UsuChatsContext} from '../context/UsuarioChatsContex'


const socket = io("http://localhost:5000");
const cookies = new Cookies();

function Chat() {
  const { cookieValue, updateCookieChat } = useContext(UsuChatsContext);

  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

 // const [Usuario, setUsuario] = useState(cookies.get("nombreSer"));

  const [ActualUsuario, setActualUsuario] = useState("");

  useEffect(() => {
    // Leer el valor de la cookie 'nombre' y asignarlo al estado
     setActualUsuario(cookies.get("nombre"));

    const username = ActualUsuario; // Aquí debes poner el nombre de usuario del cliente actual
    socket.emit("userConnected", username); 

    socket.on("privateChatMessage", (msg) => {
      setMessages((messages) => [...messages, msg]);
    });

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


  


  const startPrivateChat = (otherUsername) => {
    socket.emit("startPrivateChat", otherUsername);
  };

  const submitMessage = (e) => {
    e.preventDefault();
    const otherUsername = cookieValue; // Aquí debes poner el nombre de usuario del otro cliente
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

        <h1 style={{ color: "red" }}>{cookieValue}</h1>
        <button
            id="logout-button"
            className="navbar-button"
            onClick={handleClick}
          >
            Cerrar chat
          </button>

        <h2>{ActualUsuario}</h2>

        <button type="submit">Enviar</button>
        <button onClick={() => startPrivateChat(cookieValue)}>
          Iniciar chat privado
        </button>
      </form>
    </div>
  );
}

export default Chat;
