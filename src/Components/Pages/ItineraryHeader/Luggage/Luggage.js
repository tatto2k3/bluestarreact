import React from 'react';
import './Luggage.css';

export default function Luggage() {
    const luggageCards = [
        {
            title: 'Hành lý xách tay',
            img: 'https://www.bambooairways.com/documents/20122/757259/hanh_ly_xac_tay.jpg/14faad36-7d42-1741-4b3f-0c816772d265?t=1688567629919',
            link: '/vn/vi/travel-info/baggage-info/carry-on-baggage'
        },
        {
            title: 'Hành lý miễn cước',
            img: 'https://www.bambooairways.com/documents/20122/1249903/h%C3%A0nh-l%C3%BD-mi%E1%BB%85n-c%C6%B0%E1%BB%9Bc_1.webp/8035c070-8d82-ea42-cad7-93883ff4c619?t=1731468451883',
            link: '/vn/vi/travel-info/baggage-info/checked-baggage'
        },
        {
            title: 'Hành lý tính cước',
            img: 'https://www.bambooairways.com/documents/20122/1249903/h%C3%A0nh-l%C3%BD-%C4%91%E1%BA%B7c-bi%E1%BB%87t.webp/78c8509e-6cf1-1f76-b9b3-9f10545a1102?t=1731468451882',
            link: '/vn/vi/travel-info/baggage-info/carry-on-baggage'
        },
        {
            title: 'Hành lý hạn chế vận chuyển',
            img: 'https://www.bambooairways.com/documents/20122/1249903/h%C3%A0nh-l%C3%BD-h%E1%BA%A1n-ch%E1%BA%BF-v%E1%BA%ADn-chuy%E1%BB%83n.webp/03c6d13f-dfc5-66c5-5b06-32cfdee1dcfb?t=1731468451882',
            link: '/vn/vi/travel-info/baggage-info/checked-baggage'
        },
        {
            title: 'Vật phẩm nguy hiểm',
            img: 'https://www.bambooairways.com/documents/20122/757259/vat_pham_nguy_hiem.jpg/543067b1-91df-452f-94da-cfae46791eb7?t=1688567629802',
            link: '/vn/vi/travel-info/baggage-info/carry-on-baggage'
        },
        {
            title: 'Liên hệ tìm kiếm hành lý',
            img: 'https://www.bambooairways.com/documents/20122/1249903/li%C3%AAn-h%E1%BB%87-t%C3%ACm-ki%E1%BA%BFm-h%C3%A0nh-l%C3%BD.webp/cf333d3c-a58b-8a2a-7c9e-0a45e584c1e3?t=1731468451883',
            link: '/vn/vi/travel-info/baggage-info/checked-baggage'
        }

    ];

    return (
        <div className='luggage-container'>
            <div className='luggage-container-header'>Hành lý</div>
            <div className='luggage-container-content'>
                {luggageCards.map((item, index) => (
                    <div className="luggage-card" key={index}>
                        <a className="luggage-link" href={item.link}>
                            <div className="luggage-overlay">
                                <h3 className="luggage-title">{item.title}</h3>
                                <span className="luggage-viewmore">Xem Chi Tiết</span>
                            </div>
                            <img className="luggage-image" src={item.img} alt={item.title} />
                        </a>
                    </div>
                ))}
            </div>
        </div>
    );
}
