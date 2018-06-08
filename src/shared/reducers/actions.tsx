import { IApplication } from './index';

const stringAction = (name: string) => (v?: string) => ({type: name, value: v});

export const updateIssueDepartment = stringAction('ISSUE_DEPARTMENT');
export const updateBirthDate = stringAction('BIRTH_DATE');
export const updateBirthLocation = stringAction('BIRTH_LOCATION');
export const updateCitizenship = stringAction('CITIZENSHIP');
export const updateCode = stringAction('CODE');
export const updateSeriesNumber = stringAction('SERIES_NUMBER');
export const updateIssueDate = stringAction('ISSUE_DATE');
export const updateGender = stringAction('GENDER');
export const updateApplicationId = stringAction('APPLICATION_ID');
export const updateAddress = (value: string, field?: string) => ({type: 'LIVING_ADDRESS', field, value});
export const updateLivingAddressSame = (value: boolean) => ({type: 'LIVING_ADDRESS_SAME', value});
export const updateApplicationAndId = (applicationId?: string, application?: IApplication) =>
    ({type: 'APPLICATION', applicationId, application });
