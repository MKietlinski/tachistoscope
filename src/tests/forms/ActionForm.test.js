import React from 'react';
import {shallow} from 'enzyme';
import ActionForm from '../../forms/ActionForm';
import sinon from 'sinon';

describe('<ActionForm />', () => {
  let component;

  beforeEach(() => {
    component = shallow(<ActionForm handleValidAction={jest.fn()} handleInvalidAction={jest.fn()} validValue="12345"/>)
  });

  it('renders ok', () => {
    expect(component.length).toBe(1);
    expect(component.instance().props.validValue).toBe('12345');
  });

  it('calls valid prop function depends on answer', () => {
    const e = { preventDefault: jest.fn()};
    let handleValidActionSpy = sinon.spy();
    let handleInvalidActionSpy = sinon.spy();

    component.setProps({
      handleValidAction: handleValidActionSpy,
      handleInvalidAction: handleInvalidActionSpy
    });

    component.instance().setState({value: '54321'});
    component.instance().onSubmit(e);
    expect(handleInvalidActionSpy.calledOnce).toBeTruthy();

    component.instance().setState({value: '12345'});
    component.instance().onSubmit(e);
    expect(handleValidActionSpy.calledOnce).toBeTruthy();
  });

  it('sets state value on onChange call', () => {
    const e = {
      target: {
        value: '1122'
      }
    };

    component.instance().onChange(e);
    expect(component.instance().state.value).toBe('1122');
  });

  it('returns valid bool on isAnswerValid call', () => {
    component.instance().setState({value: '12345'});
    expect(component.instance().isAnswerValid()).toBeTruthy();

    component.instance().setState({value: '54321'});
    expect(component.instance().isAnswerValid()).toBeFalsy();
  });
});
