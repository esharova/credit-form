import * as React from "react";
import {App} from "../index";
import {shallow} from "enzyme";
import {FirstApplicationPage} from "../components/firstPage";

describe('Micro service for rendering credit application', () => {


    it('On first visit first application page should be shown', () => {
        const wrapper = shallow(<App />);
        expect(wrapper.find(FirstApplicationPage)).toHaveLength(1);
    });
});