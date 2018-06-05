import { Card, CardContent, Checkbox, FormControlLabel, Grid } from '@material-ui/core';
import * as React from 'react';
import { DadataAddressApi } from '../services/dadataAddressApi';
import { AddressField } from './address/address';

interface IProps {
    dadataAddressApi: DadataAddressApi;
}

export class LivingAddressBlock extends React.Component<IProps, {}> {
    public state = {
        value: true,
    };

    private handleChange = name => event => {
        this.setState({[name]: event.target.checked});
    }

    public render(): React.ReactNode {
        const additionalField = this.state.value ? '' :
            <Grid item xs={12}> <AddressField uniqueId="2" dadataAddressApi={this.props.dadataAddressApi}
                                              label="Адрес проживания"/></Grid>;

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
                                      label="Адрес регистрации"/>
                    </Grid>
                    <Grid item xs={12} id="address-checkbox-field">
                        <FormControlLabel label="Фактический адрес совпадает с адресом регистрации"
                                          control={<Checkbox id="address-checkbox" value="value"
                                                             checked={this.state.value}
                                                             onChange={this.handleChange('value')}/>}/>
                    </Grid>
                    {additionalField}
                </Grid>
            </CardContent>
        </Card>;
    }
}
