import { shallow } from 'enzyme';
import * as React from 'react';
import { FirstApplicationPage } from '../../pages/passport/passport';
import { LivingAddressBlock } from '../livingAddress';
import { PassportInfoBlock } from '../passportInfo';

describe('First page of application contains passport and basic addresses', () => {
    it('On first page shouild be one passport info block', () => {
        const fakeApi = {};
        const wrapper = shallow(<FirstApplicationPage dadataAddressApi={fakeApi}/>);
        expect(wrapper.find(PassportInfoBlock)).toHaveLength(1);
        let livingAddress = wrapper.find(LivingAddressBlock);
        expect(livingAddress).toHaveLength(1);
        expect(livingAddress.prop('dadataAddressApi')).toBe(fakeApi);
    });
});
