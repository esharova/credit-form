import { mount } from 'enzyme';
import * as React from 'react';
import * as configureStore from 'redux-mock-store';
import { AddressField } from '../address';

describe('Field for input addresses', () => {
    const mockStore = configureStore();
    it('initial view', () => {
        const store = mockStore({application: {address: {addr: 'address'}}});
        const w = mount(<AddressField label="LABEL" addressField="addr" store={store}/>);
        expect(w.find('TextField[label=\"LABEL\"]')).toHaveLength(1);
        expect(w.find('TextField[fullWidth=true]')).toHaveLength(1);
        expect(w.find('input').prop('value')).toBe('address');
    });
});
