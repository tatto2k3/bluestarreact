import React from 'react';
import { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import './HeaderReview.css';
import logo from '../../../assets/logo2.PNG';
import flight from '../../../assets/flight.png';
import avatar from '../../../assets/avatar.svg';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import 'font-awesome/css/font-awesome.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

export default function HeaderReview() {
    const [collapsed, setCollapsed] = useState(true);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const navigate = useNavigate();

    const toggleNavbar = () => setCollapsed(!collapsed);
    const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

    const handleExit = () => {
        navigate("/");
    }

    return (
        <header>
            <div className='navbar'>
                <img src={logo} alt="Logo" className="logo-rotate" />

                <ul className='navbar-links'>
                    <li><a href='/explore'>Khám phá</a></li>
                    <li><a href='/booking'>Đặt vé</a></li>
                    <li><a href='/travel-info'>Thông tin hành trình</a></li>
                    <li><a href='/bluestar-club'>Bluestar Club</a></li>
                </ul>
                <div className="navbar-right">
                    <div className="navbar-top-right">
                        <FontAwesomeIcon icon={faMagnifyingGlass} className="search-icon" />
                        <a href="/help" className="navbar-help">Trợ giúp</a>
                        <select className="navbar-language">
                            <option value="vi">🇻🇳 Tiếng Việt</option>
                            <option value="en">🇬🇧 English</option>
                        </select>
                    </div>

                    <div className='navbar-login'>
                        <a href='/sign-in'>Đăng nhập</a>
                        <div></div>
                        <a href='/sign-up'>Đăng ký</a>
                    </div>
                </div>
            </div>
            <div className="header-body main-color">
                <img src={flight} alt="flight" className="header-image" />
                <div className="box-title">
                    <div className="title-container">
                        <div className="refx-title title">Nhập thông tin hành khách</div>
                    </div>
                </div>
            </div>
        </header>
    );
}
