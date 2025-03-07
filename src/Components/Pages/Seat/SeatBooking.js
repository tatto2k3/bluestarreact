import React, { useState, useEffect } from "react";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import "./SeatBooking.css";
import axios from "axios";
import { useSearch } from "../../CustomHooks/SearchContext";

export default function SeatBooking() {
    const [searchResult, setSearchResult, isLoading, setIsLoading, searchInfo,
        setSearchInfo, tripType, setTripType, airport, setAirport, departFlight, setDepartFlight, ariveFlight, setArriveFlight,
        total1, setTotal1, foodItems1, setFoodItems1, total2, setTotal2,
        foodItems2, setFoodItems2, addFoodItem1, calculateTotal1, addFoodItem2, calculateTotal2, passengerInfo,
        setPassengerInfo, seatId, setSeatId, luggaeId, setLuggageId] = useSearch();

    const [seat, setSeat] = useState([]);
    const [selectedSeats, setSelectedSeats] = useState([]);
    const [activeButton, setActiveButton] = useState("Depart");
    const [currentStatus, setCurrentStatus] = useState("depart");

    // Lấy số lượng vé từ localStorage
    const [passengerList, setPassengerList] = useState([]);
    const [numberTickets, setNumberTickets] = useState(1);

    useEffect(() => {
        const savedNumberTickets = localStorage.getItem("numberTickets");
        if (savedNumberTickets) {
            setNumberTickets(parseInt(savedNumberTickets));
        }

        const savedPassengerList = localStorage.getItem("passengerList");
        if (savedPassengerList) {
            const parsedPassengerList = JSON.parse(savedPassengerList);
            setPassengerList(parsedPassengerList);

            const savedSeats = parsedPassengerList
                .map(passenger => passenger.SeatId)
                .filter(seatId => seatId);

            setSelectedSeats(savedSeats);
        }
    }, []);


    useEffect(() => {
        axios.get("http://localhost:8000/api/seat/getAllSeats")
            .then(response => {
                setSeat(response.data);
            })
            .catch(error => {
                console.error("Error fetching data:", error);
            });
    }, []);

    console.log("passengerLisst", passengerList);

    const handleSeatSelection = (seatId) => {
        let updatedSeats;

        if (selectedSeats.includes(seatId)) {
            updatedSeats = selectedSeats.filter(id => id !== seatId);
        } else {
            if (selectedSeats.length < numberTickets) {
                updatedSeats = [...selectedSeats, seatId];
            } else {
                alert(`Bạn chỉ có thể chọn tối đa ${numberTickets} ghế.`);
                return;
            }
        }

        setSelectedSeats(updatedSeats);

        const updatedPassengerList = passengerList.map((passenger, index) => ({
            ...passenger,
            SeatId: updatedSeats[index] || "",
        }));

        setPassengerList(updatedPassengerList);
    };

    useEffect(() => {
        localStorage.setItem("passengerList", JSON.stringify(passengerList));
    }, [passengerList]);


    const seatsPerColumn = 5;
    const totalColumns = Math.ceil(seat.length / seatsPerColumn);
    const seatColumns = Array.from({ length: totalColumns }, (_, colIndex) =>
        seat.slice(colIndex * seatsPerColumn, (colIndex + 1) * seatsPerColumn)
    );

    seatColumns.reverse();

    return (
        <Paper className="seat-paper">
            {tripType === "roundTrip" && (
                <div className="button_change">
                    <button
                        className={`custom-button-search depart-button ${activeButton === "Depart" ? "active-button" : ""}`}
                        onClick={() => {
                            setCurrentStatus("depart");
                            setActiveButton("Depart");
                        }}
                    >
                        Depart
                    </button>

                    <button
                        className={`custom-button-search arrive-button ${activeButton === "Arrive" ? "active-button" : ""}`}
                        onClick={() => {
                            setCurrentStatus("arrive");
                            setActiveButton("Arrive");
                        }}
                    >
                        Arrive
                    </button>
                </div>
            )}

            <div className="seat-legend">
                <div className="legend-item">
                    <div className="legend-box normal-seat"></div>
                    <span>Hạng phổ thông</span>
                </div>
                <div className="legend-item">
                    <div className="legend-box business-seat"></div>
                    <span>Hạng thương gia</span>
                </div>
                <div className="legend-item">
                    <div className="legend-box selected-seat"></div>
                    <span>Ghế đã chọn</span>
                </div>
            </div>

            <div className="plane-wrapper">
                <div className="plane-body">
                    <Grid container spacing={2}>
                        {seatColumns.map((column, colIndex) => (
                            <Grid item key={colIndex}>
                                {column.map((seat, index) => (
                                    <div
                                        key={index}
                                        className={`seat-item 
                                            ${selectedSeats.includes(seat.id) ? "selected-seat" : ""} 
                                            ${seat.seat_type === 1 ? "business-seat" : "normal-seat"}`}
                                        onClick={() => handleSeatSelection(seat.id)}
                                    >
                                        {seat.id}
                                    </div>
                                ))}
                            </Grid>
                        ))}
                    </Grid>
                </div>
                <div className="plane-head">
                    <img src="/Images/planeeeee.png" alt="Plane" />
                </div>
            </div>
        </Paper>
    );
}
