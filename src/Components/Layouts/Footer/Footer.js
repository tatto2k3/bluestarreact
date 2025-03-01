import React from 'react'

import thermometer from '../../../assets/thermometer.svg'
import logo from '../../../assets/logo2.PNG'
import './Footer.css'

import NewsLetter from '../NewsLetter/NewsLetter';

const Footer = () => {
  return (
    <div className='footer section__padding' id="login">
        <NewsLetter />

        <div className='footer-links'>
            <div className='footer-links_contact'>
                <h1 className='footer-headtext'>Liên hệ</h1>
                <p>Trường Đại học Công nghệ Thông tin</p>
                <p>+84 858-203-246</p>
                <p>+84 845-555-357</p>
            </div>

            <div className='footer-links_logo'>
                <img src={logo} alt="footer_logo" />
                <p>&quot;BlueStar: Vì Một Hành Trình Tuyệt Vời!&quot;</p>
                <img src={thermometer} className="thermometer__img" style={{marginTop: 15}} />

                <div className='footer-links_icons'>
                    
                </div>
            </div>

            <div className='footer-links_work'>
                <h1 className='footer-headtext'>Giờ làm việc</h1>
                <p>Thứ 2-Thứ 6:</p>
                <p>9:00 - 15:00</p>
                <p>Thứ 7-Chủ Nhật:</p>
                <p>9:00 - 11:00 </p>
            </div>
        </div>

        <div className='footer__copyright'>
                <p>2023 BLUESTAR. All Rights Reserved.</p>
            </div>
    </div>
  )
}

export default Footer