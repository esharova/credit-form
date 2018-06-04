import * as React from 'react';
import { PassportInfoBlock } from "./passportInfo";
import { LivingAddressBlock } from "./livingAddress";

export class FirstApplicationPage extends React.Component {

    public render() {

        return <div>
            <PassportInfoBlock/>
            <LivingAddressBlock dadataAddressApi={this.props.dadataAddressApi}/>
        </div>;
    }
}