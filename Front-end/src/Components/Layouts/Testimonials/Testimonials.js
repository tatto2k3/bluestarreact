import React, { Component } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import Sanitizer from '../../../assets/sanitizer.png'
import elon_musk from '../../../assets/elon_musk.jpg'
import taylor from '../../../assets/taylor_Swift.jpg'
import sontung from '../../../assets/sontung.jpeg'

import './Testimonials.css'
export default class Testimonials extends Component {
  render() {
    return (
        <div id="test">
            <h1>Khách hàng nói gì về BLUESTAR?</h1>
      <Carousel
        showArrows={true}
        infiniteLoop={true}
        showThumbs={false}
        showStatus={false}
        autoPlay={true}
        interval={6100}
      >
        <div>
        <img src={elon_musk} alt="Elon Musk" />
          <div className="myCarousel">
            <h3>Shirley Fultz</h3>
            <h4>Designer</h4>
            <p>
              It's freeing to be able to catch up on customized news and not be
              distracted by a social media element on the same site
            </p>
          </div>
        </div>

        <div>
        <img src={taylor} alt="Taylor Swift" />
          <div className="myCarousel">
            <h3>Daniel Keystone</h3>
            <h4>Designer</h4>
            <p>
              The simple and intuitive design makes it easy for me use. I highly
              recommend Fetch to my peers.
            </p>
          </div>
        </div>

        <div>
        <img src={sontung} alt="Sơn Tùng MPT" />
          <div className="myCarousel">
            <h3>Theo Sorel</h3>
            <h4>Designer</h4>
            <p>
              I enjoy catching up with Fetch on my laptop, or on my phone when
              I'm on the go!
            </p>
          </div>
        </div>
      </Carousel>
      </div>
    );
  }
}
