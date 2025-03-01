import React from 'react'
import flight from '../../../assets/flight.png'
import SubHeading from '../../SubHeading/SubHeading'

import './Hero.css'
import { useNavigate } from 'react-router-dom'

const Hero = () => {
    const navigate = useNavigate();
    const handleClick = () => {
        navigate("/ticket");
    }
  return (
    <div className='header wrapper section__padding' id="home">
        <div className='wrapper_info'>
            {/*<SubHeading title="Stay Clean" />*/}

            <h1 className='title'>Nhanh và An toàn</h1>
            <p style={{margin: "2rem 0"}}>
            Chúng tôi không ngừng nỗ lực để thúc đẩy sự đổi mới và sáng tạo trong ngành hàng không của đất nước, đồng thời tiếp tục xây dựng mối quan hệ đáng tin cậy với khách hàng. Điều này đã và sẽ tiếp tục là động lực mạnh mẽ để chúng tôi duy trì tư cách là người dẫn đầu trong lĩnh vực dịch vụ hàng không tại Việt Nam.
            </p>

            <button type='button' className='custom_button' onClick={handleClick} >Đặt vé ngay!</button>
        </div>

        <div className='wrapper_img'>
            <img src={flight} alt="header_img" />
        </div>
    </div>
  )
}

export default Hero