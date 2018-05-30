import * as React from "react";
import {TextField} from "@material-ui/core";

export class BirthLocationField extends React.Component {

    render(): React.ReactNode {
        return <TextField style={{width: "100%"}} label="Место рождения"/>;
    }
}