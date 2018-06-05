import { mount } from 'enzyme';
import * as React from 'react';
import { AddressField } from '../address';

describe('Field for input addresses', () => {
    it('initial view', () => {
        const w = mount(<AddressField label="LABEL"/>);
        expect(w.find('TextField[label=\"LABEL\"]')).toHaveLength(1);
        expect(w.find('div').at(0).prop('style')).toEqual({width: '100%'});
    });
});
