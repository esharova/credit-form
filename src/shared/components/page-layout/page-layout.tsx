import * as React from 'react';
import { withStyles} from '@material-ui/core/styles';
import { Navigation } from '../navigation/navigation';

export const styles = {
    root: {
        margin: 'auto',
        width: '800px'
    },
};

interface IPageLayoutProps {
    content: React.Node | React.ReactNodeArray
}

@withStyles(styles)
export class PageLayout extends React.Component<IPageLayoutProps, {}> {
    render() {
        const { classes } = this.props;
        return (
            <div className={ classes.root }>
                { this.renderProgressBar() }
                { this.props.content }
                { this.renderNavigationBar() }
            </div>
        );
    }

    renderProgressBar(){
        return null;
    }

    renderNavigationBar(){
        return (
            <Navigation/>
        );
    }

}
