import Axios from 'axios';
import { Store } from 'redux';
import { IApplicationState } from '../reducers';
import { updateApplicationId } from '../reducers/actions';
import { convertToBackEnd } from './converter';

export interface IBackApplicationRequest {
    application?: {
        applicationId?: string;
        citizenship?: string;
        seriesNumber?: string;
        birthDate?: string;
        birthPlace?: string;
        authorityCode?: string;
        gender?: string;
        authority?: string;
        issueDate?: string;
        registrationAddress?: string;
        livingAddress?: string;
    };
}

export class BackendApi {
    private store: Store;
    private backUrl = 'http://application-back.cfapps.io';

    public storeUpdated(store: Store) {
        return () => {
            const state: IApplicationState = store.getState();
            if (state.applicationId) {
                Axios.post(`${this.backUrl}/api/applications/` + state.applicationId,
                    convertToBackEnd(state.application).application)
                     .then(r => (r))
                     .catch(e => (e))
                ;
            } else {
                Axios.post(`${this.backUrl}/api/applications/`, convertToBackEnd(state.application).application)
                     .then(r => r.data)
                     .then((app: IBackApplicationRequest) => {
                    store.dispatch(updateApplicationId(app.application && app.application.applicationId));
                })
                     .catch(e => (e))
                ;
            }
        };
    }

    public constructor(store: Store) {
        this.store = store;
        this.store.subscribe(this.storeUpdated(store));
    }
}
