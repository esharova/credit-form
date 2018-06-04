import { FormControl, InputLabel, MenuItem, Select } from '@material-ui/core';
import * as React from 'react';

export class GenderField extends React.Component {
    public state = {
        value: 'MALE',
    };

    public setValue = (event) => {
        this.setState({value: event.target.value});
    }

    public render(): React.ReactNode {
        return <FormControl style={{width: '100%'}}>
            <InputLabel htmlFor="gender">Пол</InputLabel>
            <Select value={this.state.value} onChange={this.setValue}>
                <MenuItem value="MALE">Мужской</MenuItem>
                <MenuItem value="FEMALE">Женский</MenuItem>
            </Select>
        </FormControl>;
    }
}
