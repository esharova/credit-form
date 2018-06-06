import { createStore } from 'redux';

export interface IPassport {
    birthDate?: string;
    birthLocation?: string;
    citizenship?: string;
    issueDepartment?: string;
    code?: string;
}

export interface IApplication {
    passport?: IPassport;
}

export interface IApplicationState {
    application?: IApplication;
}

const initialState: IApplicationState = {};

export const rootReducer = (state: IApplicationState = initialState, action) => {
    const updatePassportDetails = (currentState: IApplicationState, updatePassport: Function): IApplicationState => {
        currentState = {...currentState};
        if (!currentState.application) {
            currentState.application = {};
        }
        if (!currentState.application.passport) {
            currentState.application.passport = {};
        }

        updatePassport(currentState.application.passport);

        return currentState;
    };

    switch (action.type) {
        case 'ISSUE_DEPARTMENT':
            return updatePassportDetails(state, passport => passport.issueDepartment = action.value);
        case 'BIRTH_DATE':
            return updatePassportDetails(state, passport => passport.birthDate = action.value);
        case 'BIRTH_LOCATION':
            return updatePassportDetails(state, passport => passport.birthLocation = action.value);
        case 'CITIZENSHIP':
            return updatePassportDetails(state, passport => passport.citizenship = action.value);
        case 'CODE':
            return updatePassportDetails(state, passport => passport.code = action.value);
        default:
            return state;
    }
};

const store = createStore(rootReducer);
store.subscribe(() => console.log(store.getState().application));

export { store };
