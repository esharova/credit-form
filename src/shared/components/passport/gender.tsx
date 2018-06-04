

import * as React from "react";
import {FormControl, InputLabel, MenuItem, Select} from "@material-ui/core";

export class GenderField extends React.Component {
    state = {
        value: "MALE"
    };

    setValue = (event) => {
        this.setState({"value": event.target.value});
    };

    render(): React.ReactNode {
        return <FormControl style={{width: "100%"}}>
            <InputLabel htmlFor="gender">Пол</InputLabel>
            <Select id="gender-select" value={this.state.value} onChange={this.setValue}>
                <MenuItem value="MALE">Мужской</MenuItem>
                <MenuItem value="FEMALE">Женский</MenuItem>
            </Select>
        </FormControl>
    }
}