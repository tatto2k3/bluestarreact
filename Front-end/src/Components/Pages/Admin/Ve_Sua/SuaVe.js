import React, { useState, useEffect } from "react";
import './SuaVe.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import logo2 from '../../../../assets/logo2.PNG';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

const SuaVe = () => {
    const location = useLocation();
    const [selectedTicketInfo, setSelectedTicketInfo] = useState(location.state?.selectedTicketInfo || []);
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);

    useEffect(() => {
        console.log("Selected Ticket info in SuaKhachHang useEffect:", selectedTicketInfo);
        // Các thao tác khác với selectedTicketInfo
    }, [selectedTicketInfo]);

    const [ticketInfo, setTicketInfo] = useState({
        tId: '',
        cccd: '',
        name: '',
        flyId: '',
        kgId: '',
        seatId: '',
        foodId: '',
        ticketPrice: '',
        mail: '',
        disId: ''
    });

    useEffect(() => {
        if (selectedTicketInfo.length > 0) {
            // Nếu có thông tin khách hàng được chọn, cập nhật TicketInfo
            setTicketInfo({
                tId: selectedTicketInfo[0]?.T_ID || '',
                cccd: selectedTicketInfo[0]?.CCCD || '',
                name: selectedTicketInfo[0]?.Name || '',
                flyId: selectedTicketInfo[0]?.Fly_ID || '',
                kgId: selectedTicketInfo[0]?.Kg_ID || '',
                seatId: selectedTicketInfo[0]?.Seat_ID || '',
                foodId: selectedTicketInfo[0]?.Food_ID || '',
                ticketPrice: selectedTicketInfo[0]?.Ticket_Price || 0,
                mail: selectedTicketInfo[0]?.Mail || '',
                disId: selectedTicketInfo[0]?.Dis_ID || ''
            });
        }
    }, [selectedTicketInfo]);


    const handleChange = (e) => {
        const { id, value } = e.target;

        setTicketInfo({
            ...ticketInfo,
            [id]: value,
        });
    };


    // Phía máy khách - SuaKhachHang.js
    const handleSave = async function update(event) {
        event.preventDefault();
        try {

            if (!ticketInfo || !ticketInfo.tId) {
                alert("Vé không được tìm thấy");
                return;
            }

            const updatedData = {
                T_ID: ticketInfo.tId,
                CCCD: ticketInfo.cccd,
                Name: ticketInfo.name,
                Fly_ID: ticketInfo.flyId,
                Kg_ID: ticketInfo.kgId,
                Food_ID: ticketInfo.foodId,
                Seat_ID: ticketInfo.seatId,
                Mail: ticketInfo.mail,
                Ticket_Price: ticketInfo.ticketPrice,
                Dis_ID: ticketInfo.disId
            };


            if (!updatedData.T_ID) {
                alert("TId là bắt buộc");
                return;
            }

            // Sử dụng fetch để thực hiện yêu cầu PUT
            const response = await fetch('http://localhost:8000/api/ticket/updateTicket', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedData),
            });

            if (!response.ok) {
                // Xử lý lỗi
                const errorMessage = await response.text();
                throw new Error(JSON.stringify(errorMessage));
            }

            setShowSuccessMessage(true);
            setTimeout(() => setShowSuccessMessage(false), 3000);

        } catch (err) {
            // Xử lý lỗi
            alert(err.message);
        }
    };

    return (
        <div className="container-fluid">
             {showSuccessMessage && (
                <div className="alert alert-success mt-3" role="alert">
                    Sửa vé thành công!
                </div>
            )}
            <div className="logo-container">
                <div className="logo-inner">
                    <img src={logo2} alt="Logo" className="logo-img" />
                </div>
                <span className="Logo-name">Blue Star</span>
            </div>

            <div className="head-name">
                <h2>Sửa thông tin vé</h2>
            </div>

            <div className="infor-cn">
                <form className="form-signin-cn">
                    <div className="row mb-3">
                        <div className="col-4">
                            <label htmlFor="tId" className="form-label">Mã vé</label>
                            <input
                                type="text"
                                className="form-control"
                                id="tId"
                                placeholder="Mã vé"
                                value={ticketInfo.tId}
                                onChange={handleChange}
                                readOnly
                            />
                        </div>
                        <div className="col-4">
                            <label htmlFor="cccd" className="form-label">CCCD</label>
                            <input
                                type="number"
                                className="form-control"
                                id="cccd"
                                placeholder="Tên khách hàng"
                                value={ticketInfo.cccd}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="col-4">
                            <label htmlFor="name" className="form-label">Tên khách hàng</label>
                            <input
                                type="text"
                                className="form-control"
                                id="name"
                                placeholder="Tên khách hàng"
                                value={ticketInfo.name}
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                    <div className="row mb-3">
                        <div className="col-4">
                            <label htmlFor="flyId" className="form-label">Mã chuyến bay</label>
                            <input
                                type="text"
                                className="form-control"
                                id="flyId"
                                placeholder="Mã chuyến bay"
                                value={ticketInfo.flyId}
                                onChange={handleChange}
                                readOnly
                                
                            />
                        </div>
                        <div className="col-4">
                            <label htmlFor="kgId" className="form-label">Mã hành lý</label>
                            <input
                                type="text"
                                className="form-control"
                                id="kgId"
                                placeholder="Mã hành lý"
                                value={ticketInfo.kgId}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="col-4">
                            <label htmlFor="seatId" className="form-label">Mã chỗ ngồi</label>
                            <input
                                type="text"
                                className="form-control"
                                id="seatId"
                                placeholder="Mã chỗ ngồi"
                                value={ticketInfo.seatId}
                                onChange={handleChange}
                            />
                        </div>
                        
                    </div>
                    <div className="row mb-3">
                        <div className="col-6">
                            <label htmlFor="foodId" className="form-label">Mã thức ăn</label>
                            <input
                                type="text"
                                className="form-control"
                                id="foodId"
                                placeholder="Mã thức ăn"
                                value={ticketInfo.foodId}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="col-6">
                            <label htmlFor="ticketPrice" className="form-label">Giá vé</label>
                            <input
                                type="number"
                                className="form-control"
                                id="ticketPrice"
                                placeholder="Giá vé"
                                value={ticketInfo.ticketPrice}
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                    <div className="row mb-3">
                        <div className="col-6">
                            <label htmlFor="mail" className="form-label">Email</label>
                            <input
                                type="email"
                                className="form-control"
                                id="mail"
                                placeholder="Email"
                                value={ticketInfo.mail}
                                onChange={handleChange}
                                readOnly
                            />
                        </div>
                        <div className="col-6">
                            <label htmlFor="disId" className="form-label">Mã khuyến mãi</label>
                            <input
                                type="text"
                                className="form-control"
                                id="disId"
                                placeholder="Mã khuyến mãi"
                                value={ticketInfo.disId}
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                    <div className="d-flex justify-content-center mt-3">
                        <button type="button" className="btn btn-primary" onClick={handleSave}>Lưu</button>
                    </div>
                </form>
            </div>
            <div className="back">
                <a href="./Ve" className="text-decoration-underline-mk">Quay lại trang dành cho vé</a>
            </div>
        </div>
    );
}

export default SuaVe;
