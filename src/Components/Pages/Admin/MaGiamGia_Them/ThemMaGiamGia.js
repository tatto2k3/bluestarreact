import React, { useState } from "react";
import './ThemMaGiamGia.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import logo2 from '../../../../assets/logo2.PNG';


const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${day}-${month}-${year}`;
};

const ThemMaGiamGia = () => {
    const [dId, setDId] = useState("");
    const [dName, setDName] = useState("");
    const [dStart, setDStart] = useState("");
    const [dFinish, setDFinish] = useState("");
    const [dPercent, setDPercent] = useState("");
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);

    const handleSave = async () => {
        if (!isValidData()) {
            alert("Invalid customer data");
            return;
        }

        const discountData = {
            D_ID: dId,
            D_NAME: dName,
            D_START: formatDate(new Date(dStart)),
            D_FINISH: formatDate(new Date(dFinish)),
            D_PERCENT: dPercent,
        };
        console.log(discountData);
        console.log('Start Date:', discountData.D_START);
        console.log('End Date:', discountData.D_FINISH);

        try {
        const discountResponse = await fetch("http://localhost:8000/api/discount/addDiscount", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(discountData),
        });
            if (!discountResponse.ok) {
                const discountError = await discountResponse.json();
                console.error("Discount error:", discountError);
                alert("Failed to add Discount");
                return;
            }
            setShowSuccessMessage(true);
            setDId("");
            setDName("");
            setDStart("");
            setDFinish("");
            setDPercent("");
            setTimeout(() => setShowSuccessMessage(false), 3000);
        } catch (error) {
            console.error("Error:", error);
        }
    };

    const isValidData = () => {
        return (
            dId.trim() !== ""
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
                <h2>Thêm khuyến mãi</h2>
            </div>

            <div className="infor-cn">
                <form className="form-signin-cn">
                    <div className="row mb-3">
                        <div className="col-4">
                            <label htmlFor="dId" className="form-label">Mã khuyến mãi</label>
                            <input
                                type="text"
                                className="form-control"
                                id="dId"
                                placeholder="Mã khuyến mãi"
                                value={dId}
                                onChange={(e) => setDId(e.target.value)}
                            />
                        </div>
                        <div className="col-4">
                            <label htmlFor="dName" className="form-label">Tên khuyến mãi</label>
                            <input
                                type="text"
                                className="form-control"
                                id="dName"
                                placeholder="Tên khuyến mãi"
                                value={dName}
                                onChange={(e) => setDName(e.target.value)}
                            />
                        </div>
                        <div className="col-4">
                            <label htmlFor="dStart" className="form-label">Ngày bắt đầu</label>
                            <input
                                type="date"
                                className="form-control"
                                id="dStart"
                                placeholder="Ngày bắt đầu"
                                value={dStart}
                                onChange={(e) => setDStart(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="row mb-3">
                        <div className="col-6">
                            <label htmlFor="dFinish" className="form-label">Ngày kết thúc</label>
                            <input
                                type="date"
                                className="form-control"
                                id="dFinish"
                                placeholder="Ngày kết thúc"
                                value={dFinish}
                                onChange={(e) => setDFinish(e.target.value)}
                            />
                        </div>
                        <div className="col-6">
                            <label htmlFor="dPercent" className="form-label">Phần trăm</label>
                            <input
                                type="number"
                                className="form-control"
                                id="dPercent"
                                placeholder="Phần trăm"
                                value={dPercent}
                                onChange={(e) => setDPercent(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="d-flex justify-content-center mt-3">
                        <button type="button" className="btn btn-primary" onClick={handleSave}>Lưu</button>
                    </div>
                </form>
            </div>
            <div className="back">
                <a href="./MaGiamGia" className="text-decoration-underline-mk">Quay lại trang dành cho khuyến mãi</a>
            </div>
        </div>
    );
}

export default ThemMaGiamGia;
