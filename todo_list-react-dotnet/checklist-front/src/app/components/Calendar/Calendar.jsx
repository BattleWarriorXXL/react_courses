import React, { useContext, useEffect, useState } from "react";
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";
import moment from "moment";

import AuthContext from "../../contexts/auth.context";
import TaskService from "../../services/task.service";
import Modal from "../Modal/Modal";
import CreateTask from "../Task/CreateTask/CreateTask";
import ShortTask from "../Task/ShortTask/ShortTask";
import TaskDetail from "../Task/TaskDetail/TaskDetail";

import "./Calendar.css";

const weekDays = moment.weekdays();
const daysInCalendar = 42;
const weeksInCalendar = 6;

function Calendar() {
    const {userId} = useContext(AuthContext);
    const [date, setDate] = useState(moment());
    const [showCreateTaskModal, setShowCreateTaskModal] = useState(false);
    const [showTaskDetailModal, setShowTaskDetailModal] = useState(false);
    const [selectedDay, setSelectedDay] = useState(null);
    const [tasks, setTasks] = useState([]);
    const [selectedTask, setSelectedTask] = useState(null);

    useEffect(() => {
        const fetchTasks = async () => {
            const data = await TaskService.getAllTasks(userId);
            setTasks(data);
        };

        fetchTasks();
    }, [userId]);

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

    const onPreviewMonthClick = () => {
        setDate(moment(date.subtract(1, "months")));
    };

    const onNextMonthClick = () => {
        setDate(moment(date.add(1, "months")));
    };

    const onTaskCreated = (task) => {
        // eslint-disable-next-line no-debugger
        debugger;
        tasks.push(task);
        setTasks(tasks);
        setShowCreateTaskModal(false);
    };

    const onTaskUpdated = (updatedTask) => {
        tasks[tasks.findIndex(t => t.id === updatedTask.id)] = updatedTask;
        setShowTaskDetailModal(false);
    };

    const onTaskDeleted = (task) => {
        setTasks(tasks.filter(t => t.id !== task.id));
        setShowTaskDetailModal(false);
    };

    const onTaskClicked = (task) => {
        setSelectedTask(task);
        setShowTaskDetailModal(true);
    };

    const onTaskCompleted = (completedTask) => {
        tasks[tasks.findIndex(t => t.id === completedTask.id)] = completedTask;
        setShowTaskDetailModal(false);
    };
    
    const onTaskCancelled = (cancelledTask) => {
        tasks[tasks.findIndex(t => t.id === cancelledTask.id)] = cancelledTask;
        setShowTaskDetailModal(false);
    };

    return (
        <>
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
            </div>
            <Modal title={`Create task for ${selectedDay?.format("DD-MM-YYYY")}`} show={showCreateTaskModal} onClose={() => setShowCreateTaskModal(false)}>
                <CreateTask selectedDate={moment(selectedDay)} onTaskCreated={(createdTask) => onTaskCreated(createdTask)} />
            </Modal>
            <Modal title={"Task details"} show={showTaskDetailModal} onClose={() => setShowTaskDetailModal(false)}>
                <TaskDetail
                    task={selectedTask}
                    onTaskUpdated={(updatedTask) => onTaskUpdated(updatedTask)}
                    onTaskDeleted={onTaskDeleted}
                    onTaskCompleted={(completedTask) => onTaskCompleted(completedTask)}
                    onTaskCancelled={(cancelledTask) => onTaskCancelled(cancelledTask)}
                    isAllowedToChangeStatus={true}
                    isAllowedToDelete={true} />
            </Modal>
        </>
    );
}

export default Calendar;
