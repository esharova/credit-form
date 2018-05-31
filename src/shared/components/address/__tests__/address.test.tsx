import * as React from "react";
import {mount} from "enzyme";
import AddressField from "../address";

const dadataAddressApi = {
    getSuggestions: input => input == "XXX" ? [{label: "YYY"}, {label: "ZZZ"}] : []

};

describe("Field for input addresses", () => {
    it("initial view", () => {
        const w = mount(<AddressField label="LABEL"/>);
        expect(w.find("TextField[label=\"LABEL\"]")).toHaveLength(1);
        expect(w.find("Downshift").prop("style")).toEqual({width: "100%"});
    });

    it("Address input autocompletion", () => {
        const w = mount(<AddressField dadataAddressApi={dadataAddressApi}/>);
        w.find("input").simulate("change", {target: {value: "XXX"}});
        let paper = w.find("Paper");
        expect(paper).toHaveLength(1);
        let menuItems = paper.find("MenuItem");
        expect(menuItems).toHaveLength(2);
        expect(menuItems.at(0).text()).toBe("YYY");
        expect(menuItems.at(1).text()).toBe("ZZZ");
    });

    it("Address selected from autocompletions list", () => {
        const w = mount(<AddressField dadataAddressApi={dadataAddressApi}/>);
        w.find("input").simulate("change", {target: {value: "XXX"}});
        let menuItems = w.find("MenuItem");
        let firstSuggestion = menuItems.first();
        let suggestionText = firstSuggestion.text();
        firstSuggestion.simulate("click");
        expect(w.find("input").prop("value")).toBe(suggestionText);
    });

});