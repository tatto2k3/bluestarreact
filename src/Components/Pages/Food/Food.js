import React, { useState } from 'react';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import AccessTimeOutlinedIcon from '@mui/icons-material/AccessTimeOutlined';
import CardMedia from '@mui/material/CardMedia';

import "./Food.css";
export default function SeatReservation() {
    return (
        <Paper className="seat-reservation-wrapper">
            <div className="seat-reservation-header">
                <h5 className="seat-reservation-title">
                    Chọn món ăn
                </h5>
             </div>
            <Grid container spacing={2}>
                <Grid item md={4}>
                    <Card sx={{ maxWidth: 345 }} className="card-foot">
                        <CardMedia
                            sx={{ height: 140 }}
                            image="https://vj-prod-website-cms.s3.ap-southeast-1.amazonaws.com/com-chien-thai447x276-1646377593272.jpg"
                            title="green iguana"
                        />
                        <CardContent>
                            <p className="food-name">
                                Pizza Hot ( FillMore )
                            </p>
                        </CardContent>
                      
                            <div className="food-price-wrapper">
                                <p className="food-price">
                                  $220
                                </p>
                                <p className="food-delivery">
                                Delivery Free
                                </p>
                            </div>
                        <div className="food-time">
                            <AccessTimeOutlinedIcon fontSize="small" style={{ color:' #7ebf47' }} />
                            <p className="time-serve">20-30 min</p>
                        </div>
                        <CardActions>
                            <div className="card-footer">
                                American + Fast Food + Pizza
                            </div>
                        </CardActions>
                        
                    </Card>
                </Grid>
                <Grid item md={4}>
                    <Card sx={{ maxWidth: 345 }} className="card-foot">
                        <CardMedia
                            sx={{ height: 140 }}
                            image="https://vj-prod-website-cms.s3.ap-southeast-1.amazonaws.com/com-chien-thai447x276-1646377593272.jpg"
                            title="green iguana"
                        />
                        <CardContent>
                            <p className="food-name">
                                Pizza Hot ( FillMore )
                            </p>
                        </CardContent>

                        <div className="food-price-wrapper">
                            <p className="food-price">
                                $220
                            </p>
                            <p className="food-delivery">
                                Delivery Free
                            </p>
                        </div>
                        <div className="food-time">
                            <AccessTimeOutlinedIcon fontSize="small" style={{ color: ' #7ebf47' }} />
                            <p className="time-serve">20-30 min</p>
                        </div>
                        <CardActions>
                            <div className="card-footer">
                                American + Fast Food + Pizza
                            </div>
                        </CardActions>

                    </Card>
                </Grid>
                <Grid item md={4}>
                    <Card sx={{ maxWidth: 345 }} className="card-foot">
                        <CardMedia
                            sx={{ height: 140 }}
                            image="https://vj-prod-website-cms.s3.ap-southeast-1.amazonaws.com/com-chay447x276-1646380254829.jpg"
                            title="green iguana"
                        />
                        <CardContent>
                            <p className="food-name">
                                Pizza Hot ( FillMore )
                            </p>
                        </CardContent>

                        <div className="food-price-wrapper">
                            <p className="food-price">
                                $220
                            </p>
                            <p className="food-delivery">
                                Delivery Free
                            </p>
                        </div>
                        <div className="food-time">
                            <AccessTimeOutlinedIcon fontSize="small" style={{ color: ' #7ebf47' }} />
                            <p className="time-serve">20-30 min</p>
                        </div>
                        <CardActions>
                            <div className="card-footer">
                                American + Fast Food + Pizza
                            </div>
                        </CardActions>

                    </Card>
                </Grid>
                <Grid item md={4}>
                    <Card sx={{ maxWidth: 345 }} className="card-foot">
                        <CardMedia
                            sx={{ height: 140 }}
                            image="https://vj-prod-website-cms.s3.ap-southeast-1.amazonaws.com/banh-mi447x276-1659948426297.jpeg"
                            title="green iguana"
                        />
                        <CardContent>
                            <p className="food-name">
                                Pizza Hot ( FillMore )
                            </p>
                        </CardContent>

                        <div className="food-price-wrapper">
                            <p className="food-price">
                                $220
                            </p>
                            <p className="food-delivery">
                                Delivery Free
                            </p>
                        </div>
                        <div className="food-time">
                            <AccessTimeOutlinedIcon fontSize="small" style={{ color: ' #7ebf47' }} />
                            <p className="time-serve">20-30 min</p>
                        </div>
                        <CardActions>
                            <div className="card-footer">
                                American + Fast Food + Pizza
                            </div>
                        </CardActions>

                    </Card>
                </Grid>
                <Grid item md={4}>
                    <Card sx={{ maxWidth: 345 }} className="card-foot">
                        <CardMedia
                            sx={{ height: 140 }}
                            image="https://vj-prod-website-cms.s3.ap-southeast-1.amazonaws.com/com-chien-thai447x276-1646377593272.jpg"
                            title="green iguana"
                        />
                        <CardContent>
                            <p className="food-name">
                                Pizza Hot ( FillMore )
                            </p>
                        </CardContent>

                        <div className="food-price-wrapper">
                            <p className="food-price">
                                $220
                            </p>
                            <p className="food-delivery">
                                Delivery Free
                            </p>
                        </div>
                        <div className="food-time">
                            <AccessTimeOutlinedIcon fontSize="small" style={{ color: ' #7ebf47' }} />
                            <p className="time-serve">20-30 min</p>
                        </div>
                        <CardActions>
                            <div className="card-footer">
                                American + Fast Food + Pizza
                            </div>
                        </CardActions>

                    </Card>
                </Grid>
                <Grid item md={4}>
                    <Card sx={{ maxWidth: 345 }} className="card-foot">
                        <CardMedia
                            sx={{ height: 140 }}
                            image="https://vj-prod-website-cms.s3.ap-southeast-1.amazonaws.com/com-chien-thai447x276-1646377593272.jpg"
                            title="green iguana"
                        />
                        <CardContent>
                            <p className="food-name">
                                Pizza Hot ( FillMore )
                            </p>
                        </CardContent>

                        <div className="food-price-wrapper">
                            <p className="food-price">
                                $220
                            </p>
                            <p className="food-delivery">
                                Delivery Free
                            </p>
                        </div>
                        <div className="food-time">
                            <AccessTimeOutlinedIcon fontSize="small" style={{ color: ' #7ebf47' }} />
                            <p className="time-serve">20-30 min</p>
                        </div>
                        <CardActions>
                            <div className="card-footer">
                                American + Fast Food + Pizza
                            </div>
                        </CardActions>

                    </Card>
                </Grid>
            </Grid>
        </Paper>
    )
}