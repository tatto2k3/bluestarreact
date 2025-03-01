import React, { useState } from 'react';
import "./Lugage.css";
import Paper from '@mui/material/Paper';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import ControlPointOutlinedIcon from '@mui/icons-material/ControlPointOutlined';
import { useSearch } from '../../CustomHooks/SearchContext';
export default function Luggage() {
    const [searchResult, setSearchResult, isLoading, setIsLoading, searchInfo,
        setSearchInfo, tripType, setTripType, airport, setAirport, departFlight, setDepartFlight, ariveFlight, setArriveFlight,
        total1, setTotal1, foodItems1, setFoodItems1, total2, setTotal2,
        foodItems2, setFoodItems2, addFoodItem1, calculateTotal1, addFoodItem2, calculateTotal2, passengerInfo, setPassengerInfo, seatId, setSeatId] = useSearch();
    const Alert = React.forwardRef(function Alert(props, ref) {
        return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
    });
    const [activeButton, setActiveButton] = useState('Depart');
    const [currentStatus, setCurrentStatus] = useState("depart");
    const [open, setOpen] = React.useState(false);
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };
    return (
        <Paper className="luggage-paper">
            <Snackbar open={open} autoHideDuration={2000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                    Purchase luggage successfully !
                </Alert>
            </Snackbar>
            <div className="luggage-wrapper">
                {
                    tripType === "roundTrip" && (
                        <div className="button_change">
                            <button
                                className={`custom-button-search depart-button ${activeButton === 'Depart' ? 'active' : ''}`}
                                onClick={() => {
                                    setCurrentStatus("depart");
                                    setActiveButton("Depart");
                                }}
                            >
                                Depart
                            </button>

                            <button
                                className={`custom-button-search arrive-button ${activeButton === 'Arrive' ? 'active' : ''}`}
                                onClick={() => {
                                    setCurrentStatus("depart");
                                    setActiveButton("Depart");
                                }}
                            >
                                Arrive
                            </button>
                        </div>
                    )
                }
                <div className="adults && children">
                    <div className="luggage-image">
                        <img src="/Images/Adult.png" />
                    </div>
                    <h3 className="luggage-title">
                        Adults and Children
                        <div className="btn-add-luggage" onClick={() => {
                            if (currentStatus === "depart") {
                                addFoodItem1(" Adults and Children", 50000);
                            }
                            else {
                                addFoodItem2(" Adults and Children", 50000)
                            }
                            setOpen(true);

                        }}>
                            <ControlPointOutlinedIcon fontSize="small" style={{
                                color: '#25A006',
                                cursor: 'pointer'
                            }} />
                        </div>
                    </h3>

                </div>
                <div className="Infant">
                    <div className="luggage-image">
                        <img src="/Images/Infant.png" />
                    </div>
                    <h3 className="luggage-title">
                        Infant
                        <div className="btn-add-luggage" onClick={() => {
                            if (currentStatus === "depart") {
                                addFoodItem1("Infant", 30000);
                            }
                            else {
                                addFoodItem2("Infant", 30000);
                            }
                            setOpen(true);

                        }}>
                            <ControlPointOutlinedIcon fontSize="small" style={{
                                color: '#25A006',
                                cursor: 'pointer'
                            }} />
                        </div>
                    </h3>
                </div>
                <div className="Hand-Luggage">
                    <div className="luggage-image">
                        <img src="/Images/Hand.png" />
                    </div>
                    <h3 className="luggage-title">
                        Hand luggage
                        <div className="btn-add-luggage" onClick={() => {
                            if (currentStatus === "depart") {
                                addFoodItem1("Hand luggage", 20000);
                            }
                            else {
                                addFoodItem2("Hand luggage", 20000);
                            }
                            setOpen(true);
                        }}>
                            <ControlPointOutlinedIcon fontSize="small" style={{
                                color: '#25A006',
                                cursor: 'pointer'
                            }} />
                        </div>
                    </h3>
                </div>
            </div>
        </Paper>
    )
}