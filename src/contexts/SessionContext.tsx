import { createContext, useState } from "react";
import { login } from "../requests";

type Props = {
  children: React.ReactNode;
};

export const SessionContext = createContext({
  isLoggedIn: false,
  attemptLogin: async (user: string, password: string) => false,
});

export const SessionProvider: React.FC<Props> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const attemptLogin = async (user: string, password: string) => {
    const isSuccessful = await login(user, password);
    if (isSuccessful) setIsLoggedIn(true);
    return isSuccessful;
  };
  return (
    <SessionContext.Provider value={{ isLoggedIn, attemptLogin }}>
      {children}
    </SessionContext.Provider>
  );
};
