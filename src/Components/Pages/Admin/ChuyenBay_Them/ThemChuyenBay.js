import React, { useState } from "react";
import './ThemChuyenBay.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import logo2 from '../../../../assets/logo2.PNG';

const ThemChuyenBay = () => {
    const [flyId, setFlyId] = useState("");
    const [plId, setPlId] = useState("");
    const [fromLocation, setFromLocation] = useState("");
    const [toLocation, setToLocation] = useState("");
    const [departureTime, setDepartureTime] = useState("");
    const [arrivalTime, setArrivalTime] = useState("");
    const [departureDay, setDepartureDay] = useState("");
    const [originalPrice, setOriginalPrice] = useState("");

    const handleSave = async () => {
        if (!isValidData()) {
            alert("Invalid customer data");
            return;
        }

        const flightData = {
            flyId: flyId ,
            plId: plId,
            fromLocation: fromLocation ,
            toLocation: toLocation,  
            departureTime: departureTime,
            arrivalTime: arrivalTime,
            departureDay: departureDay,
            originalPrice: originalPrice,
        };
        try {
        const flightResponse = await fetch("api/customer/AddChuyenbay", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(flightData),
        });
            if (!flightResponse.ok) {
                const flightError = await flightResponse.json();
                console.error("Flight error:", flightError);
                alert("Failed to add flight");
                return;
            }

            alert("flight added successfully");
        } catch (error) {
            console.error("Error:", error);
        }
    };

    const isValidData = () => {
        return (
            flyId.trim() !== ""
        );
    };
    if (!localStorage.getItem('emailNhanVien')) {
        return (
            <div className="containerPersonal">
                <div className="text-insertPersonal">
                    <h1>Bạn cần đăng nhập để truy cập trang này</h1>
                </div>
            </div>
        );
    }
    return (
        <div className="container-fluid">
            <div className="logo-container">
                <div className="logo-inner">
                    <img src={logo2} alt="Logo" className="logo-img" />
                </div>
                <span className="Logo-name">Blue Star</span>
            </div>

            <div className="head-name">
                <h2>Thêm chuyến bay</h2>
            </div>

            <div className="infor-cn">
                <form className="form-signin-cn">
                    <div className="row mb-3">
                        <div className="col-4">
                            <label htmlFor="maChuyenBay" className="form-label">Mã chuyến bay</label>
                            <input
                                type="text"
                                className="form-control"
                                id="maChuyenBay"
                                placeholder="Mã chuyến bay"
                                value={flyId}
                                onChange={(e) => setFlyId(e.target.value)}
                            />
                        </div>
                        <div className="col-4">
                            <label htmlFor="maMayBay" className="form-label">Mã máy bay</label>
                            <input
                                type="text"
                                className="form-control"
                                id="maMayBay"
                                placeholder="Mã máy bay"
                                value={plId}
                                onChange={(e) => setPlId(e.target.value)}
                            />
                        </div>
                        <div className="col-4">
                            <label htmlFor="fromLocation" className="form-label">Điểm đi</label>
                            <input
                                type="text"
                                className="form-control"
                                id="fromLocation"
                                placeholder="Điểm đi"
                                value={fromLocation}
                                onChange={(e) => setFromLocation(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="row mb-3">
                        <div className="col-4">
                            <label htmlFor="toLocation" className="form-label">Điểm đến</label>
                            <input
                                type="text"
                                className="form-control"
                                id="toLocation"
                                placeholder="Điểm đến"
                                value={toLocation}
                                onChange={(e) => setToLocation(e.target.value)}
                            />
                        </div>
                        <div className="col-4">
                            <label htmlFor="departureTime" className="form-label">Giờ đi</label>
                            <input
                                type="text"
                                className="form-control"
                                id="departureTime"
                                placeholder="Giờ đi"
                                value={departureTime}
                                onChange={(e) => setDepartureTime(e.target.value)}
                            />
                        </div>
                        <div className="col-4">
                            <label htmlFor="arrivalTime" className="form-label">Giờ đến</label>
                            <input
                                type="text"
                                className="form-control"
                                id="arrivalTime"
                                placeholder="Giờ đến"
                                value={arrivalTime}
                                onChange={(e) => setArrivalTime(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="row mb-3">
                        <div className="col-6">
                            <label htmlFor="departureDay" className="form-label">Ngày đi</label>
                            <input
                                type="date"
                                className="form-control"
                                id="departureDay"
                                placeholder="Ngày đi"
                                value={departureDay}
                                onChange={(e) => setDepartureDay(e.target.value)}
                            />
                        </div>
                        <div className="col-6">
                            <label htmlFor="originalPrice" className="form-label">Giá vé</label>
                            <input
                                type="number"
                                className="form-control"
                                id="originalPrice"
                                placeholder="Giá vé"
                                value={originalPrice}
                                onChange={(e) => setOriginalPrice(e.target.value)}
                            />
                        </div>
                        
                    </div>
                    <div className="d-flex justify-content-center mt-3">
                        <button type="button" className="btn btn-primary" onClick={handleSave}>Lưu</button>
                    </div>
                </form>
            </div>
            <div className="back">
                <a href="./KhachHang" className="text-decoration-underline-mk">Quay lại trang dành cho khách hàng</a>
            </div>
        </div>
    );
}

export default ThemChuyenBay;
