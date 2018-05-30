import * as React from "react";
import {TextField} from "@material-ui/core";

export class GenderField extends React.Component {

    render(): React.ReactNode {
        return <TextField label="Пол"/>;
    }
}