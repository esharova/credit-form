import { mount } from 'enzyme';
import * as React from 'react';
import { CodeInputField } from '../codeInput';


describe('Input for series and number', () => {
    it('initial view', () => {
        const field = mount(<CodeInputField/>);
        expect(field.find('FormControl').first().prop('style')).toEqual({'width': '100%'});
        expect(field.find('InputLabel[htmlFor="code-input"]').text()).toBe('Код подразделения');
        field.find('input').simulate('change', { target: { value: '123123' } });
        expect(field.find('t[value="123123"]').prop('mask')).toEqual([/\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/]);
    });

    it('accept only numbers', () => {
        const field = mount(<CodeInputField/>);
        field.find('input').simulate('change', { target: { value: '1212qwe' } });
        expect(field.find('t[value="1212"]')).toHaveLength(0);
    });
});
