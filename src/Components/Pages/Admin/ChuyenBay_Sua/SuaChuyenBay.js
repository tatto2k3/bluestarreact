import React, { useState, useEffect } from "react";
import './SuaChuyenBay.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import logo2 from '../../../../assets/logo2.PNG';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

const SuaChuyenBay = () => {
    const location = useLocation();
    const [selectedChuyenbayInfo, setSelectedChuyenbayInfo] = useState(location.state?.selectedChuyenbayInfo || []);

    useEffect(() => {
        console.log("Selected chuyenbay info in SuaKhachHang useEffect:", selectedChuyenbayInfo);
        // Các thao tác khác với selectedchuyenbayInfo
    }, [selectedChuyenbayInfo]);

    const [chuyenbayInfo, setChuyenbayInfo] = useState({
        flyId: '',
        plId: '',
        fromLocation: '',
        toLocation: '',
        departureTime: '',
        arrivalTime: '',
        departureDay: '',
        originalPrice : 2
    });

    useEffect(() => {
        if (selectedChuyenbayInfo.length > 0) {
            // Nếu có thông tin khách hàng được chọn, cập nhật chuyenbayInfo
            setChuyenbayInfo({
                flyId: selectedChuyenbayInfo[0]?.flyId || '',
                plId: selectedChuyenbayInfo[0]?.plId || '',
                fromLocation: selectedChuyenbayInfo[0]?.fromLocation || '',
                toLocation: selectedChuyenbayInfo[0]?.toLocation || '',
                departureTime: selectedChuyenbayInfo[0]?.departureTime || '',
                arrivalTime: selectedChuyenbayInfo[0]?.arrivalTime || '',
                departureDay: selectedChuyenbayInfo[0]?.departureDay || '',
                originalPrice: selectedChuyenbayInfo[0]?.originalPrice || 0
            });
        }
    }, [selectedChuyenbayInfo]);


    const handleChange = (e) => {
        const { id, value } = e.target;

        setChuyenbayInfo({
            ...chuyenbayInfo,
            [id]: value,
        });
    };


    // Phía máy khách - SuaKhachHang.js
    const handleSave = async function update(event) {
        event.preventDefault();
        try {

            if (!chuyenbayInfo || !chuyenbayInfo.flyId) {
                alert("Khách hàng không được tìm thấy");
                return;
            }

            const updatedData = {
                flyId: chuyenbayInfo.flyId,
                plId: chuyenbayInfo.plId,
                fromLocation: chuyenbayInfo.fromLocation,
                toLocation: chuyenbayInfo.toLocation,
                departureTime: chuyenbayInfo.departureTime,
                arrivalTime: chuyenbayInfo.arrivalTime,
                departureDay: chuyenbayInfo.departureDay,
                originalPrice: chuyenbayInfo.originalPrice,
            };


            if (!updatedData.flyId) {
                alert("CId là bắt buộc");
                return;
            }

            // Sử dụng fetch để thực hiện yêu cầu PUT
            const response = await fetch('api/chuyenbay/UpdateChuyenbay', {
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

            alert("Khách hàng đã được cập nhật");

        } catch (err) {
            // Xử lý lỗi
            alert(err.message);
        }
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
                <h2>Sửa thông tin chuyến bay</h2>
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
                                value={chuyenbayInfo.flyId}
                                onChange={handleChange}
                                readOnly
                            />
                        </div>
                        <div className="col-4">
                            <label htmlFor="maMayBay" className="form-label">Mã máy bay</label>
                            <input
                                type="text"
                                className="form-control"
                                id="maMayBay"
                                placeholder="Mã máy bay"
                                value={chuyenbayInfo.plId}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="col-4">
                            <label htmlFor="fromLocation" className="form-label">Điểm đi</label>
                            <input
                                type="text"
                                className="form-control"
                                id="fromLocation"
                                placeholder="Điểm đi"
                                value={chuyenbayInfo.fromLocation}
                                onChange={handleChange}
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
                                value={chuyenbayInfo.toLocation}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="col-4">
                            <label htmlFor="departureTime" className="form-label">Giờ đi</label>
                            <input
                                type="text"
                                className="form-control"
                                id="departureTime"
                                placeholder="Giờ đi"
                                value={chuyenbayInfo.departureTime}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="col-4">
                            <label htmlFor="arrivalTime" className="form-label">Giờ đến</label>
                            <input
                                type="text"
                                className="form-control"
                                id="arrivalTime"
                                placeholder="Giờ đến"
                                value={chuyenbayInfo.arrivalTime}
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                    <div className="row mb-3">
                        <div className="col-6">
                            <label htmlFor="departureDay" className="form-label">Ngày đi</label>
                            <input
                                type="text"
                                className="form-control"
                                id="departureDay"
                                placeholder="Ngày đi"
                                value={chuyenbayInfo.departureDay}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="col-6">
                            <label htmlFor="originalPrice" className="form-label">Giá vé</label>
                            <input
                                type="number"
                                className="form-control"
                                id="originalPrice"
                                placeholder="Giờ đi"
                                value={chuyenbayInfo.originalPrice}
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
                <a href="./ChuyenBay" className="text-decoration-underline-mk">Quay lại trang dành cho chuyến bay</a>
            </div>
        </div>
    );
}

export default SuaChuyenBay;
