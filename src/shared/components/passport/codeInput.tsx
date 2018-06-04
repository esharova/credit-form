import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import { InputProps } from '@material-ui/core/Input/Input';
import InputLabel from '@material-ui/core/InputLabel';
import * as React from 'react';
import MaskedInput from 'react-text-mask';

function TextMaskCustom(props: InputProps) {
    const { inputRef, ...other } = props;

    return (
        <MaskedInput
            {...other}
            ref={inputRef}
            mask={[/\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/]}
            placeholderChar={'\u2000'}
        />
    );
}

export class CodeInputField extends React.Component {
    public state = {
        value: '',
    };

    public setValue = event => {
        this.setState({
            value: event.target.value,
        });
    }

    public render() {
        const { value } = this.state;

        return (
            <div style={{
                display: 'flex',
                flexWrap: 'wrap',
                width: '100%',
            }}>
                <FormControl style={{width: '100%'}}>
                    <InputLabel htmlFor="code-input">Код подразделения</InputLabel>
                    <Input
                        id="code-input"
                        inputComponent={TextMaskCustom}
                        onChange={this.setValue}
                        value={value}
                    />
                </FormControl>
            </div>
        );
    }
}
