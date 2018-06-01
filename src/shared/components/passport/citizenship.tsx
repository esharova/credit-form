import * as React from "react";
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

export class CitizenshipPassportField extends React.Component {
    state = {
        value: "RF"
    };

    setValue = (event) => {
        this.setState({"value": event.target.value});
    };

    render(): React.ReactNode {
        return <FormControl style={{width: "100%"}}>
            <InputLabel htmlFor="citizenship">Гражданство</InputLabel>
            <Select id="citizenship" value={this.state.value} onChange={this.setValue}>
                <MenuItem value="RF">Российская Федерация</MenuItem>
                <MenuItem value="OTHER">Иное</MenuItem>
            </Select>
        </FormControl>
    }
}