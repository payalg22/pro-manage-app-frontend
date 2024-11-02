import { createContext, useEffect, useState } from "react";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [user, setUser] = useState(localStorage.getItem("username") || "");

  return (
    <AppContext.Provider
      value={{
        user,
        setUser
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppContext;
