import * as React from 'react';
import MaskedInput from 'react-text-mask';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';


function TextMaskCustom(props) {
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


export default class CodeInputField extends React.Component {
    state = {
        value: ''
    };

    setValue = event => {
        this.setState({
            value: event.target.value,
        });
    };

    render() {
        const { value } = this.state;

        return (
            <div style={{
                width: "100%",
                display: 'flex',
                flexWrap: 'wrap',
            }}>
                <FormControl style={{width: "100%"}}>
                    <InputLabel htmlFor="formatted-text-mask-input">Код подразделения</InputLabel>
                    <Input
                        value={value}
                        onChange={this.setValue}
                        id="formatted-text-mask-input"
                        inputComponent={TextMaskCustom}
                    />
                </FormControl>
            </div>
        );
    }
}