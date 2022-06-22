import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { addField, FieldTitle } from "react-admin";
import { DatePicker, TimePicker, DateTimePicker } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import {MuiPickersUtilsProvider} from '@material-ui/pickers';
import moment from 'moment-timezone';
import MomentUtils from '@date-io/moment';


class UTCUtils extends MomentUtils {
    format(value, formatString) {
        return moment(value)
            .format(formatString);
    }
}

const parse = (value) => {
    if(value != null) {

        value = value - (value % 60000)
        return moment(value).valueOf();
    }
}

const parsePrecision = (precision, value) => {

    let interval = precision
    if(value != null) {

        if(value % interval !== 0) {
            value = value + (interval - value % interval)
        }
        return moment(value).valueOf();
    }
}


const makePicker = (PickerComponent) => {
    class _makePicker extends Component {
        onChange(date) {
            this.props.input.onChange(date);
            this.props.input.onBlur();
        }

        render() {
            const {
                input,
                options,
                label,
                source,
                resource,
                isRequired,
                className,
                meta,
                providerOptions,
            } = this.props;

            const { touched, error } = meta;

            if(moment.isMoment(input.value)) {
                const newMoment = moment(input.value).seconds(0).milliseconds(0)
                input.value.set(newMoment.toObject())

            }
            return (
                <div className="picker">
                    <MuiPickersUtilsProvider utils={MomentUtils}>
                        <PickerComponent
                            {...options}
                            label={<FieldTitle
                                label={label}
                                source={source}
                                resource={resource}
                                isRequired={isRequired}
                            />}
                            margin="normal"
                            error={!!(touched && error)}
                            helperText={touched && error}
                            ref={(node) => { this.picker = node; }}
                            className={className}
                            value={input.value ? input.value : null}
                            onChange={date => this.onChange(date)}
                            format="DD/MM/YYYY, HH:mm:ss"
                        />
                    </MuiPickersUtilsProvider>
                </div>
            );
        }
    }
    _makePicker.propTypes = {
        input: PropTypes.object,
        isRequired: PropTypes.bool,
        label: PropTypes.string,
        meta: PropTypes.object,
        options: PropTypes.object,
        resource: PropTypes.string,
        source: PropTypes.string,
        labelTime: PropTypes.string,
        className: PropTypes.string,
        providerOptions: PropTypes.shape({
            utils: PropTypes.func,
            locale: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
        }),
    };

    _makePicker.defaultProps = {
        input: {},
        isRequired: 'false',
        label: '',
        meta: { touched: false, error: false },
        options: {},
        resource: '',
        source: '',
        labelTime: '',
        className: '',
        providerOptions: {

            locale: undefined,
        },
    };
    return _makePicker;
};

export const DateInput = addField(makePicker(DatePicker));
export const TimeInput = addField(makePicker(TimePicker));
export const DateTimeInput = addField(makePicker(DateTimePicker), {parse});
export const CustomParseDateInput = (p) => addField(makePicker(DateTimePicker), {"parse": p});
export const TimeInputWithPrecision = (precision) => addField(makePicker(DateTimePicker), {"parse": parsePrecision.bind(this, precision)});