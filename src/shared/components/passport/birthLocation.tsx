import * as React from "react";
import {TextField} from "@material-ui/core";

export class BirthLocationField extends React.Component {

    render(): React.ReactNode {
        return <TextField id="birth-loc-input" style={{width: "100%"}} label="Место рождения"/>;
    }
}