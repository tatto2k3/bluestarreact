import React, { useEffect, useState } from "react";
import './HanhLy.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'bootstrap/dist/css/bootstrap.min.css';

const HanhLy = () => {
    const [searchKeyword, setSearchKeyword] = useState('');
    const [luggages, setLuggages] = useState([]);
    const [selectedLuggages, setSelectedLuggages] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(8);
    const navigate = useNavigate();
    const [showConfirmation, setShowConfirmation] = useState(false);

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = luggages.slice(indexOfFirstItem, indexOfLastItem);

    const paginate = pageNumber => setCurrentPage(pageNumber);

    const handleClick = () => {
        navigate('/HanhLy_Them');
    };



    useEffect(() => {
        // Lấy danh sách khách hàng từ API hoặc nguồn dữ liệu khác
        const fetchData = async () => {
            try {
                const response = await fetch("http://localhost:8000/api/luggage/getLuggages");
                const data = await response.json();
                setLuggages(data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, []);


    const handleCheckboxChange = (luggageId) => {
        if (selectedLuggages.includes(luggageId)) {
            // Nếu đã chọn thì hủy chọn
            setSelectedLuggages([]);
        } else {
            // Nếu chưa chọn thì chọn
            setSelectedLuggages([luggageId]);
        }
    };



    const handleShowInfo = async () => {
        try {
            if (selectedLuggages.length > 0) {
                const response = await fetch(`http://localhost:8000/api/luggage/getLuggageDetails?luggage_Ids=${selectedLuggages.join(',')}`);
                const data = await response.json();

                // Chuyển hướng sang trang sửa khách hàng và truyền thông tin khách hàng
                navigate('/HanhLy_Sua', { state: { selectedLuggageInfo: data } });
            } else {
                console.log("No Luggages selected.");
            }
        } catch (error) {
            console.error("Error fetching Luggage details:", error);
        }
    };

    const divHandleDelete = () => {
        if (selectedLuggages.length > 0) {
            setShowConfirmation(true);
        } else {
            toast.warning('No customers selected for deletion');
        }
    };

    const handleDelete = async () => {
        setShowConfirmation(false);
            try {
                const response = await axios.delete(`http://localhost:8000/api/luggage/deleteLuggage/${selectedLuggages.join(',')}`, {
                    data: selectedLuggages, // Pass the array as data
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                if (response.status === 200) {
                    const updatedLuggages = luggages.filter(Luggage => !selectedLuggages.includes(Luggage.LUGGAGE_CODE));

                    // Cập nhật state để tái render bảng
                    setLuggages(updatedLuggages);

                    // Xóa danh sách khách hàng đã chọn
                    setSelectedLuggages([]);
                    toast.success('Luggages deleted successfully');

                } else {
                    toast.error('Failed to delete Luggages');
                }
            } catch (error) {
                toast.error('Error deleting Luggages: ' + error.message);
            }
        
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    };


    const handleSearch = async () => {
        if (searchKeyword != "") {
            try {
                const response = await fetch(`http://localhost:8000/api/luggage/searchLuggages?searchKeyword=${searchKeyword}`);
                const data = await response.json();
                setLuggages(data);
            } catch (error) {
                console.error("Error searching customers:", error);
            }
        }
        else {
            try {
                const response = await fetch("http://localhost:8000/api/luggage/getLuggages");
                const data = await response.json();
                setLuggages(data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        }
    };
    if (!localStorage.getItem('emailNhanVien')) {
        return (
            <div className="containerPersonal">
                <div className="text-insertPersonal">
                    <h1>Bạn cần đăng nhập để truy cập trang này</h1>
                </div>
            </div>
        );
    }
    return (
        <div className="col-md-12 main">
        <div className=" mt-md-6">
          <div className="navbar d-flex justify-content-between align-items-center">
            <h2 className="main-name mb-0">Thông tin hành lý</h2>
            {/* Actions: Đổi mật khẩu và Xem thêm thông tin */}
            <div className="dropdown">
              <a className="d-flex align-items-center dropdown-toggle" href="#" role="button" id="userDropdown" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                <i className="bi bi-person-circle" /> 
              </a>
              {/* Dropdown menu */}
              <div className="dropdown-menu" aria-labelledby="userDropdown">
                <a className="dropdown-item" href="password_KhachHang.html">Đổi mật khẩu</a>
                <a className="dropdown-item" href="profile_KhachHang.html">Xem thêm thông tin</a>
              </div>
            </div>
          </div>
          {/*thanh tìm kiếm với bộ lọc*/}
          <div className="find mt-5">
            <div className="d-flex w-100 justify-content-start align-items-center">
              <i className="bi bi-search" />
              <span className="first">
                            <input
                                className="form-control"
                                placeholder="Tìm kiếm ..."
                                value={searchKeyword}
                                onChange={(e) => setSearchKeyword(e.target.value)}
                                onKeyPress={handleKeyPress}
                            />
              </span>
              <span className="second">Filters <i className="bi bi-chevron-compact-down" /></span>
            </div>
          </div>
          <table className="table table-bordered">
            <thead>
              <tr>
                <th />
                <th>Mã hành lý</th>
                <th>Cân nặng</th>
                <th>Giá tiền</th>
              </tr>
            </thead>
                    <tbody>
                        {currentItems.map((item) => (
                            <tr key={item.LUGGAGE_CODE}>
                                <td contentEditable="true" className="choose">
                                    <input
                                        className="form-check-input"
                                        type="checkbox"
                                        onChange={() => handleCheckboxChange(item.LUGGAGE_CODE)}
                                        checked={selectedLuggages.includes(item.LUGGAGE_CODE)}
                                    />
                                </td>
                                <td>{item.LUGGAGE_CODE}</td>
                                <td>{item.MASS}</td>
                                <td>{item.PRICE}</td>
                            </tr>
                        ))}
                    </tbody>
          </table>
          {showConfirmation && (
    <div className="confirmation-dialog">
        <p>Bạn chắc chắn muốn xóa hành lý?</p>
        <button className="yes" onClick={handleDelete}>Có</button>
        <button className="no" onClick={() => setShowConfirmation(false)}>Không</button>
    </div>
)}
                <div className="d-flex justify-content-end my-3">
                    <button className="btn btn-primary mr-2" id="btnThem" onClick={handleClick}>Thêm</button>
                    <button className="btn btn-danger mr-2" id="btnXoa" onClick={divHandleDelete}>Xóa</button>
                    <button className="btn btn-warning" id="btnSua" onClick={handleShowInfo}>Sửa</button>
          </div>
                <ul className="pagination justify-content-center">
                    <li className="page-item ">
                        <a className="page-link" tabIndex={-1} onClick={() => paginate(currentPage - 1)}>Previous</a>
                    </li>
                    {[...Array(Math.ceil(luggages.length / itemsPerPage)).keys()].map((number) => (
                        <li key={number} className={`page-item ${number + 1 === currentPage ? 'active' : ''}`}>
                            <a className="page-link" onClick={() => paginate(number + 1)}>{number + 1}</a>
                        </li>
                    ))}
                    <li className="page-item">
                        <a className="page-link" onClick={() => paginate(currentPage + 1)}>Next</a>
                    </li>
                </ul>
        </div>
      </div>
      
      
    );
}
export default HanhLy;