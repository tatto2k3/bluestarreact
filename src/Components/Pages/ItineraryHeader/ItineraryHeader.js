import React from 'react';
import './ItineraryHeader.css';


export default function ItineraryHeader() {
    return (
        <div className='itinerary-container'>
            <div className='itinerary-luggage-column'>
                <div className='itinerary-luggage-column-title'>Hành lý</div>
                <div className='itinerary-luggage-column-content'>
                    <a href='/itinerary-luggage'>Hành lý xách tay</a>
                    <a href='/itinerary-luggage'>Hành lý đặc biệt</a>
                    <a href='/itinerary-luggage'>Hành lý hạn chế vận chuyển</a>
                    <a href='/itinerary-luggage'>Vật phẩm nguy hiểm</a>
                    <a href='/itinerary-luggage'>Liên hệ tìm kiếm hành lý</a>
                </div>
            </div>
            <div className='itinerary-procedure-column'>
                <div className='itinerary-procedure-column-title'>Làm thủ tục</div>
                <div className='itinerary-procedure-column-content'>
                    <a href='/itinerary-luggage'>Làm thủ tục trực tuyến</a>
                    <a href='/itinerary-luggage'>Làm thủ tục tại sân bay</a>
                    <a href='/itinerary-luggage'>Quầy thủ tục tự động</a>
                    <a href='/itinerary-luggage'>Gỡ tình trạng làm thủ tục</a>
                </div>
            </div>
            <div className='itinerary-service-column'>
                <div className='itinerary-service-column-title'>Dịch vụ đặc biệt</div>
                <div className='itinerary-service-column-content'>
                    <a href='/itinerary-luggage'>Dịch vụ cho trẻ em</a>
                    <a href='/itinerary-luggage'>Trẻ em đi một mình</a>
                    <a href='/itinerary-luggage'>Phụ nữ mang thai</a>
                    <a href='/itinerary-luggage'>Hỗ trợ người khuyết tật</a>
                    <a href='/itinerary-luggage'>Khách dị ứng thực phẩm</a>
                    <a href='/itinerary-luggage'>Suất ăn đặc biệt</a>
                </div>
            </div>
            <div className='itinerary-require-column'>
                <div className='itinerary-require-column-title'>Yêu cầu giấy tờ</div>
                <div className='itinerary-require-column-content'>
                    <a href='/itinerary-luggage'>Yêu cầu xác nhận sức khỏe</a>
                    <a href='/itinerary-luggage'>Giấy tờ tùy thân & thị thực</a>
                    <a href='/itinerary-luggage'>Quy định xuất nhập cảnh</a>
                </div>
            </div>
            <div className='itinerary-airport-column'>
                <div className='itinerary-airport-column-title'>Sân bay & mạng bay</div>
                <div className='itinerary-airport-column-content'>
                    <a href='/itinerary-luggage'>Thông tin sân bay</a>
                    <a href='/itinerary-luggage'>Mạng đường bay</a>
                </div>
            </div>
        </div>
    );
}