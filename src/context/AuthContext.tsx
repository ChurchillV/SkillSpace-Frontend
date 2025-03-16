import { createContext, useContext, useEffect, useState } from "react";
import { AuthContextType } from "../types";
import { useNavigate } from "react-router";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({children}) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [role, setRole] = useState<"guest" | "user" |"organizer">("guest");

    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem(`${import.meta.env.VITE_LOCALSTORAGE_ROLE}` as string);
        const storedRole = localStorage.getItem(`${import.meta.env.VITE_LOCALSTORAGE_ROLE}`) as "guest" | "user" | "organizer"

        if((storedRole === "user" || storedRole === "organizer") && token) {
            setIsAuthenticated(true);
        } 

        setRole(storedRole);
    }, []);


    const login = (role: "user" | "organizer", access_token: string) => {
        setIsAuthenticated(true);
        setRole(role);

        localStorage.setItem(`${import.meta.env.VITE_LOCALSTORAGE_ACCESS_TOKEN}` as string, access_token);
        localStorage.setItem(`${import.meta.env.VITE_LOCALSTORAGE_ROLE}` as "guest" | "user" | "organizer", role);

        navigate(role === 'organizer' ? '/org/home' : '/user/home')
    }

    const logout = () => {
        setIsAuthenticated(false);
        setRole('guest');

        localStorage.removeItem(`${import.meta.env.VITE_LOCALSTORAGE_ACCESS_TOKEN}`)
        navigate('login');
    }

    return(
        <AuthContext.Provider value={{
            isAuthenticated,
            role,
            login,
            logout            
        }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
      throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
  };