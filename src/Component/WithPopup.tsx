import React, {Component} from "react";
import {PopUp} from "./PopUp";

export interface WithPopUpProps {
    popUpOpen: boolean
    queryResult: {}
    handleOnClose : () => void
    showPop : (queryResult: any) => void

}

export function withPopup(WrappedComponent: React.ComponentType<any>) {

    return class extends Component<any, WithPopUpProps> {

        constructor(props : any) {
            super(props);
            this.state = {popUpOpen: false, queryResult: {}, handleOnClose:this.handleOnClose, showPop: this.showPop.bind(this)}
        }

        handleOnClose = () => {
            this.setState({popUpOpen: false, queryResult: {}})
            return;
        }

        showPop(queryResult: any) {

            this.setState({queryResult: queryResult})
            this.setState({popUpOpen: true});
        }

        render() {
            return (
                <div>
                <WrappedComponent withPopupHoc={this.state} {...this.props}/>
                    <PopUp isOpen={this.state.popUpOpen} content={this.state.queryResult} onClose={this.state.handleOnClose.bind(this)}/>
                </div>
            )
        }
    }
}