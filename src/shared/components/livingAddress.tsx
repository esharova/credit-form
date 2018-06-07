import { Card, CardContent, Checkbox, FormControlLabel, Grid } from '@material-ui/core';
import * as React from 'react';
import { connect } from 'react-redux';
import { ActionCreatorsMapObject, bindActionCreators, Dispatch } from 'redux';
import { IApplicationState } from '../reducers';
import * as actionCreators from '../reducers/actions';
import { BackendApi } from '../services/backendApi';
import { DadataAddressApi } from '../services/dadataAddressApi';
import { AddressField } from './address/address';

interface IProps {
    dadataAddressApi: DadataAddressApi;
    backendApi: BackendApi;
    value?: boolean;
    actions?: ActionCreatorsMapObject;
}

function mapStateToProps(state: IApplicationState) {
    return {
        value: state.application && state.application.address
        && state.application.address.isRegistrationAddressSameAsActual || false,
    };
}

function mapDispatchToProps(dispatch: Dispatch) {
    return {actions: bindActionCreators(actionCreators, dispatch)};
}

@connect(mapStateToProps, mapDispatchToProps)
export class LivingAddressBlock extends React.Component<IProps, {}> {
    private handleChange = (event, newValue) => {
        if (this.props.actions) {
            this.props.actions.updateLivingAddressSame(newValue);
        }
    }

    public render(): React.ReactNode {
        const additionalField = this.props.value ? '' :
            <Grid item xs={12}> <AddressField uniqueId="2" dadataAddressApi={this.props.dadataAddressApi}
                                              label="Адрес проживания" addressField="actualAddress"/></Grid>;

        return <Card style={{
            margin: 'auto',
            marginTop: '3em',
            padding: '15px',
            width: '800px',
        }}
        >
            <CardContent>
                <Grid container spacing={8}>
                    <Grid item xs={12}>
                        <AddressField uniqueId="1" dadataAddressApi={this.props.dadataAddressApi}
                                      label="Адрес регистрации" addressField="registrationAddress"/>
                    </Grid>
                    <Grid item xs={12} id="address-checkbox-field">
                        <FormControlLabel label="Фактический адрес совпадает с адресом регистрации"
                                          control={<Checkbox id="address-checkbox" value="value"
                                                             checked={this.props.value}
                                                             onChange={this.handleChange}/>
                                          }
                        />
                    </Grid>
                    {additionalField}
                </Grid>
            </CardContent>
        </Card>;
    }
}
