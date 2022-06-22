import React, {Component} from "react";
import {addField} from "react-admin";
import {ReactJsonEditor} from "../Component/ReactJsonEditor"
import {Typography} from "@material-ui/core";

class ReactJsonEditorInput_ extends Component {

    constructor(props) {
        super(props);
        this.state = {editContent : ""}
    }

    onChange(data) {
        const {label, record, input, meta, source} = this.props;
        this.state.editContent = data;
    }

    onBlur(data) {
        const {label, record, input, meta, source} = this.props;

        console.debug(this.state.editContent)
        if(this.state.editContent === "") {

            //let json = JSON.parse('""')
            input.onChange("")
            return;
        }
        let json = null
        //will not save if not valid json
        try {
            json = JSON.parse(this.state.editContent)
        }catch (e) {
            console.log(e)
            return;
        }
        if(typeof(json) === "object") {
            input.onChange(json)//JSON.stringify(json))

        } else {
            input.onChange(json)
        }

    }

    componentDidMount() {

        const {label, record, input, meta, source} = this.props;

        //if(typeof(input.value) === "object") {
            this.setState({editContent : JSON.stringify(input.value)})
        //} else {

            //wrap double quote
        //    let tmpStr = input.value
          //  tmpStr = JSON.stringify(tmpStr)
//
  //          this.setState({editContent: tmpStr})
    //    }
    }

    render() {
        const modes = ['tree', 'form', 'view', 'code', 'text'];
        const {label, record, input, meta, source} = this.props;
        return (
            <div>
                <Typography>{label}</Typography>
                <ReactJsonEditor
                    text={this.state.editContent}
                    mode={"code"}
                    modes={modes}
                    indentation={4}
                    onChangeText={this.onChange.bind(this)}
                    onBlur={this.onBlur.bind(this)}

                />
            </div>
        )
    }

}

export const ReactJsonEditorInput = addField(ReactJsonEditorInput_)
//export default ReactJsonEditorInput