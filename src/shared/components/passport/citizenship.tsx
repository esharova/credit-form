import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import * as React from 'react';
import { connect } from 'react-redux';
import { ActionCreatorsMapObject, bindActionCreators, Dispatch } from 'redux';
import { IApplicationState } from '../../reducers';
import * as actionCreators from '../../reducers/actions';

function mapStateToProps(state: IApplicationState) {
    return {value: state.application && state.application.passport && state.application.passport.citizenship || ''};
}

function mapDispatchToProps(dispatch: Dispatch) {
    return {actions: bindActionCreators(actionCreators, dispatch)};
}

interface IProps {
    value?: string;
    actions?: ActionCreatorsMapObject;
}

@connect(mapStateToProps, mapDispatchToProps)
export class CitizenshipPassportField extends React.Component<IProps, {}> {
    public render(): React.ReactNode {
        return <FormControl style={{width: '100%'}}>
            <InputLabel htmlFor="citizenship">Гражданство</InputLabel>
            <Select id="citizenship"
                    onChange={e => this.props.actions && this.props.actions.updateCitizenship(e.target.value)}
                    value={this.props.value}
            >
                <MenuItem value="RF">Российская Федерация</MenuItem>
                <MenuItem value="OTHER">Иное</MenuItem>
            </Select>
        </FormControl>;
    }
}
