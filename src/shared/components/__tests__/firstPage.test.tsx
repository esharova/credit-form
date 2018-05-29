import * as React from "react";
import {shallow} from "enzyme";
import {FirstApplicationPage} from "../firstPage";
import {PassportInfoBlock} from "../passportInfo";

describe('First page of application contains passport and basic addresses', () => {


    it('On first page shouild be one passport info block', () => {
        const wrapper = shallow(<FirstApplicationPage/>);
        expect(wrapper.find(PassportInfoBlock)).toHaveLength(1);
    });
});