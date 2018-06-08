import { IApplication, IApplicationErrors } from '../reducers';
import { IApplicationResponse, IBackApplicationRequest } from './backendApi';

export function convertToBackEnd(input?: IApplication): IBackApplicationRequest {

    const back: IBackApplicationRequest = {};
    back.application = {};
    if (input) {
        if (input.passport) {
            if (input.passport.citizenship) {
                back.application.citizenship = input.passport.citizenship;
            }
            if (input.passport.seriesNumber) {
                back.application.seriesNumber = input.passport.seriesNumber.replace(/[^\d]/, '');
            }
            if (input.passport.birthDate) {
                back.application.birthDate = input.passport.birthDate;
            }
            if (input.passport.birthLocation) {
                back.application.birthPlace = input.passport.birthLocation;
            }
            if (input.passport.code) {
                back.application.authorityCode = input.passport.code;
            }
            if (input.passport.gender) {
                back.application.gender = input.passport.gender === 'MALE' ? 'M' : 'F';
            }
            if (input.passport.issueDate) {
                back.application.issueDate = input.passport.issueDate;
            }
            if (input.passport.issueDepartment) {
                back.application.authority = input.passport.issueDepartment;
            }
        }
        if (input.address) {
            if (input.address.registrationAddress) {
                back.application.registrationAddress = input.address.registrationAddress;
            }
            if (input.address.isRegistrationAddressSameAsActual) {
                if (input.address.registrationAddress) {
                    back.application.livingAddress = input.address.registrationAddress;
                }
            } else {
                if (input.address.actualAddress) {
                    back.application.livingAddress = input.address.actualAddress;
                }
            }
        }
    }

    return back;
}

export function convertToFrontEnd(input?: IApplicationResponse): IApplication {
    const front: IApplication = {};
    front.passport = {};
    front.address = {};
    if (input) {
        if (input.application) {
            if (input.application.citizenship) {
                front.passport.citizenship = input.application.citizenship;
            }
            if (input.application.seriesNumber) {
                const passportSeria = input.application.seriesNumber.substr(0, 4);
                const passportNumber = input.application.seriesNumber.substr(4);
                front.passport.seriesNumber = `${passportSeria} ${passportNumber}`;
            }
            if (input.application.birthDate) {
                front.passport.birthDate = input.application.birthDate;
            }
            if (input.application.birthPlace) {
                front.passport.birthLocation = input.application.birthPlace;
            }
            if (input.application.authorityCode) {
                front.passport.code = input.application.authorityCode;
            }
            if (input.application.gender) {
                front.passport.gender = input.application.gender === 'M' ? 'MALE' : 'FEMALE';
            }
            if (input.application.issueDate) {
                front.passport.issueDate = input.application.issueDate;
            }
            if (input.application.authority) {
                front.passport.issueDepartment = input.application.authority;
            }
            if (input.application.registrationAddress) {
                front.address.registrationAddress = input.application.registrationAddress;
                front.address.isRegistrationAddressSameAsActual = true;
            }
            if (input.application.livingAddress) {
                if (input.application.registrationAddress) {
                    if (input.application.livingAddress === input.application.registrationAddress) {
                        front.address.isRegistrationAddressSameAsActual = true;
                    } else {
                        front.address.isRegistrationAddressSameAsActual = false;
                        front.address.actualAddress = input.application.livingAddress;
                    }
                } else {
                    front.address.registrationAddress = input.application.livingAddress;
                    front.address.isRegistrationAddressSameAsActual = true;
                }
            }
        }
    }
    if (Object.keys(front.passport).length === 0) {
        delete front.passport;
    }
    if (Object.keys(front.address).length === 0) {
        delete front.address;
    }

    return front;
}

export function convertToFrontEndErrors(input: IApplicationResponse): IApplicationErrors {
    const errors: IApplicationErrors = {};
    if (input.errors) {
        input.errors.forEach((errorItem) => {
            switch (errorItem.path) {
                case 'birthPlace':
                    errors.birthLocation = errorItem.error;
                    break;
                case 'authorityCode':
                    errors.code = errorItem.error;
                    break;
                case 'authority':
                    errors.issueDepartment = errorItem.error;
                    break;
                default:
                    errors[errorItem.path] = errorItem.error;
                    break;
            }
        });
    }

    return errors;
}
