import { mount } from 'enzyme';
import * as React from 'react';
import { LivingAddressBlock } from '../livingAddress';

describe('Living addresss is used for input address of registration and real address in case of it\'s different',
    () => {
    it('Initial view', () => {
        const fakeApi = {};
        const w = mount(<LivingAddressBlock dadataAddressApi={fakeApi}/>);
        let addressField = w.find('AddressField[label=\"Адрес регистрации\"]');
        expect(addressField).toHaveLength(1);
        expect(addressField.prop('dadataAddressApi')).toBe(fakeApi);
        let checkBox = w.find('FormControlLabel[label=\"Фактический адрес совпадает с адресом регистрации\"]');
        expect(checkBox).toHaveLength(1);
        expect(checkBox.find('input[type=\"checkbox\"]').prop('checked')).toBe(true);
    });

    it('When checkbox is clicked show real address field', () => {
        const fakeApi = {};
        const w = mount(<LivingAddressBlock  dadataAddressApi={fakeApi}/>);
        const checkBox = w.find('FormControlLabel[label=\"Фактический адрес совпадает с адресом регистрации\"]');
        const checkboxInput = checkBox.find('input[type="checkbox"]');
        checkboxInput.instance().checked = false;
        checkboxInput.simulate('change');
        expect(checkboxInput.instance()).toHaveProperty('checked', false);
        let actualAddress = w.find('AddressField[label=\"Адрес проживания\"]');
        expect(actualAddress).toHaveLength(1);
        expect(actualAddress.prop('dadataAddressApi')).toBe(fakeApi);
    });

    it('Address is in card', () => {
        const w = mount(<LivingAddressBlock />);
        let card = w.find('Card');
        expect(card).toHaveLength(1);
        let content = card.find('CardContent');
        expect(content).toHaveLength(1);
        let gridContainer = content.find('Grid[container=true]');
        expect(gridContainer).toHaveLength(1);
        expect(gridContainer.find('Grid[item=true]').find('[xs=12]')).toHaveLength(2);

        // check that after click on checkbox additional address input appeared
        const checkBox = w.find('FormControlLabel[label=\"Фактический адрес совпадает с адресом регистрации\"]');
        const checkboxInput = checkBox.find('input[type="checkbox"]');
        checkboxInput.instance().checked = false;
        checkboxInput.simulate('change');
        expect(w.find('Card').find('CardContent').find('Grid[container=true]').find('Grid[item=true]').find('[xs=12]'))
            .toHaveLength(3);
    });
});
