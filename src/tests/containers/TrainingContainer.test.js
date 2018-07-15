import React from 'react';
import {shallow} from 'enzyme';
import TrainingContainer from '../../containers/TrainingContainer';

describe('<TrainingContainer />', () => {
  let component;
  let parameters = {
    size: 20,
    speed: 100,
    length: 4
  };

  beforeEach(() => {
    component = shallow(<TrainingContainer endTraining={jest.fn()} parameters={parameters}/>)
  });

  it('renders ok', () => {
    expect(component.length).toBe(1);
    expect(component.instance().state.step).toBe(1);
    expect(component.instance().state.countValid).toBe(0);
    expect(component.instance().state.countInvalid).toBe(0);
    expect(component.instance().state.currentValue).toBe('');
  });

  it('changes state values on handleValidAction call', () => {
    component.instance().handleValidAction();
    expect(component.instance().state.step).toBe(2);
    expect(component.instance().state.countValid).toBe(1);
  });

  it('changes state values on handleInvalidAction call', () => {
    component.instance().handleInvalidAction();
    expect(component.instance().state.step).toBe(2);
    expect(component.instance().state.countInvalid).toBe(1);
  });
});
