import { createStore } from 'redux';

export interface IPassport {
    birthDate?: string;
    birthLocation?: string;
    citizenship?: string;
    code?: string;
    gender?: string;
    issueDate?: string;
    issueDepartment?: string;
    seriesNumber?: string;
}

export interface ILivingAddress {
    actualAddress?: string;
    isRegistrationAddressSameAsActual?: boolean;
    registrationAddress?: string;
}

export interface IApplication {
    address?: ILivingAddress;
    passport?: IPassport;
}

export interface IApplicationState {
    application?: IApplication;
    applicationId?: string;
}

const initialState: IApplicationState = {
    application: {
        address: {
            isRegistrationAddressSameAsActual: true,
        },
        passport: {
            citizenship: 'RF',
            gender: 'MALE',
        },
    },
};

export const rootReducer = (state: IApplicationState = initialState, action) => {
    const updateApplication = (state1: IApplicationState, doUpdateApplication: Function): IApplicationState => {
        state1 = {...state1};
        if (!state1.application) {
            state1.application = {};
        }
        doUpdateApplication(state1.application);

        return state1;
    };

    const updatePassportDetails = (state2: IApplicationState, updatePassport: Function): IApplicationState => {
        return updateApplication(state2, (applcation: IApplication) => {
            if (!applcation.passport) {
                applcation.passport = {};
            }
            updatePassport(applcation.passport);
        });
    };

    const updateLivingAddress = (state3: IApplicationState, doUpdateLivingAddress: Function): IApplicationState => {
        return updateApplication(state3, (applcation: IApplication) => {
            if (!applcation.address) {
                applcation.address = {};
            }
            doUpdateLivingAddress(applcation.address);
        });
    };

    switch (action.type) {
        case 'ISSUE_DEPARTMENT':
            return updatePassportDetails(state, (passport: IPassport) => passport.issueDepartment = action.value);
        case 'BIRTH_DATE':
            return updatePassportDetails(state, (passport: IPassport) => passport.birthDate = action.value);
        case 'BIRTH_LOCATION':
            return updatePassportDetails(state, (passport: IPassport) => passport.birthLocation = action.value);
        case 'CITIZENSHIP':
            return updatePassportDetails(state, (passport: IPassport) => passport.citizenship = action.value);
        case 'CODE':
            return updatePassportDetails(state, (passport: IPassport) => passport.code = action.value);
        case 'SERIES_NUMBER':
            return updatePassportDetails(state, (passport: IPassport) => passport.seriesNumber = action.value);
        case 'ISSUE_DATE':
            return updatePassportDetails(state, (passport: IPassport) => passport.issueDate = action.value);
        case 'GENDER':
            return updatePassportDetails(state, (passport: IPassport) => passport.gender = action.value);
        case 'LIVING_ADDRESS':
            return updateLivingAddress(state, (address: ILivingAddress) => address[action.field] = action.value);
        case 'LIVING_ADDRESS_SAME':
            return updateLivingAddress(state, (address: ILivingAddress) =>
                address.isRegistrationAddressSameAsActual = action.value);
        case 'APPLICATION_ID':
            return state = {applicationId: action.value, ...state};
        default:
            return state;
    }
};

const store = createStore(rootReducer);

// store.subscribe(() => console.log(store.getState().application));

export { store };
