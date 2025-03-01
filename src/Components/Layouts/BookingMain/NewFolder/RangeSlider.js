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
                min={20} // Giá trị tối thiểu
                max={1000} // Giá trị tối đa
                step={2}
                default={[20, 700]}
            />
        </Box>
    );
}