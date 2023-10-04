import React, { useState, useEffect } from 'react';
import '../Calendar.css';

const Calendar = (props) => {
    let userId = localStorage.getItem("userId");
    const date_today = new Date();
    const [first_day_of_the_week, setFirst_day_of_the_week] = useState(new Date(date_today.setDate(date_today.getDate() - date_today.getDay())));

    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const renderDaysOfWeek = () => {
        return (
            <tr>
                {days.map((day) => (
                    <th key={day} className="day-of-week">
                        {day}
                    </th>
                ))}
            </tr>
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

    const renderCalendar = () => {
        const weekDays = [];

        for (let i = 0; i < 7; i++) {
            weekDays.push(
                <td
                    key={`day-${i}`}
                    className={`day ${currentDate.getDate() === new Date().getDate() && currentDate.getMonth() === new Date().getMonth() && currentDate.getFullYear() === new Date().getFullYear() ? 'today' : ''}`}
                >
                    <div className='dayDiv'>
                        <div className="tablecontent">{currentDate.getDate()}</div>
                        {getToDos(currentDate).length > 0 ? getToDos(currentDate).map(t => <div key={t.id} className={t.ready ? "tablecontent ready" : "tablecontent not_ready"} onClick={(e) => props.handleClick(t.id)}>{t.taskName}</div>) : ""}
                    </div>
                </td>
            );
            currentDate.setDate(currentDate.getDate() + 1);
        }
        return <tr>{weekDays}</tr>;
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
            <table className="weekCalendar">
                <thead className="days-of-week">{renderDaysOfWeek()}</thead>
                <tbody className="calendar-grid">{renderCalendar()}</tbody>
            </table>
        </div>
    );
};

export default Calendar;