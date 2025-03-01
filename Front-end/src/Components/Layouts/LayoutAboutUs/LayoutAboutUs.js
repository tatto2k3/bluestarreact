import Hero from '../Hero/Hero'
import Services from '../Services/Services'
import Ceo from '../Ceo/Ceo'
import Prevention from '../Prevention/Prevention'
import FindUs from '../FindUs/FindUs'
import Footer from '../Footer/Footer'
import Testimonials from '../Testimonials/Testimonials'
import Header from '../Header/Header'
import HeaderReview from '../HeaderReview/HeaderReview'


function LayoutAboutUs() {
  return (
    <div>
      <HeaderReview />
      <Hero />
      <Testimonials />
      <Ceo />
      <FindUs />
      <Footer />
    </div>
  );
}

export default LayoutAboutUs;
