import React, { useEffect, useState } from "react";
import './DoAn.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'bootstrap/dist/css/bootstrap.min.css';

const DoAn = () => {
    const [searchKeyword, setSearchKeyword] = useState('');
    const [foods, setFoods] = useState([]);
    const [selectedFoods, setSelectedFoods] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(8);
    const navigate = useNavigate();
    const [showConfirmation, setShowConfirmation] = useState(false);

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = foods.slice(indexOfFirstItem, indexOfLastItem);

    const paginate = pageNumber => setCurrentPage(pageNumber);

    const handleClick = () => {
        navigate('/DoAn_Them');
    };


    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch("http://localhost:8000/api/food/getFoods");
                if (!response.ok) {
                    throw new Error(`Error: ${response.statusText}`);
                }
                const data = await response.json();
                setFoods(data);
            } catch (error) {
                console.error("Error fetching data:", error.message);
                // You might want to notify the user about the error
            }
        };

        fetchData();
    }, []);



    const handleCheckboxChange = (FoodId) => {
        if (selectedFoods.includes(FoodId)) {
            // Nếu đã chọn thì hủy chọn
            setSelectedFoods([]);
        } else {
            // Nếu chưa chọn thì chọn
            setSelectedFoods([FoodId]);
        }
    };



    const handleShowInfo = async () => {
        try {
            if (selectedFoods.length > 0) {
                const response = await fetch(`http://localhost:8000/api/food/getFoodDetails?fIds=${selectedFoods.join(',')}`);
                const data = await response.json();

                // Chuyển hướng sang trang sửa khách hàng và truyền thông tin khách hàng
                navigate('/DoAn_Sua', { state: { selectedFoodInfo: data } });
            } else {
                console.log("No Foods selected.");
            }
        } catch (error) {
            console.error("Error fetching Food details:", error);
        }
    };

    const divHandleDelete = () => {
        if (selectedFoods.length > 0) {
            setShowConfirmation(true);
        } else {
            toast.warning('No customers selected for deletion');
        }
    };

    const handleDelete = async () => {
        setShowConfirmation(false);
            try {
                const response = await axios.delete(`http://localhost:8000/api/food/deleteFood/${selectedFoods.join(',')}`, {
                    data: selectedFoods, // Pass the array as data
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                if (response.status === 200) {
                    const updatedFoods = foods.filter(food => !selectedFoods.includes(food.F_ID));

                    // Cập nhật state để tái render bảng
                    setFoods(updatedFoods);

                    // Xóa danh sách khách hàng đã chọn
                    setSelectedFoods([]);
                    toast.success('Foods deleted successfully');

                } else {
                    toast.error('Failed to delete Foods');
                }
            } catch (error) {
                toast.error('Error deleting Foods: ' + error.message);
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
                const response = await fetch(`http://localhost:8000/api/food/searchFoods?searchKeyword=${searchKeyword}`);
                const data = await response.json();
                setFoods(data);
            } catch (error) {
                console.error("Error searching customers:", error);
            }
        }
        else {
            try {
                const response = await fetch("http://localhost:8000/api/food/getFoods");
                const data = await response.json();
                setFoods(data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        }
    };
    return (
        <div className="col-md-12 main">
  <div className="mt-md-6">
    <div className="navbar d-flex justify-content-between align-items-center">
      <h2 className="main-name mb-0">Thông tin thực đơn</h2>
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
          <th>Mã món ăn</th>
          <th>Tên món ăn</th>
          <th>Giá tiền</th>
        </tr>
      </thead>
                    <tbody>
                        {currentItems.map((item) => (
                            <tr key={item.F_ID}>
                                <td contentEditable="true" className="choose">
                                    <input
                                        className="form-check-input"
                                        type="checkbox"
                                        onChange={() => handleCheckboxChange(item.F_ID)}
                                        checked={selectedFoods.includes(item.F_ID)}
                                    />
                                </td>
                                <td>{item.F_ID}</td>
                                <td>{item.F_NAME}</td>
                                <td>{item.F_PRICE}</td>
                            </tr>
                        ))}
                    </tbody>
    </table>
    {showConfirmation && (
    <div className="confirmation-dialog">
        <p>Bạn chắc chắn muốn xóa khách hàng?</p>
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
                    {[...Array(Math.ceil(foods.length / itemsPerPage)).keys()].map((number) => (
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
export default DoAn;