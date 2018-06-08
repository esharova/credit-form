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

    it("handle error", () => {
        const store = mockStore({errors: {addr: "ERROR"}});
        const field = mount(<AddressField label="LABEL" addressField="addr"  store={store}/>);
        expect(field.find('TextField').prop('error')).toEqual(true);
        expect(field.find('FormHelperText').text()).toEqual('ERROR');
    });
});
