import moment from "moment/moment";
import React, { useState } from "react";
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";
import "./Calendar.css";

const weekDays = moment.weekdays();
const daysInCalendar = 42;
const weeksInCalendar = 6;

function Calendar() {
    const [date, setDate] = useState(moment());

    const getPreviousMonthCalendarDays = () => {
        const previousMonth = moment(date).subtract(1, "month");
        return Array.from(Array(previousMonth.daysInMonth()), (_, i) => {
            let item = moment(previousMonth).date(i);
            item.isCurrent = false;

            return item;
        });
    };

    const getNextMonthCalendarDays = () => {
        const nextMonth = moment(date).add(1, "month");
        return Array.from(Array(nextMonth.daysInMonth()), (_, i) => {
            let item = moment(nextMonth).date(i);
            item.isCurrent = false;

            return item;
        });
    };

    const getCurrentMonthCalendarDays = () => {
        const daysInMonth = date.daysInMonth();
        return Array.from(Array(daysInMonth), (_, i) => {
            let item = moment(date).date(i);
            item.isCurrent = true;

            return item;
        });
    };

    const getCalendarDays = () => {
        const firstDayOfCurrentMonth = date.startOf("month").format("d");
        const previousMonthDays = getPreviousMonthCalendarDays();
        const nextMonthDays = getNextMonthCalendarDays();

        const days = [
            ...previousMonthDays.slice(previousMonthDays.length + 1 - firstDayOfCurrentMonth, previousMonthDays.length),
            ...getCurrentMonthCalendarDays()
        ];

        days.push(...nextMonthDays.slice(0, daysInCalendar - days.length));
        return days;
    };

    const getCalendarWeeks = () => {
        const daysOfMonth = getCalendarDays();
        return Array.from(Array(weeksInCalendar), (_, i) => daysOfMonth.slice(i * 7, i * 7 + 7));
    };

    const onDayClick = (day) => {
        console.log(day.format("YYYY_MM_DD"));
    };

    const onPreviewMonthClick = () => {
        setDate(moment(date.subtract(1, "months")));
    };

    const onNextMonthClick = () => {
        setDate(moment(date.add(1, "months")));
    };

    return (
        <div className="Calendar-container">
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
            <div className="Calendar-body">
                {getCalendarWeeks().map((week, i) => {
                    return (
                        <div key={`week_${i}`} className="Calendar-week">
                            {week.map((day, j) => {
                                return (
                                    <div key={`week_${i}_day_${j}`} className="Calendar-day-container" onClick={() => onDayClick(day)}>
                                        <div className={day.format("DD-MM-YYYY") === moment().format("DD-MM-YYYY")
                                            ? "Calendar-day_header Calendar-day_header__today"
                                            : "Calendar-day_header"}>
                                            {day.format("D")}
                                        </div>
                                        <div className="Calendar-day_content">
                                            Content
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default Calendar;
