import React, { useState, useEffect } from 'react';
import Grid from '@mui/material/Grid';
import "./Payment.css";
import axios from "axios";
import { useSearch } from '../../CustomHooks/SearchContext';
export default function Payment() {
    const [searchResult, setSearchResult, isLoading, setIsLoading, searchInfo,
        setSearchInfo, tripType, setTripType, airport, setAirport, departFlight, setDepartFlight, ariveFlight, setArriveFlight,
        total1, setTotal1, foodItems1, setFoodItems1, total2, setTotal2,
        foodItems2, setFoodItems2, addFoodItem1, calculateTotal1, addFoodItem2, calculateTotal2, passengerInfo,
        setPassengerInfo, seatId, setSeatId, luggaeId, setLuggageId] = useSearch();
    const [discountPercent, setDiscountPercent] = useState(0);
    console.log(passengerInfo)
    console.log(departFlight)
    console.log(ariveFlight)
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
    let amount = tripType == "oneWay" ? parseInt(total1 - (discountPercent / 100) * total1) : parseInt((total1 + total2) - (discountPercent / 100) * (total1 + total2));
    console.log(amount);
    const jsonData = {
        "ticket_amount": amount,
        "customer_name": `${passengerInfo.LastName}`,
        "customer_email": `${passengerInfo.Email}`,
        "customer_identify": `${passengerInfo.PassportNumber}`, 
        "seat_id": `${seatId}`,
        "flight_id": `${departFlight.flyID}`,
        "departure_day": `${departFlight.departureDay}`,
        "arrive_day": `${departFlight.departureDay}`,
        "departure_time": `${departFlight.departureTime}`,
        "arrive_time": `${departFlight.arrivalTime}`,
        "customer_phone": `${passengerInfo.Contact}`,
        "duration_time": `${formatTimeDuration(departFlight.departureTime, departFlight.arrivalTime)}`,
        "trip_type": `${tripType}`
    }

    const jsonDataComeback = {
        "ticket_amount": amount,
        "customer_name": `${passengerInfo.LastName}`,
        "customer_email": `${passengerInfo.Email}`,
        "customer_identify": `${passengerInfo.PassportNumber}`,
        "seat_id": `${seatId}`,
        "flight_id": `${ariveFlight.flyID}`,
        "departure_day": `${ariveFlight.departureDay}`,
        "arrive_day": `${ariveFlight.departureDay}`,
        "departure_time": `${ariveFlight.departureTime}`,
        "arrive_time": `${ariveFlight.arrivalTime}`,
        "customer_phone": `${passengerInfo.Contact}`,
        "duration_time": `${formatTimeDuration(ariveFlight.departureTime, ariveFlight.arrivalTime)}`,
        "trip_type": `${tripType}`
    }


    console.log("DataComeback:", jsonDataComeback);

    console.log("Data:", jsonData);
   
    return (
        <>
            <div className="payment-body">

                <div className="last-total-sumary">
                    <div className="last-total-sumary-total" >
                        Total Sumary :
                    </div>
                    <div className="last-total-sumary-value" >
                        {tripType == "oneWay" ? total1 : total1 + total2} VND
                    </div>
                </div>
                <div className="last-total-sumary">
                    <div className="last-total-sumary-total" >
                        Discount :
                    </div>
                    <div className="last-total-sumary-value" >
                        {discountPercent} <span>%</span>
                    </div>
                </div>
                <div className="last-total-sumary">
                    <div className="last-total-sumary-total" >
                        Payment :
                    </div>
                    <div className="last-total-sumary-value" >
                        {tripType == "oneWay" ? total1 - (discountPercent / 100) * total1 : (total1 + total2) - (discountPercent / 100) * (total1 + total2)}  VND
                    </div>
                </div>

                <div>
                    <button className="payment-zalopay"
                        onClick={() => {
                            axios.post("http://localhost:8000/api/onlineCheckout/check_out", jsonData, {
                                headers: {
                                    'Content-Type': 'application/json',
                                },
                            })
                                .then(response => {
                                    console.log('Response:', response.data.data);
                                    if (response.data.redirect_url) {
                                        if (tripType === 'oneTrip') {
                                            axios.post("http://localhost:8000/api/payment/handleCallback", jsonData, {
                                                headers: {
                                                    'Content-Type': 'application/json',
                                                },
                                            })
                                                .then(response => {
                                                    console.log("res:", response);
                                                })
                                                .catch(error => {
                                                    console.error('Error:', error);
                                                });
                                        } else {
                                            axios.post("http://localhost:8000/api/payment/handleCallback", jsonData, {
                                                headers: {
                                                    'Content-Type': 'application/json',
                                                },
                                            })
                                                .then(response => {
                                                    console.log("res:", response);
                                                })
                                                .catch(error => {
                                                    console.error('Error:', error);
                                                });

                                            axios.post("http://localhost:8000/api/payment/handleCallback", jsonDataComeback, {
                                                headers: {
                                                    'Content-Type': 'application/json',
                                                },
                                            })
                                                .then(response => {
                                                    console.log("res:", response);
                                                })
                                                .catch(error => {
                                                    console.error('Error:', error);
                                                });

                                        }
                                        window.location.href = response.data.redirect_url;
                                    }
                                })
                                .catch(error => {
                                    console.error('Error:', error);
                                });
                        }}
                    >
                        Payment with VN Pay
                    </button>
                </div>
            </div>

        </>
    )
}