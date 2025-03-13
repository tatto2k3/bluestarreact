import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import './TicketReview.css';
import { jsPDF } from 'jspdf';
import { autoTable } from 'jspdf-autotable';
import { useSearch } from "../../CustomHooks/SearchContext";
import Loading from '../../LoadingAnimation/Loading';

const TicketReview = () => {
    const { ticketCode, fullName } = useParams();
    const [isLoading, setIsLoading] = useSearch();
    const [ticketReviewDetails, setTicketReviewDetails] = useState({
        departureDay: '',
        departureTime: '',
        arrivalTime: '',
        seatId: '',
        flyId: '',
        name: '',
        cccd: ''
    });

    async function fetchTicketDetails() {
        if (!ticketCode || !fullName) {
            alert("Vui lòng nhập đầy đủ thông tin!");
            return;
        }
        setIsLoading(true);
        try {
            const response = await fetch(`https://bluestarbackend.vercel.app/api/api/ticket/getTicketDetailsById/${ticketCode}/${fullName}`);
            const data = await response.json();

            if (!response.ok) {
                alert("Không tìm thấy vé, vui lòng kiểm tra lại!");
                return;
            }

            setTicketReviewDetails(prevState => ({
                ...prevState,
                seatId: data.seat_id || "",
                flyId: data.fly_id || "",
                name: data.name || "",
                cccd: data.cccd || "",
            }));

            await fetchFlightDetails(data.fly_id);

        } catch (error) {
            console.error("Lỗi khi tìm kiếm vé:", error);
            alert("Đã xảy ra lỗi, vui lòng thử lại sau!");
        }
        setIsLoading(false);
    }

    async function fetchFlightDetails(flyId) {
        setIsLoading(true);
        try {
            const response = await fetch(`https://bluestarbackend.vercel.app/api/api/flight/${flyId}`, {
                method: "GET",
                headers: { "Content-Type": "application/json" },
            });

            if (!response.ok) {
                throw new Error("Lỗi khi lấy thông tin chuyến bay");
            }

            const flightData = await response.json();
            console.log("Thông tin chuyến bay:", flightData);

            setTicketReviewDetails(prevState => ({
                ...prevState,
                departureDay: flightData.departureDay || "",
                departureTime: flightData.departureTime || "",
                arrivalTime: flightData.arrivalTime || "",
            }));
        } catch (error) {
            console.error("Lỗi khi gọi API:", error);
        }
        setIsLoading(false);
    }

    useEffect(() => {
        fetchTicketDetails();
    }, [ticketCode, fullName]);

    const handleDownload = () => {
        console.log(ticketReviewDetails);
        const doc = new jsPDF();
        doc.setFont("times");
        doc.text("Bluestar Airlines", 10, 10);

        const tableColumn = ["Information", "Value"];
        const tableRows = [
            ["Departure Day", ticketReviewDetails.departureDay],
            ["Departure Time", ticketReviewDetails.departureTime],
            ["ArriveTime", ticketReviewDetails.arrivalTime],
            ["Seat Code", ticketReviewDetails.seatId],
            ["Flight Code", ticketReviewDetails.flyId],
            ["Fullname", ticketReviewDetails.name],
            ["ID", ticketReviewDetails.cccd],
        ];

        autoTable(doc, {
            head: [tableColumn],
            body: tableRows,
            startY: 20,
        });

        doc.save("ticket.pdf");
    };


    return (
        !isLoading ? (
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
                                                Tải vé PDF
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        ) : (
            <div className="loading-icons">
                <Loading />
            </div>
        )
    );
};

export default TicketReview;
