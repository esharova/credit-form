import * as React from "react";
import {mount} from "enzyme";
import {AddressField} from "../address";

const dadataAddressApi = {
    getSuggestions: (input, callback) => input == "XXX" ? setTimeout(() => callback([{label: "YYY"}, {label: "ZZZ"}]), 1) : setTimeout(() => callback([]), 1)

};

describe("Field for input addresses", () => {
    it("initial view", () => {
        const w = mount(<AddressField label="LABEL"/>);
        expect(w.find("TextField[label=\"LABEL\"]")).toHaveLength(1);
        expect(w.find("Downshift").prop("style")).toEqual({width: "100%"});
    });
});