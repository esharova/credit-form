import * as React from 'react';
import { withStyles} from '@material-ui/core/styles';
import { Navigation } from '../navigation/navigation';

const styles = {
    root: {
        display: 'flex',
        justifyContent: 'space-between'
    },
};

@withStyles(styles)
export class PageLayout extends React.Component<any, {}> {
    render() {
        const { classes } = this.props;
        return (
            <div className={ classes.root }>
                { this.renderProgressBar() }
                { this.renderContent() }
                { this.renderNavigationBar() }
            </div>
        );
    }

    renderProgressBar(){
        return null;
    }

    public renderContent(){
        return null;
    }

    renderNavigationBar(){
        return (
            <Navigation/>
        );
    }

}