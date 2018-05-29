import * as React from "react";
import {Component} from "react";
import MaskedInput from 'react-text-mask';
import {FormControl, Grid, InputLabel, MenuItem, Select, TextField, withStyles} from "@material-ui/core";

class CodeInput extends Component {
    render() {
       return <MaskedInput mask={[/\d/,/\d/,/\d/, '-', /\d/, /\d/, /\d/]} showMask/>
    }
}

class PassportInfoBlock extends Component {

    render(): React.ReactNode {
        return <Grid style={{padding: "15px", width: 800, margin: "auto"}} container spacing={8}>
            <Grid item xs={12}>
                <FormControl style={{width: "100%"}}>
                    <InputLabel htmlFor="citizenship">Гражданство</InputLabel>
                    <Select id="citizenship" value={"RF"}>
                        <MenuItem value="RF">Российская Федерация</MenuItem>
                        <MenuItem value="OTHER">Иное</MenuItem>
                    </Select>

                </FormControl>
            </Grid>
            <Grid item xs={6}>
                <TextField  style={{width: "100%"}} label="Серия и номер"/>
            </Grid>
            <Grid item xs={6}>
                <TextField  style={{width: "100%"}} label="Когда выдан"/>
            </Grid>
            <Grid item xs={12}>
                <TextField  style={{width: "100%"}} label="Кем выдан"/>
            </Grid>
            <Grid item xs={12}>
                <TextField style={{width: "100%"}} label="Место рождения"/>
            </Grid>
            <Grid item xs={4}>
                <TextField style={{width: "100%"}} label="Дата рождения"/>
            </Grid>
            <Grid item xs={4}>
                <TextField style={{width: "100%"}} label="Пол"/>
            </Grid>
            <Grid item xs={4}>
                <TextField
                    label="Код подразделения"
                    style={{width: "100%"}}
                    InputProps={{
                        inputComponent: CodeInput
                    }}/>
            </Grid>
        </Grid>

    }
}
export default PassportInfoBlock;