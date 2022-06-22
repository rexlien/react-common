import React, {Component} from "react";
import {Button, TextField} from "@material-ui/core";


interface State {

   refereeOutput : any
}


export class HTTPReferenceField extends Component<any, State> {

    reference : (this: HTTPReferenceField) => Promise<any>
    label : string

    constructor(props) {
        super(props);
        this.state = { refereeOutput: 0 }
        this.label = props.label
        this.reference = props.reference.bind(null, this)
    }

    async componentDidMount() {
        await this.getReference()
    }

    async componentDidUpdate(prevProps: Readonly<any>, prevState: Readonly<State>, snapshot?: any) {

    }

    async getReference() {
        let output = await this.reference()
        this.setState({refereeOutput: output})
    }

    render() {

        return (<span>{this.state.refereeOutput}</span>)
    }


}
