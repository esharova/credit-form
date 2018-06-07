import * as React from 'react';
import { BackendApi } from '../services/backendApi';
import { DadataAddressApi } from '../services/dadataAddressApi';
import { LivingAddressBlock } from './livingAddress';
import { PassportInfoBlock } from './passportInfo';

interface IProps {
    dadataAddressApi: DadataAddressApi;
    backendApi: BackendApi;
}

export class FirstApplicationPage extends React.Component<IProps, {}> {

    public render() {

        return <div>
            <PassportInfoBlock />
            <LivingAddressBlock dadataAddressApi={this.props.dadataAddressApi} backendApi={this.props.backendApi} />
        </div>;
    }
}
