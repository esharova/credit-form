import { TextField } from '@material-ui/core';
import * as React from 'react';
import { connect } from 'react-redux';
import { ActionCreatorsMapObject, bindActionCreators, Dispatch } from 'redux';
import { IApplicationState } from '../../reducers';
import * as actionCreators from '../../reducers/actions';

function mapStateToProps(state: IApplicationState) {
    return {value: state.application && state.application.passport && state.application.passport.birthDate || ''};
}

function mapDispatchToProps(dispatch: Dispatch) {
    return {actions: bindActionCreators(actionCreators, dispatch)};
}

interface IProps {
    value?: string;
    actions?: ActionCreatorsMapObject;
}

@connect(mapStateToProps, mapDispatchToProps)
export class BirthDateField extends React.Component<IProps, {}> {

    public render(): React.ReactNode {
        return <TextField id="birth-date-input" style={{width: '100%'}} type="date" label="Дата рождения"
                          onChange={e => this.props.actions && this.props.actions.updateBirthDate(e.target.value)}
                          InputLabelProps={{
                              shrink: true,
                          }}
                          value={this.props.value}
        />;
    }
}
