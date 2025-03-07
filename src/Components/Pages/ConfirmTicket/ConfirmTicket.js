import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useLocation, useNavigate } from 'react-router-dom';
import "./ConfirmTicket.css";
import axios from "axios";
import { useSearch } from '../../CustomHooks/SearchContext';
import flyImg from '../../../assets/fly.png';
import logo2 from '../../../assets/logo2.PNG'

export default function ConfirmTicket() {
    const navigate = useNavigate();
    const location = useLocation();

    const [passengerList, setPassengerList] = useState([]);
    const [departFlight, setDepartFlight] = useState([]);

    useEffect(() => {
        const savedDepartureflight = localStorage.getItem("departFlight");
        if (savedDepartureflight) {
            const departFlight = JSON.parse(savedDepartureflight);
            setDepartFlight(departFlight);
        }
        const savedPassengerList = localStorage.getItem("passengerList");
        if (savedPassengerList) {
            const parsedPassengerList = JSON.parse(savedPassengerList);
            setPassengerList(parsedPassengerList);
        }
    }, []);

    console.log("PassengerList", passengerList);

    return (
        <div className='overflow-confirm-ticket'>
            {passengerList.map((passenger, index) => (
                <div key={index} className="container mt-4 containerHeight" style={{ width: '120%' }}>
                    <div className="row">
                        <div className="col-md-10">
                            <div className="card">
                                <div className="card-header text-white">
                                    <h3 className="mb-0">Thông tin vé máy bay</h3>
                                </div>
                                <div className="card-body">
                                    <div className="row">
                                        <div className="col-md-3 column-with-border">
                                            <div className="form-group">
                                                <label>Ngày khởi hành:</label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    value={departFlight.departureDay || ''}
                                                    readOnly
                                                />
                                            </div>
                                            <div className="form-group row-with-border">
                                                <label>Giờ khởi hành:</label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    value={departFlight.departureTime || ''}
                                                    readOnly
                                                />
                                            </div>
                                            <div className="form-group">
                                                <label>Mã chỗ ngồi:</label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    value={passenger.SeatId || ''}
                                                    readOnly
                                                />
                                            </div>
                                        </div>
                                        <div className="col-md-3 column-with-border">
                                            <div className="form-group">
                                                <label>Ngày đến:</label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    value={departFlight.departureDay || ''}
                                                    readOnly
                                                />
                                            </div>
                                            <div className="form-group row-with-border">
                                                <label>Giờ đến:</label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    value={departFlight.arrivalTime || ''}
                                                    readOnly
                                                />
                                            </div>
                                            <div className="form-group">
                                                <label>Mã chuyến bay:</label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    value={departFlight.id || ''}
                                                    readOnly
                                                />
                                            </div>
                                        </div>
                                        <div className="col-md-2" style={{ padding: "0" }}>
                                            <img src={logo2} alt="" className="img-logo2-confirm-ticket logo-rotate" />
                                            <img src={flyImg} alt="" className="img-flight-confirm-ticket" />
                                        </div>
                                        <div className="col-md-3">
                                            <div className="form-group">
                                                <label>Họ và tên:</label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    value={`${passenger.FirstName || ''} ${passenger.LastName || ''}`.trim()}
                                                    readOnly
                                                />
                                            </div>
                                            <div className="form-group">
                                                <label>CCCD:</label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    value={passenger.PassportNumber || ''}
                                                    readOnly
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}