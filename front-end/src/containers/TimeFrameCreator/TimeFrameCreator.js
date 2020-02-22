import React, {useState} from 'react';
import classes from './TimeFrameCreator.module.css';

import { TimePicker } from "@material-ui/pickers";
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider
} from '@material-ui/pickers';
import Button from '../../components/UI/Button/Button';

export default function TimeFrameCreator(props) {
    const minDate = new Date(props.date);
    const maxDate = new Date(props.date);
    maxDate.setDate(minDate.getDate() + 1);

    const [startTime, setStartTime] = useState(minDate);
    const [endTime, setEndTime] = useState(minDate);

    const setTimeHandler = (date, type) => {

        if (date < minDate) {
            date.setDate(date.getDate() + 1);
        } else if (date > maxDate) {
            date.setDate(date.getDate() - 1);
        }

        if (type === 'start') {
            setStartTime(date);
        } else {
            setEndTime(date);
        }
    }

    const submitHandler = () => {
        props.add({
            start: startTime.getTime(), 
            end: endTime.getTime()
        });
    }

    return <div className={classes.TimeFrameCreator}>
        <div className={classes.TimePickerBox}>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <TimePicker 
                label="Start"
                minDate={minDate}
                maxDate={maxDate}
                value={startTime} 
                onChange={date => setTimeHandler(date, 'start')}
                className={classes.TimePicker}/>
                <TimePicker 
                label="End" 
                minDate={minDate}
                maxDate={maxDate}
                value={endTime} 
                onChange={date => setTimeHandler(date, 'end')}
                className={classes.TimePicker}/>

            </MuiPickersUtilsProvider>
        </div>

        <Button
        onClick={submitHandler}
        buttonClasses="Large"
        style={{width: '100%'}}
        >ADD AVAILABILITY</Button>
    </div>
}
