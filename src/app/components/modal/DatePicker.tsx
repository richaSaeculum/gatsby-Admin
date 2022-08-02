import React, { useState } from 'react'
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import './styles/datepicker.scss'

const DatePicker = ({value, onChange}: any) => {

    return (
        <div className='date-picker'>
            <ReactDatePicker
                selected={value}
                onChange={(date: any) => onChange(date)}
                className="form-control rounded"
                dateFormat="MMM yyyy"
                showMonthYearPicker
                showFullMonthYearPicker
            />
        </div>
    )
}

export default DatePicker
