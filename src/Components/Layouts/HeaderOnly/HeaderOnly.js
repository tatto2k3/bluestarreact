import React from 'react';
import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../Utils/AuthService';
import '../HeaderReview/HeaderReview.css';
import logo from '../../../assets/logo2.PNG';
import flight from '../../../assets/flight.png';
import avatar from '../../../assets/avatar.svg';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import 'font-awesome/css/font-awesome.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

export default function HeaderOnly() {
    const [collapsed, setCollapsed] = useState(true);
    const { isLoggedIn, logout, avatar, setAvatar, name, setName } = useAuth();
    const [showDropdown, setShowDropdown] = useState(false);
    const dropdownRef = useRef(null);

    const navigate = useNavigate();

    const handleExit = () => {
        logout();
        navigate("/");
    }

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setShowDropdown(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <header>
            <div className='navbar'>
                <img
                    src={logo}
                    alt="Logo"
                    className="logo-rotate"
                    onClick={() => navigate('/')}
                />
                <ul className='navbar-links'>
                    <li><a href='/'>Trang chủ</a></li>
                    <li><a href='/explore'>Khám phá</a></li>
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

                    <div className={isLoggedIn ? "navbar-avatar" : "navbar-login"} >
                        {isLoggedIn ? (
                            <div className="user-info" onClick={() => setShowDropdown(!showDropdown)} ref={dropdownRef}>
                                <img
                                    src={avatar || ''}
                                    alt="Avatar"
                                    className="user-avatar"

                                />
                                <a className='account-name'>{name}</a>
                                <div className={`dropdown-menu-avatar ${showDropdown ? "show" : ""}`}>
                                    <p>Thông tin cá nhân</p>
                                    <p onClick={handleExit}>Đăng xuất</p>
                                </div>
                            </div>
                        ) : (
                            <>
                                <Link to='/sign-in'>Đăng nhập</Link>
                                <div></div>
                                <Link to='/sign-up'>Đăng ký</Link>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </header>
    );
}
