import React, { useState } from "react";
import './ThemKhachHang.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import logo2 from '../../../../assets/logo2.PNG';

const ThemKhachHang = () => {
    const [cId, setMaKhachHang] = useState("");
    const [numId, setCCCD] = useState("");
    const [fullname, setTenKhachHang] = useState("");
    const [point, setDiemTichLuy] = useState("");
    const [email, setEmail] = useState("");
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);

    const handleSave = async () => {
        if (!isValidData()) {
            alert("Invalid customer data");
            return;
        }

        const customerData = {
            C_ID: cId,
            NUM_ID: numId,
            FULLNAME: fullname,
            POINT: point,  
            MAIL: email,
        };
        try {
        const customerResponse = await fetch("http://localhost:8000/api/customer/addCustomer", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(customerData),
        });
            if (!customerResponse.ok) {
                const customerError = await customerResponse.json();
                console.error("Customer error:", customerError);
                alert("Failed to add customer");
                return;
            }
            setShowSuccessMessage(true);
                setMaKhachHang("");
                setCCCD("");
                setTenKhachHang("");
                setDiemTichLuy("");
                setEmail("");
                setTimeout(() => setShowSuccessMessage(false), 3000);
        } catch (error) {
            console.error("Error:", error);
        }
    };

    const isValidData = () => {
        return (
            cId.trim() !== ""
        );
    };

    return (
        <div className="container-fluid">
            {showSuccessMessage && (
                <div className="alert alert-success mt-3" role="alert">
                    Thêm khách hàng thành công!
                </div>
            )}
            <div className="logo-container">
                <div className="logo-inner">
                    <img src={logo2} alt="Logo" className="logo-img" />
                </div>
                <span className="Logo-name">Blue Star</span>
            </div>

            <div className="head-name">
                <h2>Thêm khách hàng</h2>
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
                                value={cId}
                                onChange={(e) => setMaKhachHang(e.target.value)}
                            />
                        </div>
                        <div className="col-4">
                            <label htmlFor="tenKhachHang" className="form-label">Tên khách hàng</label>
                            <input
                                type="text"
                                className="form-control"
                                id="tenKhachHang"
                                placeholder="Tên khách hàng"
                                value={fullname}
                                onChange={(e) => setTenKhachHang(e.target.value)}
                            />
                        </div>
                        <div className="col-4">
                            <label htmlFor="CCCD" className="form-label">CCCD</label>
                            <input
                                type="number"
                                className="form-control"
                                id="CCCD"
                                placeholder="CCCD"
                                value={numId}
                                onChange={(e) => setCCCD(e.target.value)}
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
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div className="col-6">
                            <label htmlFor="diemTichLuy" className="form-label">Điểm tích lũy</label>
                            <input
                                type="number"
                                className="form-control"
                                id="diemTichLuy"
                                placeholder="Điểm tích lũy"
                                value={point}
                                onChange={(e) => setDiemTichLuy(e.target.value)}
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

export default ThemKhachHang;
