import React, { useState, useEffect } from "react";
import { useAuth } from "../../Utils/AuthService";
import axios from "axios";
import "./Profile.css";
import provinceData from "../../../assets/province.json";
import { useSearch } from "../../CustomHooks/SearchContext";
import Loading from '../../LoadingAnimation/Loading';
import api from "../../Utils/api";


export default function Profile() {
    const [isLoading, setIsLoading] = useSearch();
    const { avatar } = useAuth();
    const [user, setUser] = useState({
        fullName: "",
        email: "",
        dob: "",
        numId: "",
        phone: "",
        city: "",
        district: "",
    });

    const [provinces, setProvinces] = useState([]);
    const [districts, setDistricts] = useState([]);

    useEffect(() => {
        setProvinces(provinceData.province);
    }, []);

    const token = localStorage.getItem("access_token");

    useEffect(() => {
        const fetchUserData = async () => {
            setIsLoading(true);
            try {
                const response = await api.get("/get-user-meta");
                const userData = response.data;
                console.log(userData);
                setUser({
                    fullName: userData?.meta?.fullName || "",
                    email: userData?.meta?.email || "",
                    dob: userData?.meta?.dob || "",
                    numId: userData?.meta?.numId || "",
                    phone: userData?.meta?.phone || "",
                    city: userData?.meta?.city || "",
                    district: userData?.meta?.district || "",
                });

                if (userData?.meta?.city) {
                    updateDistricts(userData.meta.city);
                }
            } catch (error) {
                console.error("Lỗi khi lấy thông tin người dùng:", error);
            }
            setIsLoading(false);
        };

        fetchUserData();
    }, [token]);

    const handleChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    const updateDistricts = (provinceId) => {
        const filteredDistricts = provinceData.district.filter(
            (district) => district.idProvince === provinceId
        );
        setDistricts(filteredDistricts);
    };

    const handleProvinceChange = (e) => {
        const selectedProvinceId = e.target.value;
        setUser(prevUser => ({ ...prevUser, city: selectedProvinceId, district: "" }));
        updateDistricts(selectedProvinceId);
    };

    const handleDistrictChange = (e) => {
        setUser(prevUser => ({ ...prevUser, district: e.target.value }));
    };

    const handleSubmit = async () => {
        try {
            console.log(user);
            const response = await api.post("/update-user-meta", user);
            alert("Thông tin cập nhật thành công");
            console.log("Thông tin cập nhật thành công:", response.data);
        } catch (error) {
            alert("Lỗi khi cập nhật thông tin");
            console.error("Lỗi khi cập nhật thông tin:", error);
        }
    };

    return (
        !isLoading ? (
            <div className="container">
                <div className="row gutters">
                    <div className="col-xl-3 col-lg-3 col-md-12 col-sm-12 col-12">
                        <div className="card-profile h-100">
                            <div className="card-body">
                                <div className="account-settings">
                                    <div className="user-profile">
                                        <div className="user-avatar-profile">
                                            <img src={avatar} alt="User Avatar" />
                                        </div>
                                        <h5 className="user-name">{user.fullName}</h5>
                                        <h6 className="user-email">{user.email}</h6>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-xl-9 col-lg-9 col-md-12 col-sm-12 col-12">
                        <div className="card-profile h-100">
                            <div className="card-body">
                                <h6 className="mb-2 text-primary">Cập nhật thông tin</h6>
                                <div className="row gutters">
                                    <div className="col-md-6">
                                        <label>Họ và tên</label>
                                        <input type="text" name="fullName" className="form-control" value={user.fullName} onChange={handleChange} />
                                    </div>
                                    <div className="col-md-6">
                                        <label>Ngày sinh</label>
                                        <input type="date" name="dob" className="form-control" value={user.dob} onChange={handleChange} />
                                    </div>
                                    <div className="col-md-6">
                                        <label>Email</label>
                                        <input type="email" name="email" className="form-control" value={user.email} onChange={handleChange} />
                                    </div>
                                    <div className="col-md-6">
                                        <label>Số điện thoại</label>
                                        <input type="text" name="phone" className="form-control" value={user.phone} onChange={handleChange} />
                                    </div>
                                    <div className="col-md-6">
                                        <label>Căn cước công dân</label>
                                        <input type="number" name="numId" className="form-control" value={user.numId} onChange={handleChange} />
                                    </div>
                                </div>
                                <h6 className="mt-3 mb-2 text-primary">Địa chỉ</h6>
                                <div className="row gutters">
                                    <div className="col-md-6">
                                        <label>Tỉnh / Thành Phố</label>
                                        <select className="form-control" name="city" value={user.city} onChange={handleProvinceChange}>
                                            <option value="">Chọn Tỉnh / Thành phố</option>
                                            {provinceData.province.map((province) => (
                                                <option key={province.idProvince} value={province.idProvince}>
                                                    {province.name}
                                                </option>
                                            ))}
                                        </select>
                                    </div>

                                    <div className="col-md-6">
                                        <label>Huyện / Quận</label>
                                        <select className="form-control" name="district" value={user.district} onChange={handleDistrictChange}>
                                            <option value="">Chọn Quận / Huyện</option>
                                            {districts.map((district) => (
                                                <option key={district.idDistrict} value={district.idDistrict}>
                                                    {district.name}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                                <div className="text-right mt-3">
                                    <button className="btn btn-primary" onClick={handleSubmit}>Cập nhật</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        ) : (
            <div className="loading-icons">
                <Loading />
            </div>
        )
    );
}
