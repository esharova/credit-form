import { convertToBackEnd, convertToFrontEnd } from '../converter';

describe('convert UI anketa format to backend format', () => {
    it('cititzenship field', () => {
        expect(convertToBackEnd({passport: {citizenship: 'RF'}})).toEqual({application: {citizenship: 'RF'}});
    });

    it('seriesNumber', () => {
        expect(convertToBackEnd({passport: {seriesNumber: '1234 123456'}}))
            .toEqual({application: {seriesNumber: '1234123456'}});
    });

    it('birthDate', () => {
        expect(convertToBackEnd({passport: {birthDate: '2001-01-01'}}))
            .toEqual({application: {birthDate: '2001-01-01'}});
    });

    it('birthLocation', () => {
        expect(convertToBackEnd({passport: {birthLocation: '1234123456'}}))
            .toEqual({application: {birthPlace: '1234123456'}});
    });

    it('code', () => {
        expect(convertToBackEnd({passport: {code: '123-123'}}))
            .toEqual({application: {authorityCode: '123-123'}});
    });

    it('gender MALE', () => {
        expect(convertToBackEnd({passport: {gender: 'MALE'}}))
            .toEqual({application: {gender: 'M'}});
    });
    it('gender FEMALE', () => {
        expect(convertToBackEnd({passport: {gender: 'FEMALE'}}))
            .toEqual({application: {gender: 'F'}});
    });

    it('issueDate', () => {
        expect(convertToBackEnd({passport: {issueDate: '2001-02-02'}}))
            .toEqual({application: {issueDate: '2001-02-02'}});
    });

    it('issueDepartment', () => {
        expect(convertToBackEnd({passport: {issueDepartment: '1234123456'}}))
            .toEqual({application: {authority: '1234123456'}});
    });

    it('actualAddress', () => {
        expect(convertToBackEnd({address: {actualAddress: '1234123456'}}))
            .toEqual({application: {livingAddress: '1234123456'}});
    });

    it('registrationAddress same as actual', () => {
        expect(convertToBackEnd(
            {address: {registrationAddress: '1234123456', isRegistrationAddressSameAsActual: true}}))
            .toEqual({application: {registrationAddress: '1234123456', livingAddress: '1234123456'}});
    });

    it('registrationAddress differ from actual', () => {
        expect(convertToBackEnd(
            {
                address: {
                    actualAddress: '543210989', isRegistrationAddressSameAsActual: false,
                    registrationAddress: '1234123456',
                },
            }))
            .toEqual({application: {livingAddress: '543210989', registrationAddress: '1234123456'}});
    });
});

describe('convert Backend anketa format to UI format', () => {
    it('cititzenship field', () => {
        expect(convertToFrontEnd({application: {citizenship: 'RF'}}))
            .toEqual({passport: {citizenship: 'RF'}});
    });

    it('seriesNumber', () => {
        expect(convertToFrontEnd({application: {seriesNumber: '1234123456'}}))
            .toEqual({passport: {seriesNumber: '1234 123456'}});
    });

    it('birthDate', () => {
        expect(convertToFrontEnd({application: {birthDate: '2001-01-01'}}))
            .toEqual({passport: {birthDate: '2001-01-01'}});
    });

    it('birthLocation', () => {
        expect(convertToFrontEnd({application: {birthPlace: '1234123456'}}))
            .toEqual({passport: {birthLocation: '1234123456'}});
    });

    it('code', () => {
        expect(convertToFrontEnd({application: {authorityCode: '123-123'}}))
            .toEqual({passport: {code: '123-123'}});
    });

    it('gender MALE', () => {
        expect(convertToFrontEnd({application: {gender: 'M'}})).toEqual({passport: {gender: 'MALE'}});
    });
    it('gender FEMALE', () => {
        expect(convertToFrontEnd({application: {gender: 'F'}})).toEqual({passport: {gender: 'FEMALE'}});
    });

    it('issueDate', () => {
        expect(convertToFrontEnd({application: {issueDate: '2001-02-02'}}))
            .toEqual({passport: {issueDate: '2001-02-02'}});
    });

    it('issueDepartment', () => {
        expect(convertToFrontEnd({application: {authority: '1234123456'}}))
            .toEqual({passport: {issueDepartment: '1234123456'}});
    });

    it('actualAddress', () => {
        expect(convertToFrontEnd({application: {livingAddress: '1234123456'}}))
            .toEqual({address: {registrationAddress: '1234123456', isRegistrationAddressSameAsActual: true}});
    });

    it('registration address', () => {
        expect(convertToFrontEnd({application: {registrationAddress: '1234123456'}}))
            .toEqual({address: {registrationAddress: '1234123456', isRegistrationAddressSameAsActual: true}});
    });

    it('registrationAddress same as actual', () => {
        expect(convertToFrontEnd({
            application: {
                livingAddress: '1234123456',
                registrationAddress: '1234123456',
            },
        })).toEqual({address: {registrationAddress: '1234123456', isRegistrationAddressSameAsActual: true}});
    });

    it('registrationAddress differs as actual', () => {
        expect(convertToFrontEnd({
            application: {
                livingAddress: '6543210987',
                registrationAddress: '1234123456',
            },
        })).toEqual({
            address: {
                actualAddress: '6543210987',
                isRegistrationAddressSameAsActual: false,
                registrationAddress: '1234123456',
            },
        });
    });

});
