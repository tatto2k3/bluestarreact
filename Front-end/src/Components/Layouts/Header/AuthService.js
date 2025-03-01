// AuthContext.js
import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [avatar, setAvatar] = useState(null);
    const [email, setEmail] = useState(null); 

    useEffect(() => {
       
        const storedEmail = localStorage.getItem('email');
        const storedAvatar = localStorage.getItem('avatar');
        const storedLoggedIn = localStorage.getItem('isLoggedIn');

        if (storedLoggedIn) {
            setIsLoggedIn(true);
            setEmail(storedEmail || null);
            setAvatar(storedAvatar || null);
        }
    }, []);

    const login = () => {
        // Logic for login
        setIsLoggedIn(true);
        // Lưu trữ thông tin đăng nhập, email và avatar vào localStorage
        localStorage.setItem('isLoggedIn', true);
        
        localStorage.setItem('avatar', avatar || null);
    };

    const logout = () => {
        // Logic for logout
        setIsLoggedIn(false);
        // Xóa thông tin đăng nhập, email và avatar khi logout
        localStorage.removeItem('isLoggedIn');
        localStorage.removeItem('email');
        localStorage.removeItem('avatar');
        setAvatar(null);
        setEmail(null);
    };

    return (
        <AuthContext.Provider value={{ isLoggedIn, login, logout, avatar, setAvatar, email, setEmail }}>
            {children}
        </AuthContext.Provider>
    );
};

// Create a custom hook to use the authentication context
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
