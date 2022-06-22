import React, {Component} from "react";
import {addField} from "react-admin";
import JSONInput from 'react-json-editor-ajrm';
import locale from 'react-json-editor-ajrm/locale/en';
import {Typography} from "@material-ui/core";

class JsonPropertyInput_ extends Component {
    onChange(data) {

        const {label, record, input, meta, source} = this.props;

        //check syntax first before trigger update, if there's error, return and don't do update
        //NOTE: this will cause string with invalid json format not saved, which should be ok, we don't want to save erronous json string anyway.
        try {
            JSON.parse(data.json)

        } catch (ex) {
            console.info(ex)
            return
        }
        //trigger update
        if (typeof (input.value) === "object") {
            input.onChange(data.jsObject);
        } else {
            input.onChange(data.json);
        }
        input.onBlur();
    }

    render() {
        const {label, record, input, meta, source} = this.props;

        let jsonValue = "{}"
        try {
            if (typeof (input.value) === "object") {
                jsonValue = input.value
            } else {
                jsonValue = JSON.parse(input.value === "" ? "{\n}" : input.value)
            }
        } catch (ex) {
            jsonValue = "{}"
            console.info(ex)
        }

        return (
            <div>
                <Typography>{label}</Typography>
                <JSONInput
                    id='json_input'
                    placeholder={jsonValue}
                    locale={locale}
                    height='150px'
                    onChange={data => this.onChange(data)}
                    onKeyPressUpdate={false}
                    //reset = {false}
                />
            </div>
        )
    }

}


export const JsonPropertyInput = addField(JsonPropertyInput_)