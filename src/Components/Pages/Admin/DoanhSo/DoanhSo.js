import React, { useState, useEffect } from "react";
import './DoanhSo.css';
import { Bar } from 'react-chartjs-2';
import 'chart.js/auto';
import 'bootstrap/dist/css/bootstrap.min.css';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import * as XLSX from 'xlsx';

const DoanhSo = () => {
    const [activeTab, setActiveTab] = useState("tongQuan");
    const [chartData, setChartData] = useState([]);
    const [reportType, setReportType] = useState("thang");
    const [month, setMonth] = useState("");
    const [year, setYear] = useState("");
    const [doanhthu, setDoanhThu] = useState(0);
    const [detail, setDetails] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(8);

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = detail.slice(indexOfFirstItem, indexOfLastItem);

    const paginate = pageNumber => setCurrentPage(pageNumber);

    let tongdoanhthu = 0;


  const handleTabChange = (tab) => {
      setActiveTab(tab);
      console.log(activeTab);
    };

    const handleReportTypeChange = (event) => {
        const selectedType = event.target.value;
        setReportType(selectedType);
    };
    const handleMonthChange = (event) => {
        const selectedMonth = event.target.value;
        setMonth(selectedMonth);
    };
    const handleYearChange = (event) => {
        const selectedYear = event.target.value;
        setYear(selectedYear);
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch("http://localhost:8000/api/doanhso/GetDetails");
                const data = await response.json();
                console.log(data);
                setDetails(data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
        fetchDoanhSoData();
    }, [year, month, reportType]);


    const fetchDoanhSoData = async () => {
        try {
            const response = await fetch(`http://localhost:8000/api/doanhso/GetDoanhSo?year=${year}`);
            const data = await response.json();
            setChartData(data);
        } catch (error) {
            console.error("Error fetching doanh so data:", error);
        }
    };

    const hanhdleSearch = async () => {

        const searchData = {
            year: year,
            month: month
        }

        try {
            let response;

            if (reportType === "nam") {
                console.log("hihi");
                response = await fetch(`http://localhost:8000/api/doanhso/GetDoanhThuNam?year=${searchData.year}`);
                console.log(response);
                console.log("hoho");

            } else {
                response = await fetch(`http://localhost:8000/api/doanhso/GetDoanhThuThang?year=${searchData.year}&month=${searchData.month}`);
            }

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data = await response.json();
            console.log("Before setDoanhThu:", doanhthu);
            console.log("data: ", data);
            setDoanhThu(data.TotalRevenue);
            setDetails(data.Details);
            console.log("After setdetails:", detail);
            tongdoanhthu = data;
            console.log("After setDoanhThu:", doanhthu);
            
        } catch (error) {
            console.error("Error fetching doanh so data:", error);
        }
    };

    const handPDF = () => {
        exportToPDF();
    }

    const exportToPDF = () => {
        // Create a new jsPDF instance
        const pdf = new jsPDF({
        });
        const font = 'Arial';

        pdf.setFont(font);
        // Title
        pdf.setFontSize(18);
        pdf.text("BIEU DO DOANH SO CONG TY", 70, 10);
        pdf.setFontSize(12);
        pdf.text(`Tong doanh thu: ${tongdoanhthu}`, 10, 20);

        // Date
        const currentDate = new Date();
        const formattedDate = `${currentDate.getDate()}/${currentDate.getMonth() + 1}/${currentDate.getFullYear()}`;
        pdf.setFontSize(12);
        pdf.text(`Ngay: ${formattedDate}`, 170, 20);

        // Find the element you want to export (in this case, the entire component)
        const element = document.getElementById("myTabContent");

        // Use html2canvas to render the HTML content to a canvas
        html2canvas(element).then(canvas => {
            // Convert canvas to a data URL
            const imgData = canvas.toDataURL("image/png");

            // Add the image to the PDF
            pdf.addImage(imgData, 'PNG', 10, 30, 190, 100); // You can adjust the positioning and dimensions

            // Save the PDF
            pdf.save("doanh_so_report.pdf");
        });
    };
    const exportToExcel = () => {
        const wb = XLSX.utils.book_new();
        const ws = XLSX.utils.json_to_sheet(detail);

        // Add the worksheet to the workbook
        XLSX.utils.book_append_sheet(wb, ws, "DoanhSoData");

        // Save the workbook as an Excel file
        XLSX.writeFile(wb, "doanh_so_data.xlsx");
    };

  const tabContent = {
      tongQuan: (
          <div>
              <h3>Biểu đồ doanh số</h3>
              <Bar
                  data={{
                      labels: [],
                      datasets: [{
                          label: 'Doanh số',
                          backgroundColor: 'rgba(75,192,192,0.2)',
                          borderColor: 'rgba(75,192,192,1)',
                          borderWidth: 1,
                          hoverBackgroundColor: 'rgba(75,192,192,0.4)',
                          hoverBorderColor: 'rgba(75,192,192,1)',
                          data: chartData,
                      }],
                  }}
                  options={{
                      scales: {
                          y: {
                              beginAtZero: true,
                          },
                      },
                  }}
              />
          </div>
      ),
      chiTiet: (
          <div>
      <table className="table table-bordered">
        <thead>
                    <tr>
                      <th>T_ID</th>
                      <th>CCCD</th>
                      <th>Name</th>
                      <th>Fly_ID</th>
                      <th>DepartureDay</th>
                    </tr>
                  </thead>
                  <tbody>
                {currentItems.map((item) => (
                    <tr key={item.T_ID}>
                        <td>{item.T_ID}</td>
                        <td>{item.CCCD}</td>
                        <td>{item.Name}</td>
                        <td>{item.Fly_ID}</td>
                        <td>{item.departureDay}</td>
                    </tr>
                ))}
                  </tbody>
        </table>

        <ul className="pagination justify-content-center">
            <li className="page-item ">
                <a className="page-link" tabIndex={-1} onClick={() => paginate(currentPage - 1)}>Previous</a>
            </li>
            {[...Array(Math.ceil(detail.length / itemsPerPage)).keys()].map((number) => (
                <li key={number} className={`page-item ${number + 1 === currentPage ? 'active' : ''}`}>
                    <a className="page-link" onClick={() => paginate(number + 1)}>{number + 1}</a>
                </li>
            ))}
            <li className="page-item">
                <a className="page-link" onClick={() => paginate(currentPage + 1)}>Next</a>
            </li>
              </ul>
          </div>
    ),
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
          <div className=" d-flex flex-column align-items-start">
            {/* Các phần tử hiển thị dọc */}
            <h2 className="main-name mb-0">Doanh Số</h2>
            <div className="form-group d-flex flex-row align-items-center">
              <label htmlFor="loaiDoanhSo">Loại doanh số: </label>
                        <select className="form-control ml-4"
                            id="loaiDoanhSo"
                            onChange={handleReportTypeChange}
                            value={reportType}
                        >
                            <option value="thang">Báo cáo theo tháng</option>
                            <option value="nam">Báo cáo theo năm</option>
                        </select>
                        <label htmlFor="ngayBatDau" className="ml-4" id="nhapnam">Nhập năm: </label>
                        <input type="text"
                            className="form-control ml-3"
                            id="nam"
                            value={year}
                            onChange={handleYearChange}
                        />
                        <label htmlFor="ngayKetThuc" className="ml-4" id="nhapthang" style={{ display: reportType === "thang" ? "block" : "none" }}>
                            Nhập tháng:
                        </label>
                        <select className="form-control ml-4" id="thang" style={{ display: reportType === "thang" ? "block" : "none" }}
                            onChange={handleMonthChange}
                            value={month}
                        >
                            <option value="01">1</option>
                            <option value="02">2</option>
                            <option value="03">3</option>
                            <option value="04">4</option>
                            <option value="05">5</option>
                            <option value="06">6</option>
                            <option value="07">7</option>
                            <option value="08">8</option>
                            <option value="09">9</option>
                            <option value="10">10</option>
                            <option value="11">11</option>
                            <option value="12">12</option>
                        </select>
            </div>
            <div className="btn-click ">
                        <button className="btn btn-primary btn-search" onClick={hanhdleSearch}>Tìm kiếm</button>
                        <button className="btn btn-secondary ml-2 btn-print" onClick={handPDF }>In báo cáo</button>
                        <button className="btn btn-success ml-2 btn-export" onClick={exportToExcel }>Xuất file excel</button>
            </div>
            <div className="form-group mt-3">
              <label htmlFor="hienThi">Tổng doanh thu: </label>
                        <input
                            type="text"
                            className="form-control ml-3"
                            id="TongDoanhThu"
                            value={doanhthu}
                            readOnly
                        />
            </div>
          </div>
          {/* Bảng hiển thị dữ liệu */}
          <div className="container mt-md-4">
          <ul className="nav nav-tabs" id="myTab" role="tablist">
        <li className="nav-item" role="presentation">
          <a
            className={`nav-link ${activeTab === "tongQuan" ? "active" : ""}`}
            id="tongQuan-tab"
            data-toggle="tab"
            role="tab"
            aria-controls="tongQuan"
            aria-selected={activeTab === "tongQuan"}
            onClick={() => handleTabChange("tongQuan")}
          >
            Tổng quan
          </a>
        </li>
        <li className="nav-item" role="presentation">
          <a
            className={`nav-link ${activeTab === "chiTiet" ? "active" : ""}`}
            id="chiTiet-tab"
            data-toggle="tab"
            role="tab"
            aria-controls="chiTiet"
            aria-selected={activeTab === "chiTiet"}
            onClick={() => handleTabChange("chiTiet")}
          >
            Chi tiết
          </a>
        </li>
      </ul>
            <div className="tab-content" id="myTabContent">
            {Object.keys(tabContent).map((tabKey) => (
          <div
            key={tabKey}
            className={`tab-pane fade ${activeTab === tabKey ? "show active" : ""}`}
            id={tabKey}
            role="tabpanel"
            aria-labelledby={`${tabKey}-tab`}
          >
            {tabContent[tabKey]}
          </div>
        ))}
            </div>
            
                </div>
                <div className="space"></div>
            </div>
      </div>
      
    );
};
export default DoanhSo;