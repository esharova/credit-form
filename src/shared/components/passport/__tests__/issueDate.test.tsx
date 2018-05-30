import * as React from "react";
import {mount} from "enzyme";
import {IssueDateField} from "../issueDate";


describe("Input for issue date", () => {
    it("initial view", () => {
        const field = mount(<IssueDateField/>);
        expect(field.find("FormControl").first().prop("style")).toEqual({"width": "100%"});
        expect(field.find('TextField[type="date"]').prop("label")).toBe("Когда выдан");
    });
});
