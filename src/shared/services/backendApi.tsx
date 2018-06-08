import Axios from 'axios';
import { Store } from 'redux';
import { IApplication, IApplicationState } from '../reducers';
import { updateApplicationAndId, updateApplicationId } from '../reducers/actions';
import { convertToBackEnd, convertToFrontEnd } from './converter';

export interface IApplicationResponse {
    application: IBackApplication;
}

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
    private backUrl = 'https://application-back.cfapps.io';
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
                        Axios.post(`${this.backUrl}/api/applications/${state.applicationId}`,
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

    public loadData() {
        Axios.get(`${this.backUrl}/api/applications`)
            .then(r => r.data).then((applications: Array<IBackApplication>) => {
            if (applications.length > 0) {
                const applicationId = applications[0].applicationId;
                this.loadApplication(applicationId);
            }
        })
            .catch(() => {
            });
    }

    private loadApplication(applicationId?: string) {
        Axios.get(`${this.backUrl}/api/applications/${applicationId}`).then(r => r.data)
            .then( (applicationResponse: IApplicationResponse) => {
                const application: IApplication = convertToFrontEnd(applicationResponse);
                this.store.dispatch(updateApplicationAndId(applicationResponse.application.applicationId, application));
            })
            .catch( () => {

            });
    }
}
