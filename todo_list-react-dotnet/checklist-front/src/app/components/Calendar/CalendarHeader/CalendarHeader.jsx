import React from "react";
import moment from "moment";
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";

import "../Calendar.css";

const weekDays = moment.weekdays();

function CalendarHeader({ date, onDateChange }) {
    const onPreviewMonthClick = () => {
        onDateChange(moment(date.subtract(1, "months")));
    };

    const onNextMonthClick = () => {
        onDateChange(moment(date.add(1, "months")));
    };

    return (
        <div className="Calendar-header">
            <div className="Calendar-header_control">
                <AiOutlineArrowLeft size={28} className="Calendar-header_arrow" onClick={onPreviewMonthClick} />
                <h3 className="prevent-select">{date.format("MMMM")} - {date.format("YYYY")}</h3>
                <AiOutlineArrowRight size={28} className="Calendar-header_arrow" onClick={onNextMonthClick} />
            </div>
            <div className="Calendar-header_week-days">
                {weekDays.map(day => {
                    return (
                        <div key={day} className="Calendar-week-day">
                            {day}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default CalendarHeader;
