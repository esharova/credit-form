import * as React from 'react';
import { Navigation } from '../navigation/navigation';

const styles = {
    root: {
        display: 'flex',
        justifyContent: 'space-between'
    },
};

export class PageLayout extends React.Component<any, {}> {
    render() {
        return (
            <div>
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