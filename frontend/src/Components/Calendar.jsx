import React, { useState, useEffect } from 'react';
import '../Calendar.css';

const Calendar = () => {
    const [toDos, setToDos] = useState([]);
    const [toDosOfWeek, setToDosOfWeek] = useState([]);
    let userId = localStorage.getItem("userId");
    const fetchToDos = () =>
        fetch(`/api/ToDo/${userId}`, {
            method: "GET",
            headers: { "Content-Type": "application/json" },
        }).then((response) => response.json())
            .then((json) => {
                setToDos(json);

            });

    useEffect(() => {
        console.log(userId);
        fetchToDos();
        console.log(toDos);

    }, [toDos.length])
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
    const getToDos = (date) => {
        let actualToDos = [];
        for (let i = 0; i < toDos.length; i++) {
            let toDoDate = new Date(toDos[i].deadline);
            console.log(date);
            if (date === toDoDate) {
                actualToDos.push(toDos[i])
            }
        }
        return actualToDos;
    }
    const month = first_day_of_the_week.getMonth();
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    const renderCalendar = () => {
        const weekDays = [];
        let currentDate = new Date(first_day_of_the_week);

        for (let i = 0; i < 7; i++) {
            weekDays.push(
                <td
                    key={`day-${i}`}
                    className={`day ${currentDate.getDate() === date_today.getDate() ? 'today' : ''}`}
                >
                    <div>{currentDate.getDate()}</div>
                    {getToDos(currentDate.getDate()).length > 0 ? getToDos(currentDate.getDate()).map(t => <div>{t.taskName}</div>) : ""}
                </td>
            );
            currentDate.setDate(currentDate.getDate() + 1);
        }
        return <tr>{weekDays}</tr>;
    };

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