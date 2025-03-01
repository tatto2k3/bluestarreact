import React from 'react'

import SubHeading from '../../SubHeading/SubHeading'
import '../../../index.css';
import './NewsLetter.css'

const NewsLetter = () => {
  return (
    <div className='newsletter'>
        <div className='newsletter-heading'>
            <SubHeading title="Newsletter" />
            <h1 className='headtext'>Đăng ký nhận thông tin</h1>
            <p id='subp'>Khuyến mãi, ưu đãi trong tầm tay!</p>
        </div>

        <div className='newsletter-input flex__center'>
            <input type="email" placeholder='Enter your email address' />
            <button type='button' className='custom_button'>Đăng ký</button>
        </div>
    </div>
  )
}

export default NewsLetter  