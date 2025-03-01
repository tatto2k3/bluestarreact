import React from 'react';
import { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import './Header.css';
import logo from '../../../assets/logo2.PNG';
import avatar from '../../../assets/avatar.svg';
import AuthService, { useAuth } from './AuthService';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import 'font-awesome/css/font-awesome.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

export default function Header() {
    const [collapsed, setCollapsed] = useState(true);
    const { isLoggedIn, logout } = useAuth();
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const navigate = useNavigate();

    const toggleNavbar = () => setCollapsed(!collapsed);
    const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

    const handleExit = () => {
        logout();
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
                <div id="carouselExampleIndicators" className="carousel slide" data-ride="carousel">
                    <ol className="carousel-indicators">
                        <li data-target="#carouselExampleIndicators" data-slide-to="0" className="active"></li>
                        <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
                        <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
                    </ol>
                    <div className="carousel-inner">
                        <div className="carousel-item active">
                            <img className="d-block w-100" src="https://www.vietnamairlines.com/~/media/1CC82D557ABD42F4B33ED4ABB5660FF4.ashx" alt="First slide" />
                        </div>
                        <div className="carousel-item">
                            <img className="d-block w-100" src="https://www.vietnamairlines.com/~/media/FC93E9643B8242779DC78985199290AF.ashx" alt="Second slide" />
                        </div>
                        <div className="carousel-item">
                            <img className="d-block w-100" src="https://enewsletter-vietnamairlines.com/html/email/y22/220304_ec_Uu_dai_hoi_vien/assets/img/vi/top_2x.jpg" alt="Third slide" />
                        </div>
                        <div className="carousel-item">
                            <img className="d-block w-100" src="https://enewsletter-vietnamairlines.com/html/email/y24/240628_ec_5_FFP/assets/img/vi/top_2x.jpg" alt="Fourth slide" />
                        </div>
                        <div className="carousel-item">
                            <img className="d-block w-100" src="https://www.bambooairways.com/documents/20122/768330/Banner_2.png/14baa1c6-3b02-aecf-b044-ce312f7a1182?t=1689611909463" alt="Fifth slide" />
                        </div>
                    </div>
                    <a className="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
                        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span className="sr-only">Previous</span>
                    </a>
                    <a className="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
                        <span className="carousel-control-next-icon" aria-hidden="true"></span>
                        <span className="sr-only">Next</span>
                    </a>
                </div>
            </div>
        </header>
    );
}
