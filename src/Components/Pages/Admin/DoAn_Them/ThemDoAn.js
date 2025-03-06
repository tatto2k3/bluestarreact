import React, { useState } from "react";
import './ThemDoAn.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import logo2 from '../../../../assets/logo2.PNG';

const ThemDoAn = () => {
    const [fId, setFId] = useState("");
    const [fName, setFName] = useState("");
    const [fPrice, setFPrice] = useState("");
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);


    const handleSave = async () => {
        if (!isValidData()) {
            alert("Invalid Food data");
            return;
        }

        const FoodData = {
            F_ID: fId,
            F_NAME: fName,
            F_PRICE: fPrice,

        };
        try {
        const FoodResponse = await fetch("http://localhost:8000/api/food/addFood", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(FoodData),
        });
            if (!FoodResponse.ok) {
                const FoodError = await FoodResponse.json();
                console.error("Food error:", FoodError);
                alert("Failed to add Food");
                return;
            }
            setShowSuccessMessage(true);
            setFId("");
            setFName("");
            setFPrice("");
            setTimeout(() => setShowSuccessMessage(false), 3000);
        } catch (error) {
            console.error("Error:", error);
        }
    };

    const isValidData = () => {
        return (
            fId.trim() !== ""
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
                    Thêm món ăn thành công!
                </div>
            )}
            <div className="logo-container">
                <div className="logo-inner">
                    <img src={logo2} alt="Logo" className="logo-img" />
                </div>
                <span className="Logo-name">Blue Star</span>
            </div>

            <div className="head-name">
                <h2>Thêm thông tin thức ăn</h2>
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
                                value={fId}
                                onChange={(e) => setFId(e.target.value)}
                            />
                        </div>
                        <div className="col-4">
                            <label htmlFor="fName" className="form-label">Tên thức ăn</label>
                            <input
                                type="text"
                                className="form-control"
                                id="fName"
                                placeholder="Tên thức ăn"
                                value={fName}
                                onChange={(e) => setFName(e.target.value)}
                            />
                        </div>
                        <div className="col-4">
                            <label htmlFor="fPrice" className="form-label">Giá tiền</label>
                            <input
                                type="text"
                                className="form-control"
                                id="fPrice"
                                placeholder="Giá tiền"
                                value={fPrice}
                                onChange={(e) => setFPrice(e.target.value)}
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

export default ThemDoAn;
