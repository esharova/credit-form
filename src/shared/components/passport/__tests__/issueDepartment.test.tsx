import * as React from "react";
import {mount} from "enzyme";
import {IssueDepartamentField} from "../issueDepartment";


describe("Input for issue department", () => {
    it("initial view", () => {
        const field = mount(<IssueDepartamentField/>);
        expect(field.find('TextField').prop("label")).toBe("Кем выдан");
        expect(field.find('TextField').prop("style")).toEqual({width: "100%"});
    });
});
