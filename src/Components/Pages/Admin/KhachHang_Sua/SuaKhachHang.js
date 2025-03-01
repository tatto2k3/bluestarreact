import React, { useState, useEffect } from "react";
import './SuaKhachHang.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import logo2 from '../../../../assets/logo2.PNG';
import { useLocation } from 'react-router-dom';
import axios from 'axios';



const SuaKhachHang = () => {
    const location = useLocation();
    const [selectedCustomerInfo, setSelectedCustomerInfo] = useState(location.state?.selectedCustomerInfo || []);
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);

    useEffect(() => {
        console.log("Selected customer info in SuaKhachHang useEffect:", selectedCustomerInfo);
        // Các thao tác khác với selectedCustomerInfo
    }, [selectedCustomerInfo]);

    const [customerInfo, setCustomerInfo] = useState({
        maKhachHang: '',
        tenKhachHang: '',
        CCCD: '',
        email: '',
        diemTichLuy: 2
    });

    useEffect(() => {
        if (selectedCustomerInfo.length > 0) {
            // Nếu có thông tin khách hàng được chọn, cập nhật customerInfo
            setCustomerInfo({
                maKhachHang: selectedCustomerInfo[0]?.C_ID || '',
                tenKhachHang: selectedCustomerInfo[0]?.FULLNAME || '',
                CCCD: selectedCustomerInfo[0]?.NUM_ID || '',
                email: selectedCustomerInfo[0]?.MAIL || '',
                diemTichLuy: selectedCustomerInfo[0]?.POINT || 0
            });
        }
    }, [selectedCustomerInfo]);


    const handleChange = (e) => {
        const { id, value } = e.target;

        setCustomerInfo({
            ...customerInfo,
            [id]: value,
        });
    };


    // Phía máy khách - SuaKhachHang.js
    const handleSave = async function update(event) {
        event.preventDefault();
        try {
           
            if (!customerInfo || !customerInfo.maKhachHang) {
                alert("Khách hàng không được tìm thấy");
                return;
            }

            const updatedData = {
                C_ID: customerInfo.maKhachHang,
                FULLNAME: customerInfo.tenKhachHang,
                MAIL: customerInfo.email,
                POINT: customerInfo.diemTichLuy,
                NUM_ID: customerInfo.CCCD
            };

          
            if (!updatedData.C_ID) {
                alert("CId là bắt buộc");
                return;
            }

            // Sử dụng fetch để thực hiện yêu cầu PUT
            const response = await fetch('http://localhost:8000/api/customer/updateCustomer', {
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
            {showSuccessMessage && (
                <div className="alert alert-success mt-3" role="alert">
                    Sửa khách hàng thành công!
                </div>
            )}
            <div className="logo-container">
                <div className="logo-inner">
                    <img src={logo2} alt="Logo" className="logo-img" />
                </div>
                <span className="Logo-name">Blue Star</span>
            </div>

            <div className="head-name">
                <h2>Sửa thông tin khách hàng</h2>
            </div>

            <div className="infor-cn">
                <form className="form-signin-cn">
                    <div className="row mb-3">
                        <div className="col-4">
                            <label htmlFor="maKhachHang" className="form-label">Mã khách hàng</label>
                            <input                             
                                type="text"
                                className="form-control"
                                id="maKhachHang"
                                placeholder="Mã khách hàng"
                                value={customerInfo.maKhachHang}
                                onChange={handleChange}
                                readOnly
                            />
                        </div>
                        <div className="col-4">
                            <label htmlFor="tenKhachHang" className="form-label">Tên khách hàng</label>
                            <input
                                type="text"
                                className="form-control"
                                id="tenKhachHang"
                                placeholder="Tên khách hàng"
                                value={customerInfo.tenKhachHang}
                                onChange={handleChange}
                                
                            />
                        </div>
                        <div className="col-4">
                            <label htmlFor="CCCD" className="form-label">CCCD</label>
                            <input
                                type="number"
                                className="form-control"
                                id="CCCD"
                                placeholder="CCCD"
                                value={customerInfo.CCCD}
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                    <div className="row mb-3">
                        <div className="col-6">
                            <label htmlFor="email" className="form-label">Email</label>
                            <input
                                type="email"
                                className="form-control"
                                id="email"
                                placeholder="Email"
                                value={customerInfo.email}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="col-6">
                            <label htmlFor="diemTichLuy" className="form-label">Điểm tích lũy</label>
                            <input
                                type="number"
                                className="form-control"
                                id="diemTichLuy"
                                placeholder="Điểm tích lũy"
                                value={customerInfo.diemTichLuy}
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                    <div className="d-flex justify-content-center mt-3">
                        <button type="button" className="btn btn-primary" onClick={handleSave} >Lưu</button>
                    </div>
                </form>
            </div>
            <div className="back">
                <a href="./KhachHang" className="text-decoration-underline-mk">Quay lại trang dành cho khách hàng</a>
            </div>
        </div>
    );
}

export default SuaKhachHang;
