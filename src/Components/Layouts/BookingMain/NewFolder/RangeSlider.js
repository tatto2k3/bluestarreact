import * as React from 'react';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
export default function RangeSlider({ value, setValue, setMinPrice, setMaxPrice }) {

    const handleChange = (event, newValue) => {
        setValue(newValue);
        setMinPrice(newValue[0]);
        setMaxPrice(newValue[1]);
        console.log(newValue);
    };

    return (
        <Box >
            <Slider
                value={value}
                onChange={handleChange}
                valueLabelDisplay="auto"
                min={0}
                max={20000000} 
                step={500000}
                default={[0, 5000000]}
            />
        </Box>
    );
}