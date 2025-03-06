import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useLocation , useNavigate} from 'react-router-dom';
import './TicketReview.css';
import jsPDF from 'jspdf';

const TicketReview = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [ticketReviewDetails, setTicketReviewDetails] = useState({
        departureDay: '',
        departureTime: '',
        arrivalTime: '',
        seatId: '',
        flyId: '',
        name: '',
        cccd: ''
    });

    useEffect(() => {
        const selectedCustomerInfo = location.state?.selectedCustomerInfo || [];

        console.log("Selected customer info in useEffect:", selectedCustomerInfo[0].departureDay);

        // Lắng nghe sự thay đổi của selectedCustomerInfo và cập nhật state
            setTicketReviewDetails({
                departureDay: selectedCustomerInfo[0].departureDay || '',
                departureTime: selectedCustomerInfo[0].departureTime || '',
                arrivalTime: selectedCustomerInfo[0].arrivalTime || '',
                seatId: selectedCustomerInfo[0].Seat_ID || '',
                flyId: selectedCustomerInfo[0].Fly_ID || '',
                name: selectedCustomerInfo[0].Name || '',
                cccd: selectedCustomerInfo[0].CCCD || ''
            });
        
        console.log("setTicketReviewDetails:", ticketReviewDetails);
    }, [location.state?.selectedCustomerInfo]);

    const handleDownload = () => {
        navigate("/");
    };

    return (
        <div className="container mt-4 containerHeight">
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
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="departureDate"
                                            value={ticketReviewDetails.departureDay}
                                            readOnly
                                        />
                                    </div>
                                    <div className="form-group row-with-border">
                                        <label htmlFor="fullName">Giờ khởi hành:</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="departureTime"
                                            value={ticketReviewDetails.departureTime}
                                            readOnly
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="seatNumber">Mã chỗ ngồi:</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="seatNumber"
                                            value={ticketReviewDetails.seatId}
                                            readOnly
                                        />
                                    </div>
                                </div>
                                <div className="col-md-3 column-with-border">
                                    <div className="form-group">
                                        <label htmlFor="arrivalDate">Ngày đến:</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="arrivalDate"
                                            value={ticketReviewDetails.departureDay}
                                            readOnly
                                        />
                                    </div>
                                    <div className="form-group row-with-border">
                                        <label htmlFor="cccd">Giờ đến:</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="arrivalTime"
                                            value={ticketReviewDetails.arrivalTime}
                                            readOnly
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="flightCode">Mã chuyến bay:</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="flightCode"
                                            value={ticketReviewDetails.flyId}
                                            readOnly
                                        />
                                    </div>
                                </div>
                                <div className="col-md-2">
                                    <img src="/Images/Plane.png" alt="" className="img-flight" />
                                </div>
                                <div className="col-md-3">
                                    <div className="form-group">
                                        <label htmlFor="fullName">Họ và tên:</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="fullName"
                                            value={ticketReviewDetails.name}
                                            readOnly
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="cccd">CCCD:</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="cccd"
                                            value={ticketReviewDetails.cccd}
                                            readOnly
                                        />
                                    </div>
                                    <div className="button-card">

                                        <button type="button" className="btn btn-outline-primary btn-block" onClick={handleDownload}>
                                            Trang chủ
                                        </button>
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

export default TicketReview;
