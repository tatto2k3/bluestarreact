import React, { useState, useEffect } from 'react';
import './Sidebar.css';
import logo from '../../../../src/assets/logo2.PNG';
import { useNavigate } from 'react-router-dom';
import  { useAuth } from '../../Utils/AuthService';

const Sidebar = ({ children }) => { 
    const [discountCount, setDiscountCount] = useState(0);
    const { isLoggedIn, logout } = useAuth();
    const navigate = useNavigate();


    const handleExit = () => {
        localStorage.removeItem('isLoggedIn');
        // Clear the items from local storage
        localStorage.removeItem('avatar');
        localStorage.removeItem('email');

        navigate("/");
    }

    return (
        <div>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.0.0/dist/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossOrigin="anonymous" />
        <link href="https://cdn.jsdelivr.net/npm/bootstrap-icons/font/bootstrap-icons.css" rel="stylesheet" />
        <link rel="stylesheet" href="style_admin.css" />
        <title>Admin Page</title>
        {/* Sidebar */}
        <div className='adminContent'>
        <div id="sidebar-container" className="sidebar-expanded d-none d-md-block">{/* d-* hiddens the Sidebar in smaller devices. Its itens can be kept on the Navbar 'Menu' */}
          {/* Bootstrap List Group */}
          <ul className="list-group">
            {/* Separator with title */}
            <li className="list-group-item sidebar-separator-title text-muted d-flex align-items-center menu-collapsed">
              <div className="logo-container">
                <div className="logo-inner">
                                    <img src={logo} alt="Logo" className="logo-img" />
                </div>
                <span className="Logo-name">Blue Star</span>
              </div>
            </li>
            {/* /END Separator */}
            {/* Menu with submenu */}
            <a href="/DoanhSo" className="bg-transparent list-group-item list-group-item-action flex-column align-items-start">
              <div className="d-flex w-100 justify-content-start align-items-center">
                <i className="bi bi-bar-chart-line" />
                <span className="menu-collapsed">Doanh số</span>
                <span className="submenu-icon ml-auto" />
              </div>
            </a>
            <a href="/KhachHang" className="bg-transparent list-group-item list-group-item-action flex-column align-items-start">
              <div className="d-flex w-100 justify-content-start align-items-center">
                <i className="bi bi-people" />
                <span className="menu-collapsed">Khách hàng</span>
                <span className="submenu-icon ml-auto" />
              </div>
            </a>
            <a href="/Ve" className="bg-transparent list-group-item list-group-item-action">
              <div className="d-flex w-100 justify-content-start align-items-center">
                <i className="bi bi-ticket-detailed" />
                <span className="menu-collapsed">Vé</span>    
              </div>
            </a>
            <a href="/MayBay" className="bg-transparent list-group-item list-group-item-action">
              <div className="d-flex w-100 justify-content-start align-items-center">
                <i className="bi bi-airplane" />
                <span className="menu-collapsed"> Máy bay</span>
              </div>
            </a>
            <a href="ChuyenBay" className="bg-transparent list-group-item list-group-item-action">
              <div className="d-flex w-100 justify-content-start align-items-center">
                <i className="bi bi-airplane-engines-fill" />
                <span className="menu-collapsed">Chuyến bay</span>
              </div>
            </a>
            <a href="/SanBay" className="bg-transparent list-group-item list-group-item-action">
              <div className="d-flex w-100 justify-content-start align-items-center">
                <i className="bi bi-geo-alt" />
                <span className="menu-collapsed">Sân bay</span>
              </div>
            </a>
            <a href="/HanhLy" data-toggle="sidebar-colapse" className="bg-transparent list-group-item list-group-item-action d-flex align-items-center">
              <div className="d-flex w-100 justify-content-start align-items-center">
                <i className="bi bi-duffle" />
                <span id="collapse-text" className="menu-collapsed">Hành lý</span>
              </div>
            </a>
            <a href="/DoAn" data-toggle="sidebar-colapse" className="bg-transparent list-group-item list-group-item-action d-flex align-items-center">
              <div className="d-flex w-100 justify-content-start align-items-center">
                <i className="bi bi-cup-hot" />
                <span id="collapse-text" className="menu-collapsed">Đồ ăn</span>
              </div>
            </a>
            <a href="/MaGiamGia" data-toggle="sidebar-colapse" className="bg-transparent list-group-item list-group-item-action d-flex align-items-center">
              <div className="d-flex w-100 justify-content-start align-items-center">
                <i className="bi bi-gift" />
                                <span id="collapse-text" className="menu-collapsed">Mã giảm giá <span className="badge badge-pill badge-dark ml-2">{discountCount}</span> </span>
              </div>
            </a>
            {/* Logo */}
                        <br />
                        <a onClick={handleExit} data-toggle="sidebar-colapse" className="bg-transparent list-group-item list-group-item-action d-flex align-items-center">
              <div className="d-flex w-100 justify-content-start align-items-center">
                <i className="bi bi-box-arrow-right" />
                <span id="collapse-text" className="menu-collapsed" onClick={logout}>Thoát </span>
              </div>
            </a>   
          </ul>{/* List Group END*/}
        </div>{/* sidebar-container END */}
        <div className="right-content">
        {children}
        </div>
        </div>
      </div>
    );
}
export default Sidebar;