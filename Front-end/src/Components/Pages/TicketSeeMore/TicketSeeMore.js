import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './TicketSeeMore.css'; 
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import ArrowForwardIosOutlinedIcon from '@mui/icons-material/ArrowForwardIosOutlined';
import SeatBooking from '../Seat/SeatBooking';
import Food from '../Food/Food';
import Lugage from '../Lugage/Lugage';
import { useNavigate } from 'react-router-dom';


const TicketSeeMore = () => {
    const navigate = useNavigate();
    const handClick = () => {
        navigate("/huy-ve");
    }
    return (  
        <div>
            <Container maxWidth="lg" className="custom-container">
                <Grid container spacing={2}>
                    <Grid item md={8}>
                                <div className="Ticket-Left-ticketPage" >
                                    <div className="Logo-Wrapper-ticketPage">
                                        <div className="logo-left">
                                            <div className="Logo-Image-ticketPage">
                                                <img src="https://www.vietjetair.com/static/media/vj-logo.0f71c68b.svg" />
                                            </div>
                                            <h6>VietJet Air</h6>
                                        </div>
                                        <h6 className="ticket-class">Business Class</h6>
                                    </div>
                                    <div className="schedule ticketPage">
                                        <div className="schedule-depart ticketPage">
                                            <p className="schedule-header ">
                                                Depart
                                            </p>
                                            <h5 className="schedule-time">
                                                20:30
                                            </h5>
                                            <p className="schedule-date">
                                                4 Octorber 2023
                                            </p>
                                            <p className="airport-depart">
                                                Sân bay Tân Sơn Nhất
                                            </p>
                                        </div>
                                        <div className="schedule-detail ticketPage">
                                            <span className="schedule-round-left ticketPage">
                                            </span>
                                            <div className="time-duration-wrapper">

                                                <div className="time-duration">
                                                    12 hr 30 min
                                                </div>

                                            </div>

                                            <span className="schedule-round-right ticketPage"></span>
                                        </div>
                                        <div className="schedule-des ticketPage">
                                            <p className="schedule-header">
                                                Arrive
                                            </p>
                                            <h5 className="schedule-time">
                                                23:39
                                            </h5>
                                            <p className="schedule-date">
                                                5 Octorber 2023
                                            </p>
                                            <p className="airport-depart">
                                                Sân bay Nội Bài
                                            </p>
                                        </div>

                                    </div>
                                </div>
                                
                            <div >
                                <p className='text-muathem'>Mua thêm</p>
                            </div>
                            <div className='scrollpane'>
                                <SeatBooking/>
                                <Food/>
                                <Lugage />
                                </div>
                                <button className="btn-next" >
                                    Next
                                </button>
                                <button className="btn-cancelFlight" onClick={handClick}>
                                    Hủy chuyến bay
                                </button>
                            </Grid>
                            
                            <Grid item md={4}>
                            <Grid container spacing={2}>
                            <Grid item md={12}>
                                <Paper className="fare-paper">
                                    <h6 className="fare-header">Đã chọn thêm</h6>
                                    <ul className="item-list">
                                        <li className="item-ticket">
                                            <p>
                                                1 Vé
                                            </p>
                                            <p>
                                               $160
                                            </p>
                                        </li>
                                        <li className="item-ticket">
                                            <p>
                                           1 Món ăn
                                            </p>
                                            <p>
                                                $60
                                            </p>
                                        </li>
                                        <li className="item-ticket">
                                        <p>
                                           1 Hành lý 20kg
                                            </p>
                                            <p>
                                                $20
                                            </p>
                                        </li>
                                    </ul>
                                   
                                    <div className="ticker-footer">
                                        <div className="ticker-footer-total" >
                                               Tổng
                                        </div>
                                        <div className="ticker-footer-value" >
                                              $ 220
                                        </div>
                                    </div>
                                </Paper>
                            </Grid>
                            </Grid>
                            <Grid item md={12}>
                                <Paper className="fare-paper fare-paperSummary">
                                    <h6 className="fare-header">Fare Summary</h6>
                                    <ul className="item-list">
                                        <li className="item-ticket">
                                            <p>
                                                Food , Snack and Drink
                                            </p>
                                            <p>
                                               $60
                                            </p>
                                        </li>
                                        <li className="item-ticket">
                                            <p>
                                           Ticket
                                            </p>
                                            <p>
                                                $160
                                            </p>
                                        </li>
                                        <li className="item-ticket">
                                          Discount
                                        </li>
                                    </ul>
                                    <div className="button-wrapper">

                                    <Button variant="outlined" style={{
                                        borderColor: '#c5e1ef', width: '200px' }}>Select Discount</Button>
                                    </div>
                                    <div className="ticker-footer">
                                        <div className="ticker-footer-total" >
                                               Total Sumary
                                        </div>
                                        <div className="ticker-footer-value" >
                                              $ 220
                                        </div>
                                    </div>
                                </Paper>
                            </Grid>

                        </Grid>
                        </Grid>
                        
                    </Container>
                </div>
        )}
export default TicketSeeMore;