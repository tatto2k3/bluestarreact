import React from "react";
import './NhanVien.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import logo2 from '../../../../assets/logo2.PNG';

const NhanVien = () => {
    return (
        <div className="container-fluid">

            <div className="logo-container">
                <div className="logo-inner">
                    <img src={logo2} alt="Logo" className="logo-img" />
                </div>
                <span className="Logo-name">Blue Star</span>
            </div>

            <div className="head-name">
                <h2>Trang quản lý danh cho nhân viên</h2>
            </div>
            
            <div className="infor-nv">
                {/* Remove password fields */}
                <div className="mb-3">
                    <label htmlFor="inputEmail" className="col-form-label">Email</label>
                    <input type="email" className="form-control" id="inputEmail" placeholder="Email" required />
                </div>
                <div className="mb-3">
                    <label htmlFor="inputPassword" className="col-form-label">Password</label>
                    <input type="password" className="form-control" id="inputPassword" placeholder="Password" required />
                </div>
                <div className="mb-3 login ">
                    <button type="submit" className="btn btn-primary btn-block" id="btnLogin-nv">Login now</button>
                </div>
                <div className="mb-3 d-flex justify-content-between">
                    <a href="#">Forgot password ?</a>
                    <a href="#">Sign up</a>
                </div>
            </div>
            <div className="back">
                <a href="./KhachHang" className="text-decoration-underline-mk">Quay lại trang dành cho khách hàng</a>
            </div>
        </div>
    );
}

export default NhanVien;
