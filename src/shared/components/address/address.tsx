import { MenuItem, Paper, TextField, WithStyles } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { StyleRulesCallback } from '@material-ui/core/styles/withStyles';
import * as React from 'react';
import * as Autosuggest from 'react-autosuggest';
import { connect } from 'react-redux';
import { ActionCreatorsMapObject, bindActionCreators, Dispatch } from 'redux';
import { IApplicationState, ILivingAddress } from '../../reducers';
import * as actionCreators from '../../reducers/actions';
import { DadataAddressApi } from '../../services/dadataAddressApi';

interface IProps extends WithStyles<string> {
    dadataAddressApi: DadataAddressApi;
    label: string;
    uniqueId: string;
    addressField: string;
    value?: ILivingAddress;
    actions?: ActionCreatorsMapObject;
}

function mapStateToProps(state: IApplicationState) {
    return {value: state.application && state.application.address || {}};
}

function mapDispatchToProps(dispatch: Dispatch) {
    return {actions: bindActionCreators(actionCreators, dispatch)};
}

const styles: StyleRulesCallback = theme => ({
    container: {
        flexGrow: 1,
        position: 'relative',
    },
    suggestion: {
        display: 'block',
    },
    suggestionsContainerOpen: {
        left: 0,
        marginTop: theme.spacing.unit,
        position: 'absolute',
        right: 0,
        zIndex: 1,
    },
    suggestionsList: {
        listStyleType: 'none',
        margin: '2px',
        padding: '2px',
    },
});

@connect(mapStateToProps, mapDispatchToProps)
class AddressFieldInternal extends React.Component<IProps, {}> {
    public state = {
        suggestions: [],
        value: '',
    };

    public constructor(p: IProps) {
        super(p);
        this.state.value = (this.props.value && this.props.value[this.props.addressField] || '');
    }

    public renderInput = (inputProps) => {
        const {classes, ref, ...other} = inputProps;

        return (
            <TextField
                label={this.props.label}
                fullWidth
                InputProps={{
                    classes: {
                        input: classes.input,
                    },
                    inputRef: ref,
                    ...other,
                }}
            />
        );
    }

    public handleSuggestionsFetchRequested = ({value}) => {
        this.props.dadataAddressApi.getSuggestions(value, (v) => {
            this.setState({suggestions: v});
        });
    }

    public handleSuggestionsClearRequested = () => {
        this.setState({
            suggestions: [],
        });
    }

    public renderSuggestionsContainer = (options) => {
        const {containerProps, children} = options;

        return (
            <Paper {...containerProps} square>
                {children}
            </Paper>
        );
    }

    public getSuggestionValue = (suggestion) => {
        return suggestion;
    }

    public renderSuggestion = (suggestion, {query, isHighlighted}) => {
        return (
            <MenuItem selected={isHighlighted} component="div">
                <div>{suggestion}</div>
            </MenuItem>
        );
    }

    public handleChange = (event, {newValue}) => {
        this.setState({value: newValue});
        if (this.props.actions) {
            this.props.actions.updateAddress({
                field: this.props.addressField,
                type: 'LIVING_ADDRESS',
                value: newValue,
            });
        }
    }

    public render() {
        const classes = this.props.classes || {};

        return <Autosuggest
            getSuggestionValue={this.getSuggestionValue}
            inputProps={{
                classes,
                onChange: this.handleChange,
                placeholder: 'Город Улица Дом Квартира',
                value: this.state.value,
            }}
            onSuggestionsClearRequested={this.handleSuggestionsClearRequested}
            onSuggestionsFetchRequested={this.handleSuggestionsFetchRequested}
            renderInputComponent={this.renderInput}
            renderSuggestion={this.renderSuggestion}
            renderSuggestionsContainer={this.renderSuggestionsContainer}
            suggestions={this.state.suggestions}
            theme={{
                container: classes.container,
                suggestion: classes.suggestion,
                suggestionsContainerOpen: classes.suggestionsContainerOpen,
                suggestionsList: classes.suggestionsList,
            }}
        />;
    }

}

const AddressField = withStyles(styles)(AddressFieldInternal);

export { AddressField };
