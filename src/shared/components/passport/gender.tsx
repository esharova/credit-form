import { FormControl, FormHelperText, InputLabel, MenuItem, Select } from '@material-ui/core';
import * as React from 'react';
import { connect } from 'react-redux';
import { ActionCreatorsMapObject, bindActionCreators, Dispatch } from 'redux';
import { IApplicationState } from '../../reducers';
import * as actionCreators from '../../reducers/actions';

function mapStateToProps(state: IApplicationState) {
    return {
        error: state.errors && state.errors.gender,
        value: state.application && state.application.passport && state.application.passport.gender || '',
    };
}

function mapDispatchToProps(dispatch: Dispatch) {
    return {actions: bindActionCreators(actionCreators, dispatch)};
}

interface IProps {
    error?: string;
    value?: string;
    actions?: ActionCreatorsMapObject;
}

@connect(mapStateToProps, mapDispatchToProps)
export class GenderField extends React.Component<IProps, {}> {

    public render(): React.ReactNode {
        const helperText = this.props.error ? <FormHelperText>{this.props.error}</FormHelperText> : '';

        return <FormControl style={{width: '100%'}} error={!!this.props.error}>
            <InputLabel htmlFor="gender">Пол</InputLabel>
            <Select value={this.props.value}
                    onChange={e => this.props.actions && this.props.actions.updateGender(e.target.value)}>
                <MenuItem value="MALE">Мужской</MenuItem>
                <MenuItem value="FEMALE">Женский</MenuItem>
            </Select>
            {helperText}
        </FormControl>;
    }
}
