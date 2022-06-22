import React, {Component} from "react";
import {MenuItem, Select} from "@material-ui/core";
import {addField, NumberInput, TextInput} from "react-admin";
import {RequiredNotEmpty} from "./Validation";
import Grid from "@material-ui/core/Grid";

class TypedPropertyInput_ extends Component
{

    constructor(props) {
        super(props);
        this.state = {type:0};
    }

    componentDidMount() {

        const {label, record, input, meta, source, relativeSource} = this.props;

        let target = input.value;//record[relativeSource]

        if(target == null) {
            this.setState({type:0});
        } else {

            if (typeof (target) === "number") {
                this.setState({type:0})
            } else {
                this.setState({type:1})
            }
        }
    }

    onChange(event) {

        const {input} = this.props;
        input.onChange(null);
        this.setState({type: event.target.value})
    }


    render() {

        const {label, record, input, meta, source} = this.props;
        const {type} = this.state;

        if (type == 0) {
            return (
                <span>
                    <Grid container spacing={1}>
                        <Grid item xs={1} sm={1}>
                            <Select value={type} onChange={this.onChange.bind(this)}>
                                <MenuItem value={0}>Number</MenuItem>
                                <MenuItem value={1}>String</MenuItem>
                            </Select>
                        </Grid>
                        <Grid item xs={11}>
                            <NumberInput fullWidth source={source} label={label} validate={RequiredNotEmpty}/>
                        </Grid>
                    </Grid>
                </span>

            )
        } else {

            return (

                <span>
                    <Grid container spacing={1}>
                    <Grid item xs={1} sm={1}>
                        <Select value={type} onChange={this.onChange.bind(this)}>
                            <MenuItem value={0}>Number</MenuItem>
                            <MenuItem value={1}>String</MenuItem>
                        </Select>
                    </Grid>

                    <Grid item xs={11}>
                    <TextInput fullWidth source={source} label={label} validate={RequiredNotEmpty}/>
                    </Grid>
                    </Grid>
                </span>
            )
        }
    }

};

export const TypedPropertyInput = addField(TypedPropertyInput_)