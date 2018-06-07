import { FormControl, InputLabel, MenuItem, Select } from '@material-ui/core';
import * as React from 'react';
import { connect } from 'react-redux';
import { ActionCreatorsMapObject, bindActionCreators, Dispatch } from 'redux';
import { IApplicationState } from '../../reducers';
import * as actionCreators from '../../reducers/actions';

function mapStateToProps(state: IApplicationState) {
    return {value: state.application && state.application.passport && state.application.passport.gender || ''};
}

function mapDispatchToProps(dispatch: Dispatch) {
    return {actions: bindActionCreators(actionCreators, dispatch)};
}

interface IProps {
    value?: string;
    actions?: ActionCreatorsMapObject;
}

@connect(mapStateToProps, mapDispatchToProps)
export class GenderField extends React.Component<IProps, {}> {

    public render(): React.ReactNode {
        return <FormControl style={{width: '100%'}}>
            <InputLabel htmlFor="gender">Пол</InputLabel>
            <Select value={this.props.value}
                    onChange={e => this.props.actions && this.props.actions.updateGender(e.target.value)}>
                <MenuItem value="MALE">Мужской</MenuItem>
                <MenuItem value="FEMALE">Женский</MenuItem>
            </Select>
        </FormControl>;
    }
}
