import { FormHelperText } from '@material-ui/core';
import FormControl from '@material-ui/core/FormControl';
import Input, { InputProps } from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import * as React from 'react';
import { connect } from 'react-redux';
import MaskedInput from 'react-text-mask';
import { ActionCreatorsMapObject, bindActionCreators, Dispatch } from 'redux';
import { IApplicationState } from '../../reducers';
import * as actionCreators from '../../reducers/actions';

function TextMaskCustom(props: InputProps) {
    const {inputRef, ...other} = props;

    return (
        <MaskedInput
            {...other}
            ref={inputRef}
            mask={[/\d/, /\d/, /\d/, /\d/, ' ', /\d/, /\d/, /\d/, /\d/, /\d/, /\d/]}
            placeholderChar={'\u2000'}
        />
    );
}

interface IProps {
    error?: string;
    value?: string;
    actions?: ActionCreatorsMapObject;
}

function mapStateToProps(state: IApplicationState) {
    return {
        error: state.errors && state.errors.seriesNumber,
        value: state.application && state.application.passport && state.application.passport.seriesNumber || '',
    };
}

function mapDispatchToProps(dispatch: Dispatch) {
    return {actions: bindActionCreators(actionCreators, dispatch)};
}

@connect(mapStateToProps, mapDispatchToProps)
export class SeriesAndNumberField extends React.Component<IProps, {}> {

    public render() {
        const helperText = this.props.error ? <FormHelperText>{this.props.error}</FormHelperText> : '';

        return (
            <div style={{
                display: 'flex',
                flexWrap: 'wrap',
                width: '100%',
            }}>
                <FormControl style={{width: '100%'}} error={!!this.props.error}>
                    <InputLabel htmlFor="series-and-number-input">Серия и номер</InputLabel>
                    <Input
                        value={this.props.value}
                        onChange={e => this.props.actions && this.props.actions.updateSeriesNumber(e.target.value)}
                        id="series-and-number-input"
                        inputComponent={TextMaskCustom}
                    />
                    {helperText}
                </FormControl>
            </div>
        );
    }
}
