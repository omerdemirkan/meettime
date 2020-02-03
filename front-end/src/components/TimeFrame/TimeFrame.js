import React from 'react';
import classes from './TimeFrame.module.css';

function getDisplayTime(date) {
    const parsedDate = new Date(date);
    const minutes = parsedDate.getMinutes();
    
    const hours = parsedDate.getHours() % 12;
    return (hours % 12 !== 0 ? hours % 12 : '12') + ':' + (minutes < 10 ? '0' : '') + minutes + (hours > 12 ? 'PM' : 'AM');
}

export default function TimeFrame(props) {
    return <div>
        <p>Start: {getDisplayTime(props.start)}</p>
        <p>End: {getDisplayTime(props.end)}</p>
    </div>
}
