import * as React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Card, CardContent, Button } from '@material-ui/core';
import { Link } from 'react-router-dom';

const styles = {
    root: {
        marginTop: '40px',
    },
    content: {
        display: 'flex',
        justifyContent: 'space-between',
        padding: '20px 15%'
    }
};

interface INavigationProps {
    currentPage: string
    pages: any,
    classes: object
}

@withStyles(styles)
export class Navigation extends React.Component<INavigationProps, {}> {
    render () {
        const { classes } = this.props;
        return (
            <Card className={ classes.root }>
                <CardContent className={ classes.content }>
                    <Button component={ Link } to='/' size='large' variant="contained">
                        Назад
                    </Button>
                    <Button size='large' variant="contained" color="primary">
                        Далее
                    </Button>
                </CardContent>
            </Card>
        );
    }


}