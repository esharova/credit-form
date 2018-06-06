import { mount } from 'enzyme';
import * as React from 'react';
import { CodeInputField } from '../codeInput';
import * as configureStore from 'redux-mock-store';

describe('Input for issue code', () => {
    const mockStore = configureStore();

    it('initial view', () => {
        const store = mockStore({application:{passport: {code: '111111'}}});
        const field = mount(<CodeInputField store={store}/>);

        expect(field.find('FormControl').first().prop('style')).toEqual({width: '100%'});
        expect(field.find('t').prop('value')).toBe('111111');

        expect(field.find('InputLabel[htmlFor="code-input"]').text()).toBe('Код подразделения');
        field.find('input').simulate('change', { target: { value: '123123' } });
        expect(field.find('t').prop('mask')).toEqual([/\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/]);
        expect(store.getActions()).toEqual([{type: 'CODE', value: '123123'}]);
    });

    it('accept only numbers', () => {
        const store = mockStore({});
        const field = mount(<CodeInputField store={store}/>);
        field.find('input').simulate('change', { target: { value: '1212qwe' } });
        expect(store.getActions()).toEqual([{type: 'CODE', value: '1212qwe'}]);
        expect(field.find('t[value="1212"]')).toHaveLength(0);
    });
});
