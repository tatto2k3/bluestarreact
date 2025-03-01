import React, { useState } from "react";
import './ThemVe.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import logo2 from '../../../../assets/logo2.PNG';

const ThemVe = () => {
    const [tId, setTId] = useState("");
    const [cccd, setCccd] = useState("");
    const [name, setName] = useState("");
    const [flyId, setFlyId] = useState("");
    const [kgId, setKgId] = useState("");
    const [seatId, setSeatId] = useState("");
    const [foodId, setFoodId] = useState("");
    const [ticketPrice, setTicketPrice] = useState("");
    const [mail, setMail] = useState("");
    const [disId, setDisId] = useState("");
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);

    const handleSave = async () => {
        if (!isValidData()) {
            alert("Invalid Ticket data");
            return;
        }

        const ticketData = {
            T_ID: tId,
            CCCD: cccd,
            Name: name,
            Fly_ID: flyId,  
            Kg_ID: kgId,
            Seat_ID: seatId,
            Food_ID: foodId,
            Ticket_Price: ticketPrice,
            Mail: mail,
            Dis_ID: disId,
        };
        try {
        const ticketResponse = await fetch("http://localhost:8000/api/ticket/addTicket", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(ticketData),
        });
            if (!ticketResponse.ok) {
                const TicketError = await ticketResponse.json();
                console.error("Ticket error:", TicketError);
                alert("Failed to add Ticket");
                return;
            }
            setShowSuccessMessage(true);
            setTId("");
            setCccd("");
            setName("");
            setFlyId("");
            setKgId("");
            setSeatId("");
            setFoodId("");
            setTicketPrice("");
            setMail("");
            setDisId("");
            setTimeout(() => setShowSuccessMessage(false), 3000);
        } catch (error) {
            console.error("Error:", error);
        }
    };

    const isValidData = () => {
        return (
            tId.trim() !== ""
        );
    };

    return (
        <div className="container-fluid">
            {showSuccessMessage && (
                <div className="alert alert-success mt-3" role="alert">
                    Thêm vé thành công!
                </div>
            )}
            <div className="logo-container">
                <div className="logo-inner">
                    <img src={logo2} alt="Logo" className="logo-img" />
                </div>
                <span className="Logo-name">Blue Star</span>
            </div>

            <div className="head-name">
                <h2>Thêm vé</h2>
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
                                value={tId}
                                onChange={(e) => setTId(e.target.value)}
                            />
                        </div>
                        <div className="col-4">
                            <label htmlFor="cccd" className="form-label">CCCD</label>
                            <input
                                type="number"
                                className="form-control"
                                id="cccd"
                                placeholder="Tên khách hàng"
                                value={cccd}
                                onChange={(e) => setCccd(e.target.value)}
                            />
                        </div>
                        <div className="col-4">
                            <label htmlFor="name" className="form-label">Tên khách hàng</label>
                            <input
                                type="text"
                                className="form-control"
                                id="name"
                                placeholder="Tên khách hàng"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
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
                                value={flyId}
                                onChange={(e) => setFlyId(e.target.value)}
                                
                            />
                        </div>
                        <div className="col-4">
                            <label htmlFor="kgId" className="form-label">Mã hành lý</label>
                            <input
                                type="text"
                                className="form-control"
                                id="kgId"
                                placeholder="Mã hành lý"
                                value={kgId}
                                onChange={(e) => setKgId(e.target.value)}
                            />
                        </div>
                        <div className="col-4">
                            <label htmlFor="seatId" className="form-label">Mã chỗ ngồi</label>
                            <input
                                type="text"
                                className="form-control"
                                id="seatId"
                                placeholder="Mã chỗ ngồi"
                                value={seatId}
                                onChange={(e) => setSeatId(e.target.value)}
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
                                value={foodId}
                                onChange={(e) => setFoodId(e.target.value)}
                            />
                        </div>
                        <div className="col-6">
                            <label htmlFor="ticketPrice" className="form-label">Giá vé</label>
                            <input
                                type="text"
                                className="form-control"
                                id="ticketPrice"
                                placeholder="Giá vé"
                                value={ticketPrice}
                                onChange={(e) => setTicketPrice(e.target.value)}
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
                                value={mail}
                                onChange={(e) => setMail(e.target.value)}
                            />
                        </div>
                        <div className="col-6">
                            <label htmlFor="disId" className="form-label">Mã khuyến mãi</label>
                            <input
                                type="text"
                                className="form-control"
                                id="disId"
                                placeholder="Mã khuyến mãi"
                                value={disId}
                                onChange={(e) => setDisId(e.target.value)}
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

export default ThemVe;
