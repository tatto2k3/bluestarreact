import React from "react";
import './CaNhan.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import logo2 from '../../../../assets/logo2.PNG';

const CaNhan = () => {
    return (
        <div className="container-fluid">

            <div className="logo-container">
                <div className="logo-inner">
                    <img src={logo2} alt="Logo" className="logo-img" />
                </div>
                <span className="Logo-name">Blue Star</span>
            </div>

            <div className="head-name">
                <h2>Thông tin cá nhân</h2>
            </div>
            
            <div className="infor-cn">
                <form className="form-signin-cn">
                  <div className="row mb-3">
                    <div className="col-4">
                      <label htmlFor="maKhachHang" className="form-label">Mã khách hàng</label>
                      <input type="text" className="form-control" id="maKhachHang" placeholder="Mã khách hàng" />
                    </div>
                    <div className="col-4">
                      <label htmlFor="tenKhachHang" className="form-label">Tên khách hàng</label>
                      <input type="text" className="form-control" id="tenKhachHang" placeholder="Tên khách hàng" />
                    </div>
                    <div className="col-4">
                      <label htmlFor="soDienThoai" className="form-label">Số điện thoại</label>
                      <input type="tel" className="form-control" id="soDienThoai" placeholder="Số điện thoại" />
                    </div>
                  </div>
                  <div className="row mb-3">
                    <div className="col-6">
                      <label htmlFor="email" className="form-label">Email</label>
                      <input type="email" className="form-control" id="email" placeholder="Email" />
                    </div>
                    <div className="col-6">
                      <label htmlFor="diemTichLuy" className="form-label">Điểm tích lũy</label>
                      <input type="number" className="form-control" id="diemTichLuy" placeholder="Điểm tích lũy" />
                    </div>
                  </div>
                  <div className="d-flex justify-content-center mt-3">
                    <button type="submit" className="btn btn-primary">Lưu</button>
                  </div>
                </form>
              </div>
            <div className="back">
                <a href="./KhachHang" className="text-decoration-underline-mk">Quay lại trang dành cho khách hàng</a>
            </div>
        </div>
    );
}

export default CaNhan;
