import React, { createContext, useState, useEffect } from 'react';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

// Crear el contexto
export const CookieContext = createContext();

// Crear el proveedor del contexto
export const CookieProvider = ({ children }) => {
  const [cookieValue, setCookieValue] = useState(cookies.get('nombre'));
  const [cookieChanged, setCookieChanged] = useState(false);

  useEffect(() => {
    setCookieValue(cookies.get('nombre'));
    setCookieChanged(false);
  }, [cookieChanged]);

  const updateCookie = (value) => {
    cookies.set('nombre', value, { path: '/' });
    setCookieChanged(true);
  };

  return (
    <CookieContext.Provider value={{ cookieValue, updateCookie }}>
      {children}
    </CookieContext.Provider>
  );
};
