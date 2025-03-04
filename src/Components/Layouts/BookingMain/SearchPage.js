import React, { useState } from 'react';
import "./SearchPage.css";
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined';
import WbTwilightOutlinedIcon from '@mui/icons-material/WbTwilightOutlined';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import RangeSlider from './NewFolder/RangeSlider';
import AirplanemodeInactiveOutlinedIcon from '@mui/icons-material/AirplanemodeInactiveOutlined';
import AttachMoneyOutlinedIcon from '@mui/icons-material/AttachMoneyOutlined';
import TicketResult from './TicketResult/TicketResult';
import { useSearch } from '../../CustomHooks/SearchContext';
import Loading from '../../LoadingAnimation/Loading';
import axios from "axios";
import Button from '@mui/material/Button';
import FlightTakeoffOutlinedIcon from '@mui/icons-material/FlightTakeoffOutlined';
import FlightLandOutlinedIcon from '@mui/icons-material/FlightLandOutlined';
import { useNavigate } from 'react-router-dom';
export default function SearchPage() {
    const [value, setValue] = React.useState([1, 300]);
    const [minPrice, setMinPrice] = useState(value[0]);
    const [maxPrice, setMaxPrice] = useState(value[1]);
    const [searchResult, setSearchResult, isLoading, setIsLoading, searchInfo,
        setSearchInfo, tripType, setTripType, airport, setAirport, departFlight, setDepartFlight, ariveFlight, setArriveFlight,
        total1, setTotal1, foodItems1, setFoodItems1, total2, setTotal2,
        foodItems2, setFoodItems2, addFoodItem1, calculateTotal1, addFoodItem2, calculateTotal2, passengerInfo,
        setPassengerInfo, seatId, setSeatId, luggaeId, setLuggageId] = useSearch();
    const [activeTimeLine, setActiveTimeLine] = useState(null);
    const [activeButton, setActiveButton] = useState('Depart');
    console.log(departFlight)
    const handleTimeLineClick = (label, depatureTime, arrivalTime) => {
        setActiveTimeLine(label);
        queryAPI(depatureTime, arrivalTime);
    };

    console.log("total_flight:", searchResult);

    const navigate = useNavigate();
    const handleTicketClick = (flight) => {
        if (tripType === "roundTrip") {
            if (activeButton === "Depart") {
                console.log(flight)
                setDepartFlight(flight);
                setActiveButton("Arrive");
                setIsLoading(true);
                axios.get(`http://localhost:8000/api/flight/searchFlight?fromLocation=${searchInfo.ToLocation}&toLocation=${searchInfo.FromLocation}&departureDay=${searchInfo.ComeBackTime}`)
                    .then(res => {
                        setSearchResult(res.data)
                        setIsLoading(false);

                    })
                    .catch(error => console.log(error));
            }
            else {
                setArriveFlight(flight)
                navigate("/ticket");
            }
        }
        else if (tripType === "oneWay") {
            console.log(flight)
            setDepartFlight(flight);
            navigate("/ticket");
        }
    };

    function convertUSDToVND(usdAmount, exchangeRate = 23000) {
        const vndAmount = usdAmount * exchangeRate;
        return vndAmount;
    }
    function HandleReset() {
        setIsLoading(true);
        setActiveTimeLine(null);
        axios.get(`http://localhost:8000/api/flight/searchFlight?fromLocation=${searchInfo.FromLocation}&toLocation=${searchInfo.ToLocation}
                                &departureDay=${searchInfo.DepartTime}`)
            .then(res => {
                setSearchResult(res.data)
                setIsLoading(false);

            })
            .catch(error => console.log(error));
    }
    function queryAPI(depatureTime, arrivalTime) {
        if (searchInfo.FromLocation != null && searchInfo.ToLocation != null && searchInfo.DepartTime != null && searchInfo.ComeBackTime != null) {
            if (activeButton === "Depart") {
                setIsLoading(true);
                axios.get(`http://localhost:8000/api/flight/searchFlight?fromLocation=${searchInfo.FromLocation}&toLocation=${searchInfo.ToLocation}&departureTime=${depatureTime}&arrivalTime=${arrivalTime}
                                &departureDay=${searchInfo.DepartTime}`)
                    .then(res => {
                        setSearchResult(res.data)
                        setIsLoading(false);

                    })
                    .catch(error => console.log(error));
            }
            else {
                setIsLoading(true);
                axios.get(`http://localhost:8000/api/flight/searchFlight?fromLocation=${searchInfo.ToLocation}&toLocation=${searchInfo.FromLocation}&departureTime=${depatureTime}&arrivalTime=${arrivalTime}
                                    &departureDay=${searchInfo.ComeBackTime}`)
                    .then(res => {
                        setSearchResult(res.data)
                        setIsLoading(false);

                    })
                    .catch(error => console.log(error));
            }
        }
    }
    return (<Grid container spacing={2}>
        <Grid item md={4}>
            < Paper className="custom-paper">
                <div className="filter_header">
                    <h5 className="filter_header_left" >
                        Bộ lọc
                    </h5>
                    <h6 className="filter_header_right" onClick={() => HandleReset()}>
                        Tải lại
                    </h6>
                </div>
                {/*filter main*/}
                <div className="filter-main">
                    <div className="filter-main-header">
                        Giờ khởi hành
                    </div>
                    <div className="filter-wrapper">
                        <Grid container spacing={2}>
                            <Grid item sm={6}>
                                <div className={`time-line ${activeTimeLine === 'Morning' ? 'active' : ''}`}
                                    onClick={() => handleTimeLineClick('Morning', '00:00', '11:59')}>
                                    <div className="filter-icon">
                                        <LightModeOutlinedIcon />
                                    </div>
                                    <div className="filter-time">
                                        Buổi sáng
                                    </div>
                                    <span className="filter-time-detail">
                                        00:00 - 11:59
                                    </span>
                                </div>

                            </Grid>
                            <Grid item sm={6}>
                                <div className={`time-line ${activeTimeLine === 'Night' ? 'active' : ''}`}
                                    onClick={() => handleTimeLineClick('Night', '18:00', '23:59')}>
                                    <div className="filter-icon">
                                        <DarkModeIcon />
                                    </div>
                                    <div className="filter-time">
                                        Buổi tối
                                    </div>
                                    <span className="filter-time-detail">
                                        18:00 - 23:59
                                    </span>
                                </div>

                            </Grid>
                            <Grid item sm={6}>
                                <div className={`time-line ${activeTimeLine === 'Afternoon' ? 'active' : ''}`}
                                    onClick={() => handleTimeLineClick('Afternoon', '15:00', '17:59')}>
                                    <div className="filter-icon">
                                        <WbTwilightOutlinedIcon />
                                    </div>
                                    <div className="filter-time">
                                        Buổi chiều
                                    </div>
                                    <span className="filter-time-detail">
                                        15:00 - 17:59
                                    </span>
                                </div>

                            </Grid>
                            <Grid item sm={6}>
                                <div className={`time-line ${activeTimeLine === 'Noon' ? 'active' : ''}`}
                                    onClick={() => handleTimeLineClick('Noon', '12:00', '14:59')}>
                                    <div className="filter-icon">
                                        <LightModeOutlinedIcon />
                                    </div>
                                    <div className="filter-time">
                                        Buổi trưa
                                    </div>
                                    <span className="filter-time-detail">
                                        12:00 - 14:59
                                    </span>
                                </div>

                            </Grid>
                        </Grid>
                    </div>
                    {/*Price*/}
                    <div className="Price">
                        <div className="filter-main-header m-top-10">
                            Giá tiền
                        </div>
                        <div className="RangeSlider-Wrapper">
                            <RangeSlider value={value} setValue={setValue} setMinPrice={setMinPrice} setMaxPrice={setMaxPrice} />
                        </div>
                        <div className="Price-Wrapper">
                            <Grid container spacing={2}>
                                <Grid item sm={6}>
                                    <div className="min-price">
                                        <p >Giá nhỏ nhất</p>
                                        <div className="min-price-value">
                                            <AttachMoneyOutlinedIcon />
                                            <h5>
                                                {minPrice}
                                            </h5>
                                        </div>
                                    </div>

                                </Grid>
                                <Grid item sm={6}>
                                    <div className="max-price">
                                        <p>Giá lớn nhất</p>
                                        <div className="max-price-value">
                                            <AttachMoneyOutlinedIcon />
                                            <h5>
                                                {maxPrice}
                                            </h5>
                                        </div>

                                    </div>
                                </Grid>
                            </Grid>
                        </div>
                    </div>
                </div>
            </ Paper>
        </Grid>
        <Grid item md={8}>
            <div className="sort_header">
            
                {searchResult.flights && searchResult.flights.length > 0 && searchResult.flights[0] && (
                    <div className="search-result-header">
                        <h6>
                            We have {searchResult.total_flight} tickets from {searchResult.flights[0].fromLocation} to {searchResult.flights[0].toLocation}
                        </h6>
                        {
                            tripType === "roundTrip" && (
                                <div>
                                    <Button variant={activeButton === 'Depart' ? 'contained' : 'outlined'} size="large" startIcon=
                                        {<FlightTakeoffOutlinedIcon />} color="success" className="custom-button-search" >
                                        Depart
                                    </Button>
                                    <Button variant={activeButton === 'Arrive' ? 'contained' : 'outlined'} size="large"
                                        startIcon={<FlightLandOutlinedIcon />} className="custom-button-search" >
                                        Arrive
                                    </Button>
                                </div>
                            )
                        }

                    </div>

                )}
            </div>
            <div className="ticker-result-wrapper">
                {
                    !isLoading ? (
                        searchResult.flight && searchResult.flight.length > 0 ? (
                            <div>
                                {searchResult.flight.map((fl, index) => {
                                    const originalPrice = parseFloat(fl.originalPrice);
                                    console.log(originalPrice)

                                    if (!isNaN(originalPrice) && originalPrice >= convertUSDToVND(minPrice) && originalPrice <= convertUSDToVND(maxPrice)) {
                                        return (
                                            <TicketResult key={index} index={index} flight={fl} handleClick={() => handleTicketClick(fl)} />
                                        );
                                    } else {

                                        return (<div></div>);
                                    }
                                })}
                            </div>
                        ) : (
                            <div className="flights-not-found">
                                <p className="flights-not-found-text">Không tìm thấy chuyến bay phù hợp</p>
                                <AirplanemodeInactiveOutlinedIcon className="air-plane-miss-icon" />
                            </div>
                        )
                    ) : (
                        <div className="loading-icons">
                            <Loading />
                        </div>
                    )
                }
            </div>
        </Grid>
    </Grid>
    )
}