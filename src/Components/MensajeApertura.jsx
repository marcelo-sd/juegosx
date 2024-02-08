import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';

const MensajeApertura = () => {
  const [message, setMessage] = useState('');

  useEffect(() => {
    // Crear una conexión con el servidor
    console.log("si paso el useEffect")
    const socket = io("http://localhost:5000");


    // Escuchar el evento 'test'
    socket.on('test', (message, callback) => {
      console.log(message); // Debería imprimir 'Estás en la sala correcta'
      callback('received');
    });
    

    // Asegúrate de cerrar la conexión cuando el componente se desmonte
    return () => {
    
      socket.off('test');
      socket.close();
    };
  }, []);

  return (
    <div>
      {/* Renderizar el mensaje en un elemento h2 */}
      <h2>{message}</h2>
    </div>
  );
};

export default MensajeApertura;
