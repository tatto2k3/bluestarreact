import React, { useState, useEffect } from "react";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import "./TicketPage.css";
import { useSearch } from "../../CustomHooks/SearchContext";
import provinceData from "../../../assets/province.json";
import { useAuth } from "../../Utils/AuthService";
import api from "../../Utils/api";

export default function TicketPage() {
    const { isLoggedIn, logout, avatar, setAvatar, name, setName } = useAuth();
    const [provinces, setProvinces] = useState([]);
    const [numberTickets, setNumberTickets] = useState(1);
    const [passengerList, setPassengerList] = useState([]);

    useEffect(() => {
        setProvinces(provinceData.province);

        const savedNumberTickets = localStorage.getItem("numberTickets");
        if (savedNumberTickets) {
            setNumberTickets(parseInt(savedNumberTickets));
        }

        const savedPassengerList = localStorage.getItem("passengerList");
        if (savedPassengerList) {
            const parsedList = JSON.parse(savedPassengerList);
            setPassengerList(parsedList.length === numberTickets ? parsedList : initializePassengerList(numberTickets));
        } else {
            setPassengerList(initializePassengerList(numberTickets));
        }
    }, []);

    useEffect(() => {
        localStorage.setItem("numberTickets", numberTickets);
        setPassengerList((prevList) => {
            if (numberTickets > prevList.length) {
                return [
                    ...prevList,
                    ...initializePassengerList(numberTickets - prevList.length),
                ];
            } else {
                return prevList.slice(0, numberTickets);
            }
        });
    }, [numberTickets]);

    useEffect(() => {
        localStorage.setItem("passengerList", JSON.stringify(passengerList));
    }, [passengerList]);

    const splitFullName = (fullName) => {
        if (!fullName) return { FirstName: "", LastName: "" };

        const nameParts = fullName.trim().split(" ");
        if (nameParts.length === 1) {
            return { FirstName: nameParts[0], LastName: "" };
        }

        return {
            FirstName: nameParts[0],
            LastName: nameParts.slice(1).join(" "),
        };
    };

   

    useEffect(() => {
        const fetchUserMeta = async () => {
            if (isLoggedIn && numberTickets === 1) {
                try {
                    const response = await api.get("/get-user-meta");
                    const userData = response.data.meta;
                    console.log("User data:", userData);
        
                    if (userData) {
                        const { FirstName, LastName } = splitFullName(userData.fullName);
        
                        // Lọc danh sách quận/huyện từ ID thành phố (city)
                        const matchingDistricts = provinceData.district.filter(
                            (d) => d.idProvince === userData.city
                        );
        
                        setPassengerList([
                            {
                                FirstName,
                                LastName,
                                DateOfBirth: userData?.dob || "",
                                PassportNumber: userData?.numId || "",
                                Country: "Việt Nam",
                                City: userData?.city || "",
                                District: matchingDistricts.find(d => d.idDistrict === userData.district)?.name || "",
                                Contact: userData?.phone || "",
                                Email: userData?.email || "",
                                Discount: userData.Discount || "",
                                Districts: matchingDistricts, // Danh sách huyện/quận của thành phố
                                SeatId: "",
                            },
                        ]);
                    }
                } catch (error) {
                    console.error("Lỗi khi lấy dữ liệu người dùng:", error);
                }
            }
        };
        

        fetchUserMeta();
    }, [isLoggedIn, numberTickets]);


    const initializePassengerList = (count) => {
        return Array.from({ length: count }, () => ({
            FirstName: "",
            LastName: "",
            DateOfBirth: "",
            PassportNumber: "",
            Country: "Việt Nam",
            City: "",
            District: "",
            Contact: "",
            Email: "",
            Discount: "",
            Districts: [],
            SeatId: "",
        }));
    };

    const handleInputChange = (index, fieldName, value) => {
        const updatedList = [...passengerList];
        updatedList[index][fieldName] = value;
        setPassengerList(updatedList);
    };

    const handleCityChange = (index, e) => {
        const selectedCityId = e.target.value;
        const updatedList = [...passengerList];

        updatedList[index].City = selectedCityId;
        updatedList[index].District = "";
        updatedList[index].Districts = provinceData.district.filter(
            (d) => d.idProvince === selectedCityId
        );

        setPassengerList(updatedList);
    };

    return (
        <>
            {passengerList.map((passenger, index) => (
                <Paper key={index} className="ticket-wrapper">
                    <div className="ticket-body">
                        <h3>Hành khách {index + 1}</h3>
                        <Grid container spacing={2}>
                            <Grid item md={6}>
                                <div className="ticket-input-wrapper">
                                    <label className="ticket-label">Tên họ</label>
                                    <input
                                        className="ticket-input"
                                        placeholder="Nguyễn"
                                        value={passenger.FirstName}
                                        onChange={(e) =>
                                            handleInputChange(index, "FirstName", e.target.value)
                                        }
                                    />
                                </div>
                                <div className="ticket-input-wrapper">
                                    <label className="ticket-label">Ngày sinh</label>
                                    <input
                                        className="ticket-input"
                                        type="date"
                                        value={passenger.DateOfBirth}
                                        onChange={(e) =>
                                            handleInputChange(index, "DateOfBirth", e.target.value)
                                        }
                                    />
                                </div>
                                <div className="ticket-input-wrapper">
                                    <label className="ticket-label">Quốc gia</label>
                                    <input className="ticket-input" value={passenger.Country} readOnly />
                                </div>
                                <div className="ticket-input-wrapper">
                                    <label className="ticket-label">Huyện / Quận</label>
                                    <select
                                        className="ticket-input"
                                        value={passenger.District}
                                        onChange={(e) =>
                                            handleInputChange(index, "District", e.target.value)
                                        }
                                        disabled={!passenger.City}
                                    >
                                        <option value="">Chọn Huyện / Quận</option>
                                        {passenger.Districts.map((district) => (
                                            <option key={district.idDistrict} value={district.name}>
                                                {district.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div className="ticket-input-wrapper">
                                    <label className="ticket-label">Email</label>
                                    <input
                                        className="ticket-input"
                                        placeholder="nguyenvana@gmail.com"
                                        type="email"
                                        value={passenger.Email}
                                        onChange={(e) =>
                                            handleInputChange(index, "Email", e.target.value)
                                        }
                                    />
                                </div>
                            </Grid>

                            <Grid item md={6}>
                                <div className="ticket-input-wrapper">
                                    <label className="ticket-label">Tên đệm và tên</label>
                                    <input
                                        className="ticket-input"
                                        placeholder="Văn A"
                                        value={passenger.LastName}
                                        onChange={(e) =>
                                            handleInputChange(index, "LastName", e.target.value)
                                        }
                                    />
                                </div>
                                <div className="ticket-input-wrapper">
                                    <label className="ticket-label">CCCD</label>
                                    <input
                                        className="ticket-input"
                                        type="number"
                                        placeholder="060203002255"
                                        value={passenger.PassportNumber}
                                        onChange={(e) =>
                                            handleInputChange(index, "PassportNumber", e.target.value)
                                        }
                                    />
                                </div>
                                <div className="ticket-input-wrapper">
                                    <label className="ticket-label">Tỉnh / Thành phố</label>
                                    <select
                                        className="ticket-input"
                                        value={passenger.City}
                                        onChange={(e) => handleCityChange(index, e)}
                                    >
                                        <option value="">Chọn Tỉnh / Thành phố</option>
                                        {provinces.map((province) => (
                                            <option key={province.idProvince} value={province.idProvince}>
                                                {province.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div className="ticket-input-wrapper">
                                    <label className="ticket-label">Số điện thoại</label>
                                    <input
                                        className="ticket-input"
                                        type="number"
                                        placeholder="0797597045"
                                        value={passenger.Contact}
                                        onChange={(e) =>
                                            handleInputChange(index, "Contact", e.target.value)
                                        }
                                    />
                                </div>
                            </Grid>
                        </Grid>
                    </div>
                </Paper>
            ))}
        </>
    );
}
