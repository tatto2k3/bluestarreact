import React, { useState } from 'react';
import { useRef, useEffect } from "react";
import './ExploreFlight.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSortDown } from "@fortawesome/free-solid-svg-icons";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { useSearch } from '../../CustomHooks/SearchContext';
import Booking from '../../Layouts/BKP/Booking';
import axios from "axios";
import { useLocation } from 'react-router-dom';
import CustomCalendar from '../../Layouts/BKP/Calendar/CustomCalendar';
import Country from '../../Layouts/BKP/Country/Country';


export default function ExploreFlight() {
    const [isOpen, setIsOpen] = useState(false);

    const [flights, setFlights] = useState([]);

    // const flights = [
    //     {
    //         image: "https://bamboo.useleadr.com/uploads/medium_SGN_resize_45ce3292ab.jpg",
    //         route: "Tp. Hồ Chí Minh (SGN) → Bangkok (DMK)",
    //         date: "06/03/2025",
    //         price: "1,663,000",
    //     },
    //     {
    //         image: "https://bamboo.useleadr.com/uploads/medium_SGN_resize_45ce3292ab.jpg",
    //         route: "Hà Nội (HAN) → Tp. Hồ Chí Minh (SGN)",
    //         date: "06/03/2025",
    //         price: "1,663,000",
    //     },
    //     {
    //         image: "https://bamboo.useleadr.com/uploads/medium_SGN_resize_45ce3292ab.jpg",
    //         route: "Hà Nội (HAN) → Tp. Hồ Chí Minh (SGN)",
    //         date: "06/03/2025",
    //         price: "1,663,000",
    //     },

    //     {
    //         image: "https://bamboo.useleadr.com/uploads/medium_SGN_resize_45ce3292ab.jpg",
    //         route: "Hà Nội (HAN) → Tp. Hồ Chí Minh (SGN)",
    //         date: "06/03/2025",
    //         price: "1,663,000",
    //     },

    //     {
    //         image: "https://bamboo.useleadr.com/uploads/medium_SGN_resize_45ce3292ab.jpg",
    //         route: "Hà Nội (HAN) → Tp. Hồ Chí Minh (SGN)",
    //         date: "06/03/2025",
    //         price: "1,663,000",
    //     },

    //     {
    //         image: "https://bamboo.useleadr.com/uploads/medium_SGN_resize_45ce3292ab.jpg",
    //         route: "Hà Nội (HAN) → Tp. Hồ Chí Minh (SGN)",
    //         date: "06/03/2025",
    //         price: "1,663,000",
    //     },

    //     {
    //         image: "https://bamboo.useleadr.com/uploads/medium_SGN_resize_45ce3292ab.jpg",
    //         route: "Hà Nội (HAN) → Tp. Hồ Chí Minh (SGN)",
    //         date: "06/03/2025",
    //         price: "1,663,000",
    //     },

    //     {
    //         image: "https://bamboo.useleadr.com/uploads/medium_SGN_resize_45ce3292ab.jpg",
    //         route: "Hà Nội (HAN) → Tp. Hồ Chí Minh (SGN)",
    //         date: "06/03/2025",
    //         price: "1,663,000",
    //     },

    //     {
    //         image: "https://bamboo.useleadr.com/uploads/medium_SGN_resize_45ce3292ab.jpg",
    //         route: "Hà Nội (HAN) → Tp. Hồ Chí Minh (SGN)",
    //         date: "06/03/2025",
    //         price: "1,663,000",
    //     },

    //     {
    //         image: "https://bamboo.useleadr.com/uploads/medium_SGN_resize_45ce3292ab.jpg",
    //         route: "Hà Nội (HAN) → Tp. Hồ Chí Minh (SGN)",
    //         date: "06/03/2025",
    //         price: "1,663,000",
    //     },
    // ];

    const [visibleCount, setVisibleCount] = useState(8);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const [isModalVisible, setIsModalVisible] = useState(false);

    const showAllFlights = () => setVisibleCount(flights.length);

    const openModal = () => {
        setIsModalVisible(true);
        setTimeout(() => setIsModalOpen(true), 300);
    };

    const closeModal = () => {
        setIsModalVisible(false);
        setTimeout(() => setIsModalOpen(false), 300);
    };

    const [countries, setCountries] = useState([]);
    const [selectedTab, setSelectedTab] = useState("booking");
    const [isOpenCountry, setIsOpenCountry] = useState(false);
    const [CountryClass, setCountryClass] = useState("");
    const [searchResult, setSearchResult, isLoading, setIsLoading, searchInfo, setSearchInfo, tripType, setTripType, airport, setAirport] = useSearch();
    const countryElement = useRef()

    const handleTabChange = (tab) => {
        setSelectedTab(tab);
    };

    const GetAllFlights = async () => {
        try {
            const response = await axios.get("https://bluestarbackend.vercel.app/api/flight/getExploreFlights");
            setFlights(response.data);
            console.log(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        GetAllFlights();
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




    return (
        <>
            <div className='explore-flight'>
                <p className='explore-flight-title'>
                    Khám Phá Các Chuyến Bay Phổ Biến Nhất Của Chúng Tôi
                </p>
            </div>
            <div className='button-filter'>
                <button
                    type="button"
                    id="route-selector"
                    aria-label="Chọn tuyến đường"
                    aria-haspopup="true"
                    aria-expanded={isOpen}
                    className="btn-route"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    <span className="btn-text">Chọn tuyến đường</span>
                    <div aria-hidden="true" className="icon-container">
                        <FontAwesomeIcon icon={faSortDown} />
                    </div>
                </button>

                <button
                    type="button"
                    id="budget-selector"
                    aria-label="Ngân sách"
                    aria-haspopup="true"
                    aria-expanded={isOpen}
                    className="btn-budget btn-route"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    <span className="btn-text">Ngân sách</span>
                    <div aria-hidden="true" className="icon-container">
                        <FontAwesomeIcon icon={faSortDown} />
                    </div>
                </button>

                <div className="btn-delete">
                    <p className='btn-delete-title'>XÓA</p>
                </div>
            </div>
            <div className='section-flights'>
                <div className='section-flights-list'>
                    {flights.slice(0, visibleCount).map((flight, index) => (
                        <div key={index} className="flight-card">
                            <img src={flight.to_airport.img} alt="Flight" className="flight-image" />
                            <div className="flight-content">
                                <h2 className="flight-route">{flight.from_airport.place} ({flight.from_airport.id})</h2>
                                <h2 className="flight-route">đến {flight.to_airport.place} ({flight.to_airport.id})</h2>
                                <p className="flight-date">Ngày đi: {flight.departureDay}</p>
                                <div className="flight-price-info">
                                    <span className="flight-price-label">chỉ từ </span>
                                    <span className="popular-flights-price-info">(VND)</span>
                                </div>
                                <div className="footer-card">
                                    <div className="flight-price-info">
                                        <p className="flight-price">
                                            {flight.originalPrice ? Number(flight.originalPrice).toLocaleString() : "N/A"}
                                        </p>
                                        <p className="flight-type">Một chiều</p>
                                    </div>
                                    <div className="booking-now" onClick={openModal}>
                                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M10.0007 3.33325L8.82565 4.50825L13.4757 9.16658H3.33398V10.8333H13.4757L8.82565 15.4916L10.0007 16.6666L16.6673 9.99992L10.0007 3.33325Z" fill="#00558F"></path>
                                        </svg>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                {visibleCount < flights.length && (
                    <button className="btn-show-more" onClick={showAllFlights}>Xem thêm</button>
                )}

                {isModalVisible && (
                    <div className={`modal ${isModalOpen ? "visible" : ""}`}>
                        <div className="modal-content">
                            <span className="close" onClick={closeModal}>&times;</span>
                            <div className='modal-search-flight-title'>
                                <p className='modal-search-flight-title-text'>Tìm chuyến bay</p>
                            </div>
                            <div className="booking-checkbox-wrapper" style={{ marginTop: "20px" }}>
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
                                <div className="booking-body-details">
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
                                    </div>
                                    <div className="booking-location d-flex border-booking" style={{ marginTop: "20px" }}>
                                        <div className="booking-location-time" ref={tripTimeDepartElement}>
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
                                    <div class="search-flight-submit d-flex justify-content-center align-items-end" id="search-flight-submit-btn">
                                        <input class="btn-xl w-100 btn-search-flight-modal" id="search-flight-submit-input" type="submit" value="Tìm chuyến bay" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </>
    )
}