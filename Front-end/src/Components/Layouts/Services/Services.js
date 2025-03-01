import React from 'react'

import Sanitizer from '../../../assets/sanitizer.png'
import SubHeading from '../../SubHeading/SubHeading'
import ListItem from '../ListItem/ListItem'

import './Services.css'


const services = [
    {
      title: "Hành lý",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit,",
    },
    {
      title: "Đồ ăn",
      description: "eiusmod tempor incididunt dolor sit amet, consectetur.",
    },
    {
      title: "Chỗ ngồi",
      description: "consectetur adipiscing elit, sed do eiusmod tempor",
    },
    {
      title: "Đặc quyền",
      description: "consectetur adipiscing elit, sed do eiusmod tempor",
    },
  ];
  
  const processes = [
    {
      title: "Hành lý",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit,",
    },
    {
      title: "Đồ ăn",
      description: "eiusmod tempor incididunt dolor sit amet, consectetur.",
    },
    {
      title: "Chỗ ngồi",
      description: "consectetur adipiscing elit, sed do eiusmod tempor",
    },
    {
      title: "Đặc quyền",
      description: "consectetur adipiscing elit, sed do eiusmod tempor",
    },
  ];

const Services = () => {
  return (
    <div className='services flex__center section__padding' id='services'>
        <div className='services-title'>
            <SubHeading title="services" />
            <h1 className='headtext'>Chính sách</h1>
        </div>

        <div className='services-list'>
            <div className='services-list_content flex__center'>
                <p className='services-list_heading'>Hạng phổ thông</p>
                <div className='services_list_items'>
                    {services.map((service, index) => (
                        <ListItem key={index} title={service.title} description={service.description} />
                    ))}
                </div>
            </div>

            <div className='services-list_img'>
                <img src={Sanitizer} alt="sanitizer__img" />
            </div>

            <div className='services-list_content flex__center'>
                <p className='services-list_heading'>Hạng thương gia</p>
                <div className='services_list_items'>
                    {processes.map((service, index) => (
                        <ListItem key={index} title={service.title} description={service.description} />
                    ))}
                </div>
            </div>
        </div>


        <div style={{marginTop: 15}}> 
          <button type='button' className='custom_button'>View More</button>
        </div>
    </div>
  )
}

export default Services