import React, { useState } from 'react';
import HeaderNav from '../HeaderNav/HeaderNav';
import "./MainLayoutHeaderNav.css"
import Footer from '../Footer/Footer';
import ArrowForwardIosOutlinedIcon from '@mui/icons-material/ArrowForwardIosOutlined';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse } from '@fortawesome/free-solid-svg-icons';

export default function MainLayoutHeaderNav({ children }) {
    const pages = [
        <FontAwesomeIcon icon={faHouse} />,
        "Thông tin hành trình",
        "Hành lý",
    ];
    return (
        <>
            <HeaderNav />
            <div className='img-layout-header-nav'>
                <img src='https://www.bambooairways.com/documents/20122/768330/Banner_2.png/14baa1c6-3b02-aecf-b044-ce312f7a1182?t=1689611909463'></img>
            </div>
            <nav className="main-layout-header-nav" style={{ marginTop: '0px' }}>
                {pages.map((page, index) => (
                    <div key={index} className="nav-wrapper">
                        <p className="page-title active">{page}</p>
                        {index !== pages.length - 1 && (
                            <ArrowForwardIosOutlinedIcon fontSize="small" style={{ color: '#7CBAEF' }} />
                        )}
                    </div>
                ))}
            </nav>
            <div className='container'>
                {children}
            </div>
            <Footer />
        </>
    )
}