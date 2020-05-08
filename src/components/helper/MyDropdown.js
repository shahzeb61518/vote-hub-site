import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    formControl: {
        width: "100%",
        marginBottom: 28,
        marginTop: 16,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
}));

export default function SimpleSelect(props) {
    const classes = useStyles();
    const [values, setValues] = React.useState({
        age: '',
        name: 'hai',
    });

    const inputLabel = React.useRef(null);
    const [labelWidth, setLabelWidth] = React.useState(0);
    React.useEffect(() => {
        setLabelWidth(inputLabel.current.offsetWidth);
    }, []);

    const handleChange = event => {
        setValues(oldValues => ({
            ...oldValues,
            [event.target.name]: event.target.value,
        }));
    };


    const {
        label,
        value,
        disabled,
        onChange,
        required,
        helperText = "",
        error = false,
        reference,
        multiple = false,
        data = [],
        loader
    } = props

    return (
        <form className={classes.root} autoComplete="off">


            <FormControl
                variant="outlined"
                className={classes.formControl}
                ref={reference}
                error={error}
                required={required}
                disabled={disabled}
            >
                <InputLabel ref={inputLabel} htmlFor={`select-${label}`}>
                    {label}
                </InputLabel>

                <Select
                    value={value}
                    onChange={(e) => {
                        onChange(e)
                    }}
                    labelWidth={labelWidth}
                    inputProps={{
                        name: 'age',
                        id: `select-${label}`,
                    }}
                >
                    <MenuItem value="">
                        {loader ?
                            <em>{loader}</em>
                            :
                            <em>None</em>
                        }

                    </MenuItem>
                    {props.children}
                </Select>


                {
                    error
                    &&
                    <FormHelperText style={{ marginTop: 8 }}>
                        {helperText}
                    </FormHelperText>
                }
            </FormControl>

        </form>
    );
}