import React, { useState, useEffect } from "react";
import "./Personal.css";
import logo from "./img.jpg";
import AuthService, { useAuth } from "../../Layouts/Header/AuthService";

function Personal() {
    const { email, isAuthenticated } = useAuth();
    const [point, setPoint] = useState();
    const [userData, setUserData] = useState({
        email: "",
        password: "",
        name: "",
        position: "",
    });
    console.log("Email: ", localStorage.getItem('email'));
    const handleShowInfo = async () => {
        try {
            const response = await fetch(
                `http://localhost:8000/api/account/getAccountDetails?email=${localStorage.getItem('email') }`
            );
            if (response.ok) {
                const data = await response.json();
                console.log(data);
                setUserData(data.length > 0 ? data[0] : {});
            } else {
                console.error("Failed to fetch account details");
            }
        } catch (error) {
            console.error("Error fetching account details:", error);
        }
    };

    const handleShowInfoPoint = async () => {
        try {
            const response = await fetch(
                `http://localhost:8000/api/account/getPoints?email=${localStorage.getItem('email')}`
            );
            if (response.ok) {
                const data = await response.json();
                console.log(data);
                setPoint(data);
            } else {
                console.error("Failed to fetch account details");
            }
        } catch (error) {
            console.error("Error fetching account details:", error);
        }
    };


    useEffect(() => {
        if (email) {
            handleShowInfo();
            handleShowInfoPoint();
        }
    }, [email]);


    const handleSave = async function update(event) {
        event.preventDefault();
        try {
            if (!userData || !userData.email) {
                alert("Khách hàng không được tìm thấy");
                return;
            }
            const updatedData = {
                email: userData.email,
                name: userData.name,
                password: userData.password,
                position: "Khách hàng"
            };


            // Sử dụng fetch để thực hiện yêu cầu PUT
            const response = await fetch('http://localhost:8000/api/account/updateAccount', {
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

            alert("Trang cá nhân đã được cập nhật");

        } catch (err) {
            // Xử lý lỗi
            alert(err.message);
        }
    };
    const handleChange = (e) => {
        const { id, value } = e.target;

        setUserData({
            ...userData,
            [id]: value,
        });
    };
    if (!localStorage.getItem('email')) {
        return (
            <div className="containerPersonal">
                <div className="text-insertPersonal">
                    <h1>Bạn cần đăng nhập để truy cập trang này</h1>
                </div>
            </div>
        );
    }
    return (
        <div className="containerPersonal">
            <div className="imgPersonal">
                <img src={logo} alt="" />
            </div>
            <div className="text-insertPersonal">
                <h1>THÔNG TIN CÁ NHÂN</h1>
            </div>

            <div className="white-sectionPersonal">
                <div className="inforPersonal">
                    <form className="form-signinPersonal">
                        <div className="mb-3 row text-xl-center">
                            <label
                                htmlFor="name"
                                className="col-sm-2 col-form-label"
                            >
                                Họ và Tên
                            </label>
                            <div className="col-sm-10">
                                <input
                                    type="text"
                                    className="form-controlPersonal"
                                    id="name"
                                    placeholder="vd: Nguyen Van A"
                                    value={userData.name || ""}
                                    onChange={handleChange}
                                   
                                />
                            </div>
                        </div>
                        <div className="mb-3 row text-xl-center">
                            <label htmlFor="inputDay" className="col-sm-2 col-form-label">
                                Email
                            </label>
                            <div className="col-sm-10">
                                <input
                                    type="text"
                                    className="form-controlPersonal"
                                    id="inputDay"
                                    placeholder="vd: nguyenvana@gmail.com"
                                    value={userData.email || ""}
                                    readOnly
                                    
                                />
                            </div>
                        </div>
                        <div className="mb-3 row text-xl-center">
                            <label
                                htmlFor="inputTicketCode"
                                className="col-sm-2 col-form-label"
                            >
                                Điểm tích lũy
                            </label>
                            <div className="col-sm-10">
                                <input
                                    type="text"
                                    className="form-controlPersonal"
                                    id="point"
                                    placeholder=""
                                    value={point}
                                    readOnly
                                />
                            </div>
                        </div>

                        <div className="row text-xl-center">
                            <div className="col-sm-10">
                                <button
                                    type="submit"
                                    className="btn searchPersonal"
                                    id="btnSearch"
                                    onClick={handleSave}
                                >
                                    Sửa
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Personal;
