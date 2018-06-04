import { TextField } from '@material-ui/core';
import * as React from 'react';

export class BirthDateField extends React.Component {

    public render(): React.ReactNode {
        return <TextField id="birth-date-input" style={{width: '100%'}} type="date" label="Дата рождения"
                          InputLabelProps={{
                              shrink: true,
                          }}/>;
    }
}
