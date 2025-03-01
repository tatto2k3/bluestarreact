import React, { useState } from "react";
import "react-calendar/dist/Calendar.css";
import "./CustomCalendar.css";
import Calendar from "react-calendar";
export default function CustomCalendar({ setIsOpenTimeline, timelineClass, searchInfo, setSearchInfo }) {
    const [date, setDate] = useState(null);
    const [minDate, setMinDate] = useState(new Date());
    function formatDate(date) {
        const day = date.getDate();
        const month = date.getMonth() + 1;
        const year = date.getFullYear();
        return `${year}-${month}-${day}`;
    }
    const handleDateChange = (newDate) => {
        if (timelineClass === "calendar_wrapper_up") {
            console.log("up");
            setSearchInfo({ ...searchInfo, DepartTime: formatDate(newDate) })
        } else if (timelineClass === "calendar_wrapper_down") {
            console.log("down");
            setSearchInfo({ ...searchInfo, ComeBackTime: formatDate(newDate) })
        }
        setDate(newDate);
        setMinDate(newDate);
        setIsOpenTimeline(false);
    };
    return (
        <Calendar onChange={handleDateChange} minDate={minDate} />
    )
}