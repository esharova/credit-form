import MenuItem from '@material-ui/core/MenuItem/MenuItem';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Downshift from 'downshift';
import * as React from 'react';

export class AddressField extends React.Component {
    public state = {
        suggestions: [],
    };

    public render() {
        return <Downshift style={{width: '100%'}}>
            {
                ({getInputProps, getItemProps, isOpen, inputValue}) => {
                    if (inputValue) {
                        this.props.dadataAddressApi.getSuggestions(inputValue, (addresses) => {
                            this.setState({suggestions: addresses});
                        });
                    } else if (this.state.suggestions.length > 0) {
                        this.setState({suggestions: []});
                    }
                    let haveSuggestions = this.state.suggestions.length;

                    return <div>
                        <TextField label={this.props.label}
                                   style={{width: '100%'}}
                                   InputProps={getInputProps({
                                       id: 'address-input-' + this.props.uniqueId,
                                       placeholder: 'Начните вводить адрес и выберите из списка',
                                   })}/>
                        {isOpen && haveSuggestions > 0 ? (
                            <Paper style={{width: '100%'}} square>
                                {
                                    this.state.suggestions.map((suggestion, index) =>
                                        (<MenuItem
                                            key={suggestion}
                                            component="div"
                                            {...getItemProps({item: suggestion})}
                                        >{suggestion}</MenuItem>),
                                    )
                                }
                            </Paper>
                        ) : null}
                    </div>;
                }
            }
        </Downshift>;
    }
}
