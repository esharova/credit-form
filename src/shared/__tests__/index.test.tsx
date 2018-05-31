import * as React from "react";
import {App} from "../index";
import {shallow} from "enzyme";
import {FirstApplicationPage} from "../components/firstPage";

describe('Micro service for rendering credit application', () => {


    it('On first visit first application page should be shown', () => {
        const fakeApi = {};
        const wrapper = shallow(<App/>);
        let applicationPage = wrapper.find(FirstApplicationPage);
        expect(applicationPage).toHaveLength(1);
        expect(applicationPage.prop("dadataAddressApi")).toBeDefined();
    });
});