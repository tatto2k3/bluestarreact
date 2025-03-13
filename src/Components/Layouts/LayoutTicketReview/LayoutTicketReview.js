import React from 'react';
import Booking from '../BKP/Booking';
import Container from '@mui/material/Container';
import HeaderReview from '../HeaderReview/HeaderReview';
import HeaderOnly from '../HeaderOnly/HeaderOnly';
import "./LayoutTicketReview.css"
import Footer from '../Footer/Footer';
export default function DefaultLayOut({children }) {
    return (
        <>
            <HeaderOnly/>
            {children}
            <Footer/>
        </>
    )
}