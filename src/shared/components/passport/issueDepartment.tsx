import { TextField } from '@material-ui/core';
import * as React from 'react';
import { connect } from 'react-redux';
import { ActionCreatorsMapObject, bindActionCreators, Dispatch } from 'redux';
import { IApplicationState } from '../../reducers';

import * as actionCreators from '../../reducers/actions';

function mapStateToProps(state: IApplicationState) {
    return {
        error: state.errors && state.errors.issueDepartment,
        value: state.application && state.application.passport && state.application.passport.issueDepartment || '',
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
export class IssueDepartamentField extends React.Component<IProps, {}> {

    public render(): React.ReactNode {

        return <TextField id="issue-departament-input" style={{width: '100%'}} label="Кем выдан"
                          error={!!this.props.error} helperText={this.props.error}
                          value={this.props.value}
                          onChange={event => {
                              return this.props.actions && this.props.actions.updateIssueDepartment(event.target.value);
                          }}/>;
    }
}
