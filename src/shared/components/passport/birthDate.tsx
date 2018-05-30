import * as React from "react";
import {TextField} from "@material-ui/core";

export class BirthDateField extends React.Component {

    render(): React.ReactNode {
        return <TextField style={{width: "100%"}} type="date" label="Дата рождения"  InputLabelProps={{
            shrink: true,
        }}/>;
    }
}