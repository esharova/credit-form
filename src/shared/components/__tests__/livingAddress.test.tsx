import * as React from "react";
import LivingAddressBlock from "../livingAddress";
import {mount} from "enzyme";

describe("Living addresss is used for input address of registration and real address in case of it's different", () => {
    it("Initial view", () => {
        const w = mount(<LivingAddressBlock/>);
        expect(w.find("AddressField")).toHaveLength(1);
        let checkBox = w.find("FormControlLabel[label=\"Фактический адрес совпадает с адресом регистрации\"]");
        expect(checkBox).toHaveLength(1);
        expect(checkBox.find("input[type=\"checkbox\"]").prop("checked")).toBe(true);
    });

    it("When checkbox is clicked show real address field", () => {
        const w = mount(<LivingAddressBlock/>);
        const checkBox = w.find("FormControlLabel[label=\"Фактический адрес совпадает с адресом регистрации\"]");
        const checkboxInput = checkBox.find('input[type="checkbox"]');
        checkboxInput.instance().checked = false;
        checkboxInput.simulate("change");
        expect(checkboxInput.instance()).toHaveProperty("checked", false);
        expect(w.find("AddressField")).toHaveLength(2);
    });

    it("Address is in card", () => {
        const w = mount(<LivingAddressBlock/>);
        let card = w.find("Card");
        expect(card).toHaveLength(1);
        let content = card.find("CardContent");
        expect(content).toHaveLength(1);
        let gridContainer = content.find("Grid[container=true]");
        expect(gridContainer).toHaveLength(1);
        expect(gridContainer.find("Grid[item=true]").find("[xs=12]")).toHaveLength(2);

        // check that after click on checkbox additional address input appeared
        const checkBox = w.find("FormControlLabel[label=\"Фактический адрес совпадает с адресом регистрации\"]");
        const checkboxInput = checkBox.find('input[type="checkbox"]');
        checkboxInput.instance().checked = false;
        checkboxInput.simulate("change");
        expect(w.find("Card").find("CardContent").find("Grid[container=true]").find("Grid[item=true]").find("[xs=12]")).toHaveLength(3);
    });
});