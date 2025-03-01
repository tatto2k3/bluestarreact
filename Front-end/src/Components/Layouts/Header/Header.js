import React from 'react';
import { useState, useEffect } from "react";
import { Collapse, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from 'reactstrap';
import { Link, useNavigate } from 'react-router-dom';
import './Header.css';
import logo from '../../../assets/logo2.PNG';
import logo2 from '../../../assets/flight.png';
import avatar from '../../../assets/avatar.svg'; // Import your avatar image
import AuthService, { useAuth } from './AuthService';

export default function Header() {
    const [collapsed, setCollapsed] = useState(true);
    const { isLoggedIn, logout } = useAuth();  // Add state for login status
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const navigate = useNavigate();

    const toggleNavbar = () => setCollapsed(!collapsed);
    const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

    useEffect(() => {
        // You can use the isLoggedIn state directly here if needed
    }, [isLoggedIn]);

    const handleExit = () =>{
        logout();
        navigate("/");
    }
    return (
        <header>
            <div className='navbar'>
        <img src={logo} alt="Logo" />

        <ul className='navbar-links'>
            <li><a href='/'>Trang chủ</a></li>
            <li><a href='/search-ticket'>Tra cứu</a></li>
            <li><a href='/explore'>Khám phá</a></li>
            <li><a href='/about-us'>Về chúng tôi</a></li>
        </ul>

                {isLoggedIn ? (
                    <div className='navbar-avatar' onClick={toggleDropdown}>
                        {avatar && <img src={avatar} alt="Avatar" />}
                        {dropdownOpen && (
                            <div className="dropdown">
                                <ul>
                                    <li><Link to="/personal">Trang cá nhân</Link></li>
                                    <li><Link to="/search-ticket">Tra cứu lịch sử mua vé</Link></li>
                                    <li onClick={logout }> <Link to="/" >Đăng xuất</Link></li>
                                </ul>
                            </div>
                        )}
                    </div>
                ) : (
                    <div className='navbar-login'>
                        <a href='/sign-in'>Đăng nhập</a>
                        <div></div>
                        <a href='/sign-up'>Đăng ký</a>
                    </div>
                )}
        </div>
            <div className="header-body main-color">
                <img className="header-image-plane" src={logo2} />
            </div>
        </header>
    )
}