import * as React from "react";
import {mount} from "enzyme";
import AddressField from "../address";

describe("Field for input addresses", () => {
    it("initial view", () => {
        const w = mount(<AddressField label="LABEL"/>);
        expect(w.find("TextField[label=\"LABEL\"]")).toHaveLength(1);
        expect(w.find("TextField").prop("style")).toEqual({width: "100%"});
    });
});