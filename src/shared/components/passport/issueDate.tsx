import * as React from "react";

import {FormControl, TextField} from "@material-ui/core";

export class IssueDateField extends React.Component {

    render(): React.ReactNode {
        return <FormControl style={{width: "100%"}}>
            <TextField id="issue-date-input" label="Когда выдан" type="date" InputLabelProps={{
                shrink: true,
            }}/>
        </FormControl>;
    }
}
