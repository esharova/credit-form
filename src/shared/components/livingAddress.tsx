import * as React from "react";
import {Card, CardContent, Checkbox, FormControlLabel, Grid} from "@material-ui/core";
import AddressField from "./address/address";

const style = require("../index.css");


export default class LivingAddressBlock extends React.Component {
    state = {
        value: true
    };

    handleChange = name => event => {
        this.setState({[name]: event.target.checked});
    };

    render(): React.ReactNode {
        const additionalField = this.state.value ? "" :
            <Grid item xs={12}> <AddressField uniqueId="2" dadataAddressApi={this.props.dadataAddressApi}  label="Адрес проживания"/></Grid>;
        return <Card className={style['credit-application-container']}>
            <CardContent>
                <Grid container spacing={8}>
                    <Grid item xs={12}>
                        <AddressField uniqueId="1" dadataAddressApi={this.props.dadataAddressApi} label="Адрес регистрации"/>
                    </Grid>
                    <Grid item xs={12} id="address-checkbox-field">
                        <FormControlLabel label="Фактический адрес совпадает с адресом регистрации"
                                          control={<Checkbox id="address-checkbox" value="value" checked={this.state.value}
                                                             onChange={this.handleChange('value')}/>}/>
                    </Grid>
                    {additionalField}
                </Grid>
            </CardContent>
        </Card>;
    }
}