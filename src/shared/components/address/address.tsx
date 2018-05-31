import * as React from "react";
import {TextField} from "@material-ui/core";

export default class AddressField extends React.Component {

    render(): React.ReactNode {
        return <TextField label={this.props.label} style={{width: "100%"}}/>
    }
}