import React from 'react';
import {shallow} from 'enzyme';
import ActionForm from '../../forms/ActionForm';
import sinon from 'sinon';

describe('<ActionForm />', () => {
  let component;

  beforeEach(() => {
    component = shallow(<ActionForm handleCorrectAnswer={jest.fn()} handleIncorrectAnswer={jest.fn()} correctAnswer="12345"/>)
  });

  it('renders ok', () => {
    expect(component.length).toBe(1);
    expect(component.instance().props.correctAnswer).toBe('12345');
  });

  it('calls correct prop function depends on answer', () => {
    const e = { preventDefault: jest.fn()};
    let handleCorrectAnswerSpy = sinon.spy();
    let handleIncorrectAnswerSpy = sinon.spy();

    component.setProps({
      handleCorrectAnswer: handleCorrectAnswerSpy,
      handleIncorrectAnswer: handleIncorrectAnswerSpy
    });

    component.instance().setState({answer: '54321'});
    component.instance().onSubmit(e);
    expect(handleIncorrectAnswerSpy.calledOnce).toBeTruthy();

    component.instance().setState({answer: '12345'});
    component.instance().onSubmit(e);
    expect(handleCorrectAnswerSpy.calledOnce).toBeTruthy();
  });

  it('sets state answer on onChange call', () => {
    const e = {
      target: {
        value: '1122'
      }
    };

    component.instance().onChange(e);
    expect(component.instance().state.answer).toBe('1122');
  });

  it('returns valid bool on isAnswerCorrect call', () => {
    component.instance().setState({answer: '12345'});
    expect(component.instance().isAnswerCorrect()).toBeTruthy();

    component.instance().setState({answer: '54321'});
    expect(component.instance().isAnswerCorrect()).toBeFalsy();
  });
});
