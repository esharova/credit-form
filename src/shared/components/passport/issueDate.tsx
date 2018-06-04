import { FormControl, TextField } from '@material-ui/core';
import * as React from 'react';

export class IssueDateField extends React.Component {

    public render(): React.ReactNode {
        return <FormControl style={{width: '100%'}}>
            <TextField id="issue-date-input" label="Когда выдан" type="date" InputLabelProps={{
                shrink: true,
            }}/>
        </FormControl>;
    }
}
