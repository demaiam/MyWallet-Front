import { createContext, useState } from "react";

export const Context = createContext();

export const ContextProvider = ({ children }) => {
  const [token, setToken] = useState('');
  const [name, setName] = useState('');

  return (
    <Context.Provider value={{ token, setToken, name, setName }}>
      {children}
    </Context.Provider>
  )
}