import React from 'react';
import Booking from '../BKP/Booking';
import Container from '@mui/material/Container';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import "./DefaultLayout.css"
export default function DefaultLayOut({ children }) {
    return (
        <>
            <Header />
            <div className="body-main">
                <Booking />
                {/*Booking main*/}
                <div className="Booking-Main-Body">
                    <Container
                        maxWidth="lg"
                        className="custom-container"
                    >
                        {children}
                    </Container>
                </div>

            </div>
            <Footer/>
        </>
    )
}