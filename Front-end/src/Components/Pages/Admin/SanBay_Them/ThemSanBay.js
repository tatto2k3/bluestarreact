import React, { useEffect, useState } from "react";
import './ThemSanBay.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import logo2 from '../../../../assets/logo2.PNG';

const ThemSanBay = () => {
    const [airportId, setAirportId] = useState("");
    const [airportName, setAirportName] = useState("");
    const [place, setPlace] = useState("");
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);

    const handleSave = async () => {
        if (!isValidData()) {
            alert("Invalid sanbay data");
            return;
        }

        const sanbayData = {
            airportID: airportId,
            airportName: airportName,
            place: place,
        };
        try {
            const sanbayResponse = await fetch("http://localhost:8000/api/sanbay/addSanbay", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(sanbayData),
            });
            if (!sanbayResponse.ok) {
                const sanbayError = await sanbayResponse.json();
                console.error("Sanbay error:", sanbayError);
                alert("Failed to add sanbay");
                return;
            }
            setShowSuccessMessage(true);
            setAirportId("");
            setAirportName("");
            setPlace("");
            setTimeout(() => setShowSuccessMessage(false), 3000);
        } catch (error) {
            console.error("Error:", error);
        }
    };

    const isValidData = () => {
        return (
            airportId.trim() !== ""
        );
    };
    return (
        <div className="container-fluid">
            {showSuccessMessage && (
                <div className="alert alert-success mt-3" role="alert">
                    Thêm sân bay thành công!
                </div>
            )}
            <div className="logo-container">
                <div className="logo-inner">
                    <img src={logo2} alt="Logo" className="logo-img" />
                </div>
                <span className="Logo-name">Blue Star</span>
            </div>

            <div className="head-name">
                <h2>Thêm sân bay</h2>
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
                                value={airportId}
                                onChange={(e) => setAirportId(e.target.value)}
                            />
                        </div>
                        <div className="col-4">
                            <label htmlFor="airportName" className="form-label">Tên sân bay</label>
                            <input
                                type="text"
                                className="form-control"
                                id="airportName"
                                placeholder="Tên sân bay"
                                value={airportName}
                                onChange={(e) => setAirportName(e.target.value)}
                            />
                        </div>
                        <div className="col-4">
                            <label htmlFor="place" className="form-label">Địa điểm</label>
                            <input
                                type="text"
                                className="form-control"
                                id="place"
                                placeholder="Địa điểm"
                                value={place}
                                onChange={(e) => setPlace(e.target.value)}
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
export default ThemSanBay;