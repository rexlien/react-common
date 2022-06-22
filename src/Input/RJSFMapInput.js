import React, {Component, Fragment} from "react";
import {addField} from "react-admin";
import Form from "@rjsf/material-ui";


class RJSFMapInput_ extends Component {
    onChange(event, error) {
        const {label, record, input, meta, source} = this.props;

        //trigger update
        input.onChange(event.formData);
        input.onBlur();
    }

    render() {
        const {label, record, input, meta, source} = this.props;
        let jsonValue
        try {
            if (typeof (input.value) !== "object") {
                jsonValue = JSON.parse(input.value)
            } else {
                jsonValue = input.value
            }
        } catch (ex) {
            jsonValue = {}
            console.info(ex)
        }

        const MapScheme = {

            title: `${label}`,//"Properties",
            type: "object",
            additionalProperties: {
                type: "string"
            }
        };

        return (
            <Form schema={MapScheme}
                  onChange={this.onChange.bind(this)}
                  formData={jsonValue}

            >
                <Fragment/>
            </Form>
        )
    }

}


export const RJSFMapInput = addField(RJSFMapInput_)
//export default RJSFMapInput