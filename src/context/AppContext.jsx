import { createContext, useState } from "react";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [isCollapsed, setIsCollapsed] = useState(true);

  return (
    <AppContext.Provider
      value={{
        isCollapsed,
        setIsCollapsed,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
