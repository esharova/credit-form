import { TextField } from '@material-ui/core';
import * as React from 'react';

export class BirthLocationField extends React.Component {

    public render(): React.ReactNode {
        return <TextField id="birth-loc-input" style={{width: '100%'}} label="Место рождения"/>;
    }
}
