import Axios from 'axios';
import { Store } from 'redux';
import { IApplicationState } from '../reducers';
import { updateApplicationId } from '../reducers/actions';
import { convertToBackEnd } from './converter';

export interface IBackApplication {
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
}

export interface IBackApplicationRequest {
    application?: IBackApplication;
}

export class StateThrottling {
    private sending = false;
    private queueData?: IBackApplication;
    private queueCallback?: Function;

    public doWithThrottling(data?: IBackApplication, sendCallback?: Function) {
        if (!this.sending) {
            this.sending = true;
            if (sendCallback) {
                sendCallback(data);
            }
        } else {
            this.queueData = data;
            this.queueCallback = sendCallback;
        }
    }

    public finished() {
        if (this.queueData && this.queueCallback) {
            this.sending = true;
            this.queueCallback(this.queueData);
            this.queueData = undefined;
            this.queueCallback = undefined;
        } else {
            this.sending = false;
        }
    }
}

export class BackendApi {
    private store: Store;
    private backUrl = 'http://application-back.cfapps.io';
    private stateThrottling: StateThrottling = new StateThrottling();

    public constructor(store: Store) {
        this.store = store;
        this.store.subscribe(this.storeUpdated(store));
    }

    public storeUpdated(store: Store) {
        return () => {
            const state: IApplicationState = store.getState();
            this.stateThrottling.doWithThrottling(
                convertToBackEnd(state.application).application, (backApplication) => {
                    if (state.applicationId) {
                        Axios.post(`${this.backUrl}/api/applications/` + state.applicationId,
                            backApplication)
                            .then(r => (this.stateThrottling.finished()))
                            .catch(e => (this.stateThrottling.finished()))
                        ;
                    } else {
                        Axios.post(`${this.backUrl}/api/applications/`, backApplication)
                            .then(r => r.data)
                            .then((app: IBackApplicationRequest) => {
                                store.dispatch(updateApplicationId(app.application && app.application.applicationId));
                                this.stateThrottling.finished();
                            })
                            .catch(e => (this.stateThrottling.finished()))
                        ;
                    }
                });
        };
    }
}
