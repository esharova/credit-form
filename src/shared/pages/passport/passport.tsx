import * as React from 'react';
import { BackendApi } from '../../services/backendApi';
import { DadataAddressApi } from '../../services/dadataAddressApi';
import { LivingAddressBlock } from '../../components/livingAddress';
import { PassportInfoBlock } from '../../components/passportInfo';
import { PageLayout } from '../../components/page-layout/page-layout';

interface IProps {
    dadataAddressApi: DadataAddressApi;
    backendApi: BackendApi;
}

export class PassportPage extends PageLayout<IProps, {}> {
    constructor() {
        super();
    }

    public renderContent() {

        return <div>
            <PassportInfoBlock />
            <LivingAddressBlock dadataAddressApi={this.props.dadataAddressApi} backendApi={this.props.backendApi} />
        </div>;
    }
}
