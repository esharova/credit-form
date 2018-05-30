import * as React from "react";
import {TextField} from "@material-ui/core";

export class BirthDateField extends React.Component {

    render(): React.ReactNode {
        return <TextField label="Дата рождения"/>;
    }
}