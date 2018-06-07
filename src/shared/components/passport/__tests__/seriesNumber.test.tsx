import { mount } from 'enzyme';
import * as React from 'react';
import { SeriesAndNumberField } from '../seriesNumber';
import * as configureStore from 'redux-mock-store';

describe('Input for series and number', () => {
    const mockStore = configureStore();

    it('initial view', () => {
        const store = mockStore({application:{passport: {seriesNumber: '1234123456'}}});
        const field = mount(<SeriesAndNumberField store={store}/>);
        expect(field.find('FormControl').first().prop('style')).toEqual({width: '100%'});
        expect(field.find('InputLabel[htmlFor="series-and-number-input"]').text()).toBe('Серия и номер');
        expect(field.find("t[value=\"1234123456\"]")).toHaveLength(1);

        field.find('input').simulate('change', { target: { value: '1234123457' } });
        expect(store.getActions()).toEqual([{type: 'SERIES_NUMBER', value: '1234123457'}]);
        expect(field.find('t').prop('mask')).toEqual(
            [/\d/, /\d/, /\d/, /\d/, ' ', /\d/, /\d/, /\d/, /\d/, /\d/, /\d/]);
    });

    it('accept only numbers', () => {
        const store = mockStore({application:{passport: {seriesNumber: '1234123456'}}});
        const field = mount(<SeriesAndNumberField store={store}/>);
        expect(field.find('InputLabel[htmlFor="series-and-number-input"]').text()).toBe('Серия и номер');
        field.find('input').simulate('change', { target: { value: '1212qwe' } });
        expect(store.getActions()).toEqual([{type: 'SERIES_NUMBER', value: '1212qwe'}]);
        expect(field.find('t[value="1212"]')).toHaveLength(0);
    });
});
