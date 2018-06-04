import * as React from 'react';
import MaskedInput from 'react-text-mask';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';

function TextMaskCustom(props) {
    const { inputRef, ...other } = props;

    return (
        <MaskedInput
            {...other}
            ref={inputRef}
            mask={[/\d/, /\d/, /\d/, /\d/, ' ', /\d/, /\d/, /\d/, /\d/, /\d/, /\d/]}
            placeholderChar={'\u2000'}
        />
    );
}


export class SeriesAndNumberField extends React.Component {
    state = {
        value: ''
    };

    setValue = event => {
        this.setState({
            value: event.target.value,
        });
    };

    render() {
        return (
            <div style={{
                width: "100%",
                display: 'flex',
                flexWrap: 'wrap',
            }}>
                <FormControl style={{width: "100%"}}>
                    <InputLabel htmlFor="series-and-number-input">Серия и номер</InputLabel>
                    <Input
                        value={this.state.value}
                        onChange={this.setValue}
                        id="series-and-number-input"
                        inputComponent={TextMaskCustom}
                    />
                </FormControl>
            </div>
        );
    }
}