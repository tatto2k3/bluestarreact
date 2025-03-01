import React, { useState, useEffect } from "react";
import { useLocation } from 'react-router-dom';
import './SuaMayBay.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import logo2 from '../../../../assets/logo2.PNG';

const SuaMayBay = () => {
    const location = useLocation();
    const [selectedPlaneInfo, setSelectedPlaneInfo] = useState(location.state?.selectedPlaneInfo || []);

    useEffect(() => {
        
        // Các thao tác khác với selectedCustomerInfo
    }, [selectedPlaneInfo]);

    const [planeInfo, setPlaneInfo] = useState({
        plId: '',
        typeofplane: '',
        businessCapacity: 0,
        economyCapacity: 0,
        
    });

    useEffect(() => {
        if (selectedPlaneInfo.length > 0) {
            // Nếu có thông tin khách hàng được chọn, cập nhật customerInfo
            setPlaneInfo({
                plId: selectedPlaneInfo[0]?.plId || '',
                typeofplane: selectedPlaneInfo[0]?.typeofplane || '',
                businessCapacity: selectedPlaneInfo[0]?.businessCapacity || 0,
                economyCapacity: selectedPlaneInfo[0]?.economyCapacity || 0,             
            });
        }
    }, [selectedPlaneInfo]);


    const handleChange = (e) => {
        const { id, value } = e.target;

        setPlaneInfo({
            ...planeInfo,
            [id]: value,
        });
    };


    // Phía máy khách - SuaKhachHang.js
    const handleSave = async function update(event) {
        event.preventDefault();
        try {

            if (!planeInfo || !planeInfo.plId) {
                alert("Khách hàng không được tìm thấy");
                return;
            }

            const updatedData = {
                plId: planeInfo.plId,
                typeofplane: planeInfo.typeofplane,
                businessCapacity: planeInfo.businessCapacity,
                economyCapacity: planeInfo.economyCapacity,
                
            };


            if (!updatedData.plId) {
                alert("PlId là bắt buộc");
                return;
            }

            // Sử dụng fetch để thực hiện yêu cầu PUT
            const response = await fetch('api/plane/UpdatePlane', {
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

            alert("Máy bay đã được cập nhật");

        } catch (err) {
            // Xử lý lỗi
            alert(err.message);
        }
    };

    return (
        <div className="container-fluid">
            <div className="logo-container">
                <div className="logo-inner">
                    <img src={logo2} alt="Logo" className="logo-img" />
                </div>
                <span className="Logo-name">Blue Star</span>
            </div>

            <div className="head-name">
                <h2>Sửa thông tin máy bay</h2>
            </div>

            <div className="infor-cn">
                <form className="form-signin-cn">
                    <div className="row mb-3">
                        <div className="col-6">
                            <label htmlFor="maMayBay" className="form-label">Mã máy bay</label>
                            <input
                                type="text"
                                className="form-control"
                                id="plId"
                                placeholder="Mã máy bay"
                                value={planeInfo.plId}
                                onChange={handleChange}
                                readOnly
                            />
                        </div>
                        <div className="col-6">
                            <label htmlFor="typeofplane" className="form-label">Loại máy bay</label>
                            <input
                                type="text"
                                className="form-control"
                                id="typeofplane"
                                placeholder="Loại máy bay"
                                value={planeInfo.typeofplane}
                                onChange={handleChange}

                            />
                        </div>
                    </div>
                    <div className="row mb-3">
                        <div className="col-6">
                            <label htmlFor="businessCapacity" className="form-label">Sức chứa khoang thương gia</label>
                            <input
                                type="text"
                                className="form-control"
                                id="businessCapacity"
                                placeholder="Sức chứa khoang thương gia"
                                value={planeInfo.businessCapacity}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="col-6">
                            <label htmlFor="economyCapacity" className="form-label">Sức chứa khoang thường</label>
                            <input
                                type="text"
                                className="form-control"
                                id="economyCapacity"
                                placeholder="Sức chứa khoang thường"
                                value={planeInfo.economyCapacity}
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
                <a href="./MayBay" className="text-decoration-underline-mk">Quay lại trang dành cho máy bay</a>
            </div>
        </div>
    );
}

export default SuaMayBay;
