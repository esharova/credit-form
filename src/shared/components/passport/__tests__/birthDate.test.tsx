import * as React from "react";
import {mount} from "enzyme";
import {BirthDateField} from "../birthDate";


describe("Input for birth date", () => {
    it("initial view", () => {
        const field = mount(<BirthDateField/>);
        expect(field.find("FormControl").first().prop("style")).toEqual({"width": "100%"});
        expect(field.find('TextField[type="date"]').prop("label")).toBe("Дата рождения");
    });
});
