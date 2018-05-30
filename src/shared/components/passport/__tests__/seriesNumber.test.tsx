import * as React from "react";
import {mount} from "enzyme";
import SeriesAndNumberField from "../seriesNumber";


describe("Input for series and number", () => {
    it("initial view", () => {
        const field = mount(<SeriesAndNumberField/>);
        expect(field.find("FormControl").first().prop("style")).toEqual({"width": "100%"});
        expect(field.find('InputLabel[htmlFor="series-and-number-input"]').text()).toBe("Серия и номер");
        field.find('input').simulate('change', { target: { value: '1234123456' } });
        expect(field.find('t[value="1234123456"]').prop("mask")).toEqual([/\d/, /\d/, /\d/, /\d/, ' ', /\d/, /\d/, /\d/, /\d/, /\d/, /\d/]);
    });

    it("accept only numbers", () => {
        const field = mount(<SeriesAndNumberField/>);
        expect(field.find('InputLabel[htmlFor="series-and-number-input"]').text()).toBe("Серия и номер");
        field.find('input').simulate('change', { target: { value: '1212qwe' } });
        expect(field.find('t[value="1212"]')).toHaveLength(0);

    });
});
