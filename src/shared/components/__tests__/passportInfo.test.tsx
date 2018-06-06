import { mount, shallow } from 'enzyme';
import * as React from 'react';
import { Provider } from 'react-redux';
import { BirthDateField } from '../passport/birthDate';
import { BirthLocationField } from '../passport/birthLocation';
import { CitizenshipPassportField } from '../passport/citizenship';
import { CodeInputField } from '../passport/codeInput';
import { GenderField } from '../passport/gender';
import { IssueDateField } from '../passport/issueDate';
import { IssueDepartamentField } from '../passport/issueDepartment';
import { SeriesAndNumberField } from '../passport/seriesNumber';
import { PassportInfoBlock } from '../passportInfo';
import * as configureStore from 'redux-mock-store';

describe('Passport info contains fields of Russian Federation Passport', () => {
    const store = configureStore()({});

    it('passport is in card', () => {
        const wrapper = mount(<Provider store={store}><PassportInfoBlock/></Provider>);
        let card = wrapper.find('Card');
        expect(card).toHaveLength(1);
        let typography = card.find('Typography[color=\"textSecondary\"]');
        expect(typography.text()).toBe('Мульти-Паспорт');
        expect(typography.prop('style')).toEqual({marginBottom: '8px'});
    });
    it('Passport fields is layouted in grid', () => {
        const wrapper = mount(<Provider store={store}><PassportInfoBlock/></Provider>);
        expect(wrapper.find('Grid[container=true]')).toHaveLength(1);
    });
    it('Citizenship is located in upper grid item', () => {
        const wrapper = mount(<Provider store={store}><PassportInfoBlock/></Provider>);
        expect(wrapper.find('Grid[item=true]').find('[xs=12]').first().find(CitizenshipPassportField)).toHaveLength(1);
    });
    it('Serials and number is take half of grid', () => {
        const wrapper = mount(<Provider store={store}><PassportInfoBlock/></Provider>);
        expect(wrapper.find('Grid[item=true]').find('[xs=6]').at(0).find(SeriesAndNumberField)).toHaveLength(1);
    });
    it('Issue date is take second half of grid', () => {
        const wrapper = mount(<Provider store={store}><PassportInfoBlock/></Provider>);
        expect(wrapper.find('Grid[item=true]').find('[xs=6]').at(1).find(IssueDateField)).toHaveLength(1);
    });

    it('Issue departament is take third line of grid', () => {
        const wrapper = mount(<Provider store={store}><PassportInfoBlock/></Provider>);
        expect(wrapper.find('Grid[item=true]').find('[xs=12]').at(1).find(IssueDepartamentField)).toHaveLength(1);
    });

    it('Birth location is take fourth line of grid', () => {
        const wrapper = mount(<Provider store={store}><PassportInfoBlock/></Provider>);
        expect(wrapper.find('Grid[item=true]').find('[xs=12]').at(2).find(BirthLocationField)).toHaveLength(1);
    });

    it('Birth date is take first 1/3 of fifth line of grid', () => {
        const wrapper = mount(<Provider store={store}><PassportInfoBlock/></Provider>);
        expect(wrapper.find('Grid[item=true]').find('[xs=4]').at(0).find(BirthDateField)).toHaveLength(1);
    });

    it('Gender date is take second 1/3 of fifth line of grid', () => {
        const wrapper = mount(<Provider store={store}><PassportInfoBlock/></Provider>);
        expect(wrapper.find('Grid[item=true]').find('[xs=4]').at(1).find(GenderField)).toHaveLength(1);
    });

    it('Code of podrazdelenie is take third 1/3 of fifth line of grid', () => {
        const wrapper = mount(<Provider store={store}><PassportInfoBlock/></Provider>);
        expect(wrapper.find('Grid[item=true]').find('[xs=4]').at(2).find(CodeInputField)).toHaveLength(1);
    });

});
