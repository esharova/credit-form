import { mount } from 'enzyme';
import * as React from 'react';
import * as configureStore from 'redux-mock-store';
import { BirthDateField } from '../birthDate';

describe('Input for birth date', () => {
    const mockStore = configureStore();
    it('initial view', () => {
        const store = mockStore({application: {passport: {birthDate: '29.09.1984'}}});
        const field = mount(<BirthDateField store={store}/>);
        expect(field.find('FormControl').first().prop('style')).toEqual({width: '100%'});
        expect(field.find('TextField[type="date"]').prop('label')).toBe('Дата рождения');
        expect(field.find('input').prop('value')).toEqual('29.09.1984');
    });
    it('follow changes', () => {
        const store = mockStore({});
        const field = mount(<BirthDateField store={store}/>);
        field.find('input').simulate('change', {target: {value: '29.09.1984'}});
        expect(store.getActions()).toEqual([{type: 'BIRTH_DATE', value: '29.09.1984'}]);
    });

    it('error processing', () => {
        const store = mockStore({errors: {birthDate: 'ERROR'}});
        const field = mount(<BirthDateField store={store}/>);
        expect(field.find('TextField').prop('error')).toEqual(true);
        expect(field.find('FormHelperText').text()).toEqual('ERROR');
    });
});
