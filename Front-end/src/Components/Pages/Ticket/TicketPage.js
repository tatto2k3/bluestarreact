import React, { useState } from 'react';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import "./TicketPage.css";
import { useSearch } from '../../CustomHooks/SearchContext';
export default function TicketPage() {
    const [searchResult, setSearchResult, isLoading, setIsLoading, searchInfo,
        setSearchInfo, tripType, setTripType, airport, setAirport, departFlight, setDepartFlight, ariveFlight, setArriveFlight,
        total1, setTotal1, foodItems1, setFoodItems1, total2, setTotal2,
        foodItems2, setFoodItems2, addFoodItem1, calculateTotal1, addFoodItem2, calculateTotal2, passengerInfo,
        setPassengerInfo, seatId, setSeatId, luggaeId, setLuggageId] = useSearch();
    const handleInputChange = (fieldName, value) => {

        const updatedPassengerInfo = { ...passengerInfo, [fieldName]: value };
        setPassengerInfo(updatedPassengerInfo);
    };
    console.log(passengerInfo);
    return (
        <Paper className="ticket-wrapper">
            
            <div className="ticket-body">
                <Grid container spacing={2}>

                    <Grid item md={6}>
                        <div className="ticket-input-wrapper">
                            <label className="ticket-label">Tên họ</label>
                            <input className="ticket-input" placeholder="Tên họ" value={passengerInfo.FirstName}
                                onChange={(e) => handleInputChange('FirstName', e.target.value)}></input>
                        </div>
                        <div className="ticket-input-wrapper">
                            <label className="ticket-label">Ngày sinh</label>
                            <input className="ticket-input" placeholder="Ngày sinh" value={passengerInfo.DateOfBirth}
                                onChange={(e) => handleInputChange('DateOfBirth', e.target.value)}></input>
                        </div>
                        <div className="ticket-input-wrapper">
                            <label className="ticket-label">Quốc gia</label>
                            <input className="ticket-input" placeholder="Quốc gia" value={passengerInfo.Country}
                                onChange={(e) => handleInputChange('Country', e.target.value)}></input>
                        </div>
                        <div className="ticket-input-wrapper">
                            <label className="ticket-label">Liên hệ</label>
                            <input className="ticket-input" placeholder="Liên hệ" value={passengerInfo.Contact}
                                onChange={(e) => handleInputChange('Contact', e.target.value)}></input>
                        </div>
                        <div className="ticket-input-wrapper">
                            <label className="ticket-label">Khuyến mãi</label>
                            <input className="ticket-input" placeholder="Khuyến mãi" value={passengerInfo.Discount}
                                onChange={(e) => handleInputChange('Discount', e.target.value)}></input>
                        </div>
                    </Grid>

                    <Grid item md={6}>
                        <div className="ticket-input-wrapper">
                            <label className="ticket-label">Tên đệm và tên</label>
                            <input className="ticket-input" placeholder="Tên đệm và tên" value={passengerInfo.LastName}
                                onChange={(e) => handleInputChange('LastName', e.target.value)}></input>
                        </div>
                        <div className="ticket-input-wrapper">
                            <label className="ticket-label">CCCD</label>
                            <input className="ticket-input" placeholder="CCCD" value={passengerInfo.PassportNumber}
                                onChange={(e) => handleInputChange('PassportNumber', e.target.value)}></input>
                        </div>
                        <div className="ticket-input-wrapper">
                            <label className="ticket-label">Thành phố</label>
                            <input className="ticket-input" placeholder="City" value={passengerInfo.City}
                                onChange={(e) => handleInputChange('City', e.target.value)}></input>
                        </div>
                        <div className="ticket-input-wrapper">
                            <label className="ticket-label">Email</label>
                            <input className="ticket-input" placeholder="Email" value={passengerInfo.Email}
                                onChange={(e) => handleInputChange('Email', e.target.value)}></input>
                        </div>

                    </Grid>
                </Grid>

            </div>

        </Paper>
    )
}