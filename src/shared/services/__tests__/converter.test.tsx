import { convertToBackEnd } from '../converter';

describe('convert UI anketa format to backend format', () => {
    it('cititzenship field', () => {
        expect(convertToBackEnd({passport: {citizenship: 'RF'}})).toEqual({application: {citizenship: 'RF'}});
    });

    it('seriesNumber', () => {
       expect(convertToBackEnd({passport: {seriesNumber: '1234 123456'}}))
           .toEqual( {application: {seriesNumber: '1234123456'}});
    });

    it('birthDate', () => {
        expect(convertToBackEnd({passport: {birthDate: '2001-01-01'}}))
            .toEqual( {application: {birthDate: '2001-01-01'}});
    });

    it('birthLocation', () => {
        expect(convertToBackEnd({passport: {birthLocation: '1234123456'}}))
            .toEqual( {application: {birthPlace: '1234123456'}});
    });

    it('code', () => {
        expect(convertToBackEnd({passport: {code: '123-123'}}))
            .toEqual( {application: {authorityCode: '123-123'}});
    });

    it('gender MALE', () => {
        expect(convertToBackEnd({passport: {gender: 'MALE'}}))
            .toEqual( {application: {gender: 'M'}});
    });
    it('gender FEMALE', () => {
        expect(convertToBackEnd({passport: {gender: 'FEMALE'}}))
            .toEqual( {application: {gender: 'F'}});
    });

    it('issueDate', () => {
        expect(convertToBackEnd({passport: {issueDate: '2001-02-02'}}))
            .toEqual( {application: {issueDate: '2001-02-02'}});
    });

    it('issueDepartment', () => {
        expect(convertToBackEnd({passport: {issueDepartment: '1234123456'}}))
            .toEqual( {application: {authority: '1234123456'}});
    });

    it('actualAddress', () => {
        expect(convertToBackEnd({ address: {actualAddress: '1234123456'}}))
            .toEqual( {application: {livingAddress: '1234123456'}});
    });

    it('registrationAddress same as actual', () => {
        expect(convertToBackEnd(
            { address: {registrationAddress: '1234123456', isRegistrationAddressSameAsActual: true}}))
            .toEqual( {application: {registrationAddress: '1234123456', livingAddress: '1234123456'}});
    });

    it('registrationAddress differ from actual', () => {
        expect(convertToBackEnd(
            { address: {actualAddress: '543210989', isRegistrationAddressSameAsActual: false,
                    registrationAddress: '1234123456' }}))
            .toEqual( {application: { livingAddress: '543210989', registrationAddress: '1234123456' }});
    });
});
