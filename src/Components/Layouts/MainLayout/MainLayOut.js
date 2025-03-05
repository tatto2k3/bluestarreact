import React, { useEffect, useState } from 'react';
import Booking from '../BKP/Booking';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import ArrowForwardIosOutlinedIcon from '@mui/icons-material/ArrowForwardIosOutlined';
import HeaderReview from '../HeaderReview/HeaderReview';
import "./MainLayout.css"
import { useSearch } from '../../CustomHooks/SearchContext';
import { useNavigate, useLocation } from 'react-router-dom';

export default function MainLayOut({ children }) {
    const pages = ["Travel Details", "Seat Reservation", "Review", "Payment"];
    const navigate = useNavigate();
    const [isActive, setIsActive] = useState("Travel Details");
    const location = useLocation();
    const [searchResult, setSearchResult, isLoading, setIsLoading, searchInfo,
        setSearchInfo, tripType, setTripType, airport, setAirport, departFlight, setDepartFlight, ariveFlight, setArriveFlight,
        total1, setTotal1, foodItems1, setFoodItems1, total2, setTotal2,
        foodItems2, setFoodItems2, addFoodItem1, calculateTotal1, addFoodItem2, calculateTotal2, passengerInfo,
        setPassengerInfo, seatId, setSeatId, luggaeId, setLuggageId] = useSearch();
 
    function formatTimeDuration(departureTime, arrivalTime) {
        const departureDate = new Date(`2000-01-01T${departureTime}`);
        const arrivalDate = new Date(`2000-01-01T${arrivalTime}`);

        const durationInMinutes = (arrivalDate - departureDate) / (1000 * 60);
        const hours = Math.floor(durationInMinutes / 60);
        const minutes = durationInMinutes % 60;

        let formattedDuration = `${hours} hr`;
        if (minutes > 0) {
            formattedDuration += ` ${minutes} min`;
        }

        return formattedDuration;
    }
    useEffect(() => {
        const total1 = calculateTotal1(departFlight?.originalPrice);
        console.log('Total:', total1);
        setTotal1(total1)
    }, [foodItems1]);
    useEffect(() => {
        if (tripType === "roundTrip") {
            const total2 = calculateTotal2(ariveFlight?.originalPrice);
            console.log('Total:', total2);
            setTotal2(total2)
        }
    }, [foodItems2]);

    return (
        <>
            <HeaderReview />
            <div className="body-main">
                <div className="Booking-Main-Body-Not-Booking">
                    <Container
                        maxWidth="lg"
                        className="custom-container"
                    >
                        <Grid container spacing={2}>
                            <Grid item md={8}>
                                {
                                    tripType === "oneWay" ? (
                                        <div className="Ticket-Left-ticketPage" >
                                            <div className="Logo-Wrapper-ticketPage">
                                                <div className="logo-left">
                                                    <div className="Logo-Image-ticketPage">
                                                        <img src="https://www.vietjetair.com/static/media/vj-logo.0f71c68b.svg" />
                                                    </div>
                                                    <h6>Bluestar Air</h6>
                                                </div>
                                                
                                            </div>
                                            <div className="schedule ticketPage">
                                                <div className="schedule-depart ticketPage">
                                                    <p className="schedule-header ">
                                                        Điểm đi
                                                    </p>
                                                    <h5 className="schedule-time">
                                                        {
                                                            departFlight.departureTime
                                                        }
                                                    </h5>
                                                    <p className="schedule-date">
                                                        {
                                                            departFlight.departureDay
                                                        }
                                                    </p>
                                                    <p className="airport-depart">
                                                        {
                                                            airport.fromAirport
                                                        }
                                                    </p>
                                                </div>
                                                <div className="schedule-detail ticketPage">
                                                    <span className="schedule-round-left ticketPage">
                                                    </span>
                                                    <div className="time-duration-wrapper">

                                                        <div className="time-duration">
                                                            {formatTimeDuration(departFlight.departureTime, departFlight.arrivalTime)}
                                                        </div>

                                                    </div>

                                                    <span className="schedule-round-right ticketPage"></span>
                                                </div>
                                                <div className="schedule-des ticketPage">
                                                    <p className="schedule-header">
                                                        Điểm đến
                                                    </p>
                                                    <h5 className="schedule-time">
                                                        {
                                                            departFlight.arrivalTime
                                                        }
                                                    </h5>
                                                    <p className="schedule-date">
                                                        {
                                                            departFlight.departureDay
                                                        }
                                                    </p>
                                                    <p className="airport-depart">
                                                        {
                                                            airport.toAirport
                                                        }
                                                    </p>
                                                </div>

                                            </div>
                                        </div>
                                    ) : (
                                        <>
                                            <div className="Ticket-Left-ticketPage" >
                                                <div className="Logo-Wrapper-ticketPage">
                                                    <div className="logo-left">
                                                        <div className="Logo-Image-ticketPage">
                                                            <img src="https://www.vietjetair.com/static/media/vj-logo.0f71c68b.svg" />
                                                        </div>
                                                        <h6>Bluestar Air</h6>
                                                    </div>
                                                    
                                                </div>
                                                <div className="schedule ticketPage">
                                                    <div className="schedule-depart ticketPage">
                                                        <p className="schedule-header ">
                                                            Điểm đi
                                                        </p>
                                                        <h5 className="schedule-time">
                                                            {departFlight.departureTime}
                                                        </h5>
                                                        <p className="schedule-date">
                                                            {departFlight.departureDay}
                                                        </p>
                                                        <p className="airport-depart">
                                                            {airport.fromAirport}
                                                        </p>
                                                    </div>
                                                    <div className="schedule-detail ticketPage">
                                                        <span className="schedule-round-left ticketPage">
                                                        </span>
                                                        <div className="time-duration-wrapper">

                                                            <div className="time-duration">
                                                                {formatTimeDuration(departFlight.departureTime, departFlight.arrivalTime)}
                                                            </div>

                                                        </div>

                                                        <span className="schedule-round-right ticketPage"></span>
                                                    </div>
                                                    <div className="schedule-des ticketPage">
                                                        <p className="schedule-header">
                                                            Điểm đến
                                                        </p>
                                                        <h5 className="schedule-time">
                                                            {departFlight.arrivalTime}
                                                        </h5>
                                                        <p className="schedule-date">
                                                            {departFlight.departureDay}
                                                        </p>
                                                        <p className="airport-depart">
                                                            {airport.toAirport}
                                                        </p>
                                                    </div>

                                                </div>
                                            </div>
                                            <div className="Ticket-Left-ticketPage" >
                                                <div className="Logo-Wrapper-ticketPage">
                                                    <div className="logo-left">
                                                        <div className="Logo-Image-ticketPage">
                                                            <img src="https://www.vietjetair.com/static/media/vj-logo.0f71c68b.svg" />
                                                        </div>
                                                        <h6>Bluestar Air</h6>
                                                    </div>

                                                </div>
                                                <div className="schedule ticketPage">
                                                    <div className="schedule-depart ticketPage">
                                                        <p className="schedule-header ">
                                                            Điểm đi
                                                        </p>
                                                        <h5 className="schedule-time">
                                                            {ariveFlight.departureTime}
                                                        </h5>
                                                        <p className="schedule-date">
                                                            {ariveFlight.departureDay}
                                                        </p>
                                                        <p className="airport-depart">
                                                            {airport.toAirport}
                                                        </p>
                                                    </div>
                                                    <div className="schedule-detail ticketPage">
                                                        <span className="schedule-round-left ticketPage">
                                                        </span>
                                                        <div className="time-duration-wrapper">

                                                            <div className="time-duration">
                                                                {formatTimeDuration(ariveFlight.departureTime, ariveFlight.arrivalTime)}
                                                            </div>

                                                        </div>

                                                        <span className="schedule-round-right ticketPage"></span>
                                                    </div>
                                                    <div className="schedule-des ticketPage">
                                                        <p className="schedule-header">
                                                            Điểm đến
                                                        </p>
                                                        <h5 className="schedule-time">
                                                            {ariveFlight.arrivalTime}
                                                        </h5>
                                                        <p className="schedule-date">
                                                            {ariveFlight.departureDay}
                                                        </p>
                                                        <p className="airport-depart">
                                                            {airport.fromAirport}
                                                        </p>
                                                    </div>

                                                </div>
                                            </div>
                                        </>
                                    )
                                }

                                <nav className="main-layout-nav">
                                    {
                                        pages.map((page, index) => (
                                            <>
                                                <div key={index} className="nav-wrapper">
                                                    <p className="page-title active">{page}</p>
                                                </div>
                                                {index !== pages.length - 1 && <ArrowForwardIosOutlinedIcon fontSize="small" style={{ color: '#7CBAEF' }} />}
                                            </>
                                        ))
                                    }
                                </nav>
                                {children}
                                <button className="btn-next" onClick={() => {
                                    if (location.pathname === '/ticket') {
                                        navigate('/seatreservation');
                                    } else if (location.pathname === '/seatreservation') {
                                        navigate('/seat');
                                    } else if (location.pathname === '/seat') {
                                        navigate('/luggage');
                                    } else if (location.pathname === '/luggage') {
                                        navigate('/payment');
                                    }

                                }}>
                                    Next
                                </button>
                            </Grid>
                            <Grid item md={4}>
                                {
                                    tripType === "oneWay" ? (
                                        <Paper className="fare-paper">
                                            <h6 className="fare-header">Fare Summary</h6>
                                            <ul className="item-list">
                                                <li className="item-ticket">
                                                    <p>
                                                        Food , Snack and Drink
                                                    </p>
                                                    <p>
                                                        120000 VND
                                                    </p>
                                                </li>
                                                <li className="item-ticket">
                                                    <p>
                                                        Ticket
                                                    </p>
                                                    <p>
                                                        {departFlight.originalPrice} VND
                                                    </p>
                                                </li>
                                                {
                                                    foodItems1?.map(food => (
                                                        <li className="item-ticket">
                                                            <p>
                                                                <span style={{ marginRight: '5px' }}>{food.name}</span> x {food.quantity}
                                                            </p>
                                                            <p>
                                                                {food.price} VND
                                                            </p>
                                                        </li>
                                                    ))
                                                }
                                                <li className="item-ticket">
                                                    Discount
                                                </li>
                                            </ul>

                                            <div className="ticker-footer">
                                                <div className="ticker-footer-total" >
                                                    Total Sumary
                                                </div>
                                                <div className="ticker-footer-value" >
                                                    {total1} VND
                                                </div>
                                            </div>
                                        </Paper>
                                    ) : (
                                        <>
                                            <Paper className="fare-paper">
                                                <h6 className="fare-header">Outgoing trip</h6>
                                                <ul className="item-list">
                                                    <li className="item-ticket">
                                                        <p>
                                                            Food , Snack and Drink
                                                        </p>
                                                        <p>
                                                            120000 VND
                                                        </p>
                                                    </li>
                                                    <li className="item-ticket">
                                                        <p>
                                                            Ticket
                                                        </p>
                                                        <p>
                                                            {departFlight.originalPrice} VND
                                                        </p>
                                                    </li>
                                                    {
                                                        foodItems1?.map(food => (
                                                            <li className="item-ticket">
                                                                <p>
                                                                    <span style={{ marginRight: '5px' }}>{food.name}</span> x {food.quantity}
                                                                </p>
                                                                <p>
                                                                    {food.price} VND
                                                                </p>
                                                            </li>
                                                        ))
                                                    }
                                                    <li className="item-ticket">
                                                        Discount
                                                    </li>
                                                </ul>

                                                <div className="ticker-footer">
                                                    <div className="ticker-footer-total" >
                                                        Total Sumary
                                                    </div>
                                                    <div className="ticker-footer-value" >
                                                        {total1} VND
                                                    </div>
                                                </div>
                                            </Paper>
                                            <Paper className="fare-paper mt-20">
                                                <h6 className="fare-header">Return trip</h6>
                                                <ul className="item-list">
                                                    <li className="item-ticket">
                                                        <p>
                                                            Food , Snack and Drink
                                                        </p>
                                                        <p>
                                                            120000 VND
                                                        </p>
                                                    </li>
                                                    <li className="item-ticket">
                                                        <p>
                                                            Ticket
                                                        </p>
                                                        <p>
                                                            {ariveFlight.originalPrice} VND
                                                        </p>
                                                    </li>
                                                    {
                                                        foodItems2?.map(food => (
                                                            <li className="item-ticket">
                                                                <p>
                                                                    <span style={{ marginRight: '5px' }}>{food.name}</span> x {food.quantity}
                                                                </p>
                                                                <p>
                                                                    {food.price} VND
                                                                </p>
                                                            </li>
                                                        ))
                                                    }
                                                    <li className="item-ticket">
                                                        Discount
                                                    </li>
                                                </ul>

                                                <div className="ticker-footer">
                                                    <div className="ticker-footer-total" >
                                                        Total Sumary
                                                    </div>
                                                    <div className="ticker-footer-value" >
                                                        {total2} VND
                                                    </div>
                                                </div>
                                            </Paper>
                                        </>
                                    )
                                }

                            </Grid>

                        </Grid>
                    </Container>
                </div>

            </div>
        </>
    )
}
