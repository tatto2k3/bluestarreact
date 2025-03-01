import React, { useState } from 'react';
import Header from '../Header/Header';
import "./MainLayoutLogin.css"
import Footer from '../Footer/Footer';

export default function MainLayOut({ children }) {
    return (
        <>
            <Header />
            {children}  
            <Footer/>             
        </>
    )
}