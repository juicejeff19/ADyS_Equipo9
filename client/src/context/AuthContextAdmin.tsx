import React, { createContext, useState, ReactNode, useContext, useEffect } from "react";
import { loginAdminRequest, loginInstrucRequest, loginSuAdminRequest, logoutAdminRequest, logoutInstrucRequest, logoutSuAdminRequest, registerEventRequest } from '../api/auth';
import axios, { AxiosError } from 'axios';
import { useNavigate } from "react-router-dom";



interface User {
    email: string;
    password: string;
}

type FormEventValues = {
    name: string;
    startDate: Date;
    endDate: Date;
    closingOfRegistrations: Date;
    mode: string[];
    cost: number;
    requirements: string;
    rules: string;
    kilometers: number;
    description?: string;
};


interface AuthContextType {
    sigin: (user: User) => Promise<void>;
    user: User | null;
    isAuthenticated: boolean;
    errores: string[];
    logout: () => Promise<void>;
    siginIns: (user: User) => Promise<void>;
    logoutIns: () => Promise<void>;
    siginSuAdmin: (user: User) => Promise<void>;
    logoutSuAdmin: () => Promise<void>;
    registerEvent: (data: FormEventValues) => Promise<void>;
}

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthContextAdmin = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
    const context = useContext(AuthContextAdmin);
    if (!context) {
        throw new Error("useAuth debe de estar dentro de un AuthProvider")
    }
    return context;
}

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {

    const navigate = useNavigate();
    const [user, setUser] = useState<User | null>(null);
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const [errores, setErrores] = useState<string[]>([]);



    const sigin = async (data: User): Promise<void> => {
        const adminData = {
            email: data.email,
            password: data.password,
        };

        try {
            const res = await loginAdminRequest(adminData);
            console.log("Login response:", res);
            setUser(res.data);
            setIsAuthenticated(true);
        } catch (error) {
            // console.error("Login failed:", error);
            // setErrores(AxiosError.response.data);
            if (axios.isAxiosError(error) && error.response) {
                if (Array.isArray(error.response.data)) {
                    setErrores(error.response.data);
                } else {
                    console.error("El backend devolvió un formato inesperado:", error.response.data);
                    setErrores(["Ocurrió un error inesperado"]);
                }
            } else {
                console.error("Error no relacionado con Axios:", error);
                setErrores(["Error inesperado"]);
            }
        }
    };

    const logout = async () => {
        try {
            await logoutAdminRequest();
            setUser(null);
            setIsAuthenticated(false);
            console.log('Logout exitoso');
            navigate('/')
        } catch (error) {
            console.error('Error durante el logout:', error);
        }
    };

    const siginIns = async (data: User): Promise<void> => {
        const insData = {
            email: data.email,
            password: data.password,
        };

        try {
            const res = await loginInstrucRequest(insData);
            console.log("Login response:", res);
            setUser(res.data);
            setIsAuthenticated(true);
        } catch (error) {
            // console.error("Login failed:", error);
            // setErrores(AxiosError.response.data);
            if (axios.isAxiosError(error) && error.response) {
                if (Array.isArray(error.response.data)) {
                    setErrores(error.response.data);
                } else {
                    console.error("El backend devolvió un formato inesperado:", error.response.data);
                    setErrores(["Ocurrió un error inesperado"]);
                }
            } else {
                console.error("Error no relacionado con Axios:", error);
                setErrores(["Error inesperado"]);
            }
        }
    };

    const logoutIns = async () => {
        try {
            await logoutInstrucRequest();
            setUser(null);
            setIsAuthenticated(false);
            console.log('Logout exitoso');
            navigate('/')
        } catch (error) {
            console.error('Error durante el logout:', error);
        }
    };


    const siginSuAdmin = async (data: User): Promise<void> => {
        const suadminData = {
            email: data.email,
            password: data.password,
        };

        try {
            const res = await loginSuAdminRequest(suadminData);
            console.log("Login response:", res);
            setUser(res.data);
            setIsAuthenticated(true);
        } catch (error) {
            // console.error("Login failed:", error);
            // setErrores(AxiosError.response.data);
            if (axios.isAxiosError(error) && error.response) {
                if (Array.isArray(error.response.data)) {
                    setErrores(error.response.data);
                } else {
                    console.error("El backend devolvió un formato inesperado:", error.response.data);
                    setErrores(["Ocurrió un error inesperado"]);
                }
            } else {
                console.error("Error no relacionado con Axios:", error);
                setErrores(["Error inesperado"]);
            }
        }
    };

    const logoutSuAdmin = async () => {
        try {
            await logoutSuAdminRequest();
            setUser(null);
            setIsAuthenticated(false);
            console.log('Logout exitoso');
            navigate('/')
        } catch (error) {
            console.error('Error durante el logout:', error);
        }
    };


    const registerEvent = async (data: FormEventValues): Promise<void> => {
        const eventData = {
            name: data.name,
            startDate: data.startDate,
            endDate: data.endDate,
            closingOfRegistrations: data.closingOfRegistrations,
            mode: data.mode,
            cost: data.cost,
            requirements: data.requirements,
            rules: data.rules,
            kilometers: data.kilometers,
            description: data.description,
        };

        try {
            const res = await registerEventRequest(eventData); // Usando tu función para registrar el evento
            console.log("Event registered successfully:", res.data);
            // Aquí puedes manejar la respuesta como desees
        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                if (Array.isArray(error.response.data)) {
                    setErrores(error.response.data); // Aquí puedes gestionar los errores del backend
                } else {
                    console.error("El backend devolvió un formato inesperado:", error.response.data);
                    setErrores(["Ocurrió un error inesperado"]);
                }
            } else {
                console.error("Error no relacionado con Axios:", error);
                setErrores(["Error inesperado"]);
            }
        }
    };



    ///--------------------
    ///aqui abajo vas a escribir para el instructor
    // vas a importar las funcones de la api del frontend, vas a crear tu
    //propio auth.ts para el instructor (crea otro archivo de preferencia)
    //y sigue el de ejmplo el que ya esta en la carrtepa api


    useEffect(() => {
        if (errores.length > 0) {
            const timer = setTimeout(() => {
                setErrores([])
            }, 5000)
            return () => clearTimeout(timer)
        }
    }, [errores])
    return (
        <AuthContextAdmin.Provider value={{ sigin, user, isAuthenticated, errores, logout, siginIns, logoutIns, siginSuAdmin, logoutSuAdmin, registerEvent }}>
            {children}
        </AuthContextAdmin.Provider>
    );
};

export default AuthProvider;
