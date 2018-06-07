import * as React from "react";
import {mount} from "enzyme";
import {IssueDateField} from "../issueDate";
import * as configureStore from 'redux-mock-store';

describe("Input for issue date", () => {
    const mockStore = configureStore();

    it("initial view", () => {
        const store = mockStore({ application: { passport: {issueDate: '2001-10-10'}}});
        const field = mount(<IssueDateField store={store}/>);
        expect(field.find("FormControl").first().prop("style")).toEqual({width: '100%'});
        expect(field.find('TextField[type="date"]').prop("label")).toBe("Когда выдан");
        expect(field.find('input[value="2001-10-10"]')).toHaveLength(1);
    });

    it("follow changes", () => {
        const store = mockStore();
        const field = mount(<IssueDateField store={store}/>);
        field.find('input').simulate('change', { target: { value: '01012000' } });
        expect(store.getActions()).toEqual([{type: 'ISSUE_DATE', value: '01012000'}]);
    });
});
