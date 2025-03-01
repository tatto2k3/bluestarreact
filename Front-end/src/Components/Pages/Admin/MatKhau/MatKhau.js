import React from "react";
import './MatKhau.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import logo2 from '../../../../assets/logo2.PNG';

const MatKhau = () => {
    return (
        <div className="container-fluid">
            <div className="logo-container">
                <div className="logo-inner">
                    <img src={logo2} alt="Logo" className="logo-img" />
                </div>
                <span className="Logo-name">Blue Star</span>
            </div>
            <div className="head-name">
                <h2>Đổi mật khẩu</h2>
            </div>
            <div className="infor-mk">
                {/* Remove password fields */}
                <div className="mb-3">
                    <label htmlFor="oldPassword" className="form-label">Mật khẩu cũ</label>
                    <input type="text" className="form-control" id="oldPassword" required />
                </div>
                <div className="mb-3">
                    <label htmlFor="newPassword" className="form-label">Mật khẩu mới</label>
                    <input type="text" className="form-control" id="newPassword" required />
                </div>
                <div className="mb-3">
                    <label htmlFor="confirmPassword" className="form-label">Xác nhận mật khẩu mới</label>
                    <input type="text" className="form-control" id="confirmPassword" required />
                </div>
                <div className="d-flex justify-content-center mt-3">
                    <button type="submit" className="btn btn-primary">Lưu</button>
                </div>
            </div>
            <div className="back">
                <a href="./KhachHang" className="text-decoration-underline-mk">Quay lại trang dành cho khách hàng</a>
            </div>
        </div>
    );
}

export default MatKhau;
