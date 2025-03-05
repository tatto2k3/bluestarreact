import React, { useState, useEffect } from 'react';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import AccessTimeOutlinedIcon from '@mui/icons-material/AccessTimeOutlined';
import ControlPointOutlinedIcon from '@mui/icons-material/ControlPointOutlined';
import CardMedia from '@mui/material/CardMedia';
import axios from "axios";
import "./SeatReservation.css";
import { useSearch } from '../../CustomHooks/SearchContext';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import FlightTakeoffOutlinedIcon from '@mui/icons-material/FlightTakeoffOutlined';
import FlightLandOutlinedIcon from '@mui/icons-material/FlightLandOutlined';
export default function SeatReservation() {
    const [foods, setFoods] = useState([]);
    const [searchResult, setSearchResult, isLoading, setIsLoading, searchInfo,
        setSearchInfo, tripType, setTripType, airport, setAirport, departFlight, setDepartFlight, ariveFlight, setArriveFlight,
        total1, setTotal1, foodItems1, setFoodItems1, total2, setTotal2,
        foodItems2, setFoodItems2, addFoodItem1, calculateTotal1, addFoodItem2, calculateTotal2, passengerInfo, setPassengerInfo, seatId, setSeatId] = useSearch();
    const Alert = React.forwardRef(function Alert(props, ref) {
        return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
    });
    const [activeButton, setActiveButton] = useState("Depart");
    const [open, setOpen] = React.useState(false);
    const [currentStatus, setCurrentStatus] = useState("depart");
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };

    useEffect(() => {
        // Fetch data from the API using Axios
        axios.get('https://bluestarbackend.vercel.app/api/api/food/getFoods')
            .then(response => {
                // Set the fetched data to the state
                setFoods(response.data);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, []);

    return (
        <Paper className="seat-reservation-wrapper">
            <div className="seat-reservation-header">
                <h5 className="seat-reservation-title">
                    Pick Food
                </h5>
            </div>
            {
                tripType === "roundTrip" && (
                    <div className="button_change">
                        <button
                            className={`custom-button-search depart-button ${activeButton === 'Depart' ? 'active-button' : ''}`}
                            onClick={() => {
                                setCurrentStatus("depart");
                                setActiveButton("Depart");
                            }}
                        >
                            Depart
                        </button>

                        <button
                            className={`custom-button-search arrive-button ${activeButton === 'Arrive' ? 'active-button' : ''}`}
                            onClick={() => {
                                setCurrentStatus("arrive");
                                setActiveButton("Arrive");
                            }}
                        >
                            Arrive
                        </button>
                    </div>
                )
            }
            <Grid container spacing={2}>
                <Snackbar open={open} autoHideDuration={2000} onClose={handleClose}>
                    <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                        Purchase food successfully !
                    </Alert>
                </Snackbar>
                {foods.map(food => (
                    <Grid item md={4} key={food.fId} >
                        <Card sx={{ maxWidth: 345 }} className="card-foot">
                            <CardMedia
                                sx={{ height: 140 }}
                                image="https://vj-prod-website-cms.s3.ap-southeast-1.amazonaws.com/com-chien-thai447x276-1646377593272.jpg"
                                title={food.fName}
                            />
                            <CardContent>
                                <p className="food-name">
                                    {food.fName}
                                </p>
                            </CardContent>
                            <div className="food-price-wrapper">
                                <p className="food-price">
                                    {food.F_PRICE} VND
                                </p>
                                <p className="food-delivery">
                                    Delivery Free
                                </p>
                            </div>
                            <div className="food-time">
                                <AccessTimeOutlinedIcon fontSize="small" style={{ color: ' #7ebf47' }} />
                                <p className="time-serve">20-30 min</p>
                                <div className="btn-add-food" onClick={() => {
                                    if (currentStatus === "depart") {
                                        addFoodItem1(food.fName, food.F_PRICE);
                                    }
                                    else {
                                        addFoodItem2(food.fName, food.F_PRICE);
                                    }
                                    setOpen(true);
                                }}>
                                    <ControlPointOutlinedIcon fontSize="small" style={{
                                        color: '#25A006',
                                        cursor: 'pointer'
                                    }} />
                                </div>
                            </div>
                            <CardActions>
                                <div className="card-footer">
                                    Viet Nam + Fast Food + Pizzas
                                </div>
                            </CardActions>
                        </Card>
                    </Grid>
                ))}

            </Grid>
        </Paper>
    )
}