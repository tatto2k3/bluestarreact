import './HeaderNav.css';
import React, { useContext } from "react";
import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from 'react-router-dom';
import logo from '../../../assets/logo2.PNG';
import { useAuth } from '../../Utils/AuthService';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import 'font-awesome/css/font-awesome.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import ItineraryHeader from '../../Pages/ItineraryHeader/ItineraryHeader';
import { LanguageContext } from "../../Utils/LanguageContext";

export default function Header() {
    const [collapsed, setCollapsed] = useState(true);
    const { isLoggedIn, logout, avatar, setAvatar, name, setName } = useAuth();
    const [showDropdownAvt, setShowDropdownAvt] = useState(false);
    const [dropdown, setDropdown] = useState(null);
    const dropdownRef = useRef(null);
    const { language, changeLanguage, t } = useContext(LanguageContext);

    const navigate = useNavigate();

    const handleExit = () => {
        logout();
        navigate("/");
    }

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setShowDropdownAvt(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const timeoutRef = useRef(null);

    const handleMouseEnter = () => {
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
        setDropdown('travel');
    };

    const handleMouseLeave = () => {
        timeoutRef.current = setTimeout(() => {
            setDropdown(null);
        }, 300);
    };

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
                    <li><a href='/'>{t("home")}</a></li>
                    <li><a href='/explore'>{t("explore")}</a></li>
                    <li
                        className="dropdown-header"
                        onMouseEnter={handleMouseEnter}
                        onMouseLeave={handleMouseLeave}
                    >
                        <a href='/travel-info'>{t("travelInfo")}</a>
                        {dropdown === 'travel' && (
                            <div className={`dropdown-menu-header ${dropdown === 'travel' ? 'show' : 'hide'}`} onMouseEnter={handleMouseEnter}
                                onMouseLeave={handleMouseLeave}>
                                <ItineraryHeader />
                            </div>
                        )}
                    </li>
                    <li><a href='/bluestar-club'>{t("club")}</a></li>
                </ul>
                <div className="navbar-right">
                    <div className="navbar-top-right">
                        <FontAwesomeIcon icon={faMagnifyingGlass} className="search-icon" />
                        <a href="/help" className="navbar-help">{t("help")}</a>
                        <select
                            className="navbar-language"
                            value={language}
                            onChange={(e) => changeLanguage(e.target.value)}
                        >
                            <option value="vi">🇻🇳 {t("Tiếng Việt")}</option>
                            <option value="en">🇬🇧 {t("english")}</option>
                        </select>
                    </div>

                    <div className={isLoggedIn ? "navbar-avatar" : "navbar-login"} >
                        {isLoggedIn ? (
                            <div className="user-info" onClick={() => setShowDropdownAvt(!showDropdownAvt)} ref={dropdownRef}>
                                <img
                                    src={avatar || ''}
                                    alt="Avatar"
                                    className="user-avatar"
                                />
                                <a className='account-name'>{name}</a>
                                <div className={`dropdown-menu-avatar ${showDropdownAvt ? "show" : ""}`}>
                                    <p onClick={() => navigate('/profile')}>Thông tin cá nhân</p>
                                    <p onClick={handleExit}>Đăng xuất</p>
                                </div>
                            </div>
                        ) : (
                            <>
                                <Link to='/sign-in'>{t("login")}</Link>
                                <div></div>
                                <Link to='/sign-up'>{t("register")}</Link>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </header>
    );
}
