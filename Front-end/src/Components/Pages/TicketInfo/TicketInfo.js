import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './TicketInfo.css'; 


const TicketInfo = () => {
    return (
        <div className="container mt-4">
            <div className="row justify-content-center">
                <div className="col-md-10">
                    <div className="card">
                        <div className="card-header text-white">
                            <h3 className="mb-0">Thông tin vé máy bay</h3>
                        </div>
                        <div className="card-body">
                            <div className="row">
                                <div className="col-md-3 column-with-border">
                                    <div className="form-group">
                                        <label htmlFor="departureDate">Ngày khởi hành:</label>
                                        <input type="text" className="form-control" id="departureDate" value="25/10/2023" readOnly />
                                    </div>
                                    <div className="form-group row-with-border">
                                        <label htmlFor="fullName">Giờ khởi hành:</label>
                                        <input type="text" className="form-control" id="departureTime" value="12:00 AM" readOnly />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="seatNumber">Mã chỗ ngồi:</label>
                                        <input type="text" className="form-control" id="seatNumber" value="25A" readOnly />
                                    </div>
                                </div>
                                <div className="col-md-3 column-with-border">
                                    <div className="form-group">
                                        <label htmlFor="arrivalDate">Ngày đến:</label>
                                        <input type="text" className="form-control" id="arrivalDate" value="27/10/2023" readOnly />
                                    </div>
                                    <div className="form-group row-with-border">
                                        <label htmlFor="cccd">Giờ đến:</label>
                                        <input type="text" className="form-control" id="arrivalTime" value="12:00 PM" readOnly />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="flightCode">Mã máy bay:</label>
                                        <input type="text" className="form-control" id="flightCode" value="ABC123" readOnly />
                                    </div>
                                </div>
                                <div className="col-md-2">
                                    <img src="icon_flight.png" alt="" className="img-flight" />
                                </div>
                                <div className="col-md-3">
                                    <div className="form-group">
                                        <label htmlFor="departureTime">Họ và tên:</label>
                                        <input type="text" className="form-control" id="fullName" value="Nguyễn Văn Suy" readOnly />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="arrivalTime">CCCD:</label>
                                        <input type="text" className="form-control" id="cccd" value="123456789" readOnly />
                                    </div>
                                    <div className="button-card">
                                        <button type="button" className="btn btn-outline-dark btn-block">Xem thêm</button>
                                        <button type="button" className="btn btn-outline-primary btn-block">Home</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TicketInfo;