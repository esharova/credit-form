import { FormControl, TextField } from '@material-ui/core';
import * as React from 'react';
import { connect } from 'react-redux';
import { ActionCreatorsMapObject, bindActionCreators, Dispatch } from 'redux';
import { IApplicationState } from '../../reducers';
import * as actionCreators from '../../reducers/actions';

interface IProps {
    value?: string;
    actions?: ActionCreatorsMapObject;
}

function mapStateToProps(state: IApplicationState) {
    return {value: state.application && state.application.passport && state.application.passport.issueDate || ''};
}

function mapDispatchToProps(dispatch: Dispatch) {
    return {actions: bindActionCreators(actionCreators, dispatch)};
}

@connect(mapStateToProps, mapDispatchToProps)
export class IssueDateField extends React.Component<IProps, {}> {

    public render(): React.ReactNode {
        return <FormControl style={{width: '100%'}}>
            <TextField id="issue-date-input" label="Когда выдан" type="date"
                       InputLabelProps={{
                            shrink: true,
                        }}
                       onChange={e => this.props.actions && this.props.actions.updateIssueDate(e.target.value)}
                       value={this.props.value}/>
        </FormControl>;
    }
}
