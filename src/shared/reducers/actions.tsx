const stringAction = (name: string) => (v: string) => ({type: name, value: v});

interface IEvent {
    type: string;
    value: string;
    field?: string;
}

export const updateIssueDepartment = stringAction('ISSUE_DEPARTMENT');
export const updateBirthDate = stringAction('BIRTH_DATE');
export const updateBirthLocation = stringAction('BIRTH_LOCATION');
export const updateCitizenship = stringAction('CITIZENSHIP');
export const updateCode = stringAction('CODE');
export const updateSeriesNumber = stringAction('SERIES_NUMBER');
export const updateIssueDate = stringAction('ISSUE_DATE');
export const updateGender = stringAction('GENDER');
export const updateAddress = (v: IEvent) => ({type: 'LIVING_ADDRESS', field: v.field, value: v.value});
export const updateLivingAddressSame = (v: IEvent) => ({type: 'LIVING_ADDRESS_SAME',  value: v});
