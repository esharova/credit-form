import * as actions from '../actions';
import { IApplicationState, rootReducer } from '../';

describe('Test all actions', () => {
    it('Test all actions', () => {
        for (let name in actions) {
            var state: IApplicationState = {};
            expect({action: name, state: rootReducer(state, actions[name]('XXX'))}).not.toEqual({action: name, state: state});
        }
    });
});