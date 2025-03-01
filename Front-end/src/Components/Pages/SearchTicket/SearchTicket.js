import React, { useEffect, useState } from "react";
import "./SearchTicket.css";
import { useNavigate } from 'react-router-dom';

const SearchTicket = () => {
    const navigate = useNavigate();
    const [searchInfo, setSearchInfo] = useState({
        tenKhachHang: '',
        ngaySinh: '',
        maChuyenBay: ''
    });

    const handleShowInfo = async () => {
        try {
            const response = await fetch(`http://localhost:8000/api/ticket/GetTicketReviewDetails?name=${searchInfo.tenKhachHang}`);
            const data = await response.json();

            console.log("Data from API:", data);

            navigate('/ticket-review', { state: { selectedCustomerInfo: data } });
        } catch (error) {
            console.error("Error fetching ticket details:", error);
        }
    };

    return (
        <div className="container2">
        <div className="text-insertSearch">
            <h1>TÌM KIẾM VÉ MÁY BAY</h1>
        </div>

        <div className="white-section">

        <div className="inforSearch">
            <form className="form-signin2">
                        <div className="mb-3 row text-xl-center">
                            <label htmlFor="inputFullname" className="col-sm-2 col-form-label">Họ và Tên</label>
                            <div className="col-sm-10">
                                <input
                                    type="text"
                                    className="form-controlSearchTicket"
                                    id="inputFullname"
                                    placeholder="vd: Nguyen Van A"
                                    value={searchInfo.tenKhachHang}
                                    onChange={(e) => setSearchInfo({ ...searchInfo, tenKhachHang: e.target.value })}
                                />
                            </div>
                        </div>
                        <div className="mb-3 row text-xl-center">
                            <label htmlFor="inputDay" className="col-sm-2 col-form-label">Ngày, tháng, năm</label>
                            <div className="col-sm-10">
                                <input
                                    type="date"
                                    className="form-controlSearchTicket"
                                    id="inputDay"
                                    value={searchInfo.ngayKhoiHanh}
                                    onChange={(e) => setSearchInfo({ ...searchInfo, ngayKhoiHanh: e.target.value })}
                                />
                            </div>
                        </div>
                        <div className="mb-3 row text-xl-center">
                            <label htmlFor="inputTicketCode" className="col-sm-2 col-form-label">CCCD</label>
                            <div className="col-sm-10">
                                <input
                                    type="text"
                                    className="form-controlSearchTicket"
                                    id="inputTicketCode"
                                    value={searchInfo.maVe}
                                    onChange={(e) => setSearchInfo({ ...searchInfo, maVe: e.target.value })}
                                />
                            </div>
                        </div>

                        <div className="row text-xl-center">
                            <div className="col-sm-10">
                                <button
                                    type="button"
                                    className="btn search"
                                    id="btnSearch"
                                    onClick={handleShowInfo}
                                >
                                    Tìm
                                </button>
                            </div>
                        </div>
            </form>
        </div>
    </div>
    </div>
    );
};
export default SearchTicket;