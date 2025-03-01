import React from 'react'

import ceo from '../../../assets/ceo.png'
import quote from '../../../assets/quote.png'

import SubHeading from '../../SubHeading/SubHeading'

import './Ceo.css'

const Ceo = () => {
  return (
    <div className='bg wrapper section__padding'>
        <div className='wrapper_img wrapper_img-reverse'>
                <img src={ceo} alt="ceo_image" />
        </div>

        <div className='wrapper_info textofteam'>
            <SubHeading title="CEO's word" />
            <h1 className='headtext'>Sứ mệnh của chúng tôi</h1>

            <div className='ceo-content'>
                <div className='ceo-content_quote'>
                    <img src={quote} alt="quote_image" />
                    <p>Luôn đặt trải nghiệm bay của khách hàng lên hàng đầu.</p>
                </div>

                <p>Chúng tôi cam kết cung cấp dịch vụ hàng không chất lượng cao, đảm bảo an ninh và an toàn trên mỗi chuyến bay. Blue Star luôn nỗ lực để giảm tác động của hoạt động hàng không đối với môi trường bằng việc thực hiện các biện pháp bảo vệ môi trường và tối ưu hóa năng suất nhiên liệu. Hãng cũng nhấn mạnh vai trò xã hội của mình bằng cách tham gia vào các hoạt động từ thiện và ủng hộ cộng đồng.</p>
            </div>

            <div className='ceo-sign'>
                <p>BLUESTAR'TEAM</p>
            </div>

        </div>
    </div>
  )
}

export default Ceo