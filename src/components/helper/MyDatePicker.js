import 'date-fns';
import React from 'react';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import {
    MuiPickersUtilsProvider,
    KeyboardTimePicker,
    KeyboardDatePicker,
} from '@material-ui/pickers';


export default function MaterialUIPickers(props) {
    // The first commit of Material-UI
    const [selectedDate, setSelectedDate] = React.useState(new Date());

    const handleDateChange = date => {
        setSelectedDate(date);
    };

    const defaultFormat = "dd/MM/yyyy";
    const {
        margin = "normal",
        id = "date-picker-dialog",
        label,
        format,
        value,
        maxDate,
        minDate,
        onChange,
        helperText = "",
        error = false,
        reference,
        disbaled,
        time,
        timeLabel
    } = props

    return (
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <Grid container justify="space-around"
                ref={reference}>

                <KeyboardDatePicker
                    disabled={disbaled}
                    format={ format || defaultFormat}
                    margin={margin}
                    id={id}
                    label={label}
                    format={format }
                    maxDate={maxDate}
                    minDate={minDate}
                    value={value}
                    onChange={onChange}
                    // onChange={handleDateChange}

                    InputLabelProps={{
                        shrink: true,
                    }}

                    helperText={helperText}
                    error={error}
                    KeyboardButtonProps={{
                        'aria-label': 'change date',
                    }}
                />
                {
                    time ?
                        <KeyboardTimePicker
                            margin="normal"
                            id="time-picker"
                            label={timeLabel}
                            value={value}
                            onChange={onChange}
                            KeyboardButtonProps={{
                                "aria-label": "change time"
                            }}
                        />
                        :
                        undefined
                }
            </Grid>

        </MuiPickersUtilsProvider>
    );
}
