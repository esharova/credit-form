import * as assert from 'assert';
import * as sinon from 'sinon';
import { StateThrottling } from '../backendApi';

describe('Make it possible to send throttled application', () => {
    it('Initial state: send immediately', () => {
        const stateThrottling = new StateThrottling();
        const data = {};
        const callback = sinon.fake();
        stateThrottling.doWithThrottling(data, callback);
        assert(callback.calledOnce);
    });

    it('After sending: queue data', () => {
        const stateThrottling = new StateThrottling();
        const data1 = {};
        const data2 = {};
        const callback = sinon.fake();
        stateThrottling.doWithThrottling(data1, callback);
        stateThrottling.doWithThrottling(data2, callback);
        assert(callback.calledOnce);
    });

    it('Consequence sending: send data', () => {
        const stateThrottling = new StateThrottling();
        const data1 = {};
        const data2 = {};
        const callback = sinon.fake();
        stateThrottling.doWithThrottling(data1, callback);
        stateThrottling.finished();
        stateThrottling.doWithThrottling(data2, callback);
        assert(callback.calledTwice);
    });

    it('Throttle sending: queue data', () => {
        const stateThrottling = new StateThrottling();
        const data1 = {};
        const data2 = {};
        const data3 = {};
        const callback1 = sinon.fake();
        const callback2 = sinon.fake();
        const callback3 = sinon.fake();
        stateThrottling.doWithThrottling(data1, callback1);
        stateThrottling.doWithThrottling(data2, callback2);
        stateThrottling.doWithThrottling(data3, callback3);
        stateThrottling.finished();
        assert(callback1.calledOnce);
        assert(!callback2.called);
        assert(callback3.calledOnce);
    });
});
