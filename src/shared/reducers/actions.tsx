const stringAction = (name: string) => (v: string) => ({type: name, value: v});

export const updateIssueDepartment = stringAction('ISSUE_DEPARTMENT');
export const updateBirthDate = stringAction('BIRTH_DATE');
export const updateBirthLocation = stringAction('BIRTH_LOCATION');
export const updateCitizenship = stringAction('CITIZENSHIP');
export const updateCode = stringAction('CODE');
