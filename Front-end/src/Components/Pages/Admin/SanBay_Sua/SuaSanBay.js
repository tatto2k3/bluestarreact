import React, { useEffect, useState } from "react";
import './SuaSanBay.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import logo2 from '../../../../assets/logo2.PNG';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

const SuaSanBay = () => {
    const location = useLocation();
    const [selectedSanbayInfo, setSelectedSanbayInfo] = useState(location.state?.selectedSanbayInfo || []);
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);

    useEffect(() => {
        console.log("Selected Sanbay info in SuaKhachHang useEffect:", selectedSanbayInfo);
        // Các thao tác khác với selectedSanbayInfo
    }, [selectedSanbayInfo]);

    const [SanbayInfo, setSanbayInfo] = useState({
        airportId: '',
        airportName: '',
        place: '',
    });

    useEffect(() => {
        if (selectedSanbayInfo.length > 0) {
            // Nếu có thông tin khách hàng được chọn, cập nhật SanbayInfo
            setSanbayInfo({
                airportId: selectedSanbayInfo[0]?.airportID || '',
                airportName: selectedSanbayInfo[0]?.airportName || '',
                place: selectedSanbayInfo[0]?.place || '',
            });
        }
    }, [selectedSanbayInfo]);


    const handleChange = (e) => {
        const { id, value } = e.target;

        setSanbayInfo({
            ...SanbayInfo,
            [id]: value,
        });
    };


    // Phía máy khách - SuaKhachHang.js
    const handleSave = async function update(event) {
        event.preventDefault();
        try {

            if (!SanbayInfo || !SanbayInfo.airportId) {
                alert("Sân bay không được tìm thấy");
                return;
            }

            const updatedData = {
                airportID: SanbayInfo.airportId,
                airportName: SanbayInfo.airportName,
                place: SanbayInfo.place,
            };


            if (!updatedData.airportID) {
                alert("AirportId là bắt buộc");
                return;
            }

            // Sử dụng fetch để thực hiện yêu cầu PUT
            const response = await fetch('http://localhost:8000/api/sanbay/updateSanbay', {
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
                    Sửa sân bay thành công!
                </div>
            )}
            <div className="logo-container">
                <div className="logo-inner">
                    <img src={logo2} alt="Logo" className="logo-img" />
                </div>
                <span className="Logo-name">Blue Star</span>
            </div>

            <div className="head-name">
                <h2>Sửa thông tin sân bay</h2>
            </div>

            <div className="infor-cn">
                <form className="form-signin-cn">
                    <div className="row mb-3">
                        <div className="col-4">
                            <label htmlFor="airportId" className="form-label">Mã sân bay</label>
                            <input
                                type="text"
                                className="form-control"
                                id="airportId"
                                placeholder="Mã sân bay"
                                value={SanbayInfo.airportId}
                                onChange={handleChange}
                                readOnly
                            />
                        </div>
                        <div className="col-4">
                            <label htmlFor="airportName" className="form-label">Tên sân bay</label>
                            <input
                                type="text"
                                className="form-control"
                                id="airportName"
                                placeholder="Tên sân bay"
                                value={SanbayInfo.airportName}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="col-4">
                            <label htmlFor="place" className="form-label">Địa điểm</label>
                            <input
                                type="text"
                                className="form-control"
                                id="place"
                                placeholder="Địa điểm"
                                value={SanbayInfo.place}
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
                <a href="./SanBay" className="text-decoration-underline-mk">Quay lại trang dành cho sân bay</a>
            </div>
        </div>
    );
}
export default SuaSanBay;