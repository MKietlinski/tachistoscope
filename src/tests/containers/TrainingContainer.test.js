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
    expect(component.instance().state.answered).toBe(0);
    expect(component.instance().state.countCorrect).toBe(0);
    expect(component.instance().state.countIncorrect).toBe(0);
    expect(component.instance().state.currentValue).toBe('');
  });

  it('changes state values on incrementAnsweredAndCorrectCount call', () => {
    component.instance().incrementAnsweredAndCorrectCount();
    expect(component.instance().state.answered).toBe(1);
    expect(component.instance().state.countCorrect).toBe(1);
  });

  it('changes state values on incrementAnsweredAndIncorrectCount call', () => {
    component.instance().incrementAnsweredAndIncorrectCount();
    expect(component.instance().state.answered).toBe(1);
    expect(component.instance().state.countIncorrect).toBe(1);
  });
});
