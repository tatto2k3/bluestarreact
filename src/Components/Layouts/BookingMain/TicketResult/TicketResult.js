import * as React from 'react';
import "./TicketResult.css"
import logo from '../../../../assets/logo2.PNG';
import AttachMoneyOutlinedIcon from '@mui/icons-material/AttachMoneyOutlined';
export default function TicketResult({ flight, handleClick }) {
    function removeTrailingZeros(priceString) {
        return priceString.replace(/(\.0+|(?<=\.\d)0+)$/, ""); 
    }

    const formatTimeFromDB = (timeString) => {
        return timeString.split(':').slice(0, 2).join(':');
    };


    function formatTimeDuration(departureTime, arrivalTime) {
        const departureDate = new Date(`2000-01-01T${departureTime}`);
        const arrivalDate = new Date(`2000-01-01T${arrivalTime}`);

        const durationInMinutes = (arrivalDate - departureDate) / (1000 * 60);
        const hoursDecimal = (durationInMinutes / 60).toFixed(2);

        return `${hoursDecimal} giờ`;
    }

    return (
        <div className="Ticket-Wrapper" onClick={handleClick} >
            <div className="Ticket-Left" >
                <div className="Logo-Wrapper">
                    <div className="Logo-Image">
                        <img src={logo} />
                    </div>
                </div>
                <div className="schedule">
                    <div className="schedule-depart">
                        <p className="schedule-header">
                            Khởi hành
                        </p>
                        <h5 className="schedule-time">
                            {formatTimeFromDB(flight.departureTime)}
                        </h5>
                        <p className="schedule-date">
                            {flight.departureDay}
                        </p>
                    </div>
                    <div className="schedule-detail">
                        <span className="schedule-round-left">
                        </span>
                        <div className="time-duration-wrapper">

                            <div className="time-duration">
                                {formatTimeDuration(flight.departureTime, flight.arrivalTime)}
                            </div>

                        </div>

                        <span className="schedule-round-right"></span>
                    </div>
                    <div className="schedule-des">
                        <p className="schedule-header">
                            Dự kiến
                        </p>
                        <h5 className="schedule-time">
                            {formatTimeFromDB(flight.arrivalTime)}
                        </h5>
                        <p className="schedule-date">
                            {flight.departureDay}
                        </p>
                    </div>
                </div>
            </div>

            <div className="Ticket-Right">
                <p className="Price-header">
                    Giá vé
                </p>
                <div className="Price-value">
                    <p className="price-value">
                        {removeTrailingZeros(Number(flight.originalPrice).toLocaleString())}
                    </p>
                    <p className="price-value-VND" >VND</p>
                </div>
            </div>
        </div>
    )
}