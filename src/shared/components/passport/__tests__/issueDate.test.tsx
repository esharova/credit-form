import { mount } from 'enzyme';
import * as React from 'react';
import * as configureStore from 'redux-mock-store';
import { IssueDateField } from '../issueDate';

describe('Input for issue date', () => {
    const mockStore = configureStore();

    it('initial view', () => {
        const store = mockStore({application: {passport: {issueDate: '2001-10-10'}}});
        const field = mount(<IssueDateField store={store}/>);
        expect(field.find('FormControl').first().prop('style')).toEqual({width: '100%'});
        expect(field.find('TextField[type="date"]').prop('label')).toBe('Когда выдан');
        expect(field.find('input[value="2001-10-10"]')).toHaveLength(1);
    });

    it('follow changes', () => {
        const store = mockStore();
        const field = mount(<IssueDateField store={store}/>);
        field.find('input').simulate('change', {target: {value: '01012000'}});
        expect(store.getActions()).toEqual([{type: 'ISSUE_DATE', value: '01012000'}]);
    });

    it('error processing', () => {
        const store = mockStore({errors: {issueDate: 'ERROR'}});
        const field = mount(<IssueDateField store={store}/>);
        expect(field.find('TextField').prop('error')).toEqual(true);
        expect(field.find('FormHelperText').text()).toEqual('ERROR');
    });
});
