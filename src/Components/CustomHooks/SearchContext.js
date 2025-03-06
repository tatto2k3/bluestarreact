import React, { createContext, useContext, useState } from 'react';

const SearchContext = createContext();

export const SearchProvider = ({ children }) => {
    const [searchResult, setSearchResult] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [tripType, setTripType] = useState("oneWay");
    const [passengerInfo, setPassengerInfo] = useState({
        FirstName: "",
        LastName: "",
        DateOfBirth: "",
        PassportNumber: "",
        Country: "",
        City: "",
        District: "",
        Contact: "",
        Email: "",
        Discount: ""
    })
    const [searchInfo, setSearchInfo] = useState({
        FromLocation: "",
        ToLocation: "",
        DepartTime: "",
        ComeBackTime: ""
    })
    const [airport, setAirport] = useState({
        fromAirport: "",
        toAirport: ""
    })
    const [departFlight, setDepartFlight] = useState({});
    const [ariveFlight, setArriveFlight] = useState({});
    const [total1, setTotal1] = useState(0);
    const [foodItems1, setFoodItems1] = useState([]);
    const [total2, setTotal2] = useState(0);
    const [foodItems2, setFoodItems2] = useState([]);
    const [seatId, setSeatId] = useState("");
    const [luggaeId, setLuggageId] = useState("");
    const addFoodItem1 = (itemName, itemPrice) => {
        const existingItem = foodItems1?.find(item => item.name === itemName);

        if (existingItem) {

            const updatedItems = foodItems1?.map(item =>
                item.name === itemName ? { ...item, quantity: item.quantity + 1 } : item
            );
            setFoodItems1(updatedItems);
        } else {

            const newItem = { name: itemName, price: itemPrice, quantity: 1 };
            setFoodItems1([...foodItems1, newItem]);
        }
    };

    const calculateTotal1 = (ticketPrice) => {
        const ticketPriceNumber = parseFloat(ticketPrice) || 0;
        const foodTotal1 = (foodItems1 ?? []).reduce((total, item) => total + item.price * item.quantity, 0);
        
        return 120000 + ticketPriceNumber + foodTotal1;
    };

    const addFoodItem2 = (itemName, itemPrice) => {
        const existingItem = foodItems2?.find(item => item.name === itemName);

        if (existingItem) {

            const updatedItems = foodItems2?.map(item =>
                item.name === itemName ? { ...item, quantity: item.quantity + 1 } : item
            );
            setFoodItems2(updatedItems);
        } else {

            const newItem = { name: itemName, price: itemPrice, quantity: 1 };
            setFoodItems2([...foodItems1, newItem]);
        }
    };


    const calculateTotal2 = (ticketPrice) => {
        const ticketPriceNumber = parseFloat(ticketPrice) || 0;
        const foodTotal2 = foodItems2?.reduce((total, item) => total + item.price * item.quantity, 0);
        return 120000 + ticketPrice + foodTotal2;
    };
    return (
        <SearchContext.Provider value={[searchResult, setSearchResult, isLoading, setIsLoading, searchInfo,
            setSearchInfo, tripType, setTripType, airport, setAirport, departFlight, setDepartFlight, ariveFlight, setArriveFlight,
            total1, setTotal1, foodItems1, setFoodItems1, total2, setTotal2,
            foodItems2, setFoodItems2, addFoodItem1, calculateTotal1, addFoodItem2, calculateTotal2, passengerInfo,
            setPassengerInfo, seatId, setSeatId, luggaeId, setLuggageId
        ]}>
            {children}
        </SearchContext.Provider>
    );
};

export const useSearch = () => {
    return useContext(SearchContext);
};