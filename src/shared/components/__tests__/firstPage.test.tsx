import * as React from "react";
import { shallow } from "enzyme";
import { FirstApplicationPage } from "../firstPage";
import { PassportInfoBlock } from "../passportInfo";
import { LivingAddressBlock } from "../livingAddress";

describe('First page of application contains passport and basic addresses', () => {


    it('On first page shouild be one passport info block', () => {
        const fakeApi = {};
        const wrapper = shallow(<FirstApplicationPage dadataAddressApi={fakeApi}/>);
        expect(wrapper.find(PassportInfoBlock)).toHaveLength(1);
        let livingAddress = wrapper.find(LivingAddressBlock);
        expect(livingAddress).toHaveLength(1);
        expect(livingAddress.prop("dadataAddressApi")).toBe(fakeApi);
    });
});