import * as React from "react";
import {mount} from "enzyme";
import {GenderField} from "../gender";

describe('Gender selector', () => {
    it("default view", () => {
        const field = mount(<GenderField/>);
        let formControl = field.find("FormControl");
        expect(formControl.prop("style")).toEqual({"width": "100%"});
        expect(formControl).toHaveLength(1);
        expect(formControl.find('InputLabel[htmlFor="gender"]').text()).toBe("Пол");
        expect(formControl.find('Select[id="gender-select"]').prop("value")).toBe("MALE");
    });

    it("Show all available items", () => {
        const field = mount(<GenderField/>);
        field.find('div[role="button"]').simulate('click');
        expect(field.find('li')).toHaveLength(2);
        expect(field.find('li[data-value="MALE"]').text()).toBe("Мужской");
        expect(field.find('li[data-value="FEMALE"]').text()).toBe("Женский");
    });

    it("Select OTHER VALUE", () => {
        const field = mount(<GenderField/>);
        let button = field.find('div[role="button"]');
        expect(button.text()).toBe("Мужской");
        button.simulate('click');
        field.find('li[data-value="FEMALE"]').simulate('click');
        expect(field.find('div[role="button"]').text()).toBe('Женский')
    });
    it("Select OTHER VALUE and back", () => {
        const field = mount(<GenderField/>);
        field.find('div[role="button"]').simulate('click');
        field.find('li[data-value="FEMALE"]').simulate('click');
        field.find('div[role="button"]').simulate('click');
        field.find('li[data-value="MALE"]').simulate('click');
        expect(field.find('div[role="button"]').text()).toBe("Мужской");
    });
});