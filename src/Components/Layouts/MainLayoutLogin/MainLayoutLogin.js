import React, { useState } from 'react';
import HeaderNav from '../HeaderNav/HeaderNav';
import "./MainLayoutLogin.css"
import Footer from '../Footer/Footer';

export default function MainLayOut({ children }) {
    return (
        <>
            <HeaderNav />
            {children}  
            <Footer/>             
        </>
    )
}