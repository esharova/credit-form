import { IApplication } from '../reducers';
import { IBackApplicationRequest } from './backendApi';

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
