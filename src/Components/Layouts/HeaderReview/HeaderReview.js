import React from 'react';
import { useState } from "react";
import { Collapse, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';
import logo from '../../../assets/logo2.PNG'
import { useEffect } from "react";
import './HeaderReview.css';
import avatar from '../../../assets/avatar.svg'; // Import your avatar image
import AuthService, { useAuth } from '../Header/AuthService';
export default function HeaderReview() {
    const [collapsed, setCollapsed] = useState(true);
    const { isLoggedIn, logout } = useAuth();  // Add state for login status
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const toggleNavbar = () => setCollapsed(!collapsed);
    const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

    useEffect(() => {
        // You can use the isLoggedIn state directly here if needed
    }, [isLoggedIn]);

  return (
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

        {/*<div className='navbar-smallscreen'>
            <GiHamburgerMenu color='#fff' fontSize={27} onClick={() =>{setToggleMenu(true)}} />

            {toggleMenu && (

            <div className='navbar-smallscreen_overlay flex__center'>
              <AiOutlineClose fontSize={27} className="overlay__close" onClick={() => {setToggleMenu(false)}} />

              <ul className='navbar-smallscreen-links'>
                <li><a href='#home' onClick={() => {setToggleMenu(false)}}>Home</a></li>
                <li><a href='#aboutus' onClick={() => {setToggleMenu(false)}}>About</a></li>
                <li><a href='#services' onClick={() => {setToggleMenu(false)}}>Services</a></li>
                <li><a href='#prevention' onClick={() => {setToggleMenu(false)}}>prevention</a></li>
                <li><a href='#contact' onClick={() => {setToggleMenu(false)}}>contact</a></li>
              </ul>

            </div>
            )}
            


        </div>
        */}
    </div>
  )
}