import * as React from 'react';

import { BackendApi } from '../../services/backendApi';
import { DadataAddressApi } from '../../services/dadataAddressApi';
import { LivingAddressBlock } from '../../components/livingAddress';
import { PassportInfoBlock } from '../../components/passportInfo';

interface IPassportPageProps {
    dadataAddressApi: DadataAddressApi;
    backendApi: BackendApi;
}

export class PassportPage extends React.Component<IPassportPageProps, {}> {
    render() {
        return (
            <div>
                <PassportInfoBlock />
                <LivingAddressBlock dadataAddressApi={this.props.dadataAddressApi} backendApi={this.props.backendApi} />
            </div>
        );
    }
}
