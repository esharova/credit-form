import { mount } from 'enzyme';
import * as React from 'react';
import * as configureStore from 'redux-mock-store';
import { IssueDepartamentField } from '../issueDepartment';

describe('Input for issue department', () => {
    const mockStore = configureStore([]);
    it('initial view', () => {
        const store = mockStore({application: {passport: {issueDepartment: 'TEST'}}});
        const field = mount(<IssueDepartamentField store={store}/>);
        expect(field.find('TextField').prop('label')).toBe('Кем выдан');
        expect(field.find('TextField').prop('style')).toEqual({width: '100%'});
        expect(field.find('input').prop('value')).toEqual('TEST');
    });
    it('follow changes', () => {
        const store = mockStore({});
        const field = mount(<IssueDepartamentField store={store}/>);
        field.find('input').simulate('change', {target: {value: 'TEST'}});
        console.log(store.getState());
        expect(store.getActions()).toEqual([{type: 'ISSUE_DEPARTMENT', value: 'TEST'}]);
    });

    it('handle error', () => {
        const store = mockStore({errors: {issueDepartment: 'ERROR'}});
        const field = mount(<IssueDepartamentField store={store}/>);
        expect(field.find('TextField').prop('error')).toEqual(true);
        expect(field.find('FormHelperText').text()).toEqual('ERROR');
    });
});
