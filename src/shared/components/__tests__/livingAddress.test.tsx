import { mount } from 'enzyme';
import * as React from 'react';
import { Provider } from 'react-redux';
import * as configureStore from 'redux-mock-store';
import { LivingAddressBlock } from '../livingAddress';

describe('Living addresss is used for input address of registration and real address in case of it\'s different',
    () => {
        const mockStore = configureStore();
        it('Initial view checked', () => {
            const fakeApi = {};
            const store = mockStore({
                application: {
                    address: {
                        isRegistrationAddressSameAsActual: true,
                    },
                },
            });
            const w = mount(<Provider store={store}><LivingAddressBlock dadataAddressApi={fakeApi}/></Provider>);
            let addressField = w.find('AddressFieldInternal[label=\"Адрес регистрации\"]');
            expect(addressField).toHaveLength(1);
            expect(addressField.prop('dadataAddressApi')).toBe(fakeApi);
            let checkBox = w.find('FormControlLabel[label=\"Фактический адрес совпадает с адресом регистрации\"]');
            expect(checkBox).toHaveLength(1);
            expect(checkBox.find('input[type=\"checkbox\"]').prop('checked')).toBe(true);
        });
        it('Initial view  unchecked', () => {
            const fakeApi = {};
            const store = mockStore({
                application: {
                    address: {
                        isRegistrationAddressSameAsActual: false,
                    },
                },
            });
            const w = mount(<Provider store={store}><LivingAddressBlock dadataAddressApi={fakeApi}/></Provider>);
            let addressField = w.find('AddressFieldInternal[label=\"Адрес регистрации\"]');
            expect(addressField).toHaveLength(1);
            expect(addressField.prop('dadataAddressApi')).toBe(fakeApi);
            let checkBox = w.find('FormControlLabel[label=\"Фактический адрес совпадает с адресом регистрации\"]');
            expect(checkBox).toHaveLength(1);
            expect(checkBox.find('input[type=\"checkbox\"]').prop('checked')).toBe(false);
            let actualAddress = w.find('AddressFieldInternal[label=\"Адрес проживания\"]');
            expect(actualAddress).toHaveLength(1);
        });

        it('When checkbox is clicked generate action', () => {
            const fakeApi = {};
            const store = mockStore({
                application: {
                    address: {
                        isRegistrationAddressSameAsActual: false,
                    },
                },
            });
            const w = mount(<Provider store={store}><LivingAddressBlock dadataAddressApi={fakeApi}/></Provider>);
            const checkBox = w.find('FormControlLabel[label=\"Фактический адрес совпадает с адресом регистрации\"]');
            const checkboxInput = checkBox.find('input[type="checkbox"]');
            checkboxInput.instance().checked = true;
            checkboxInput.simulate('change');
            expect(store.getActions()).toEqual([{type: "LIVING_ADDRESS_SAME", value: true}]);
        });
    });
