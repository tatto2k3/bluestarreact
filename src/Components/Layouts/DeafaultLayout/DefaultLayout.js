import React, { useState } from "react";
import Booking from '../BKP/Booking';
import Container from '@mui/material/Container';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import ExploreFlight from '../../Pages/ExploreFlight/ExploreFlight';
import "./DefaultLayout.css"
export default function DefaultLayOut({ children }) {

    const [isSearchVisible, setIsSearchVisible] = useState(false);
    const [searchResult, setSearchResult] = useState([]);

    const handleSearch = (result) => {
        setSearchResult(result);
        console.log(result);
        setIsSearchVisible(true);
    };


    return (
        <>
            <div className="layout-main">
                <Header />
                <div className="body-main">
                    <Booking onSearch={handleSearch} />
                    {/*Booking main*/}
                    <div className="Booking-Main-Body">
                        {isSearchVisible && (
                            <Container
                                maxWidth="lg"
                                className="custom-container"
                            >
                                {children}
                            </Container>
                        )}
                        <div className="layout-explore-flight">
                            <ExploreFlight />
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        </>
    )
}