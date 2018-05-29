import * as React from "react";
import {shallow, mount} from "enzyme";
import {PassportInfoBlock} from "../passportInfo";

describe('Passport info contains fields of Russian Federation Passport', () => {
    it('Passport fields is layouted in grid', () => {
        const wrapper = mount(<PassportInfoBlock />);
        expect(wrapper.find('Grid[container]')).toHaveLength(1);

    });
    it('Passport contains serial number field', () => {
        const wrapper = mount(<PassportInfoBlock />);
        expect(wrapper.find('TextField[label="Серия и номер"]')).toHaveLength(1);
    });
    it('Passport contains citezenship field', () => {
        const wrapper = mount(<PassportInfoBlock />);
        let label = wrapper.find('InputLabel[htmlFor="citizenship"]');
        expect(label).toHaveLength(1);
        expect(label.at(0).text()).toBe("Гражданство");
        let select = wrapper.find('Select[id="citizenship"]');
        expect(select).toHaveLength(1);
        expect(select.children().text()).toBe("Российская Федерация");
    });
});