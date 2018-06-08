import { mount } from 'enzyme';
import * as React from 'react';
import * as configureStore from 'redux-mock-store';
import { GenderField } from '../gender';

describe('Gender selector', () => {
    const mockStore = configureStore();

    it('default view with MALE', () => {
        const store = mockStore({application: {passport: {gender: 'MALE'}}});
        const field = mount(<GenderField store={store}/>);
        let formControl = field.find('FormControl');
        expect(formControl.prop('style')).toEqual({width: '100%'});
        expect(formControl).toHaveLength(1);
        expect(formControl.find('InputLabel[htmlFor="gender"]').text()).toBe('Пол');
        expect(formControl.find('Select').prop('value')).toBe('MALE');
    });

    it('default view with FEMALE', () => {
        const store = mockStore({application: {passport: {gender: 'FEMALE'}}});
        const field = mount(<GenderField store={store}/>);
        let formControl = field.find('FormControl');
        expect(formControl.find('Select').prop('value')).toBe('FEMALE');
    });

    it('Show all available items', () => {
        const store = mockStore({application: {passport: {gender: 'MALE'}}});
        const field = mount(<GenderField store={store}/>);
        field.find('div[role="button"]').simulate('click');
        expect(field.find('li')).toHaveLength(2);
        expect(field.find('li[data-value="MALE"]').text()).toBe('Мужской');
        expect(field.find('li[data-value="FEMALE"]').text()).toBe('Женский');
    });

    it('Select OTHER VALUE', () => {
        const store = mockStore({application: {passport: {gender: 'MALE'}}});
        const field = mount(<GenderField store={store}/>);
        let button = field.find('div[role="button"]');
        expect(button.text()).toBe('Мужской');
        button.simulate('click');
        field.find('li[data-value="FEMALE"]').simulate('click');
        expect(store.getActions()).toEqual([{type: 'GENDER', value: 'FEMALE'}]);
    });

    it('error processing', () => {
        const store = mockStore({errors: {gender: 'ERROR'}});
        const field = mount(<GenderField store={store}/>);
        expect(field.find('FormControl').prop('error')).toEqual(true);
        expect(field.find('FormHelperText').text()).toEqual('ERROR');
    });
});
