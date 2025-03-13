import React, { useState } from 'react';
import { useRef, useEffect } from "react";
import './ExploreFlight.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSortDown } from "@fortawesome/free-solid-svg-icons";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import Booking from '../../Layouts/BKP/Booking';
import axios from "axios";
import { useLocation } from 'react-router-dom';
import CustomCalendar from '../../Layouts/BKP/Calendar/CustomCalendar';
import Country from '../../Layouts/BKP/Country/Country';
import { faCircleQuestion } from "@fortawesome/free-regular-svg-icons";
import { useSearch } from '../../CustomHooks/SearchContext';
import { useNavigate } from 'react-router-dom';
import Loading from '../../LoadingAnimation/Loading';


export default function ExploreFlight() {
    const [isLoading, setIsLoading, tripType, setTripType, departFlight, setDepartFlight] = useSearch();
    const [isOpen, setIsOpen] = useState(false);

    const [flights, setFlights] = useState([]);

    const [visibleCount, setVisibleCount] = useState(8);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const [isModalVisible, setIsModalVisible] = useState(false);

    const showAllFlights = () => setVisibleCount(flights.length);
    const [selectedFlight, setSelectedFlight] = useState(null);

    const openModal = (flight) => {
        setSelectedFlight(flight);
    };

    useEffect(() => {
        if (selectedFlight) {
            console.log("Updated selectedFlight:", selectedFlight);
            setIsModalVisible(true);
            setTimeout(() => setIsModalOpen(true), 300);
        }
    }, [selectedFlight]);

    const closeModal = () => {
        setIsModalOpen(false);
        setTimeout(() => {
            setIsModalVisible(false);
            setSelectedFlight(null);
        }, 300);
    };

    const GetAllFlights = async () => {
        setIsLoading(true);
        try {
            const response = await axios.get("http://localhost:8000/api/flight/getExploreFlights");
            setFlights(response.data);
        } catch (error) {
            console.log("Lỗi khi tải dữ liệu:", error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        GetAllFlights();
    }, []);


    const handleTripTypeChange = (event) => {
        setTripType(event.target.value);
    };

    const [showPassenger, setShowPassenger] = useState(false);
    const [adults, setAdults] = useState(1);
    const [children, setChildren] = useState(0);
    const passengerRef = useRef(null);

    const handleChange = (type, operation) => {
        if (type === "adults") {
            setAdults((prev) => Math.max(1, operation === "increase" ? prev + 1 : prev - 1));
        } else if (type === "children") {
            setChildren((prev) => Math.max(0, operation === "increase" ? prev + 1 : prev - 1));
        }
    };


    useEffect(() => {
        const handleClickOutside = (event) => {
            if (passengerRef.current && !passengerRef.current.contains(event.target)) {
                setShowPassenger(false);
            }
        };

        if (showPassenger) {
            document.addEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [showPassenger]);

    const navigate = useNavigate();
    const handleModalSubmit = () => {
        setDepartFlight(selectedFlight);
        localStorage.setItem('departFlight', JSON.stringify(selectedFlight));
        navigate("/ticket");
        localStorage.setItem("numberTickets", adults + children);
    }

    return (
        <>
            <div className='explore-flight'>
                <p className='explore-flight-title'>
                    Khám Phá Các Chuyến Bay Phổ Biến Nhất Của Chúng Tôi
                </p>
            </div>
            <div className='section-flights'>
                {isLoading ? (
                    <div className="loading-icons">
                        <Loading />
                    </div>
                ) : (
                    <div className="section-flights-list">
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
                                        <div className="booking-now" onClick={() => openModal(flight)}>
                                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M10.0007 3.33325L8.82565 4.50825L13.4757 9.16658H3.33398V10.8333H13.4757L8.82565 15.4916L10.0007 16.6666L16.6673 9.99992L10.0007 3.33325Z" fill="#00558F"></path>
                                            </svg>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
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
                                            <label className={selectedFlight.from_airport.place ? "Up booking-body-text-color" : "notUp booking-body-text-color"}>
                                                Nơi đi
                                            </label>
                                            <div className="input-main" >
                                                <input type="text"
                                                    value={selectedFlight.from_airport.place ?? ''}
                                                ></input>
                                                <span className={`airport-name-day booking-body-text-color`} style={{ textAlign: "left", fontSize: "15px" }}>
                                                    {selectedFlight.from_airport.name ?? ''}
                                                </span>
                                            </div>
                                        </div>
                                        <div className="booking-location-time booking-border-left" >
                                            <label className={selectedFlight.to_airport.place ? "Up booking-body-text-color" : "notUp booking-body-text-color"}>
                                                Nơi đến
                                            </label>
                                            <div className="input-main" >
                                                <input type="text"
                                                    value={selectedFlight.to_airport.place ?? ''}
                                                ></input>
                                                <span className={`airport-name-day booking-body-text-color`} style={{ textAlign: "left", fontSize: "15px" }}>
                                                    {selectedFlight.from_airport.name ?? ''}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="booking-location d-flex border-booking" style={{ marginTop: "20px" }}>
                                        <div className="booking-location-time" >
                                            <label className={selectedFlight.departureDay ? "Up booking-body-text-color" : "notUp booking-body-text-color "}>
                                                Ngày đi
                                            </label>
                                            <div className="input-main">
                                                <input type="text"
                                                    value={selectedFlight.departureDay ?? ''}
                                                >
                                                </input>
                                            </div>
                                        </div>
                                        {/* {
                                            tripType === "roundTrip" &&
                                            (<div className="booking-location-time booking-border-left-half">
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
                                        } */}

                                        {/*passenger*/}
                                        <div className="booking-location-time booking-border-left-half cursor-pointer"
                                            onClick={() => setShowPassenger(!showPassenger)}
                                        >
                                            <label className="Up booking-body-text-color">Hành Khách</label>
                                            <div className="input-main">
                                                <input
                                                    type="text"
                                                    value={`${adults} Người lớn, ${children} Trẻ em`}
                                                    readOnly
                                                />
                                            </div>
                                        </div>
                                        {showPassenger && (
                                            <div ref={passengerRef} className="passenger-div" style={{ top: '300px' }}>
                                                <div className="passenger-card">
                                                    <span>Người lớn</span>
                                                    <div className="mt-2 passenger-count">
                                                        <button className="border px-2" onClick={() => handleChange("adults", "decrease")}>-</button>
                                                        <span>{adults}</span>
                                                        <button className="border px-2" onClick={() => handleChange("adults", "increase")}>+</button>
                                                    </div>
                                                </div>
                                                <div className="mt-2 passenger-card">
                                                    <span className="tooltip-container">
                                                        Trẻ em
                                                        <FontAwesomeIcon icon={faCircleQuestion} className="ml-1" />
                                                        <span className="tooltip-text">Dưới 11 tuổi</span>
                                                    </span>

                                                    <div className="passenger-count">
                                                        <button className="border px-2" onClick={() => handleChange("children", "decrease")}>-</button>
                                                        <span>{children}</span>
                                                        <button className="border px-2" onClick={() => handleChange("children", "increase")}>+</button>
                                                    </div>
                                                </div>
                                            </div>
                                        )}

                                    </div>
                                    <div class="search-flight-submit d-flex justify-content-center align-items-end" id="search-flight-submit-btn" onClick={() => handleModalSubmit()}>
                                        <input class="btn-xl w-100 btn-search-flight-modal" id="search-flight-submit-input" type="submit" value="Xác nhận" />
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