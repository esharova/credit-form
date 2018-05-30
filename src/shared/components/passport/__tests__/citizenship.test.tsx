import {CitizenshipPassportField} from "../citizenship";
import * as React from "react";
import {mount} from "enzyme";

describe('Citizenship selector', () => {
    it("default view", () => {
        const field = mount(<CitizenshipPassportField/>);
        let formControl = field.find("FormControl");
        expect(formControl).toHaveLength(1);
        expect(formControl.find('InputLabel[htmlFor="citizenship"]').text()).toBe("Гражданство");
        expect(formControl.find('Select[id="citizenship"]').prop("value")).toBe("RF");
    });

    it("Show all available items", () => {
        const field = mount(<CitizenshipPassportField/>);
        field.find('div[role="button"]').simulate('click');
        expect(field.find('li')).toHaveLength(2);
        expect(field.find('li[data-value="RF"]').text()).toBe("Российская Федерация");
        expect(field.find('li[data-value="OTHER"]').text()).toBe("Иное");
    });
    it("Select OTHER VALUE", () => {
        const field = mount(<CitizenshipPassportField/>);
        let button = field.find('div[role="button"]');
        expect(button.text()).toBe("Российская Федерация");
        button.simulate('click');
        field.find('li[data-value="OTHER"]').simulate('click');
        expect(field.find('div[role="button"]').text()).toBe('Иное')
    });
    it("Select OTHER VALUE and back", () => {
        const field = mount(<CitizenshipPassportField/>);
        field.find('div[role="button"]').simulate('click');
        field.find('li[data-value="OTHER"]').simulate('click');
        field.find('div[role="button"]').simulate('click');
        field.find('li[data-value="RF"]').simulate('click');
        expect(field.find('div[role="button"]').text()).toBe("Российская Федерация");
    });
});