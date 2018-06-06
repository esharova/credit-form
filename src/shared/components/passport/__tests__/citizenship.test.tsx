import {CitizenshipPassportField} from "../citizenship";
import * as React from "react";
import {mount} from "enzyme";
import * as configureStore from 'redux-mock-store';

describe('Citizenship selector', () => {
    const mockStore = configureStore();
    it("default view", () => {
        const store = mockStore({application:{passport: {citizenship: 'RF'}}});
        const field = mount(<CitizenshipPassportField store={store}/>);
        let formControl = field.find("FormControl");
        expect(formControl.prop("style")).toEqual({"width": "100%"});
        expect(formControl).toHaveLength(1);
        expect(formControl.find('InputLabel[htmlFor="citizenship"]').text()).toBe("Гражданство");
        expect(formControl.find('Select[id="citizenship"]').prop("value")).toBe("RF");
    });
    it("default view OTHER", () => {
        const store = mockStore({application:{passport: {citizenship: 'OTHER'}}});
        const field = mount(<CitizenshipPassportField store={store}/>);
        let formControl = field.find("FormControl");
        expect(formControl.find('Select[id="citizenship"]').prop("value")).toBe("OTHER");
    });

    it("Show all available items", () => {
        const store = mockStore({application:{passport: {citizenship: 'RF'}}});
        const field = mount(<CitizenshipPassportField store={store}/>);
        field.find('div[role="button"]').simulate('click');
        expect(field.find('li')).toHaveLength(2);
        expect(field.find('li[data-value="RF"]').text()).toBe("Российская Федерация");
        expect(field.find('li[data-value="OTHER"]').text()).toBe("Иное");
    });
    it("Select OTHER VALUE", () => {
        const store = mockStore({application:{passport: {citizenship: 'RF'}}});

        const field = mount(<CitizenshipPassportField store={store}/>);
        let button = field.find('div[role="button"]');
        expect(button.text()).toBe("Российская Федерация");
        button.simulate('click');
        field.find('li[data-value="OTHER"]').simulate('click');
        expect(store.getActions()).toEqual([{type: 'CITIZENSHIP', value: 'OTHER'}])
    });
});