import * as React from 'react';
import {MenuItem, Paper, TextField} from "@material-ui/core";
import Downshift from "downshift";

class AddressField extends React.Component {
    state = {
        suggestions: []
    };

    render() {
        return <Downshift style={{width: "100%"}}>
            {
                ({getInputProps, getItemProps, isOpen, inputValue}) => {
                    if (inputValue)
                        this.props.dadataAddressApi.getSuggestions(inputValue, (addresses) => {
                            this.setState({suggestions: addresses})
                        });
                    else if (this.state.suggestions.length > 0)
                        this.setState({suggestions: []});
                    let haveSuggestions = this.state.suggestions.length;
                    console.log(this.state.suggestions);
                    return <div>
                        <TextField style={{width: "100%"}}
                                   InputProps={getInputProps({
                                       placeholder: 'Начните вводить адрес и выберите из списка',
                                       id: 'address-input-'+this.props.uniqueId,
                                   })}/>
                        {isOpen && haveSuggestions > 0 ? (
                            <Paper style={{width: "100%"}} square>
                                {
                                    this.state.suggestions.map((suggestion, index) =>
                                        (<MenuItem
                                            key={suggestion}
                                            component="div"
                                            {...getItemProps({item: suggestion})}
                                        >{suggestion}</MenuItem>)
                                    )
                                }
                            </Paper>
                        ) : null}
                    </div>
                }
            }
        </Downshift>
    }
}

export default AddressField;
