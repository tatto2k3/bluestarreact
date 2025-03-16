import React from 'react';
import Booking from '../BKP/Booking';
import Container from '@mui/material/Container';
import HeaderReview from '../HeaderReview/HeaderReview';
import HeaderNav from '../HeaderNav/HeaderNav';
import "./LayoutTicketReview.css"
import Footer from '../Footer/Footer';
export default function DefaultLayOut({children }) {
    return (
        <>
            <HeaderNav/>
            {children}
            <Footer/>
        </>
    )
}