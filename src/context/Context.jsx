import { createContext, useState } from "react";

const Context = createContext();

export function ContextProvider({ children }) {
  const [token, setToken] = useState('');
  const [name, setName] = useState('');

  return (
    <Context.Provider value={{ token, setToken, name, setName }}>
      {children}
    </Context.Provider>
  )
}

export default Context;