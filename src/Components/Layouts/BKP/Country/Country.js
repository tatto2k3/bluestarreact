import React, { useState } from "react";
import "./Country.css";
export default function Country({
    countries,
    setSearchInfo,
    searchInfo,
    CountryClass,
    setIsOpenCountry,
    setAirport,
    Airport,
    setisHidden,
    isHidden
}) {

    return (
        <div className="country">
            <h5>Việt Nam</h5>
            {countries.map((airport, index) => {
                console.log(airport)
                return (
                    <div
                        className="airport_wrapper"
                        key={index}
                        onClick={() => {
                            if (CountryClass === "list_countries") {
                                setSearchInfo({
                                    ...searchInfo,
                                    FromLocation: airport.place,
                                    FromLocationId: airport.id 
                                });
                                setAirport({ ...Airport, fromAirport: airport.name })
                                setisHidden({ ...isHidden, fromAirportIsHidden: airport.name })
                            } else if (CountryClass === "list_countries right") {
                                setSearchInfo({
                                    ...searchInfo,
                                    ToLocation: airport.place, 
                                    ToLocationId: airport.id 
                                });
                                setAirport({ ...Airport, toAirport: airport.name })
                                setisHidden({ ...isHidden, toAirportIsHidden: airport.name })
                            }
                            setIsOpenCountry(false);
                        }}
                    >
                        <div className="airport_item">
                            <div className="airport_city">
                                <div className="city_name">{airport.place}</div>
                                <div className="city_code">{airport.name}</div>
                            </div>
                            <div className="airport_name"> {airport.id}</div>
                        </div>
                    </div>
                );
            })}
        </div>
    )
}