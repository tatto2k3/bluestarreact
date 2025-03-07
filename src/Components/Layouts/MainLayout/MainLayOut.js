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
import logo from '../../../assets/logo2.PNG';
import axios from "axios";


export default function MainLayOut({ children }) {
    const pages = ["Thông tin hành khách", "Thông tin đặt chỗ", "Xác nhận", "Thanh toán"];
    const navigate = useNavigate();
    const [isActive, setIsActive] = useState("Thông tin hành khách");
    const location = useLocation();
    const [searchResult, setSearchResult, isLoading, setIsLoading, searchInfo,
        setSearchInfo, tripType, setTripType, airport, setAirport, departFlight, setDepartFlight, ariveFlight, setArriveFlight,
        total1, setTotal1, foodItems1, setFoodItems1, total2, setTotal2,
        foodItems2, setFoodItems2, addFoodItem1, calculateTotal1, addFoodItem2, calculateTotal2, passengerInfo,
        setPassengerInfo, seatId, setSeatId, luggaeId, setLuggageId] = useSearch();

    useEffect(() => {
        const savedDepartFlight = localStorage.getItem('departFlight');
        if (savedDepartFlight) {
            setDepartFlight(JSON.parse(savedDepartFlight));
        }

        const savedAriveFlight = localStorage.getItem('arriveFlight');
        if (savedAriveFlight) {
            setArriveFlight(JSON.parse(savedAriveFlight));
        }
    }, []);

    useEffect(() => {
        if (departFlight) {
            const total1 = calculateTotal1(calculateTickerPrice(Math.floor(departFlight.originalPrice)));
            console.log('Total:', total1);
            setTotal1(total1);
        }
    }, [departFlight]);

    useEffect(() => {
        if (tripType === "roundTrip" && ariveFlight) {
            const total2 = calculateTotal2(Math.floor(ariveFlight.originalPrice));
            console.log('Total:', total2);
            setTotal2(total2);
        }
    }, [ariveFlight, tripType]);


    const formatTimeFromDB = (timeString) => {
        if (timeString) return timeString.split(':').slice(0, 2).join(':');
    };

    function formatTimeDuration(departureTime, arrivalTime) {
        const departureDate = new Date(`2000-01-01T${departureTime}`);
        const arrivalDate = new Date(`2000-01-01T${arrivalTime}`);

        const durationInMinutes = (arrivalDate - departureDate) / (1000 * 60);
        const hoursDecimal = (durationInMinutes / 60).toFixed(2);

        return `${hoursDecimal} giờ`;
    }

    const formattedPrice = (price) => {
        return price?.toLocaleString('vi-VN');
    };

    const calculateTickerPrice = (price) => {
        const numberTickets = localStorage.getItem('numberTickets');
        if (numberTickets) {
            return parseInt(numberTickets) * price;
        }
    }

    const [passengerList, setPassengerList] = useState([]);

    useEffect(() => {
        const savedPassengerList = localStorage.getItem("passengerList");
        if (savedPassengerList) {
            const parsedPassengerList = JSON.parse(savedPassengerList);
            setPassengerList(parsedPassengerList);
        }
    }, []);

    console.log(total1);
    const ticket_amount = parseInt(total1);

    const createJsonData = (flight) => ({
        "passengerList": passengerList,
        "flight_id": `${flight.id}`,
        "departure_day": `${flight.departureDay}`,
        "arrive_day": `${flight.departureDay}`,
        "departure_time": `${flight.departureTime}`,
        "arrive_time": `${flight.arrivalTime}`,
        "duration_time": `${formatTimeDuration(flight.departureTime, flight.arrivalTime)}`,
        "trip_type": `${tripType}`
    });

    const handlePayment = async () => {
        try {
            const response = await axios.post("https://bluestarbackend.vercel.app/api/api/onlineCheckout/check_out", { ticket_amount }, {
                headers: { 'Content-Type': 'application/json' },
            });
            if (response.data.redirect_url) {
                const jsonData = createJsonData(departFlight);
                console.log(jsonData);
                const responseSavedTicket = await axios.post("https://bluestarbackend.vercel.app/api/api/payment/handleCallback", jsonData, {
                    headers: { 'Content-Type': 'application/json' },
                });
                if (tripType === "roundTrip") {
                    const jsonDataComeback = createJsonData(passenger, ariveFlight);
                    await axios.post("https://bluestarbackend.vercel.app/api/api/payment/handleCallback", jsonDataComeback, {
                        headers: { 'Content-Type': 'application/json' },
                    });
                }
            }
            window.location.href = response.data.redirect_url;
        } catch (error) {
            console.error("Lỗi thanh toán:", error);
            alert("Thanh toán thất bại, vui lòng thử lại!");
        }
    };

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
                                                        <img src={logo} style={{ width: '40px' }} className='logo-rotate' />
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
                                                            formatTimeFromDB(departFlight.departureTime)
                                                        }
                                                    </h5>
                                                    <p className="schedule-date">
                                                        {
                                                            departFlight.departureDay
                                                        }
                                                    </p>
                                                    <p className="airport-depart">
                                                        {
                                                            departFlight?.from_airport?.name
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
                                                            formatTimeFromDB(departFlight.arrivalTime)
                                                        }
                                                    </h5>
                                                    <p className="schedule-date">
                                                        {
                                                            departFlight.departureDay
                                                        }
                                                    </p>
                                                    <p className="airport-depart">
                                                        {
                                                            departFlight?.to_airport?.name
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
                                                            {formatTimeFromDB(departFlight.departureTime)}
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
                                                            {formatTimeFromDB(departFlight.arrivalTime)}
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
                                                            {formatTimeFromDB(ariveFlight.departureTime)}
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
                                                            {formatTimeFromDB(ariveFlight.arrivalTime)}
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
                                        navigate('/seat');
                                    } else if (location.pathname === '/seat') {
                                        navigate('/confirm');
                                    } else if (location.pathname === '/confirm') {
                                        handlePayment();
                                    }
                                }}>
                                    {location.pathname === '/confirm' ? "Thanh Toán" : "Tiếp theo"}
                                </button>
                            </Grid>
                            <Grid item md={4}>
                                {
                                    tripType === "oneWay" ? (
                                        <Paper className="fare-paper">
                                            <h6 className="fare-header">Chi tiết hóa đơn</h6>
                                            <ul className="item-list">
                                                <li className="item-ticket">
                                                    <p>
                                                        Thức ăn, đồ uống
                                                    </p>
                                                    <p>
                                                        <span className='food-price-summary'>{formattedPrice(120000)}</span> VND
                                                    </p>
                                                </li>
                                                <li className="item-ticket">
                                                    <p>
                                                        Giá vé x{localStorage.getItem('numberTickets')}
                                                    </p>
                                                    <p>
                                                        {formattedPrice(calculateTickerPrice(Math.floor(departFlight.originalPrice)))} VND
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
                                            </ul>

                                            <div className="ticker-footer">
                                                <div className="ticker-footer-total" >
                                                    Thành tiền
                                                </div>
                                                <div className="ticker-footer-value" >
                                                    {formattedPrice(total1)} VND
                                                </div>
                                            </div>
                                        </Paper>
                                    ) : (
                                        <>
                                            <Paper className="fare-paper">
                                                <h6 className="fare-header">Chuyến đi</h6>
                                                <ul className="item-list">
                                                    <li className="item-ticket">
                                                        <p>
                                                            Thức ăn, đồ uống
                                                        </p>
                                                        <p>
                                                            120000 VND
                                                        </p>
                                                    </li>
                                                    <li className="item-ticket">
                                                        <p>
                                                            Giá vé
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
                                                        Giảm giá
                                                    </li>
                                                </ul>

                                                <div className="ticker-footer">
                                                    <div className="ticker-footer-total" >
                                                        Thành tiền
                                                    </div>
                                                    <div className="ticker-footer-value" >
                                                        {total1} VND
                                                    </div>
                                                </div>
                                            </Paper>
                                            <Paper className="fare-paper mt-20">
                                                <h6 className="fare-header">Chuyến về</h6>
                                                <ul className="item-list">
                                                    <li className="item-ticket">
                                                        <p>
                                                            Thức ăn, đồ uống
                                                        </p>
                                                        <p>
                                                            120000 VND
                                                        </p>
                                                    </li>
                                                    <li className="item-ticket">
                                                        <p>
                                                            Giá vé
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
                                                        Giảm giá
                                                    </li>
                                                </ul>

                                                <div className="ticker-footer">
                                                    <div className="ticker-footer-total" >
                                                        Thành tiền
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
