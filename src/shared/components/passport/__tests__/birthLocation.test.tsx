import * as React from "react";
import {mount} from "enzyme";
import {BirthLocationField} from "../birthLocation";
import * as configureStore from 'redux-mock-store';

describe('Birth location input', () => {
    const mockStore = configureStore();
    it("default view", () => {
        const store = mockStore({application: {passport: {birthLocation: 'location'}}});
        const field = mount(<BirthLocationField store={store}/>);
        let find = field.find('TextField');
        expect(find.prop("label")).toBe("Место рождения");
        expect(find.prop("style")).toEqual({"width": "100%"});
        expect(field.find('input').prop('value')).toEqual('location');
    });

    it("follow changes", () => {
        const store = mockStore({});
        const field = mount(<BirthLocationField store={store}/>);
        let find = field.find('TextField');
        find.find("input").simulate("change", { target: { value: "123"}});
        expect(store.getActions()).toEqual([{type: "BIRTH_LOCATION", value: '123'}]);
    });
});