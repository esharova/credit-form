import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import * as React from 'react';

export class CitizenshipPassportField extends React.Component {
    public state = {
        value: 'RF',
    };

    public setValue = (event) => {
        this.setState({value: event.target.value});
    }

    public render(): React.ReactNode {
        return <FormControl style={{width: '100%'}}>
            <InputLabel htmlFor="citizenship">Гражданство</InputLabel>
            <Select id="citizenship" value={this.state.value} onChange={this.setValue}>
                <MenuItem value="RF">Российская Федерация</MenuItem>
                <MenuItem value="OTHER">Иное</MenuItem>
            </Select>
        </FormControl>;
    }
}
