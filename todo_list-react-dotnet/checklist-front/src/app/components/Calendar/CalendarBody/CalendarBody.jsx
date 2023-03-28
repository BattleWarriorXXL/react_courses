import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import moment from "moment";

import CreateTask from "../../Task/CreateTask/CreateTask";
import ShortTask from "../../Task/ShortTask/ShortTask";
import Modal from "../../Modal/Modal";

import "../Calendar.css";

const daysInCalendar = 42;
const weeksInCalendar = 6;

const CalendarBody = ({ date, tasks, onTasksChanged, onTaskSelected }) => {
    const [showCreateTaskModal, setShowCreateTaskModal] = useState(false);
    const [selectedDay, setSelectedDay] = useState(null);
    const navigate = useNavigate();
    
    const onTaskCreated = (task) => {
        tasks.push(task);
        onTasksChanged(tasks);
        setShowCreateTaskModal(false);
    };

    const onTaskClicked = (task) => {
        onTaskSelected(task);
        navigate("/tasks/detail");
    };
    
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

    const getTasksForDay = (day) => {
        return tasks.filter(task => moment(task.date).startOf("day").isSame(day.startOf("day")));
    };

    const onDayClicked = (day) => {
        setSelectedDay(moment(day));
        setShowCreateTaskModal(true);
    };

    return (
        <>
            <div className="Calendar-body">
                {getCalendarWeeks().map((week, i) => {
                    return (
                        <div key={`week_${i}`} className="Calendar-week">
                            {week.map((day, j) => {
                                return (
                                    <div key={`week_${i}_day_${j}`} className="Calendar-day-container">
                                        <div onClick={() => onDayClicked(moment(day))} className={day.format("DD-MM-YYYY") === moment().format("DD-MM-YYYY")
                                            ? "Calendar-day_header Calendar-day_header__today"
                                            : "Calendar-day_header"}>
                                            {day.format("D")}
                                        </div>
                                        <div className="Calendar-day_content">
                                            {getTasksForDay(day).map(task => {
                                                return (
                                                    <ShortTask key={task.id} task={task} onTaskClicked={(task) => onTaskClicked(task)} />
                                                );
                                            })}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    );
                })}
            </div>
            <Modal title={`Create task for ${selectedDay?.format("DD-MM-YYYY")}`} show={showCreateTaskModal} onClose={() => setShowCreateTaskModal(false)}>
                <CreateTask selectedDate={moment(selectedDay)} onTaskCreated={(createdTask) => onTaskCreated(createdTask)} />
            </Modal>
        </>
    );
};

export default CalendarBody;
