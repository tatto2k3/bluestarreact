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
                return (
                    <div
                        className="airport_wrapper"
                        key={index}
                        onClick={() => {
                            if (CountryClass === "list_countries") {
                                setSearchInfo({ ...searchInfo, FromLocation: airport.place });
                                setAirport({ ...Airport, fromAirport: airport.airportName })
                                setisHidden({ ...isHidden, fromAirportIsHidden: airport.airportName })
                            } else if (CountryClass === "list_countries right") {
                                setSearchInfo({ ...searchInfo, ToLocation: airport.place });
                                setAirport({ ...Airport, toAirport: airport.airportName })
                                setisHidden({ ...isHidden, toAirportIsHidden: airport.airportName })
                            }
                            setIsOpenCountry(false);
                        }}
                    >
                        <div className="airport_item">
                            <div className="airport_city">
                                <div className="city_name">{airport.place}</div>
                                <div className="city_code">{airport.airportName}</div>
                            </div>
                            <div className="airport_name"> {airport.airportId}</div>
                        </div>
                    </div>
                );
            })}
        </div>
    )
}