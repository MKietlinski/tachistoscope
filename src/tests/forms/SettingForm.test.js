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

  it('returns valid bool on validateIncreaseParameter size call', () => {
    component.setProps({
      parameters: {
        ...component.instance().props.parameters,
        size: 38
      }
    });
    expect(component.instance().validateIncreaseParameter('size')).toBeTruthy();
    component.setProps({
      parameters: {
        ...component.instance().props.parameters,
        size: 40
      }
    });
    expect(component.instance().validateIncreaseParameter('size')).toBeFalsy();
  });

  it('returns valid bool on validateIncreaseParameter speed call', () => {
    component.setProps({
      parameters: {
        ...component.instance().props.parameters,
        speed: 975
      }
    });
    expect(component.instance().validateIncreaseParameter('speed')).toBeTruthy();
    component.setProps({
      parameters: {
        ...component.instance().props.parameters,
        speed: 1000
      }
    });
    expect(component.instance().validateIncreaseParameter('speed')).toBeFalsy();
  });

  it('returns valid bool on validateIncreaseParameter length call', () => {
    component.setProps({
      parameters: {
        ...component.instance().props.parameters,
        length: 19
      }
    });
    expect(component.instance().validateIncreaseParameter('length')).toBeTruthy();
    component.setProps({
      parameters: {
        ...component.instance().props.parameters,
        length: 20
      }
    });
    expect(component.instance().validateIncreaseParameter('length')).toBeFalsy();
  });

  it('returns valid bool on validateDecreaseParameter size call', () => {
    component.setProps({
      parameters: {
        ...component.instance().props.parameters,
        size: 10
      }
    });
    expect(component.instance().validateDecreaseParameter('size')).toBeTruthy();
    component.setProps({
      parameters: {
        ...component.instance().props.parameters,
        size: 8
      }
    });
    expect(component.instance().validateDecreaseParameter('size')).toBeFalsy();
  });

  it('returns valid bool on validateDecreaseParameter speed call', () => {
    component.setProps({
      parameters: {
        ...component.instance().props.parameters,
        speed: 50
      }
    });
    expect(component.instance().validateDecreaseParameter('speed')).toBeTruthy();
    component.setProps({
      parameters: {
        ...component.instance().props.parameters,
        speed: 25
      }
    });
    expect(component.instance().validateDecreaseParameter('speed')).toBeFalsy();
  });

  it('returns valid bool on validateDecreaseParameter length call', () => {
    component.setProps({
      parameters: {
        ...component.instance().props.parameters,
        length: 2
      }
    });
    expect(component.instance().validateDecreaseParameter('length')).toBeTruthy();
    component.setProps({
      parameters: {
        ...component.instance().props.parameters,
        length: 1
      }
    });
    expect(component.instance().validateDecreaseParameter('length')).toBeFalsy();
  });

  it('returns valid value on getShiftForParameter call', () => {
    expect(SettingsForm.getShiftForParameter('size')).toBe(2);
    expect(SettingsForm.getShiftForParameter('speed')).toBe(25);
    expect(SettingsForm.getShiftForParameter('length')).toBe(1);
  })
});
