import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext();
export const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [avatar, setAvatar] = useState(null);
    const [email, setEmail] = useState(null); 
    const [name, setName] = useState(null); 

    useEffect(() => {
        const storedEmail = localStorage.getItem('email');
        const storedAvatar = localStorage.getItem('avatar');
        const storedLoggedIn = localStorage.getItem('isLoggedIn');
        const storedName = localStorage.getItem('name');

        if (storedLoggedIn) {
            setIsLoggedIn(true);
            setEmail(storedEmail || null);
            setAvatar(storedAvatar || null);
            setName(storedName || null);
        }
    }, []);

    const login = () => {
        setIsLoggedIn(true);
        localStorage.setItem('isLoggedIn', true);
        localStorage.setItem('avatar', avatar || null);
        localStorage.setItem('email', email || null);
        localStorage.setItem('name', name || null);
    };

    const logout = () => {
        setIsLoggedIn(false);
        localStorage.removeItem('isLoggedIn');
        localStorage.removeItem('email');
        localStorage.removeItem('avatar');
        localStorage.removeItem('name');
        setAvatar(null);
        setEmail(null);
    };

    return (
        <AuthContext.Provider value={{ isLoggedIn, login, logout, avatar, setAvatar, email, setEmail, name, setName }}>
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
