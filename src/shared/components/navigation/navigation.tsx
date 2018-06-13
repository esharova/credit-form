import * as React from 'react';
import { withStyles } from '@material-ui/core/styles';

const styles = {
    root: {
        backgroundColor: 'red',
        height: '400px'
    },
};

@withStyles(styles)
export class Navigation extends React.Component {
    render () {
        const { classes } = this.props;
        return <div className={ classes.root } />;
    }
}