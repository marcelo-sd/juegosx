import React, { createContext, useState, useEffect } from 'react';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

// Crear el contexto
export const UsuChatsContext = createContext();

// Crear el proveedor del contexto
export const UsuChatsProvider = ({ children }) => {
  const [cookieValue, setCookieValue] = useState(cookies.get('nombreSer'));
  const [cookieChanged, setCookieChanged] = useState(false);

  useEffect(() => {
    setCookieValue(cookies.get('nombreSer'));
    setCookieChanged(false);
  }, [cookieChanged]);

  const updateCookieChat = (value) => {
    cookies.set('nombreSer', value, { path: '/' });
    setCookieChanged(true);
  };

  return (
    <UsuChatsContext.Provider value={{ cookieValue, updateCookieChat }}>
      {children}
    </UsuChatsContext.Provider>
  );
};
