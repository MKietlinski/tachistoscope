import React from 'react';
import {shallow} from 'enzyme';
import SettingsForm from '../../forms/SettingsForm';
import sinon from 'sinon';

describe('<SettingsForm />', () => {
  let component;
  let parameters = {
    size: 20,
    speed: 100,
    length: 4
  };

  beforeEach(() => {
    component = shallow(<SettingsForm handleParameterChange={jest.fn()} parameters={parameters}/>)
  });

  it('renders ok', () => {
    expect(component.length).toBe(1);
  });

  it('calls handleParameterChange with valid args on increasing parameter', () => {
    let spy = sinon.spy();
    let event = {
      preventDefault: jest.fn(),
      target: {
        name: 'size'
      }
    };

    component.setProps({handleParameterChange: spy});
    component.instance().increaseParameter(event);

    expect(spy.calledOnce).toBeTruthy();
    expect(spy.args).toEqual([['size', 22]]);
  });

  it('calls handleParameterChange with valid args on decreasing parameter', () => {
    let spy = sinon.spy();
    let event = {
      preventDefault: jest.fn(),
      target: {
        name: 'size'
      }
    };

    component.setProps({handleParameterChange: spy});
    component.instance().decreaseParameter(event);

    expect(spy.calledOnce).toBeTruthy();
    expect(spy.args).toEqual([['size', 18]]);
  });

  it('returns valid bool on canBeIncreased size call', () => {
    component.setProps({
      parameters: {
        ...component.instance().props.parameters,
        size: 38
      }
    });
    expect(component.instance().canBeIncreased('size')).toBeTruthy();
    component.setProps({
      parameters: {
        ...component.instance().props.parameters,
        size: 40
      }
    });
    expect(component.instance().canBeIncreased('size')).toBeFalsy();
  });

  it('returns valid bool on canBeIncreased speed call', () => {
    component.setProps({
      parameters: {
        ...component.instance().props.parameters,
        speed: 975
      }
    });
    expect(component.instance().canBeIncreased('speed')).toBeTruthy();
    component.setProps({
      parameters: {
        ...component.instance().props.parameters,
        speed: 1000
      }
    });
    expect(component.instance().canBeIncreased('speed')).toBeFalsy();
  });

  it('returns valid bool on canBeIncreased length call', () => {
    component.setProps({
      parameters: {
        ...component.instance().props.parameters,
        length: 19
      }
    });
    expect(component.instance().canBeIncreased('length')).toBeTruthy();
    component.setProps({
      parameters: {
        ...component.instance().props.parameters,
        length: 20
      }
    });
    expect(component.instance().canBeIncreased('length')).toBeFalsy();
  });

  it('returns valid bool on canBeDecreased size call', () => {
    component.setProps({
      parameters: {
        ...component.instance().props.parameters,
        size: 10
      }
    });
    expect(component.instance().canBeDecreased('size')).toBeTruthy();
    component.setProps({
      parameters: {
        ...component.instance().props.parameters,
        size: 8
      }
    });
    expect(component.instance().canBeDecreased('size')).toBeFalsy();
  });

  it('returns valid bool on canBeDecreased speed call', () => {
    component.setProps({
      parameters: {
        ...component.instance().props.parameters,
        speed: 50
      }
    });
    expect(component.instance().canBeDecreased('speed')).toBeTruthy();
    component.setProps({
      parameters: {
        ...component.instance().props.parameters,
        speed: 25
      }
    });
    expect(component.instance().canBeDecreased('speed')).toBeFalsy();
  });

  it('returns valid bool on canBeDecreased length call', () => {
    component.setProps({
      parameters: {
        ...component.instance().props.parameters,
        length: 2
      }
    });
    expect(component.instance().canBeDecreased('length')).toBeTruthy();
    component.setProps({
      parameters: {
        ...component.instance().props.parameters,
        length: 1
      }
    });
    expect(component.instance().canBeDecreased('length')).toBeFalsy();
  });

  it('returns valid value on getShiftForParameter call', () => {
    expect(SettingsForm.getShiftForParameter('size')).toBe(2);
    expect(SettingsForm.getShiftForParameter('speed')).toBe(25);
    expect(SettingsForm.getShiftForParameter('length')).toBe(1);
  })
});
