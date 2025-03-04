﻿import React from 'react';
import { useState, useRef, useEffect } from "react";
import './Booking.css';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import { useLocation } from 'react-router-dom';
import CustomCalendar from './Calendar/CustomCalendar';
import axios from "axios";
import Country from './Country/Country';
import { useSearch } from '../../CustomHooks/SearchContext';
export default function Booking({ onSearch }) {
    const [countries, setCountries] = useState([]);
    const [selectedTab, setSelectedTab] = useState("booking");
    const [isOpenCountry, setIsOpenCountry] = useState(false);
    const [CountryClass, setCountryClass] = useState("");
    const [searchResult, setSearchResult, isLoading, setIsLoading, searchInfo, setSearchInfo, tripType, setTripType, airport, setAirport] = useSearch();
    const countryElement = useRef()

    const handleTabChange = (tab) => {
        setSelectedTab(tab);
    };

    const GetAllCountries = async () => {
        try {
            const response = await axios.get("http://localhost:8000/api/airport/getAirports");
            setCountries(response.data);
        } catch (error) {
            console.log(error);
        }
    };
    useEffect(() => {
        GetAllCountries();
    }, []);
    const [isFocusedGroup, setFocusedGroup] = useState({
        FromLocationIsFocused: false,
        ToLocationIsFocused: false,
        DepartTimeIsFocused: false,
        ComeBackTimeIsFocused: false
    })
    const [timelineClass, setTimelineClass] = useState("");
    const timeElement = useRef();
    const tripTimeDepartElement = useRef();
    const tripTimeDesElement = useRef();
    const departureElement = useRef();
    const destinationElement = useRef();
    const [isOpenTimeLine, setIsOpenTimeline] = useState(false);
    const location = useLocation();
    const pathname = location.pathname;
    const routeName = pathname.split('/').filter(Boolean)[0];
    const [isHidden, setisHidden] = useState({
        fromAirportIsHidden: "hiden",
        toAirportIsHidden: "hiden"
    })
    /* console.log(routeName);*/
    {/*Function thay đổi checkbox */ }
    const handleTripTypeChange = (event) => {
        setTripType(event.target.value);
    };
    const clickedOutside = (event) => {
        if (
            !timeElement.current?.contains(event.target) &&
            !tripTimeDepartElement.current?.contains(event.target) &&
            !tripTimeDesElement.current?.contains(event.target)
        ) {
            setIsOpenTimeline(false);
        }
    };
    const clickedOutsideCountry = (event) => {
        if (
            !countryElement.current?.contains(event.target) &&
            !departureElement.current?.contains(event.target) &&
            !destinationElement.current?.contains(event.target)
        ) {
            setIsOpenCountry(false);
        }
    };
    useEffect(() => {
        document.addEventListener("click", clickedOutside, true);
        document.addEventListener("click", clickedOutsideCountry, true);
        return () => {
            document.removeEventListener("click", clickedOutside, true);
            document.removeEventListener("click", clickedOutsideCountry, true);
        };
    });

    const formatDate = (dateString) => {
        const parts = dateString.split('-');
        if (parts.length === 3) {
            const year = parts[0];
            const month = parts[1].padStart(2, '0');
            const day = parts[2].padStart(2, '0');
            return `${year}-${month}-${day}`;
        }
        return dateString;
    };

    return (
        <div className="booking-wrapper">
            {
                (<>
                    {/*Booking header*/}
                    <div className="booking-header">
                        <div className={`buy-ticket ${selectedTab === "booking" ? "active" : ""}`} onClick={() => handleTabChange("booking")}>
                            <p className="buy-ticket-title">Đặt vé máy bay</p>
                        </div>
                        <div className={`check-in ${selectedTab === "checkIn" ? "active" : ""}`} onClick={() => handleTabChange("checkIn")}>
                            <p className="check-in-title">Làm thủ tục</p>
                        </div>
                        <div className={`my-booking ${selectedTab === "myBooking" ? "active" : ""}`} onClick={() => handleTabChange("myBooking")}>
                            <p className="my-booking-title">Đặt chỗ của tôi</p>
                        </div>
                    </div>
                    <div className="booking-body">
                        {selectedTab === "booking" && (
                            <>
                                <div className="booking-checkbox-wrapper">
                                    <div className="flight_one_way">
                                        <label className="option_label">
                                            <input
                                                type="radio"
                                                value="oneWay"
                                                checked={tripType === "oneWay"}
                                                onChange={handleTripTypeChange}
                                            />
                                            <span>Một chiều</span>
                                        </label>
                                    </div>
                                    {/*Round-trip-checkbox*/}
                                    <div className="flight_round-trip">
                                        <label className="option_label">
                                            <input
                                                type="radio"
                                                value="roundTrip"
                                                checked={tripType === "roundTrip"}
                                                onChange={handleTripTypeChange}
                                            />
                                            <span>Khứ hồi</span>
                                        </label>
                                    </div>
                                </div>
                                <div className="booking-body">
                                    <div className="booking-body-details d-flex">
                                        <div className="booking-location d-flex border-booking">
                                            <div className="booking-location-time">
                                                <label className={isFocusedGroup.FromLocationIsFocused || searchInfo.FromLocation !== "" ? "Up booking-body-text-color" : "notUp booking-body-text-color"}>
                                                    Nơi đi
                                                </label>
                                                <div className="input-main" ref={departureElement}>
                                                    <input type="text"
                                                        onFocus={() => {
                                                            setFocusedGroup({
                                                                ...isFocusedGroup, FromLocationIsFocused: true
                                                            })
                                                            setIsOpenCountry(true)
                                                            setCountryClass("list_countries");

                                                            console.log(isFocusedGroup)
                                                        }}
                                                        onBlur={() => {
                                                            setFocusedGroup({
                                                                ...isFocusedGroup, FromLocationIsFocused: false
                                                            })
                                                            console.log(isFocusedGroup)
                                                        }}
                                                        value={searchInfo.FromLocation}
                                                    ></input>
                                                    <h6 className={`airport-name-day booking-body-text-color ${isHidden.fromAirportIsHidden}`}>
                                                        {airport.fromAirport}
                                                    </h6>
                                                </div>
                                                {isOpenCountry && (
                                                    <div className={CountryClass} ref={countryElement}>
                                                        <div className="List_Countries_Wrapper">
                                                            <div className="Scroll_Custom">
                                                                <Country
                                                                    countries={countries}
                                                                    setSearchInfo={setSearchInfo}
                                                                    searchInfo={searchInfo}
                                                                    CountryClass={CountryClass}
                                                                    setIsOpenCountry={setIsOpenCountry}
                                                                    setAirport={setAirport}
                                                                    Airport={airport}
                                                                    isHidden={isHidden}
                                                                    setisHidden={setisHidden}
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                            <div className="booking-location-time booking-border-left" >
                                                <label className={isFocusedGroup.ToLocationIsFocused || searchInfo.ToLocation !== "" ? "Up booking-body-text-color" : "notUp booking-body-text-color"}>
                                                    Nơi đến
                                                </label>
                                                <div className="input-main" ref={destinationElement}>
                                                    <input type="text"
                                                        onFocus={() => {
                                                            setFocusedGroup({
                                                                ...isFocusedGroup, ToLocationIsFocused: true
                                                            })
                                                            setIsOpenCountry(true);
                                                            setCountryClass("list_countries right");

                                                        }}
                                                        onBlur={() => {
                                                            setFocusedGroup({
                                                                ...isFocusedGroup, ToLocationIsFocused: false
                                                            })

                                                        }}
                                                        value={searchInfo.ToLocation}
                                                    ></input>
                                                    <h6 className={`airport-name-day booking-body-text-color ${isHidden.toAirportIsHidden}`}>
                                                        {airport.toAirport}
                                                    </h6>
                                                </div>
                                            </div>
                                            <div className="booking-location-time booking-border-left" ref={tripTimeDepartElement}>
                                                <label className={isFocusedGroup.DepartTimeIsFocused || searchInfo.DepartTime !== "" ? "Up booking-body-text-color" : "notUp booking-body-text-color "}>
                                                    Ngày đi
                                                </label>
                                                <div className="input-main">
                                                    <input type="text"
                                                        onFocus={() => {
                                                            setFocusedGroup({ ...isFocusedGroup, DepartTimeIsFocused: true })
                                                            setIsOpenTimeline(true);
                                                            setTimelineClass("calendar_wrapper_up");
                                                        }}
                                                        onBlur={() => {
                                                            setFocusedGroup({ ...isFocusedGroup, DepartTimeIsFocused: false })
                                                        }}
                                                        value={searchInfo.DepartTime}
                                                    >
                                                    </input>
                                                    <h6 className="airport-name-day booking-body-text-color hiden">
                                                        Day
                                                    </h6>
                                                </div>
                                            </div>
                                            {
                                                tripType === "roundTrip" &&
                                                (<div className="booking-location-time booking-border-left-half" ref={tripTimeDesElement}>
                                                    <label className={isFocusedGroup.ComeBackTimeIsFocused || searchInfo.ComeBackTime !== "" ? "Up booking-body-text-color" : "notUp booking-body-text-color "}>
                                                        Ngày về
                                                    </label>
                                                    <div className="input-main">
                                                        <input type="text"
                                                            onFocus={() => {
                                                                setFocusedGroup({ ...isFocusedGroup, ComeBackTimeIsFocused: true })
                                                                setIsOpenTimeline(true);
                                                                setTimelineClass("calendar_wrapper_down");
                                                            }}
                                                            onBlur={() => {
                                                                setFocusedGroup({ ...isFocusedGroup, ComeBackTimeIsFocused: false })
                                                            }}
                                                            value={searchInfo.ComeBackTime}
                                                        >
                                                        </input>
                                                        <h6 className="airport-name-day booking-body-text-color hiden">
                                                            Day
                                                        </h6>
                                                    </div>

                                                </div>)
                                            }

                                            {/*passenger*/}
                                            <div className="booking-location-time booking-border-left-half">
                                                <label className="Up booking-body-text-color">
                                                    Hành Khách
                                                </label>
                                                <div className="input-main">
                                                    <input type="text" value="1"
                                                    />
                                                    <h6 className="airport-name-day booking-body-text-color hiden">
                                                        Hạng vé
                                                    </h6>
                                                </div>

                                            </div>
                                            {/*Calendar*/}
                                            <div ref={timeElement} className={timelineClass}>
                                                {isOpenTimeLine && (
                                                    <CustomCalendar
                                                        setIsOpenTimeline={setIsOpenTimeline}
                                                        timelineClass={timelineClass}
                                                        searchInfo={searchInfo}
                                                        setSearchInfo={setSearchInfo}
                                                    />
                                                )}
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </>
                        )}
                    </div>

                    <div className="button_container">
                        <Button variant="contained" size="large" startIcon={<SendIcon />} className="custom-button" onClick={() => {
                            setIsLoading(true);
                            console.log(searchInfo);

                            axios.get(`http://localhost:8000/api/flight/searchFlight?fromLocation=${searchInfo.FromLocationId}&toLocation=${searchInfo.ToLocationId}
                                &departureDay=${formatDate(searchInfo.DepartTime)}`)
                                .then(res => {
                                    setSearchResult(res.data);
                                    setIsLoading(false);
                                    if (onSearch) {
                                        onSearch(res.data); 
                                    }
                                })
                                .catch(error => {
                                    console.log(error);
                                    setIsLoading(false);
                                });
                        }}>
                            Tìm chuyến bay
                        </Button>
                    </div>
                </>)
            }

        </div >
    )
}