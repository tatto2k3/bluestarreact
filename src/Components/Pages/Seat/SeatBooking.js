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
    const numberTickets = parseInt(localStorage.getItem("numberTickets")) || 1;

    useEffect(() => {
        axios.get("http://localhost:8000/api/seat/getAllSeats")
            .then(response => {
                setSeat(response.data);
            })
            .catch(error => {
                console.error("Error fetching data:", error);
            });
    }, []);

    const handleSeatSelection = (seatId) => {
        if (selectedSeats.includes(seatId)) {
            // Nếu ghế đã được chọn, bỏ chọn nó
            setSelectedSeats(selectedSeats.filter(id => id !== seatId));
        } else {
            // Chỉ thêm ghế mới nếu chưa đủ số lượng vé
            if (selectedSeats.length < numberTickets) {
                setSelectedSeats([...selectedSeats, seatId]);
            } else {
                alert(`Bạn chỉ có thể chọn tối đa ${numberTickets} ghế.`);
            }
        }
    };

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
            
            {/* Legend hướng dẫn màu sắc ghế */}
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
