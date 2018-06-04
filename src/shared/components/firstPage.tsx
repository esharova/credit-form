import * as React from 'react';
import { LivingAddressBlock } from './livingAddress';
import { PassportInfoBlock } from './passportInfo';

export class FirstApplicationPage extends React.Component {

    public render() {

        return <div>
            <PassportInfoBlock/>
            <LivingAddressBlock dadataAddressApi={this.props.dadataAddressApi}/>
        </div>;
    }
}
