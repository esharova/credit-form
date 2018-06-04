import FormControl from '@material-ui/core/FormControl';
import Input, { InputProps } from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import * as React from 'react';
import MaskedInput from 'react-text-mask';

function TextMaskCustom(props: InputProps) {
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
    public state = {
        value: '',
    };

    public setValue = event => {
        this.setState({
            value: event.target.value,
        });
    }

    public render() {
        return (
            <div style={{
                display: 'flex',
                flexWrap: 'wrap',
                width: '100%',
            }}>
                <FormControl style={{width: '100%'}}>
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
