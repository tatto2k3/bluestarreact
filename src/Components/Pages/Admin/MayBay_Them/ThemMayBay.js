import React, { useState } from "react";
import './ThemMayBay.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import logo2 from '../../../../assets/logo2.PNG';

const ThemMayBay = () => {
    const [plId, setPlId] = useState("");
    const [typeofplane, setTypeofplane] = useState("");
    const [businessCapacity, setBusinessCapacity] = useState("");
    const [economyCapacity, setEconomyCapacity] = useState("");
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);

    const handleSave = async () => {
        if (!isValidData()) {
            alert("Invalid plane data");
            return;
        }

        const planeData = {
            PL_ID: plId,
            TYPEOFPLANE: typeofplane ,
            BUSINESS_CAPACITY: businessCapacity,
            ECONOMY_CAPACITY: economyCapacity,  
        };
        console.log(planeData);
        try {
        const planeResponse = await fetch("http://localhost:8000/api/plane/addPlane", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(planeData),
        });
            if (!planeResponse.ok) {
                const planeError = await planeResponse.json();
                console.error("Plane error:", planeError);
                console.log(planeResponse);
                alert("Failed to add plane");
                return;
            }
            setShowSuccessMessage(true);
                setPlId("");
                setTypeofplane("");
                setBusinessCapacity("");
                setEconomyCapacity("");
                setTimeout(() => setShowSuccessMessage(false), 3000);
        } catch (error) {
            
            console.error("Error:", error);
        }
    };

    const isValidData = () => {
        return (
            plId.trim() !== ""
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
            {showSuccessMessage && (
                <div className="alert alert-success mt-3" role="alert">
                    Thêm máy bay thành công!
                </div>
            )}
            <div className="logo-container">
                <div className="logo-inner">
                    <img src={logo2} alt="Logo" className="logo-img" />
                </div>
                <span className="Logo-name">Blue Star</span>
            </div>

            <div className="head-name">
                <h2>Thêm máy bay</h2>
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
                                value={plId}
                                onChange={(e) => setPlId(e.target.value)}
                            />
                        </div>
                        <div className="col-6">
                            <label htmlFor="typeofplane" className="form-label">Loại máy bay</label>
                            <input
                                type="text"
                                className="form-control"
                                id="typeofplane"
                                placeholder="Loại máy bay"
                                value={typeofplane}
                                onChange={(e) => setTypeofplane(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="row mb-3">
                        <div className="col-6">
                            <label htmlFor="businessCapacity" className="form-label">Sức chứa khoang thương gia</label>
                            <input
                                type="number"
                                className="form-control"
                                id="businessCapacity"
                                placeholder="Sức chứa khoang thương gia"
                                value={businessCapacity}
                                onChange={(e) => setBusinessCapacity(e.target.value)}
                            />
                        </div>
                        <div className="col-6">
                            <label htmlFor="economyCapacity" className="form-label">Sức chứa khoang thường</label>
                            <input
                                type="number"
                                className="form-control"
                                id="economyCapacity"
                                placeholder="Sức chứa khoang thường"
                                value={economyCapacity}
                                onChange={(e) => setEconomyCapacity(e.target.value)}
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

export default ThemMayBay;
