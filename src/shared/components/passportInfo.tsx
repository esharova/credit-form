import * as React from "react";
import {Component} from "react";
import {Grid} from "@material-ui/core";
import CodeInputField from "./passport/codeInput"
import {CitizenshipPassportField} from "./passport/citizenship";
import {SeriesAndNumberField} from "./passport/seriesNumber";
import {IssueDateField} from "./passport/issueDate";
import {IssueDepartamentField} from "./passport/issueDepartment";
import {BirthLocationField} from "./passport/birthLocation";
import {BirthDateField} from "./passport/birthDate";
import {GenderField} from "./passport/gender";

const style = require("../index.css");

export class PassportInfoBlock extends Component {

    render(): React.ReactNode {
        return <div className={style['credit-application-container']}>
            <Grid container spacing={8}>
                <Grid item xs={12}>
                    <CitizenshipPassportField/>
                </Grid>
                <Grid item xs={6}>
                    <SeriesAndNumberField/>
                </Grid>
                <Grid item xs={6}>
                    <IssueDateField/>
                </Grid>
                <Grid item xs={12}>
                    <IssueDepartamentField/>
                </Grid>
                <Grid item xs={12}>
                    <BirthLocationField/>
                </Grid>
                <Grid item xs={4}>
                    <BirthDateField/>
                </Grid>
                <Grid item xs={4}>
                    <GenderField/>
                </Grid>
                <Grid item xs={4}>
                    <CodeInputField/>
                </Grid>
            </Grid>
        </div>
    }
}
