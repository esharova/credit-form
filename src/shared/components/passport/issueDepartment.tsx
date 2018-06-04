import { TextField } from '@material-ui/core';
import * as React from 'react';

export class IssueDepartamentField extends React.Component {

    public render(): React.ReactNode {
        return <TextField id="issue-departament-input" style={{width: '100%'}} label="Кем выдан"/>;
    }
}
