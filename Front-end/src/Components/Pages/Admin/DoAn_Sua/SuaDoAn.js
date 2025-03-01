import React, { useState, useEffect } from "react";
import './SuaDoAn.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import logo2 from '../../../../assets/logo2.PNG';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

const SuaDoAn = () => {
    const location = useLocation();
    const [selectedFoodInfo, setSelectedFoodInfo] = useState(location.state?.selectedFoodInfo || []);
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);

    useEffect(() => {
        console.log("Selected Food info in SuaKhachHang useEffect:", selectedFoodInfo);
        // Các thao tác khác với selectedFoodInfo
    }, [selectedFoodInfo]);

    const [foodInfo, setFoodInfo] = useState({
        fId: '',
        fName: '',
        fPrice: ''
    });

    useEffect(() => {
        if (selectedFoodInfo.length > 0) {
            // Nếu có thông tin khách hàng được chọn, cập nhật FoodInfo
            setFoodInfo({
                fId: selectedFoodInfo[0]?.F_ID || '',
                fName: selectedFoodInfo[0]?.F_NAME || '',
                fPrice: selectedFoodInfo[0]?.F_PRICE || ''

            });
        }
    }, [selectedFoodInfo]);


    const handleChange = (e) => {
        const { id, value } = e.target;

        setFoodInfo({
            ...foodInfo,
            [id]: value,
        });
    };


    // Phía máy khách - SuaKhachHang.js
    const handleSave = async function update(event) {
        event.preventDefault();
        try {

            if (!foodInfo || !foodInfo.fId) {
                alert("Thức ăn không được tìm thấy");
                return;
            }

            const updatedData = {
                F_ID: foodInfo.fId,
                F_NAME: foodInfo.fName,
                F_PRICE: foodInfo.fPrice
            };


            if (!updatedData.F_ID) {
                alert("FId là bắt buộc");
                return;
            }

            // Sử dụng fetch để thực hiện yêu cầu PUT
            const response = await fetch('http://localhost:8000/api/food/updateFood', {
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
                    Sửa món ăn thành công!
                </div>
            )}
            <div className="logo-container">
                <div className="logo-inner">
                    <img src={logo2} alt="Logo" className="logo-img" />
                </div>
                <span className="Logo-name">Blue Star</span>
            </div>

            <div className="head-name">
                <h2>Sửa thông tin thức ăn</h2>
            </div>

            <div className="infor-cn">
                <form className="form-signin-cn">
                    <div className="row mb-3">
                        <div className="col-4">
                            <label htmlFor="fId" className="form-label">Mã thức ăn</label>
                            <input
                                type="text"
                                className="form-control"
                                id="fId"
                                placeholder="Mã thức ăn"
                                value={foodInfo.fId}
                                onChange={handleChange}
                                readOnly
                            />
                        </div>
                        <div className="col-4">
                            <label htmlFor="fName" className="form-label">Tên thức ăn</label>
                            <input
                                type="text"
                                className="form-control"
                                id="fName"
                                placeholder="Tên thức ăn"
                                value={foodInfo.fName}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="col-4">
                            <label htmlFor="fPrice" className="form-label">Giá tiền</label>
                            <input
                                type="text"
                                className="form-control"
                                id="fPrice"
                                placeholder="Giá tiền"
                                value={foodInfo.fPrice}
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
                <a href="./DoAn" className="text-decoration-underline-mk">Quay lại trang dành cho thức ăn</a>
            </div>
        </div>
    );
}

export default SuaDoAn;
