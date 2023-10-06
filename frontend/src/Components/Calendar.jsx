import React, { useState, useEffect } from 'react';
import '../Calendar.css';

const Calendar = (props) => {
    let userId = localStorage.getItem("userId");
    const date_today = new Date();
    let starter = new Date(date_today.setDate(date_today.getDate() - date_today.getDay()));
    starter.setHours(0, 0, 0, 0);
    const [first_day_of_the_week, setFirst_day_of_the_week] = useState(starter);
    const showProgram = () => {

    }
    function getDifferenceInDays(date1, date2) {
        const diffInMs = Math.abs(date2 - date1);
        return diffInMs / (1000 * 60 * 60 * 24);
    }
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const renderDaysOfWeek = () => {
        return (
            <div>
                {days.map((day) => (
                    <th key={day} className="day-of-week">
                        {day}
                    </th>
                ))}
            </div>
        );
    };

    const addDays = (date, daysToAdd) => {
        const newDate = new Date(date);
        newDate.setDate(newDate.getDate() + daysToAdd);
        return newDate;
    };

    const handlePrev = () => {
        setFirst_day_of_the_week((prevDate) => addDays(prevDate, -7));
    };

    const handleNext = () => {
        setFirst_day_of_the_week((prevDate) => addDays(prevDate, 7));
    };
    const month = first_day_of_the_week.getMonth();
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const currentDate = new Date(first_day_of_the_week);
    currentDate.setHours(0, 0, 0, 0);
    const getToDos = (date) => {
        let actualToDos = [];
        for (let i = 0; i < props.toDos.length; i++) {
            let toDoDate = new Date(props.toDos[i].deadline);
            if (date.getDate() === toDoDate.getDate() && date.getMonth() === toDoDate.getMonth() && date.getFullYear() === toDoDate.getFullYear()) {
                actualToDos.push(props.toDos[i])
            }
        }
        return actualToDos;
    }
    const getPrograms = (date) => {

        let actualPrograms = {};
        for (let i = 0; i < props.programs.length; i++) {
            let programStart = new Date(props.programs[i].start);
            programStart.setHours(0, 0, 0, 0);
            let programEnd = new Date(props.programs[i].end)
            programEnd.setHours(0, 0, 0, 0);

            let programDate = new Date(props.programs[i].start);
            let length = Math.ceil(getDifferenceInDays(programStart, programEnd)) + 1;
            if (programStart < first_day_of_the_week && programEnd >= first_day_of_the_week && date.valueOf() === first_day_of_the_week.valueOf()) {

                length -= Math.ceil(getDifferenceInDays(programStart, new Date(first_day_of_the_week - 1)));
                actualPrograms[props.programs[i].id] = length;
            } else
                if (date.getDate() === programDate.getDate() && date.getMonth() === programDate.getMonth() && date.getFullYear() === programDate.getFullYear()) {
                    actualPrograms[props.programs[i].id] = length;
                }
        }
        return actualPrograms;
    }

    const renderCalendar = () => {
        const weekDays = [];
        for (let i = 0; i < 7; i++) {
            weekDays.push(
                <div
                    key={`day-${i}`}
                    className={`day ${currentDate.getDate() === new Date().getDate() && currentDate.getMonth() === new Date().getMonth() && currentDate.getFullYear() === new Date().getFullYear() ? 'today' : ''}`}
                >

                    <div className="tablecontent dayDate">{currentDate.getDate()}</div>
                    {!props.isMainPage ?
                        getToDos(currentDate).length > 0 ?
                            getToDos(currentDate).map(t => <div key={t.id} className={t.ready ? "tablecontent ready event" : "tablecontent not_ready event"} onClick={(e) => props.handleClick(t.id)}>{t.taskName}</div>)
                            : "" : ""}
                    {Object.keys(getPrograms(currentDate)).length > 0 ?
                        Object.keys(getPrograms(currentDate)).map((pId, index) => <div key={index} className={`tablecontent event `} data-span={getPrograms(currentDate)[pId]} onClick={(e) => showProgram(index)}>{props.programs.find(p => p.id === parseInt(pId)).name}</div>)
                        : ""}
                </div>

            );
            currentDate.setDate(currentDate.getDate() + 1);
        }
        return <div className="week">{weekDays}</div>;
    };
    useEffect(() => { renderCalendar() }, [props.toDo])
    return (
        <div className="calendar">
            <div className="header">
                <button className="prev" onClick={handlePrev}>
                    Previous
                </button>
                <h2>{months[month]}</h2>
                <button className="next" onClick={handleNext}>
                    Next
                </button>
            </div>
            <div className="weekCalendar">
                <div className="days-of-week">{renderDaysOfWeek()}</div>
                <div className="weekcontainer">{renderCalendar()}</div>
            </div>
        </div>
    );
};

export default Calendar;