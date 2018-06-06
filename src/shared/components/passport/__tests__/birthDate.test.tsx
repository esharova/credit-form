import * as React from 'react';
import { mount } from 'enzyme';
import { BirthDateField } from '../birthDate';
import * as configureStore from 'redux-mock-store';

describe('Input for birth date', () => {
    const mockStore = configureStore();
    it('initial view', () => {
        const store = mockStore({application: {passport: {birthDate: '29.09.1984'}}});
        const field = mount(<BirthDateField store={store}/>);
        expect(field.find('FormControl').first().prop('style')).toEqual({'width': '100%'});
        expect(field.find('TextField[type="date"]').prop('label')).toBe('Дата рождения');
        expect(field.find('input').prop('value')).toEqual('29.09.1984');
    });
    it('follow changes', () => {
        const store = mockStore({});
        const field = mount(<BirthDateField store={store}/>);
        field.find('input').simulate('change', {target: {value: "29.09.1984"}});
        expect(store.getActions()).toEqual([{type: "BIRTH_DATE", value: "29.09.1984"}])
    });
});
