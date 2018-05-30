import {CitizenshipPassportField} from "../citizenship";
import * as React from "react";
import {mount} from "enzyme";
import {BirthLocationField} from "../birthLocation";

describe('Birth location input', () => {
    it("default view", () => {
        const field = mount(<BirthLocationField/>);
        let find = field.find('TextField');
        expect(find.prop("label")).toBe("Место рождения");
        expect(find.prop("style")).toEqual({"width": "100%"});

    });
});